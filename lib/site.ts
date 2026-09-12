const FALLBACK_SITE_URL = "https://henglongloeung.vercel.app"

/**
 * Returns the absolute base URL for the site.
 * Prioritizes explicitly set NEXT_PUBLIC_SITE_URL, then Vercel production system variables,
 * and defaults to https://henglongloeung.vercel.app.
 */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  return FALLBACK_SITE_URL
}

export const siteConfig = {
  name: "Henglong Loeung",
  role: "Full-Stack & AI Software Engineer · Project Manager",
  title: "Henglong Loeung | Full-Stack & AI Software Engineer",
  description:
    "Portfolio of Henglong Loeung — Software Engineer & Project Manager specializing in scalable full-stack architectures, microservices, and AI-powered systems.",
  url: getSiteUrl(),
  ogImage: "/opengraph-image",
  email: "henglong0000@gmail.com",
  location: "Phnom Penh, Cambodia",
  university: "Paragon International University",
  socials: {
    github: "https://github.com/longmanngithub",
    linkedin: "https://linkedin.com/in/henglong-loeung-38040b231",
    telegram: "https://t.me/LongFromTelegram",
  },
  keywords: [
    "Henglong Loeung",
    "Henglong",
    "Loeung Henglong",
    "Software Engineer Portfolio",
    "Full-Stack Developer",
    "AI Software Engineer",
    "Project Manager",
    "Tech Lead",
    "Next.js Developer",
    "Go Engineer",
    "Python Developer",
    "Microservices Architecture",
    "Paragon International University",
    "Cambodia Software Engineer",
    "MyLMS",
    "STEM-ArKH+",
    "Bedrock AI Travel Concierge",
    "RAG AI Search",
    "EcoInventory",
    "Scan2Attend",
  ],
} as const
