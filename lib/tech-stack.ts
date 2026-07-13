import * as Icons from "simple-icons"
import type { SimpleIcon } from "simple-icons"

export type Tech = {
  /** stable identity used as React key + DOM ref key */
  key: string
  /** simple-icons slug (single lowercase token) */
  slug: string
  /** display label shown under the carousel item */
  label: string
  /** relative size hint for the 3D cloud */
  size: number
}

/**
 * Single source of truth for the tech stack.
 * Both the 3D cloud tag and the auto-carousel render from this list,
 * so they can never drift out of sync.
 */
const RAW: Tech[] = [
  { key: "typescript", slug: "typescript", label: "TypeScript", size: 112 },
  { key: "javascript", slug: "javascript", label: "JavaScript", size: 110 },
  { key: "react", slug: "react", label: "React", size: 108 },
  { key: "next", slug: "nextdotjs", label: "Next.js", size: 104 },
  { key: "laravel", slug: "laravel", label: "Laravel", size: 108 },
  { key: "python", slug: "python", label: "Python", size: 108 },
  { key: "tailwind", slug: "tailwindcss", label: "Tailwind", size: 104 },
  { key: "html", slug: "html5", label: "HTML5", size: 104 },
  { key: "css", slug: "css3", label: "CSS3", size: 100 },
  { key: "node", slug: "nodedotjs", label: "Node.js", size: 102 },
  { key: "php", slug: "php", label: "PHP", size: 100 },
  { key: "vue", slug: "vuedotjs", label: "Vue.js", size: 100 },
  { key: "flutter", slug: "flutter", label: "Flutter", size: 98 },
  { key: "dart", slug: "dart", label: "Dart", size: 94 },
  { key: "docker", slug: "docker", label: "Docker", size: 102 },
  { key: "postgres", slug: "postgresql", label: "PostgreSQL", size: 102 },
  { key: "mysql", slug: "mysql", label: "MySQL", size: 100 },
  { key: "git", slug: "git", label: "Git", size: 100 },
  { key: "figma", slug: "figma", label: "Figma", size: 98 },
  { key: "digitalocean", slug: "digitalocean", label: "DigitalOcean", size: 96 },
  { key: "arduino", slug: "arduino", label: "Arduino / ESP32", size: 96 },
  { key: "linux", slug: "linux", label: "Linux", size: 96 },
  { key: "expo", slug: "expo", label: "Expo", size: 94 },
  { key: "go", slug: "go", label: "Go", size: 100 },
  { key: "redis", slug: "redis", label: "Redis", size: 98 },
  { key: "rabbitmq", slug: "rabbitmq", label: "RabbitMQ", size: 96 },
  { key: "kong", slug: "kong", label: "Kong", size: 94 },
  { key: "fastapi", slug: "fastapi", label: "FastAPI", size: 98 },
  { key: "mongodb", slug: "mongodb", label: "MongoDB", size: 98 },
  { key: "googlecloud", slug: "googlecloud", label: "Google Cloud", size: 96 },
  { key: "gemini", slug: "googlegemini", label: "Google Gemini", size: 98 },
  { key: "aws", slug: "amazon", label: "AWS", size: 94 },
  { key: "meilisearch", slug: "meilisearch", label: "Meilisearch", size: 92 },
]

/** Resolve a simple-icons record from a single-token slug. */
export function resolveIcon(slug: string): SimpleIcon | null {
  const exportName = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`
  return (Icons as unknown as Record<string, SimpleIcon | undefined>)[exportName] ?? null
}

/** Only techs whose brand icon actually resolves (guards against renamed slugs). */
export const TECH_STACK: Tech[] = RAW.filter((t) => resolveIcon(t.slug) !== null)
