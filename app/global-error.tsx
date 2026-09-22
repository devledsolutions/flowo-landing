"use client";

import NextError from "next/error";
import { useEffect } from "react";
import { captureLandingException } from "@/lib/observability/posthog-client";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    captureLandingException(error, "global-error", {
      digest: error.digest,
    });
  }, [error]);

  return (
    <html>
      <body>
        <NextError statusCode={500} />
      </body>
    </html>
  );
}
