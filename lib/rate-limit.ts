import { Redis } from "@upstash/redis";
import { PUBLIC_ENVIRONMENT } from "@/lib/environment";

type BucketEntry = {
  count: number;
  resetAt: number;
};

type LimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
  retryAfterSeconds: number;
};

type LimitOptions = {
  bucket: string;
  key: string;
  limit: number;
  windowMs: number;
};

const buckets = new Map<string, Map<string, BucketEntry>>();
let cleanupCounter = 0;
let redisClient: Redis | null | undefined;

function getRedisClient(): Redis | null {
  if (redisClient !== undefined) {
    return redisClient;
  }

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    redisClient = null;
    return redisClient;
  }

  redisClient = new Redis({
    url,
    token,
  });
  return redisClient;
}

function getBucket(name: string): Map<string, BucketEntry> {
  const existing = buckets.get(name);
  if (existing) return existing;

  const created = new Map<string, BucketEntry>();
  buckets.set(name, created);
  return created;
}

function cleanupExpiredEntries(): void {
  cleanupCounter += 1;
  if (cleanupCounter % 100 !== 0) return;

  const now = Date.now();

  for (const [, bucket] of buckets) {
    for (const [key, value] of bucket) {
      if (value.resetAt <= now) {
        bucket.delete(key);
      }
    }
  }
}

function applyInMemoryRateLimit({
  bucket,
  key,
  limit,
  windowMs,
}: LimitOptions): LimitResult {
  cleanupExpiredEntries();

  const now = Date.now();
  const target = getBucket(bucket);
  const current = target.get(key);

  if (!current || current.resetAt <= now) {
    const resetAt = now + windowMs;
    target.set(key, {
      count: 1,
      resetAt,
    });

    return {
      allowed: true,
      limit,
      remaining: Math.max(limit - 1, 0),
      resetAt,
      retryAfterSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (current.count >= limit) {
    return {
      allowed: false,
      limit,
      remaining: 0,
      resetAt: current.resetAt,
      retryAfterSeconds: Math.max(Math.ceil((current.resetAt - now) / 1000), 1),
    };
  }

  current.count += 1;
  target.set(key, current);

  return {
    allowed: true,
    limit,
    remaining: Math.max(limit - current.count, 0),
    resetAt: current.resetAt,
    retryAfterSeconds: Math.max(Math.ceil((current.resetAt - now) / 1000), 1),
  };
}

async function applyRedisRateLimit({
  bucket,
  key,
  limit,
  windowMs,
}: LimitOptions): Promise<LimitResult | null> {
  const redis = getRedisClient();
  if (!redis) return null;

  const windowSeconds = Math.ceil(windowMs / 1000);
  const redisKey = `ratelimit:${bucket}:${key}`;

  try {
    const current = await redis.incr(redisKey);
    if (current === 1) {
      await redis.expire(redisKey, windowSeconds);
    }

    const ttl = Math.max((await redis.ttl(redisKey)) || windowSeconds, 1);
    const resetAt = Date.now() + ttl * 1000;
    const allowed = current <= limit;

    return {
      allowed,
      limit,
      remaining: allowed ? Math.max(limit - current, 0) : 0,
      resetAt,
      retryAfterSeconds: ttl,
    };
  } catch (error) {
    console.error("Redis rate limiter failed:", error);
    return null;
  }
}

export async function applyRateLimit(options: LimitOptions): Promise<LimitResult> {
  const redisResult = await applyRedisRateLimit(options);
  if (redisResult) return redisResult;

  if (PUBLIC_ENVIRONMENT.deploymentEnvironment === "development") {
    return applyInMemoryRateLimit(options);
  }

  const retryAfterSeconds = Math.max(Math.ceil(options.windowMs / 1000), 1);
  return {
    allowed: false,
    limit: options.limit,
    remaining: 0,
    resetAt: Date.now() + retryAfterSeconds * 1000,
    retryAfterSeconds,
  };
}
