import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "STEM-ArKH+ | Case Study | Henglong Loeung",
  description:
    "A Cambodian STEM project archive and hub for STEMEOC with semantic search and AI-readable public pages, led as Project Manager for a 13-engineer team.",
}

export default function StemArkhLayout({ children }: { children: React.ReactNode }) {
  return children
}
