"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import GitHubIcon from "@mui/icons-material/GitHub"
import NorthEastIcon from "@mui/icons-material/NorthEast"
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined"
import FingerprintIcon from "@mui/icons-material/Fingerprint"
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined"
import HubOutlinedIcon from "@mui/icons-material/HubOutlined"
import TravelExploreIcon from "@mui/icons-material/TravelExplore"
import type { SvgIconComponent } from "@mui/icons-material"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { assetUrl } from "@/lib/assets"

type Project = {
  title: string
  description: string
  tech: string[]
  year: string
  icon: SvgIconComponent
  /** Optional app logo (served via R2 through assetUrl(); falls back to /public). Overrides `icon` when present. */
  logo?: string
  github?: string
  caseStudy: string
}

const projects: Project[] = [
  {
    title: "MyLMS",
    description:
      "Learning management system for Paragon International University's English Preparatory Program. Led a 10-engineer team building a microservice platform with flexible self-paced and lecturer-controlled progression.",
    tech: ["Go", "Next.js", "PostgreSQL", "Redis", "RabbitMQ", "Kong"],
    year: "2026",
    icon: SchoolOutlinedIcon,
    logo: "/logos/mylms.png",
    caseStudy: "/projects/mylms",
  },
  {
    title: "STEM-ArKH+",
    description:
      "A Cambodian STEM project archive and hub for STEMEOC. Led a 13-engineer team building a searchable, AI-readable repository with semantic search over student and educator projects.",
    tech: ["Go", "Next.js", "PostgreSQL", "Meilisearch", "Google Gemini"],
    year: "2026",
    icon: HubOutlinedIcon,
    logo: "/logos/stem-arkh.png",
    caseStudy: "/projects/stem-arkh",
  },
  {
    title: "Bedrock - AI Travel Concierge",
    description:
      "A multi-agent AI travel planner. Seven CrewAI agents collaborate through orchestration to research, budget, and craft a grounded, personalized itinerary from a single conversation.",
    tech: ["Python", "CrewAI", "Next.js", "PostgreSQL", "Google Gemini"],
    year: "2026",
    icon: TravelExploreIcon,
    logo: "/logos/bedrock-travel-concierge.png",
    github: "https://github.com/longmanngithub/Bedrock-AI-Travel-Concierge",
    caseStudy: "/projects/bedrock-travel-concierge",
  },
  {
    title: "RAG-Based AI Search System",
    description:
      "Retrieval-Augmented Generation search engine over 23 AI/ML research papers — answers are grounded in and cited from the actual papers, with visible sources and similarity scores.",
    tech: ["Python", "Streamlit", "LangChain", "FAISS", "Gemini API"],
    year: "2026",
    icon: SearchOutlinedIcon,
    logo: "/logos/rag-search.png",
    github: "https://github.com/longmanngithub/RAG-Based-AI-Search-System",
    caseStudy: "/projects/rag-search",
  },
  {
    title: "EcoInventory",
    description:
      "E-commerce inventory management system built with Laravel for frontend and backend, using a central API as the single source of truth.",
    tech: ["Laravel", "Alpine.js", "Tailwind CSS", "MySQL"],
    year: "2025",
    icon: Inventory2OutlinedIcon,
    logo: "/logos/ecoinventory.png",
    github:
      "https://github.com/longmanngithub/E-Commerce-Inventory-Management-System-Using-Laravel",
    caseStudy: "/projects/ecoinventory",
  },
  {
    title: "Scan2Attend",
    description:
      "IoT classroom attendance system using ESP32 and fingerprint scanning, synced to a Laravel backend with offline SD-card queuing.",
    tech: ["ESP32", "Laravel", "Nuxt.js", "PostgreSQL"],
    year: "2025",
    icon: FingerprintIcon,
    logo: "/logos/scan2attend.png",
    github: "https://github.com/longmanngithub/Scan2Attend-esp",
    caseStudy: "/projects/scan2attend",
  },
  {
    title: "NotePad",
    description:
      "My very first project — a Windows Notepad replica built with Python and PyQt5 in late 2023, before university. Where the journey began.",
    tech: ["Python", "PyQt5", "Qt Designer"],
    year: "2023",
    icon: DescriptionOutlinedIcon,
    logo: "/logos/notepad.png",
    github: "https://github.com/longmanngithub/NotePad",
    caseStudy: "/projects/notepad",
  },
]

/** Renders the app logo when available, falling back to the MUI icon if
 *  the logo file is missing or hasn't been added to /public yet. */
function ProjectLogo({ project }: { project: Project }) {
  const [errored, setErrored] = useState(false)
  const Icon = project.icon
  const showLogo = project.logo && !errored

  return (
    <div
      className={cn(
        "grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-xl text-primary",
        !showLogo && "bg-secondary"
      )}
    >
      {showLogo ? (
        <Image
          src={assetUrl(project.logo!)}
          alt={`${project.title} logo`}
          width={56}
          height={56}
          className="h-full w-full object-contain"
          onError={() => setErrored(true)}
        />
      ) : (
        <Icon style={{ fontSize: 24 }} />
      )}
    </div>
  )
}

export function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-28">
      <h2 className="section-label mb-6">Recent Projects</h2>

      <div className="space-y-4">
        {projects.map((project) => {
          return (
            <article
              key={project.title}
              className="group flex gap-5 rounded-2xl border border-border bg-card p-5 glow-cyan-hover"
            >
              <ProjectLogo project={project} />

              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                    {project.title}
                  </h3>
                  <span className="shrink-0 font-mono text-xs text-muted-foreground/70">
                    {project.year}
                  </span>
                </div>

                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-primary/25 bg-primary/5 px-2.5 py-0.5 text-xs text-primary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-2">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 gap-1.5 border-border bg-transparent text-xs text-foreground hover:border-primary/50 hover:text-primary"
                      >
                        <GitHubIcon style={{ fontSize: 15 }} /> Code
                      </Button>
                    </a>
                  )}
                  <Link href={project.caseStudy}>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 gap-1 text-xs text-primary hover:bg-primary/10 hover:text-primary"
                    >
                      Case Study <NorthEastIcon style={{ fontSize: 15 }} />
                    </Button>
                  </Link>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
