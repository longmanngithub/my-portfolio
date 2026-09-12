import type { Metadata } from "next"
import { CaseStudyJsonLd } from "@/components/json-ld"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "RAG-Based AI Search System | Case Study",
  description:
    "Retrieval-Augmented Generation search engine over 23 AI/ML research papers with vector citations, grounded answers, similarity scores, and FAISS indexing.",
  alternates: {
    canonical: "/projects/rag-search",
  },
  openGraph: {
    type: "article",
    title: "RAG-Based AI Search System | Case Study | Henglong Loeung",
    description:
      "Retrieval-Augmented Generation search engine over 23 AI/ML research papers with vector citations, grounded answers, and FAISS similarity scoring.",
    url: `${siteConfig.url}/projects/rag-search`,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "RAG-Based AI Search System Case Study by Henglong Loeung",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RAG-Based AI Search System | Case Study",
    description:
      "Retrieval-Augmented Generation search engine with FAISS vector search and Gemini API citations.",
    images: [siteConfig.ogImage],
  },
}

export default function RagSearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <CaseStudyJsonLd
        title="RAG-Based AI Search System"
        description="Retrieval-Augmented Generation search engine over 23 AI/ML research papers with vector citations and FAISS similarity scoring."
        slug="rag-search"
        year="2026"
        technologies={["Python", "Streamlit", "LangChain", "FAISS", "Gemini API"]}
        githubUrl="https://github.com/longmanngithub/RAG-Based-AI-Search-System"
      />
      {children}
    </>
  )
}
