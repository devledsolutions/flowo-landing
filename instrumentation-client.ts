type SentryModule = typeof import("@sentry/nextjs");
type RouterTransitionArgs = Parameters<
  SentryModule["captureRouterTransitionStart"]
>;

let sentryPromise: Promise<SentryModule> | undefined;

async function initializeClientMonitoring() {
  const Sentry = await import("@sentry/nextjs");

  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    tracesSampleRate: 0.1,
    debug: false,
    enabled: process.env.NODE_ENV === "production",
    environment: process.env.NODE_ENV || "development",
  });

  return Sentry;
}

function getSentry() {
  sentryPromise ??= initializeClientMonitoring();
  return sentryPromise;
}

if (typeof window !== "undefined") {
  window.addEventListener(
    "load",
    () => {
      window.setTimeout(() => {
        void getSentry();
      }, 5000);
    },
    { once: true },
  );
}

// Route transitions happen after the initial paint and can initialize the SDK
// without putting the monitoring bundle on the critical rendering path.
export const onRouterTransitionStart = (...args: RouterTransitionArgs) => {
  void getSentry().then((Sentry) => {
    Sentry.captureRouterTransitionStart(...args);
  });
};
