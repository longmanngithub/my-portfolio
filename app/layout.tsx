import type React from "react"
import type { Metadata, Viewport } from "next"
import { JetBrains_Mono, Poppins, Zalando_Sans_Expanded } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { PageTransition } from "@/components/page-transition"
import { siteConfig } from "@/lib/site"
import { PersonJsonLd, WebSiteJsonLd, ProfilePageJsonLd } from "@/components/json-ld"
import "@/styles/globals.css"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

// Neutral system-UI grotesque (closer to SF Pro's proportions than Archivo)
// at a real expanded-width cut — replaces the old SF Pro Expanded headlines.
// Next's font-metrics database has no override entry for this family, so
// automatic fallback-metric generation always fails with a build warning —
// disable it and supply a manual fallback stack instead.
const expandedDisplay = Zalando_Sans_Expanded({
  subsets: ["latin"],
  weight: "variable",
  variable: "--font-expanded-display",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["system-ui", "arial"],
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s | Henglong Loeung",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.socials.github }],
  generator: "Next.js",
  keywords: siteConfig.keywords as unknown as string[],
  referrer: "origin-when-cross-origin",
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/icon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: "Henglong Loeung Portfolio",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Henglong Loeung — Full-Stack & AI Software Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@longmanngithub",
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
  category: "technology",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  other: {
    "format-detection": "telephone=no",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${poppins.variable} ${expandedDisplay.variable}`}
      suppressHydrationWarning
    >
      <head>
        <PersonJsonLd />
        <WebSiteJsonLd />
        <ProfilePageJsonLd />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <PageTransition>{children}</PageTransition>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}

