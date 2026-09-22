export const onRequestError = async (
  err: unknown,
  request: {
    path: string;
    method: string;
    headers: { [key: string]: string | undefined };
  }
) => {
  // Log server-side errors
  console.error("Request error:", {
    path: request.path.split("?")[0],
    method: request.method,
    error: err,
  });
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { captureLandingException } = await import("./lib/observability/posthog-server");
    await captureLandingException(err, "next-request-error", {
      path: request.path.split("?")[0],
      method: request.method,
    });
  }
};
