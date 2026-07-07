import type { Metadata, Viewport } from "next"
import { Suspense } from "react"
import { Poppins, Lora } from "next/font/google"
import "./globals.css"
import { SegmentProvider } from "@/providers/segment-provider"
import { MotionProvider } from "@/providers/motion-provider"
import { CookieBanner } from "@/components/cookie-banner"
import { ConsentInitializer } from "@/components/consent-initializer"
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  TWITTER_HANDLE,
} from "@/lib/seo"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

const lora = Lora({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-lora",
})

const DEFAULT_TITLE =
  "Sistema de Agendamento para Barbearia | WhatsApp + IA - Flowo"
const DEFAULT_DESCRIPTION =
  "Software de agendamento para barbearias: a IA atende no WhatsApp, agenda e confirma seus clientes. Lembretes automáticos e pagamento do atendimento por PIX ou cartão."

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "agendamento barbearia",
    "sistema barbearia",
    "whatsapp barbearia",
    "agenda barbearia",
    "gestão barbearia",
    "software barbearia",
    "lembrete agendamento",
    "reduzir faltas barbearia",
  ],
  openGraph: {
    title: `${SITE_NAME} | Sistema de Agendamento para Barbearia via WhatsApp`,
    description:
      "A IA atende no WhatsApp, agenda e confirma seus clientes. Lembretes automáticos contra faltas e pagamento do atendimento por PIX ou cartão.",
    url: SITE_URL,
    type: "website",
    locale: "pt_BR",
    siteName: SITE_NAME,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Flowo - Sistema de Agendamento para Barbearia via WhatsApp com IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Sistema de Agendamento para Barbearia`,
    description:
      "Agendamento no WhatsApp com IA, lembretes automáticos e pagamento do atendimento por PIX ou cartão.",
    creator: TWITTER_HANDLE,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f8f6f2",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} ${lora.variable}`}>
      <head>
        {/* Google Consent Mode v2 - Initialize BEFORE any tracking scripts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'analytics_storage': 'denied',
                'functionality_storage': 'granted',
                'personalization_storage': 'denied',
                'security_storage': 'granted',
                'wait_for_update': 500
              });
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:inline-flex focus:items-center focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:text-label focus:font-medium focus:text-cream"
        >
          Pular para o conteúdo principal
        </a>
        <ConsentInitializer />
        <MotionProvider>
          <Suspense fallback={null}>
            <SegmentProvider writeKey={process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY}>
              {children}
            </SegmentProvider>
          </Suspense>
        </MotionProvider>
        <CookieBanner />
      </body>
    </html>
  )
}
