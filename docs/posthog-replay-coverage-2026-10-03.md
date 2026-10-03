# PostHog: remote replay policy and web coverage — 2026-10-03

## Decision and actual scope

The owner explicitly confirmed PostHog's **Free love (mask only passwords)** setting,
with credential/OTP/payment protections and visitor consent preserved.

Applied through the verified Flowo Chrome Profile 2, Devled / Flowo - Convex
(project 239500). The remote web setting is saved. This does **not** deploy
SDK code, override explicit local SDK options, or enable React Native replay.

## Implementation

- Dashboard delegates general input/text masking to PostHog instead of forcing
  maskAllInputs=true. Replay is enabled only with the existing analytics preference.
- Landing keeps operational exception capture separate. Consent enables pageviews,
  pageleave, click/change/submit autocapture and remote-controlled replay; withdrawal
  stops recording, resets identity and disables persistence/behavior capture.
- The landing clearConsent function now notifies subscribers on withdrawal.
- Both web clients exclude credential/OTP/card controls, credential-bearing links,
  Clerk controls, request bodies/headers and cross-origin frames. Raw console replay
  is off; structured exception capture remains.
- Capability-bearing paths and URL query/hash/userinfo are removed from replay URLs.
  Dashboard event URLs receive the same treatment. Ordinary business text is not
  blanket-masked. This is not a guarantee that an arbitrary user cannot paste a
  secret into an ordinary conversation field.
- Landing privacy copy is updated in the same source change. It is not deployed yet.

## Remote environment correction (no build)

Read-only Vercel env inventory for devled/flowo-app production proved these were absent.
Added, without overwriting other variables:

- NEXT_PUBLIC_POSTHOG_ENVIRONMENT=production
- NEXT_PUBLIC_CONSENT_COOKIE_NAME=cookieConsent
- NEXT_PUBLIC_FLOWO_COOKIE_DOMAIN=.flowo.com.br

The explicit production label fixes the observed unconfigured dashboard dimension
on the **next** deployment; no host-based inference or rewriting historical data.
The consent namespace matches the production site's public contract.

## Live data observations

In the fixed 7-day coverage query, five expected rows are always present:

- backend: receiving classified production events;
- dashboard: receiving events, but no classified production events in that result;
- landing, iOS, Android: no events with their canonical surface/platform in this project.

This does NOT prove no traffic, no unclassified/Segment data, or zero failures.
The 30-day acquisition query separates submitted vs succeeded forms and success vs
failed onboarding. It measures received events, not a joined funnel or conversion rate.

Coverage insight: https://us.posthog.com/project/239500/insights/InIk2mfu
Acquisition insight: https://us.posthog.com/project/239500/insights/tVxHkaxg

Separate acquisition/adoption dashboard:
https://us.posthog.com/project/239500/dashboard/2167003
Coverage added to the existing diagnostics dashboard, not to the incident pager.

No additional alerts, synthetic ingested events, customer messages or bookings.

## Verification and remaining release gates

- Dashboard focused tests: 28 passed; typecheck passed.
- Landing focused tests: 23 passed; existing exception/redaction tests: 3 passed.
- Landing typecheck, consent audit and lint passed.
- SDK 1.393.x implementation inspected: explicit client masking overrides remote
masking. This is why changing only the remote setting was insufficient.
- Live remote readback: Free love selected; sampling 100% (default), no triggers
  or URL blocklist; header/body capture off. Raw console capture was switched off
  and its unchecked state verified. Error Tracking was not disabled.
- No web deployment, mobile build/OTA, physical-device replay acceptance, merged PR
  or production recording with the changed source is claimed.
- Native replay remains unimplemented in this slice. The mobile SDK's separate
  enableSessionReplay/sessionReplayConfig and native-view secret protection need
  implementation plus independent iOS/Android validation. The web privacy dropdown
  is not sufficient.
- Segment -> PostHog product-event delivery/identity must be verified before adding
  a second product-event writer; this change deliberately avoids double counting.
- Backend model-attempt telemetry, test-vs-customer classification, joined funnel
  and confirmed WhatsApp delivery remain separate acceptance gates.
- Before rollout: review consent in fresh/no-consent/accepted/revoked sessions,
  verify credential fixtures are absent from replay payloads, and verify recordings
  plus event dimensions from the deployed SHA in PostHog.
- Remote setting rollback: Normal (mask inputs but not text/images). Local clients
  can stop replay independently. No old data or dashboards were deleted.

## Automation/build policy

Flowo app's seven workflows remain disabled. Landing QA workflow was disabled.
GitHub refuses disabling its dynamic Dependency Graph workflow individually (422),
so Actions was disabled at landing repository level; readback enabled=false.
No CI dispatched, cloud build, deploy or store submission.
Both repositories disable Vercel branch previews in vercel.json.

## References

- https://posthog.com/docs/session-replay/privacy
- https://posthog.com/docs/session-replay/how-to-control-which-sessions-you-record
- https://posthog.com/docs/session-replay/installation/react-native
