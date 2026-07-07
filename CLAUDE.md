# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Flowo is a Portuguese-language landing page for an AI-powered scheduling platform **specifically for barbershops (barbearias)**. The site is built with Next.js 15.1.0 and uses modern React patterns with server components.

**Target Audience**: Brazilian barbershop owners and barbeiros (haircutters), from solo professionals to multi-location franchises.

## Development Commands

```bash
# Start development server (with Turbopack)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint
```

The dev server runs on http://localhost:3000

## Architecture

### Technology Stack

- **Framework**: Next.js 15.1.0 (App Router)
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS + shadcn/ui components
- **UI Library**: Radix UI primitives
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: react-hot-toast for notifications

### Path Aliases

The project uses `@/` as an alias for the root directory:
- `@/components` → `/components`
- `@/lib` → `/lib`
- `@/data` → `/data`
- `@/types` → `/types`

### Project Structure

```
app/
├── page.tsx                    # Homepage with all landing sections
├── layout.tsx                  # Root layout with fonts (Inter, Outfit)
├── precos/page.tsx            # Pricing page
├── recursos/                   # Resources section
│   ├── guias/                 # Guide pages
│   └── videos/                # Video resources
├── casos-de-sucesso/          # Success story pages
└── api/
    ├── lead-capture/route.ts  # Lead capture endpoint (TODO: implement storage)
    └── contact-form/route.ts  # Contact form endpoint

components/
├── ui/                        # shadcn/ui base components (Button, Card, Dialog, etc.)
├── [feature].tsx              # Feature-specific components (Hero, Features, FAQ, etc.)
└── navbar.tsx                 # Main navigation with lead capture modal

data/
├── faq-items.ts              # FAQ content
├── feature-comparison.ts      # Feature comparison data
└── pricing-data.ts           # Pricing plans

lib/
└── utils.ts                   # cn() utility for className merging
```

### Design System

The project uses shadcn/ui configuration with:
- CSS variables for theming (defined in `app/globals.css`)
- Custom fonts: Inter (sans) and Outfit (display)
- Tailwind with `tailwindcss-animate` plugin
- Custom gradient text class: `.gradient-text` (teal to green gradient)
- Accessibility features: focus outlines, prefers-reduced-motion support

### Key Patterns

1. **Page Composition**: Pages are composed of Section components with alternating backgrounds (`gradient`, `white`, `gradient-reverse`)

2. **Lead Capture Flow**:
   - Lead modal triggered from navbar and CTAs
   - POST to `/api/lead-capture` endpoint
   - Currently logs to console (storage/WhatsApp integration pending)

3. **SEO Component**: Custom `<SEO>` component for per-page metadata

4. **Animation**: Uses `framer-motion` with `react-intersection-observer` for scroll animations

5. **React Strict Mode**: Disabled in `next.config.ts` to prevent double rendering in development

### Important Configuration Notes

- TypeScript: Strict mode enabled, target ES2017
- Next.js: reactStrictMode is disabled (see next.config.ts:4)
- Language: All content is in Portuguese (pt-BR)
- Font Loading: Uses Next.js font optimization with CSS variables

### API Routes

Both API routes (`/api/lead-capture` and `/api/contact-form`) are currently skeleton implementations with TODO comments for:
- Database storage
- WhatsApp integration
- Email notifications

### Barbershop-Specific Content

All content is tailored for the barbershop vertical:
- **Hero**: "A Barbearia que Agenda Sozinha" - focuses on WhatsApp automation
- **Features**: Barbershop-specific features (queue management, service history, multiple barbers)
- **Services**: References corte, barba, degradê, combos
- **Testimonials**: Real Brazilian barbershop owners (Ratão, BarberHouse, Cortes & Estilo)
- **Industry Showcase**: Three barbershop types (Traditional, Modern, Premium)
- **Pricing**: Three tiers (Solo, Barbearia, Franquia) with barbershop-specific features
- **SEO**: Optimized for "sistema agendamento barbearia", "agenda barbearia whatsapp"

### Component Organization

- **Landing Sections**: hero, how-it-works, features, testimonials, pricing, faq, etc.
- **Reusable UI**: All shadcn/ui components in `components/ui/`
- **Layout Components**: navbar, footer, section wrapper
- **Special Components**: ai-chatbot (floating chat widget), lead-capture-modal

## File Conventions

- Always add a newline at the end of files
- Use TypeScript for all new files
- Follow existing component patterns (functional components with TypeScript interfaces)
- Use `cn()` utility from `@/lib/utils` for className merging
