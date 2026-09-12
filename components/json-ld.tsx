import { siteConfig } from "@/lib/site"

export function PersonJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.url}/#person`,
    name: siteConfig.name,
    alternateName: ["Henglong", "Loeung Henglong"],
    jobTitle: "Software Engineer & Project Manager",
    description: siteConfig.description,
    url: siteConfig.url,
    image: `${siteConfig.url}/profile.png`,
    email: `mailto:${siteConfig.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Phnom Penh",
      addressCountry: "Cambodia",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: siteConfig.university,
      url: "https://www.paragoniu.edu.kh",
    },
    sameAs: [
      siteConfig.socials.github,
      siteConfig.socials.linkedin,
      siteConfig.socials.telegram,
    ],
    knowsAbout: [
      "Software Engineering",
      "Full-Stack Development",
      "Microservice Architecture",
      "Artificial Intelligence",
      "Retrieval-Augmented Generation (RAG)",
      "Next.js",
      "React",
      "TypeScript",
      "Go (Golang)",
      "Python",
      "PostgreSQL",
      "Redis",
      "RabbitMQ",
      "Docker",
      "Internet of Things (IoT)",
      "Agile Project Management",
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.title,
    alternateName: "Henglong Loeung Portfolio",
    url: siteConfig.url,
    description: siteConfig.description,
    author: {
      "@id": `${siteConfig.url}/#person`,
    },
    inLanguage: "en-US",
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function ProfilePageJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${siteConfig.url}/#profilepage`,
    url: siteConfig.url,
    name: siteConfig.title,
    isPartOf: {
      "@id": `${siteConfig.url}/#website`,
    },
    about: {
      "@id": `${siteConfig.url}/#person`,
    },
    mainEntity: {
      "@id": `${siteConfig.url}/#person`,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface CaseStudyJsonLdProps {
  title: string
  description: string
  slug: string
  year?: string
  technologies?: string[]
  githubUrl?: string
}

export function CaseStudyJsonLd({
  title,
  description,
  slug,
  year = "2026",
  technologies = [],
  githubUrl,
}: CaseStudyJsonLdProps) {
  const pageUrl = `${siteConfig.url}/projects/${slug}`

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: `${siteConfig.url}/#projects`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: pageUrl,
      },
    ],
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${pageUrl}/#article`,
    headline: `${title} — Case Study by Henglong Loeung`,
    description,
    url: pageUrl,
    datePublished: `${year}-01-01`,
    inLanguage: "en-US",
    author: {
      "@id": `${siteConfig.url}/#person`,
    },
    keywords: technologies.join(", "),
    about: technologies.map((t) => ({
      "@type": "Thing",
      name: t,
    })),
    mainEntityOfPage: pageUrl,
  }

  const softwareSchema = githubUrl
    ? {
        "@context": "https://schema.org",
        "@type": "SoftwareSourceCode",
        name: title,
        description,
        codeRepository: githubUrl,
        programmingLanguage: technologies,
        author: {
          "@id": `${siteConfig.url}/#person`,
        },
      }
    : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {softwareSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
      )}
    </>
  )
}
