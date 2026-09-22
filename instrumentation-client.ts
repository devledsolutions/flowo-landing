import { initializeLandingPostHog } from "@/lib/observability/posthog-client";

// Exception autocapture is operational telemetry, not marketing analytics.
// Initialize it at the client entrypoint so uncaught browser errors do not
// depend on a later route transition or a legacy monitoring SDK.
initializeLandingPostHog();
