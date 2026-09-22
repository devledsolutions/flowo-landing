import { PUBLIC_ENVIRONMENT } from "@/lib/environment";
import { createHash } from "node:crypto";
import { ConvexHttpClient } from "convex/browser";
import { makeFunctionReference } from "convex/server";

type Bucket =
  | "contact-form"
  | "lead-capture"
  | "growth-signal"
  | "growth-experiment"
  | "voice-verification-request"
  | "voice-verification-confirm";

type ConvexPolicy =
  | "landing-contact-ip-minute"
  | "landing-lead-capture-ip-minute"
  | "landing-growth-signal-ip-minute"
  | "landing-growth-experiment-ip-minute"
  | "landing-voice-verification-request-ip-minute"
  | "landing-voice-verification-confirm-ip-minute";

type BucketPolicy = {
  policy: ConvexPolicy;
  limit: number;
  windowMs: number;
};

type BucketEntry = {
  count: number;
  resetAt: number;
};

export type LimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
  retryAfterSeconds: number;
};

type LimitOptions = {
  bucket: Bucket;
  key: string;
  limit: number;
  windowMs: number;
};

type ConsumeRateLimitArgs = {
  serverSecret: string;
  policy: ConvexPolicy;
  key: string;
};

type ConsumeRateLimitResult = {
  allowed: boolean;
  retryAfterMs: number;
};

const consumeRateLimit = makeFunctionReference<
  "mutation",
  ConsumeRateLimitArgs
>("apiRateLimits:consume");

const bucketPolicies: Record<Bucket, BucketPolicy> = {
  "contact-form": {
    policy: "landing-contact-ip-minute",
    limit: 10,
    windowMs: 60_000,
  },
  "lead-capture": {
    policy: "landing-lead-capture-ip-minute",
    limit: 15,
    windowMs: 60_000,
  },
  "growth-signal": {
    policy: "landing-growth-signal-ip-minute",
    limit: 60,
    windowMs: 60_000,
  },
  "growth-experiment": {
    policy: "landing-growth-experiment-ip-minute",
    limit: 30,
    windowMs: 60_000,
  },
  "voice-verification-request": {
    policy: "landing-voice-verification-request-ip-minute",
    limit: 5,
    windowMs: 60_000,
  },
  "voice-verification-confirm": {
    policy: "landing-voice-verification-confirm-ip-minute",
    limit: 10,
    windowMs: 60_000,
  },
};

const buckets = new Map<string, Map<string, BucketEntry>>();
let cleanupCounter = 0;
let convexClient: ConvexHttpClient | null | undefined;

function getBucketPolicy(options: LimitOptions): BucketPolicy {
  const policy = bucketPolicies[options.bucket];

  // Route values are retained for response headers, but the actual policy and
  // limits are owned by Convex. This catches accidental route drift locally
  // instead of silently weakening a public endpoint.
  if (policy.limit !== options.limit || policy.windowMs !== options.windowMs) {
    throw new Error(`Rate-limit configuration drift for ${options.bucket}`);
  }

  return policy;
}

function getConvexClient(): ConvexHttpClient | null {
  if (convexClient !== undefined) return convexClient;

  const convexUrl = process.env.CONVEX_URL || process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!convexUrl) {
    convexClient = null;
    return convexClient;
  }

  convexClient = new ConvexHttpClient(convexUrl);
  return convexClient;
}

function hashKey(value: string): string {
  return createHash("sha256").update(value).digest("hex");
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

  for (const bucket of buckets.values()) {
    for (const [key, value] of bucket) {
      if (value.resetAt <= now) bucket.delete(key);
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
    target.set(key, { count: 1, resetAt });

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

async function applyConvexRateLimit(
  options: LimitOptions,
  policy: BucketPolicy
): Promise<LimitResult | null> {
  const convex = getConvexClient();
  const serverSecret = process.env.CONVEX_SERVER_SECRET;
  if (!convex || !serverSecret) return null;

  try {
    const result = (await convex.mutation(consumeRateLimit, {
      serverSecret,
      policy: policy.policy,
      key: `landing:${options.bucket}:${hashKey(options.key)}`,
    })) as ConsumeRateLimitResult;
    const retryAfterSeconds = result.allowed
      ? Math.ceil(options.windowMs / 1000)
      : Math.max(Math.ceil(result.retryAfterMs / 1000), 1);
    const resetAt = Date.now() + retryAfterSeconds * 1000;

    return {
      allowed: result.allowed,
      limit: policy.limit,
      remaining: result.allowed ? Math.max(policy.limit - 1, 0) : 0,
      resetAt,
      retryAfterSeconds,
    };
  } catch (error) {
    console.error("Convex rate limiter failed, falling back to memory:", error);
    return null;
  }
}

export async function applyRateLimit(options: LimitOptions): Promise<LimitResult> {
  const policy = getBucketPolicy(options);
  const convexResult = await applyConvexRateLimit(options, policy);
  if (convexResult) return convexResult;

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
