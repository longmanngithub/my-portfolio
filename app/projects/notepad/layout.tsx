import type { Metadata } from "next"
import { CaseStudyJsonLd } from "@/components/json-ld"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "NotePad | Case Study",
  description:
    "A Windows Notepad replica built with Python and PyQt5 in late 2023 — where Henglong Loeung's Computer Science journey began.",
  alternates: {
    canonical: "/projects/notepad",
  },
  openGraph: {
    type: "article",
    title: "NotePad | Case Study | Henglong Loeung",
    description:
      "A Windows Notepad replica built with Python and PyQt5 in late 2023 — where Henglong Loeung's Computer Science journey began.",
    url: `${siteConfig.url}/projects/notepad`,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "NotePad Project Case Study by Henglong Loeung",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NotePad | Case Study",
    description: "Windows Notepad replica built with Python and PyQt5.",
    images: [siteConfig.ogImage],
  },
}

export default function NotepadLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <CaseStudyJsonLd
        title="NotePad"
        description="A Windows Notepad replica built with Python and PyQt5 in late 2023, before university."
        slug="notepad"
        year="2023"
        technologies={["Python", "PyQt5"]}
      />
      {children}
    </>
  )
}
