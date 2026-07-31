# Premium lead offers — evidence

## Artifacts

- `diagnostico-desktop.png` — landing do Raio-X da Agenda em 1440 px.
- `diagnostico-mobile.png` — landing do Raio-X da Agenda em 390 px.
- `implantacao-desktop.png` — landing da oferta Recepção sem Interrupção em 1440 px.
- `implantacao-mobile.png` — landing da oferta Recepção sem Interrupção em 390 px.
- `../../../output/pdf/flowo-premium-lead-offer-models-v2.pdf` — deck A4 com três modelos de
  material.

## Design brief

Designing a lead-magnet system and a paid-offer landing for Brazilian barbershop owners on web
and mobile. Goal: make the operational problem obvious, deliver a useful diagnostic and earn the
next conversation. Tone: premium, direct, practical and Brazilian. Main objection: AI may be
risky or generic. Must remember: the conversation needs to know the agenda. Constraints:
Poppins/Lora, Flowo ink/cream, no invented metrics/testimonials, no mandatory payments, no free
trial and mobile-first conversion.

## Reference lock

- **Primary:** Symbolic.ai (`b49ec76c-1410-44cb-9de1-b5ac58255949`) for tactile paper layers,
  editorial whitespace and restrained document framing.
- **Preserve:** warm paper canvas, ink typography, asymmetrical evidence, generous rhythm and
  real/form-like document previews.
- **Borrow only:** Elementor (`86351665-7483-48d1-9be4-5fe456093686`) for black/white section
  inversion; Medium (`4784cf2e-58ed-4b0c-8e6d-8758f595d997`) for content-first hierarchy.
- **Screen patterns:** Kit landing pages (`1aa7c81c-b700-4832-aad0-3af7f61505af`) for form
  clarity; Slack ebook (`7fe0a2fd-a6ad-477e-bce4-2052b1e160aa`) and Loom playbook
  (`83bdf058-860c-4308-9284-00411112e3fb`) for preview → contents → CTA sequencing.
- **Role rules:** green only for progress, confirmation and the most relevant choice; black for
  primary actions and high-contrast proof; serif only for short editorial headlines.
- **Media:** code-native book, document and product mockups, explicitly labeled as review or
  illustrative data. No stock photography or fake testimonial imagery.
- **Reject:** purple AI gradients, glossy device overload, arbitrary metrics, crossed-out fake
  values, excessive cards and barber-pole clichés.

## Decision ledger

| Decision | Source | Role | Reason |
| --- | --- | --- | --- |
| Paper stack in lead hero | Symbolic | Lead-magnet preview | Makes the deliverables tangible |
| Black problem band | Elementor | Narrative interruption | Creates urgency without a new color |
| Large serif editorial titles | Flowo design system + Medium | Headline only | Distinguishes education from product UI |
| Poppins product offer hero | Flowo design system | Product promise | Gives the paid offer more operational force |
| Separate optional checkboxes | LGPD/product constraint | Consent | Delivery never depends on marketing opt-in |
| Product evidence before features | Product marketing context | Proof | Demonstration replaces unsupported testimonials |

## Validation

- `pnpm lint` — clean.
- `pnpm build` — clean; both review routes prerendered as static.
- Chrome desktop at 1440 × 1000.
- Chrome mobile at 390 × 844.
- No horizontal overflow at either viewport.
- Browser console: zero errors and zero warnings.
- Review routes use `noindex, nofollow`.
- Forms are visual mockups only and do not submit data.
