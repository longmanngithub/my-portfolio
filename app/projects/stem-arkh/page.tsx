"use client"

import {
  FloatingNav,
  ProjectHero,
  ProjectScreenshot,
  BentoVitals,
  InteractivePipeline,
  FeatureGrid,
  ChallengesGrid,
  AppleCodeViewer,
  ProjectCTA,
} from "@/components/project-details"
import { Reveal } from "@/components/reveal"
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"
import DataObjectIcon from "@mui/icons-material/DataObject"
import GroupsIcon from "@mui/icons-material/Groups"
import LayersIcon from "@mui/icons-material/Layers"
import ApiIcon from "@mui/icons-material/Api"
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart"

const techStack = [
  { name: "Go", category: "Backend" },
  { name: "Next.js", category: "Frontend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Meilisearch", category: "Search" },
  { name: "Google Gemini", category: "AI & Embeddings" },
  { name: "Kong", category: "API Gateway" },
]

const features = [
  "Metadata Tagging & Domain Filtering",
  "Contributor Roles & Recognition",
  "Semantic Search over Projects",
  "AI-Readable Public Pages",
  "Approval Workflow for Submissions",
  "Khmer Language Localization",
  "Admin Dashboard for Moderation",
  "Google OAuth Sign-In",
]

const howItWorks = [
  { step: "1", title: "Contributor Submits", description: "Students and educators upload project details, files, and metadata through the submission portal." },
  { step: "2", title: "Reviewer Approves", description: "Judges and admins review submissions before publishing, assigning domain and theme tags." },
  { step: "3", title: "System Indexes", description: "Approved projects are embedded with Gemini and indexed in Meilisearch for semantic search." },
  { step: "4", title: "Public Discovers", description: "Search engines, AI tools, and visitors browse the archive by topic, school, or event." },
]

const challenges = [
  {
    title: "Refactoring for Open Access",
    problem: "The prior platform prioritized security over visibility, rendering pages unreadable by search engines and AI tools.",
    solution: "Restructured the backend around open indexing and server-rendered public pages, without weakening access control for private data.",
    icon: AutoAwesomeIcon,
  },
  {
    title: "Inconsistent Legacy Data",
    problem: "Years of past STEMEOC projects existed in inconsistent, unstructured formats across different competitions.",
    solution: "Built a metadata schema and tagging framework, then ran a pilot archive upload to normalize historical projects.",
    icon: DataObjectIcon,
  },
  {
    title: "Contributor Engagement",
    problem: "Participants who didn't win a competition often left with no lasting record of their work.",
    solution: "Added a recognition module that publishes every contributor's profile and project, not just winners.",
    icon: GroupsIcon,
  },
]

const architectureComponents = [
  {
    title: "Next.js Frontend",
    description: "Public and admin panels built with Next.js, structured for server-side rendering so pages are crawlable by search engines and AI tools.",
    icon: LayersIcon,
  },
  {
    title: "Kong API Gateway",
    description: "Routes REST traffic, enforces RBAC, and rate-limits requests between the frontend and Go/FastAPI services.",
    icon: ApiIcon,
  },
  {
    title: "Search & AI Pipeline",
    description: "FastAPI integration layer generates Gemini embeddings and indexes them in Meilisearch with PostgreSQL pgvector for semantic search.",
    icon: AutoAwesomeIcon,
  },
  {
    title: "Observability & Config",
    description: "OpenTelemetry, Loki, and Prometheus provide live insight into submission, review, and indexing pipelines.",
    icon: MonitorHeartIcon,
  },
]

const semanticCode = `async def semantic_search(query: str, limit: int = 10) -> list[Project]:
    # Generate 768-dim dense embedding from query string
    embedding = await gemini.embed_content(query)

    # Hybrid vector search with BM25 keyword matching
    results = await meilisearch_client.index("projects").search(
        query,
        {
            "vector": embedding,
            "hybrid": {"semanticRatio": 0.7, "embedder": "gemini"},
            "limit": limit,
        },
    )

    return [Project.from_hit(hit) for hit in results.hits]`

export default function StemArkhCaseStudy() {
  return (
    <main className="min-h-screen bg-background pb-20">
      <FloatingNav
        title="STEM-ArKH+"
        year="2026"
      />

      <ProjectHero
        category="Case Study"
        year="2026"
        title="Where STEM Projects"
        titleAccent="Live On"
        description="A Cambodian STEM project archive and hub for STEMEOC, refactoring a closed competition platform into an open, AI-readable repository that recognizes every contributor, not just winners."
        glowColor="rgba(2, 132, 199, 0.22)"
        urlLabel="stem-arkh.stemeoc.org"
      >
        <ProjectScreenshot
          src="/stem-arkh_screenshot.png"
          alt="STEM-ArKH+ archive interface"
          priority
        />
      </ProjectHero>

      <Reveal>
        <BentoVitals
          role="Project Manager"
          roleDetail="Led 13-engineer cross-functional team"
          timeline="2025 – 2026"
          methodology="Agile Scrum · 4 Sprints"
          architecture="Semantic AI Search Hub"
          architectureDetail="Meilisearch, Gemini Embeddings, Go & Kong Gateway"
          techStack={techStack}
        />
      </Reveal>

      <Reveal>
        <InteractivePipeline
          sectionLabel="How It Works"
          title="Submission to Discovery"
          description="From student submission to real-time embedding, semantic indexing, and global open accessibility."
          steps={howItWorks}
        />
      </Reveal>

      <Reveal>
        <FeatureGrid
          sectionLabel="Capabilities"
          title="Platform Features"
          description="Engineered for open archival, bilingual access, and granular submission review workflows."
          features={features}
          columns={4}
        />
      </Reveal>

      <Reveal>
        <AppleCodeViewer
          sectionLabel="Implementation"
          title="Hybrid Semantic Search"
          description="Combining dense vector embeddings with lexical BM25 matching at a calibrated 0.7 semantic ratio."
          fileName="search/semantic.py"
          language="python"
          code={semanticCode}
        />
      </Reveal>

      <Reveal>
        <ChallengesGrid
          sectionLabel="Engineering Deep Dive"
          title="Challenges & Architectural Solutions"
          description="Overcoming open indexing trade-offs, legacy data normalization, and contributor retention."
          challenges={challenges}
        />
      </Reveal>

      <Reveal>
        <FeatureGrid
          sectionLabel="Architecture"
          title="System Overview"
          description="Microservice architecture optimized for SEO crawlability, high ingestion throughput, and low search latency."
          features={architectureComponents}
          columns={4}
        />
      </Reveal>

      <Reveal>
        <ProjectCTA />
      </Reveal>
    </main>
  )
}
