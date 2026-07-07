import type { Config } from "tailwindcss"

const config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: 'var(--gutter)',
      screens: {
        '2xl': '1200px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)', 'ui-sans-serif', 'system-ui'],
        serif: ['var(--font-lora)', 'ui-serif', 'Georgia'],
      },
      colors: {
        // Barbearia Noir tokens (preferred for new sections)
        ink: {
          DEFAULT: 'var(--ink)',
          strong: 'var(--ink-strong)',
        },
        cream: 'var(--bg)',
        surface: {
          DEFAULT: 'var(--surface)',
          2: 'var(--surface-2)',
        },
        line: 'var(--line)',
        'muted-ink': 'var(--muted-ink)',
        'faint-ink': 'var(--faint-ink)',
        success: 'var(--success)',
        danger: 'var(--danger)',
        // Legacy shadcn-style aliases (mapped to the monochrome system)
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
      },
      fontSize: {
        caption: ['var(--text-caption)', { lineHeight: '1.5' }],
        label: ['var(--text-label)', { lineHeight: '1.4', fontWeight: '500' }],
        body: ['var(--text-body)', { lineHeight: '1.6' }],
        lead: ['var(--text-lead)', { lineHeight: '1.5' }],
        h3: ['var(--text-h3)', { lineHeight: '1.12', letterSpacing: '-0.01em' }],
        h2: ['var(--text-h2)', { lineHeight: '1.12', letterSpacing: '-0.02em' }],
        display: ['var(--text-display)', { lineHeight: '1.06', letterSpacing: '-0.025em' }],
      },
      spacing: {
        'section-tight': 'var(--section-y-tight)',
        'section-normal': 'var(--section-y-normal)',
        'section-loose': 'var(--section-y-loose)',
        gutter: 'var(--gutter)',
      },
      maxWidth: {
        page: 'var(--container-max)',
        measure: '68ch',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      transitionTimingFunction: {
        'out-expo': 'var(--ease-out-expo)',
        'out-quint': 'var(--ease-out-quint)',
      },
      boxShadow: {
        // ink-tinted, ≤8px blur; never pair with a 1px border on the same element
        card: '0 1px 2px oklch(0.205 0.012 110 / 0.06), 0 4px 8px oklch(0.205 0.012 110 / 0.05)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
} satisfies Config

export default config
