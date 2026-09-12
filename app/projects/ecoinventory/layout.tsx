import type { Metadata } from "next"
import { CaseStudyJsonLd } from "@/components/json-ld"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "EcoInventory | Case Study",
  description:
    "E-Commerce inventory management system built with Laravel for frontend and backend, using a central REST API as the single source of truth.",
  alternates: {
    canonical: "/projects/ecoinventory",
  },
  openGraph: {
    type: "article",
    title: "EcoInventory | Case Study | Henglong Loeung",
    description:
      "E-Commerce inventory management system built with Laravel for frontend and backend, using a central REST API as the single source of truth.",
    url: `${siteConfig.url}/projects/ecoinventory`,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "EcoInventory Case Study by Henglong Loeung",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EcoInventory | Case Study",
    description:
      "E-Commerce inventory management system built with Laravel using a central REST API.",
    images: [siteConfig.ogImage],
  },
}

export default function EcoInventoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <CaseStudyJsonLd
        title="EcoInventory"
        description="E-Commerce inventory management system built using Laravel for frontend and backend using API as a central system."
        slug="ecoinventory"
        year="2025"
        technologies={["Laravel", "Alpine.js", "Tailwind CSS", "MySQL"]}
        githubUrl="https://github.com/longmanngithub/E-Commerce-Inventory-Management-System-Using-Laravel"
      />
      {children}
    </>
  )
}
