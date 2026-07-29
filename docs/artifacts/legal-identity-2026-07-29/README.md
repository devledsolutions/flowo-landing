# Public legal identity evidence — 2026-07-29

## Status

Passed locally. The public marketing site identifies the confirmed Devled
contracting entity, publishes synchronized Terms and Privacy documents, and
provides a public account/data-deletion route.

## Scope

1. `/termos`
2. `/privacidade`
3. `/exclusao-de-dados`
4. Footer legal identity and links
5. Organization JSON-LD identity

## Results

- `pnpm lint` — passed with zero warnings.
- `pnpm build` — passed; all three legal routes prerendered.
- Chrome desktop inspection — passed for entity, CNPJ, messaging-subprocessor
  disclosure, legal links and the secure account-deletion destination.

Screenshots:

- `terms-desktop.png`
- `privacy-desktop.png`
- `deletion-desktop.png`

## Residual risk

The published wording should receive Brazilian legal review before the first
paying customer. No representation is made that Devled has appointed a formal
DPO; privacy requests use the general Flowo support address.
