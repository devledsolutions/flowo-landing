import { PUBLIC_ENVIRONMENT } from "@/lib/environment";

type VerifyTurnstileParams = {
  token: string;
  ip?: string;
  expectedAction?: string;
};

type TurnstileApiResponse = {
  success: boolean;
  action?: string;
  hostname?: string;
  "error-codes"?: string[];
};

export type TurnstileResult = {
  success: boolean;
  skipped: boolean;
  errors: string[];
};

export async function verifyTurnstile({
  token,
  ip,
  expectedAction,
}: VerifyTurnstileParams): Promise<TurnstileResult> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  // Keep local development simple. Hosted QA and production must never turn a
  // missing anti-bot secret into an allow-all endpoint.
  if (!secretKey) {
    if (PUBLIC_ENVIRONMENT.deploymentEnvironment !== "development") {
      return {
        success: false,
        skipped: false,
        errors: ["turnstile-not-configured"],
      };
    }
    return {
      success: true,
      skipped: true,
      errors: [],
    };
  }

  if (!token) {
    return {
      success: false,
      skipped: false,
      errors: ["missing-input-response"],
    };
  }

  const body = new URLSearchParams({
    secret: secretKey,
    response: token,
  });

  if (ip && ip !== "unknown") {
    body.set("remoteip", ip);
  }

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return {
        success: false,
        skipped: false,
        errors: [`http-${response.status}`],
      };
    }

    const data = (await response.json()) as TurnstileApiResponse;
    if (!data.success) {
      return {
        success: false,
        skipped: false,
        errors: data["error-codes"] || ["invalid-turnstile-response"],
      };
    }

    if (expectedAction && data.action && data.action !== expectedAction) {
      return {
        success: false,
        skipped: false,
        errors: ["action-mismatch"],
      };
    }

    const expectedHostname = new URL(PUBLIC_ENVIRONMENT.siteOrigin).hostname;
    if (data.hostname && data.hostname !== expectedHostname) {
      return {
        success: false,
        skipped: false,
        errors: ["hostname-mismatch"],
      };
    }

    return {
      success: true,
      skipped: false,
      errors: [],
    };
  } catch (error) {
    console.error("Turnstile verification failed:", error);
    return {
      success: false,
      skipped: false,
      errors: ["verification-request-failed"],
    };
  }
}
