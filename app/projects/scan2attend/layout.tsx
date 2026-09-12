import type { Metadata } from "next"
import { CaseStudyJsonLd } from "@/components/json-ld"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Scan2Attend | Case Study",
  description:
    "An IoT-powered classroom attendance system using ESP32, fingerprint biometric scanning, Laravel backend, and Nuxt.js frontend with offline SD-card queuing.",
  alternates: {
    canonical: "/projects/scan2attend",
  },
  openGraph: {
    type: "article",
    title: "Scan2Attend | Case Study | Henglong Loeung",
    description:
      "An IoT-powered classroom attendance system using ESP32, fingerprint scanning, Laravel backend, and Nuxt.js frontend.",
    url: `${siteConfig.url}/projects/scan2attend`,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Scan2Attend Case Study by Henglong Loeung",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scan2Attend | Case Study",
    description:
      "An IoT classroom attendance system with ESP32 biometric scanning and offline queuing.",
    images: [siteConfig.ogImage],
  },
}

export default function Scan2AttendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <CaseStudyJsonLd
        title="Scan2Attend"
        description="An IoT-powered classroom attendance system using ESP32, fingerprint scanning, Laravel backend, and Nuxt.js frontend at Paragon International University."
        slug="scan2attend"
        year="2025"
        technologies={["ESP32", "Laravel", "Nuxt.js", "PostgreSQL"]}
      />
      {children}
    </>
  )
}
