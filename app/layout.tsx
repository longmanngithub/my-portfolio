import type React from "react"
import type { Metadata, Viewport } from "next"
import { JetBrains_Mono, Kantumruy_Pro } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/lib/language-context"
import { MusicProvider } from "@/lib/music-context"
import "@/styles/globals.css"

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-jetbrains",
})

// Khmer font - Kantumruy Pro
const kantumruyPro = Kantumruy_Pro({ 
  weight: ["400", "500", "600", "700"],
  subsets: ["khmer", "latin"],
  variable: "--font-khmer",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: "Henglong Loeung | Portfolio",
  description: "Year 3 Computer Science Student · Web & Mobile Developer",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  other: {
    'format-detection': 'telephone=no',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${jetbrainsMono.variable} ${kantumruyPro.variable}`}>
      <head>
      </head>
      <body className={`font-mono antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <LanguageProvider>
            <MusicProvider>
              {children}
            </MusicProvider>
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
