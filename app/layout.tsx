import type React from "react"
import type { Metadata, Viewport } from "next"
import { JetBrains_Mono, Poppins, Zalando_Sans_Expanded } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { PageTransition } from "@/components/page-transition"
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
  title: "Henglong Loeung | Portfolio",
  description: "Year 3 Computer Science Student · Junior Software Engineer",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
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
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <PageTransition>{children}</PageTransition>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
