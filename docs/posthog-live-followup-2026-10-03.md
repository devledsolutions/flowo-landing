# PostHog live follow-up — 2026-10-03

## Proven findings after landing PR 81 deployment

Production SHA 28478b7aac7e5cefee5ab7787fa289c66b7166c8 was READY.
Real browser traffic and PostHog SQL proved accepted landing `$pageview` and
`$autocapture` events with environment=production, plus accepted `/s/` snapshots.
Segment accepted page/track requests. The provider query also showed a
`Pricing Viewed` event without surface/environment/release.

Three gaps were found, not a customer booking failure rate:

1. Client landing events were `release=unversioned`: the server-only Vercel SHA
   was not embedded in Next.js client configuration.
2. Segment event context did not include canonical telemetry dimensions.
3. A SPA navigation from `/` to `/precos` produced no new PostHog pageview.
   The installed SDK initializes HistoryAutocapture only when configured at
   initialization; set_config does not call its startIfEnabled. Starting with
   capture_pageview=false and toggling it after consent therefore missed routes.

## Change

- Embed the explicit release or Vercel SHA in NEXT_PUBLIC_RELEASE.
- Attach the same landing/web/environment/release dimensions to Segment pages
  and tracks. No second writer for semantic product events.
- Use one Next.js pathname observer with a deduplicated manual pageview function.
  Consent grant records the current route once; withdrawal blocks new routes and
  clears deduplication; a new grant records the current route once again.
- General replay settings remain remote-owned. Password/OTP/card protections,
  private-token redaction and consent remain unchanged.

## Verification boundary

Focused tests cover the ingest envelope, exclusions, consent lifecycle, route
deduplication, Segment dimensions and release configuration. The final deployment
must be inspected again for matching-SHA events, SPA pageviews and replay playback.
No completed lead delivery, ad conversion, joined acquisition funnel, native
replay or business booking acceptance is implied.

24/24 public PDF/XLSX assets returned HTTP 200 with expected MIME types in the
live read-only asset probe. This proves asset availability, not email delivery.
PostHog Marketing analytics showed its setup screen and explicitly labeled
example data: no ad-spend data warehouse source was connected. Example ROAS and
spend values are not business data.

GitHub Actions remains disabled. No native cloud build, customer message,
reservation, ad campaign or paid subscription was created by this campaign.
