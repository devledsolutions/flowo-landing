# Repository Guidelines

## Project Structure & Module Organization
This repository is a Next.js 15 App Router landing site for Flowo (pt-BR content).

- `app/`: routes, layouts, global styles, and API handlers (e.g. `app/api/lead-capture/route.ts`).
- `components/`: page sections and reusable UI. Base shadcn primitives live in `components/ui/`; domain sections live in folders like `components/resources/` and `components/pricing/`.
- `data/`: static content (FAQ, pricing, feature comparison).
- `lib/`, `hooks/`, `providers/`, `types/`: shared utilities, React hooks, providers, and TypeScript types.
- `public/`: static assets and downloadable files.
- `scripts/`: utility generators (PDF/XLSX assets).

## Build, Test, and Development Commands
This repo uses pnpm (see `packageManager` in `package.json`). Never npm or yarn.
- `pnpm dev`: start local dev server with Turbopack at `http://localhost:3000`.
- `pnpm build`: create production build.
- `pnpm start`: run production build locally.
- `pnpm lint`: run Next.js + TypeScript ESLint checks.
- `node scripts/generate-pdfs.mjs` / `node scripts/generate-spreadsheets.mjs`: regenerate downloadable marketing assets when needed.

## Coding Style & Naming Conventions
- Use TypeScript for new code; keep strict typing compatible with `tsconfig.json` (`"strict": true`).
- Follow existing React patterns: functional components, PascalCase component names, and hooks named `useX`.
- Prefer `@/` path aliases over deep relative imports.
- Keep styling in Tailwind utilities and existing theme tokens in `app/globals.css`.
- Run `pnpm lint` before opening a PR.

## Testing Guidelines
There is currently no dedicated automated test suite configured. Minimum quality bar:

- Lint must pass (`pnpm lint`).
- Manually validate changed flows in dev mode (especially homepage sections, pricing/resources routes, and API forms).
- For complex logic, add tests using `*.test.ts(x)` naming near the feature or in a local `__tests__/` directory.

## Commit & Pull Request Guidelines
Git history follows Conventional Commits. Use formats like:
- `feat(seo): optimize metadata for pricing page`
- `fix: correct lead capture validation`
- `refactor(pricing): simplify plan card props`

PRs should include:
- Clear summary of user-visible changes.
- Linked issue/ticket (if available).
- Screenshots or short recordings for UI changes.
- Test notes (what you ran: lint + manual checks).

## Security & Configuration Tips
- Copy from `.env.example`; keep secrets in `.env.local`.
- Never commit credentials or production keys.
- Review Sentry-related files when changing telemetry (`sentry.*.config.ts`, `instrumentation*.ts`).
