import type { Metadata } from "next"
import { CaseStudyJsonLd } from "@/components/json-ld"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "STEM-ArKH+ | Case Study",
  description:
    "A Cambodian STEM project archive and hub for STEMEOC with semantic search and AI-readable public pages, led as Project Manager for a 13-engineer team.",
  alternates: {
    canonical: "/projects/stem-arkh",
  },
  openGraph: {
    type: "article",
    title: "STEM-ArKH+ | Case Study | Henglong Loeung",
    description:
      "A Cambodian STEM project archive and hub for STEMEOC with semantic search and AI-readable public pages, led as Project Manager for a 13-engineer team.",
    url: `${siteConfig.url}/projects/stem-arkh`,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "STEM-ArKH+ Case Study by Henglong Loeung",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "STEM-ArKH+ | Case Study",
    description:
      "A Cambodian STEM project archive with semantic search and AI-readable public pages.",
    images: [siteConfig.ogImage],
  },
}

export default function StemArkhLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CaseStudyJsonLd
        title="STEM-ArKH+"
        description="A Cambodian STEM project archive and hub for STEMEOC with semantic search and AI-readable public pages, led as Project Manager for a 13-engineer team."
        slug="stem-arkh"
        year="2026"
        technologies={["Go", "Next.js", "PostgreSQL", "Meilisearch", "Google Gemini"]}
      />
      {children}
    </>
  )
}
