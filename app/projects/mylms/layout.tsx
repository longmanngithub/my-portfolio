import type { Metadata } from "next"
import { CaseStudyJsonLd } from "@/components/json-ld"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "MyLMS | Case Study",
  description:
    "A microservice-based learning management system for Paragon International University's English Preparatory Program, led as Project Manager for a 10-engineer team.",
  alternates: {
    canonical: "/projects/mylms",
  },
  openGraph: {
    type: "article",
    title: "MyLMS | Case Study | Henglong Loeung",
    description:
      "A microservice-based learning management system for Paragon International University's English Preparatory Program, led as Project Manager for a 10-engineer team.",
    url: `${siteConfig.url}/projects/mylms`,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "MyLMS Case Study by Henglong Loeung",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MyLMS | Case Study",
    description:
      "A microservice-based learning management system for Paragon International University's English Preparatory Program.",
    images: [siteConfig.ogImage],
  },
}

export default function MyLmsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CaseStudyJsonLd
        title="MyLMS"
        description="A microservice-based learning management system for Paragon International University's English Preparatory Program, led as Project Manager for a 10-engineer team."
        slug="mylms"
        year="2026"
        technologies={["Go", "Next.js", "PostgreSQL", "Redis", "RabbitMQ", "Kong"]}
      />
      {children}
    </>
  )
}
