import type { MetadataRoute } from "next"
import { getSiteUrl } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl()
  const now = new Date()

  const routes = [
    {
      path: "",
      priority: 1.0,
      changeFrequency: "weekly" as const,
    },
    {
      path: "/projects/mylms",
      priority: 0.85,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/projects/stem-arkh",
      priority: 0.85,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/projects/bedrock-travel-concierge",
      priority: 0.85,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/projects/rag-search",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/projects/ecoinventory",
      priority: 0.75,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/projects/scan2attend",
      priority: 0.75,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/projects/notepad",
      priority: 0.7,
      changeFrequency: "monthly" as const,
    },
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
