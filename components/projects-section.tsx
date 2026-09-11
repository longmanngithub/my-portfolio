"use client"

import { useRef, useState } from "react"
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "motion/react"
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined"
import FingerprintIcon from "@mui/icons-material/Fingerprint"
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined"
import HubOutlinedIcon from "@mui/icons-material/HubOutlined"
import TravelExploreIcon from "@mui/icons-material/TravelExplore"
import GitHubIcon from "@mui/icons-material/GitHub"
import NorthEastIcon from "@mui/icons-material/NorthEast"
import type { SvgIconComponent } from "@mui/icons-material"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { assetUrl } from "@/lib/assets"

type Project = {
  title: string
  shortTitle: string
  tagline: string
  description: string
  tech: string[]
  year: string
  icon: SvgIconComponent
  /** App logo, served via R2 through assetUrl(). Falls back to `icon`. */
  logo?: string
  github?: string
  caseStudy: string
  glowColor: string
}

const projects: Project[] = [
  {
    title: "MyLMS",
    shortTitle: "MyLMS",
    tagline: "Learning management platform · Led 10-engineer team",
    description:
      "Learning management system for Paragon International University's English Preparatory Program. Led a 10-engineer team building a microservice platform with flexible self-paced and lecturer-controlled progression.",
    tech: ["Go", "Next.js", "PostgreSQL", "Redis", "RabbitMQ", "Kong"],
    year: "2026",
    icon: SchoolOutlinedIcon,
    logo: "/logos/mylms.png",
    caseStudy: "/projects/mylms",
    glowColor: "rgba(15, 143, 143, 0.22)",
  },
  {
    title: "STEM-ArKH+",
    shortTitle: "STEM-ArKH+",
    tagline: "Cambodian STEM archive · Led 13-engineer team · AI search",
    description:
      "A Cambodian STEM project archive and hub for STEMEOC. Led a 13-engineer team building a searchable, AI-readable repository with semantic search over student and educator projects.",
    tech: ["Go", "Next.js", "PostgreSQL", "Meilisearch", "Google Gemini"],
    year: "2026",
    icon: HubOutlinedIcon,
    logo: "/logos/stem-arkh.png",
    caseStudy: "/projects/stem-arkh",
    glowColor: "rgba(2, 132, 199, 0.22)",
  },
  {
    title: "Bedrock - AI Travel Concierge",
    shortTitle: "Bedrock",
    tagline: "Autonomous travel planner · 7 CrewAI agents orchestrated",
    description:
      "A multi-agent AI travel planner. Seven CrewAI agents collaborate through orchestration to research, budget, and craft a grounded, personalized itinerary from a single conversation.",
    tech: ["Python", "CrewAI", "Next.js", "PostgreSQL", "Google Gemini"],
    year: "2026",
    icon: TravelExploreIcon,
    logo: "/logos/bedrock-travel-concierge.png",
    github: "https://github.com/longmanngithub/Bedrock-AI-Travel-Concierge",
    caseStudy: "/projects/bedrock-travel-concierge",
    glowColor: "rgba(139, 92, 246, 0.22)",
  },
  {
    title: "RAG-Based AI Search System",
    shortTitle: "RAG Search",
    tagline: "Vector citations & grounded answers over 23 research papers",
    description:
      "Retrieval-Augmented Generation search engine over 23 AI/ML research papers — answers are grounded in and cited from the actual papers, with visible sources and similarity scores.",
    tech: ["Python", "Streamlit", "LangChain", "FAISS", "Gemini API"],
    year: "2026",
    icon: SearchOutlinedIcon,
    logo: "/logos/rag-search.png",
    github: "https://github.com/longmanngithub/RAG-Based-AI-Search-System",
    caseStudy: "/projects/rag-search",
    glowColor: "rgba(16, 185, 129, 0.22)",
  },
  {
    title: "EcoInventory",
    shortTitle: "EcoInventory",
    tagline: "Centralized inventory API with single-source-of-truth design",
    description:
      "E-commerce inventory management system built with Laravel for frontend and backend, using a central API as the single source of truth.",
    tech: ["Laravel", "Alpine.js", "Tailwind CSS", "MySQL"],
    year: "2025",
    icon: Inventory2OutlinedIcon,
    logo: "/logos/ecoinventory.png",
    github:
      "https://github.com/longmanngithub/E-Commerce-Inventory-Management-System-Using-Laravel",
    caseStudy: "/projects/ecoinventory",
    glowColor: "rgba(245, 158, 11, 0.22)",
  },
  {
    title: "Scan2Attend",
    shortTitle: "Scan2Attend",
    tagline: "IoT ESP32 biometric attendance with offline SD-card queuing",
    description:
      "IoT classroom attendance system using ESP32 and fingerprint scanning, synced to a Laravel backend with offline SD-card queuing.",
    tech: ["ESP32", "Laravel", "Nuxt.js", "PostgreSQL"],
    year: "2025",
    icon: FingerprintIcon,
    logo: "/logos/scan2attend.svg",
    github: "https://github.com/longmanngithub/Scan2Attend-esp",
    caseStudy: "/projects/scan2attend",
    glowColor: "rgba(20, 184, 166, 0.22)",
  },
  {
    title: "NotePad",
    shortTitle: "NotePad",
    tagline: "The origin · Windows Notepad replica built in Python & PyQt5 (2023)",
    description:
      "My very first project — a Windows Notepad replica built with Python and PyQt5 in late 2023, before university. Where the journey began.",
    tech: ["Python", "PyQt5", "Qt Designer"],
    year: "2023",
    icon: DescriptionOutlinedIcon,
    logo: "/logos/notepad.png",
    github: "https://github.com/longmanngithub/NotePad",
    caseStudy: "/projects/notepad",
    glowColor: "rgba(100, 116, 139, 0.22)",
  },
]

/* ---------------------------------------------------------------------------
 * Scroll Dwell Buffer Constants (SKILL.md §16 - Simplicity & Deliberate Craft)
 * Provides dedicated reading dwell time on Card 0 (start) and Card 6 (end)
 * so visitors comfortably comprehend the first and final projects.
 * ------------------------------------------------------------------------- */
const START_BUFFER = 0.14 // First 14% of track: Card 0 stationary
const END_BUFFER = 0.14 // Final 14% of track: Card 6 stationary
const ACTIVE_SPAN = 1 - START_BUFFER - END_BUFFER // 72% active card transitions

/** Maps raw scroll progress (0..1) through the start and end dwell buffers */
function mapScrollToCardProgress(p: number, total: number): number {
  if (p <= START_BUFFER) return 0
  if (p >= 1 - END_BUFFER) return total - 1
  const normalized = (p - START_BUFFER) / ACTIVE_SPAN
  return normalized * (total - 1)
}

/** Logo panel. No screenshots by design: each card is identified by its app
 *  logo shown large on a tinted, textured cover.
 *
 *  Sources are tried in order: the R2 asset host first, then the same path from
 *  /public for files that were never uploaded to R2, then the project's icon.
 *  Without the local step, any logo missing from the bucket silently degrades
 *  to an icon even though the file is sitting right there in the repo. */
function ProjectLogoMedia({
  project,
  size,
  isActive,
}: {
  project: Project
  size: "mobile" | "desktop"
  isActive: boolean
}) {
  const [sourceIndex, setSourceIndex] = useState(0)
  const Icon = project.icon

  const sources = project.logo
    ? Array.from(new Set([assetUrl(project.logo), project.logo]))
    : []
  const logoSrc = sources[sourceIndex]

  // Solid/square app icons (like MyLMS) render as Apple squircles with smooth rounded corners
  const isSquircle = project.title === "MyLMS" || project.logo?.includes("mylms")

  const dimClasses =
    size === "mobile"
      ? "h-14 w-14 min-w-[56px]"
      : "h-24 w-24 sm:h-28 sm:w-28"

  const squircleRadius =
    size === "mobile"
      ? "rounded-[1.1rem]"
      : "rounded-[1.4rem] sm:rounded-[1.6rem]"

  return (
    <div
      className={cn(
        "shrink-0 flex items-center justify-center transition-opacity duration-200",
        !isActive && "opacity-0"
      )}
    >
      {logoSrc ? (
        <Image
          key={logoSrc}
          src={logoSrc}
          alt={`${project.title} logo`}
          width={size === "mobile" ? 64 : 128}
          height={size === "mobile" ? 64 : 128}
          className={cn(
            dimClasses,
            "object-contain transition-transform duration-300 group-hover:scale-105 select-none",
            isSquircle && cn(squircleRadius, "overflow-hidden")
          )}
          onError={() => setSourceIndex((i) => i + 1)}
        />
      ) : (
        <span
          className={cn(
            dimClasses,
            "grid place-items-center text-primary transition-transform duration-300 group-hover:scale-105"
          )}
        >
          <Icon className={size === "mobile" ? "text-[32px]" : "text-[44px] sm:text-[52px]"} />
        </span>
      )}
    </div>
  )
}

/** One card face in the deck. Only the front card exposes real links; the cards
 *  behind render their actions as inert text so a click selects the card
 *  instead of navigating somewhere the visitor cannot fully see yet. */
function ProjectCard({
  project,
  isActive,
}: {
  project: Project
  isActive: boolean
}) {
  return (
    <div
      className={cn(
        "group relative flex h-full w-full flex-col sm:flex-row overflow-hidden rounded-[2rem] bg-card text-left transition-all duration-300",
        "border",
        isActive
          ? "border-black/[0.08] dark:border-white/[0.12] shadow-[0_16px_40px_-12px_rgba(0,0,0,0.08),0_4px_16px_-4px_rgba(0,0,0,0.04)] dark:shadow-[0_24px_50px_-12px_rgba(0,0,0,0.8)]"
          : "border-black/[0.04] dark:border-white/[0.06] shadow-[0_6px_20px_-6px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_24px_-8px_rgba(0,0,0,0.5)]",
        "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:z-10 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/70 dark:before:via-white/20 before:to-transparent"
      )}
    >
      {/* Desktop media column (hidden on mobile) */}
      <div className="hidden sm:flex sm:w-[28%] sm:h-full shrink-0 items-center justify-center p-6 bg-transparent">
        <ProjectLogoMedia project={project} size="desktop" isActive={isActive} />
      </div>

      {/* Main Content Area */}
      <div className="flex min-w-0 flex-1 flex-col justify-between p-5 sm:p-7">
        <div>
          {/* Mobile Header: App Icon + Title + Year side-by-side */}
          <div className="flex items-center gap-3.5 sm:hidden mb-2.5">
            <ProjectLogoMedia project={project} size="mobile" isActive={isActive} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="rounded-full bg-secondary/80 dark:bg-secondary/60 px-2.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground border border-black/[0.04] dark:border-white/[0.06]">
                  {project.year}
                </span>
              </div>
              <h3
                className={cn(
                  "font-display text-lg font-bold leading-tight tracking-tight transition-colors duration-300",
                  isActive ? "text-primary" : "text-foreground"
                )}
              >
                {project.title}
              </h3>
            </div>
          </div>

          {/* Desktop Header: Year + Title (hidden on mobile) */}
          <div className="hidden sm:block min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="rounded-full bg-secondary/80 dark:bg-secondary/60 px-2.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground border border-black/[0.04] dark:border-white/[0.06]">
                {project.year}
              </span>
            </div>

            <h3
              className={cn(
                "font-display text-xl md:text-2xl font-bold leading-tight tracking-tight transition-colors duration-300",
                isActive ? "text-primary" : "text-foreground"
              )}
            >
              {project.title}
            </h3>
          </div>

          <p className="mt-1 sm:mt-2 line-clamp-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        </div>

        <div className="pt-2.5 sm:pt-3">
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {project.tech.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-secondary/80 dark:bg-secondary/50 px-2.5 py-0.5 text-[11px] font-mono font-medium leading-normal text-muted-foreground border border-black/[0.04] dark:border-white/[0.06]"
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="rounded-full bg-secondary/50 dark:bg-secondary/30 px-2 py-0.5 text-[10px] font-mono font-medium text-muted-foreground/70 border border-black/[0.03] dark:border-white/[0.05]">
                +{project.tech.length - 4}
              </span>
            )}
          </div>

          <div className="mt-3.5 sm:mt-4 flex shrink-0 items-center gap-2.5">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={isActive ? 0 : -1}
                className={cn(
                  "inline-flex h-9 sm:h-10 items-center gap-1.5 rounded-full px-3.5 sm:px-4 text-xs sm:text-sm font-medium text-foreground bg-secondary/80 hover:bg-secondary border border-black/[0.06] dark:border-white/[0.08] transition-all active:scale-95",
                  !isActive && "opacity-0 pointer-events-none"
                )}
                aria-label="View source code on GitHub"
              >
                <GitHubIcon style={{ fontSize: 14 }} /> Code
              </a>
            )}

            <Link
              href={project.caseStudy}
              tabIndex={isActive ? 0 : -1}
              className={cn(
                "group/cta inline-flex h-9 sm:h-10 items-center gap-1.5 rounded-full bg-primary px-4.5 sm:px-5 text-xs sm:text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 outline-none transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-95",
                !isActive && "opacity-0 pointer-events-none"
              )}
            >
              Case Study
              <NorthEastIcon
                style={{ fontSize: 13 }}
                className="transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------------------
 * Card Time Machine Geometry (WWDC Fluid Interfaces & Spatial Depth)
 * Initial state physics elevated with continuous spring scroll synchronization.
 * Stacked cards spread out with generous lift, centered vertically in the stage,
 * and past cards fly dramatically forward toward the viewer and drop out of frame.
 * ------------------------------------------------------------------------- */
const DEPTH_STEP = 110 // z gap between stacked cards
const LIFT_STEP = 22 // vertical peek of each card behind the front one
const PAST_Z = 360 // dramatic 3D forward fly-by toward the camera
const PAST_Y = 480 // sweeps down and drops out of the stage bottom
const PAST_ROTATEX = -22 // forward card tilt as it drops
const PERSPECTIVE = 1200 // perspective depth

function StackedProjectCard({
  project,
  index,
  smoothProgress,
  total,
  activeIndex,
  prefersReducedMotion,
}: {
  project: Project
  index: number
  smoothProgress: MotionValue<number>
  total: number
  activeIndex: number
  prefersReducedMotion: boolean | null
}) {
  const isActive = activeIndex === index

  // z depth: past card flies toward viewer (PAST_Z); waiting cards step back into 3D space
  const z = useTransform(smoothProgress, (p) => {
    if (prefersReducedMotion) return 0
    const current = mapScrollToCardProgress(p, total)
    const offset = index - current
    if (offset < 0) {
      const past = Math.min(1.2, Math.abs(offset))
      return past * PAST_Z
    }
    const clamped = Math.min(offset, 4)
    return -clamped * DEPTH_STEP
  })

  // y translation: past card drops cleanly down out of frame (PAST_Y); waiting cards spread upward with generous lift
  const y = useTransform(smoothProgress, (p) => {
    if (prefersReducedMotion) return 0
    const current = mapScrollToCardProgress(p, total)
    const offset = index - current
    if (offset < 0) {
      const past = Math.min(1.2, Math.abs(offset))
      return past * PAST_Y
    }
    const clamped = Math.min(offset, 4)
    return -clamped * LIFT_STEP
  })

  // 3D tilt: past card tilts forward as it falls; waiting cards tilt back into perspective
  const rotateX = useTransform(smoothProgress, (p) => {
    if (prefersReducedMotion) return 0
    const current = mapScrollToCardProgress(p, total)
    const offset = index - current
    if (offset < 0) {
      const past = Math.min(1.2, Math.abs(offset))
      return past * PAST_ROTATEX
    }
    const clamped = Math.min(offset, 4)
    return clamped * 2.8
  })

  // Subtle physical card roll on fly-by
  const rotateZ = useTransform(smoothProgress, (p) => {
    if (prefersReducedMotion) return 0
    const current = mapScrollToCardProgress(p, total)
    const offset = index - current
    if (offset < 0) {
      const past = Math.min(1.2, Math.abs(offset))
      const sign = index % 2 === 0 ? -1 : 1
      return sign * past * 2.5
    }
    return 0
  })

  // Opacity: past card fades as it drops out of frame; waiting cards fade gently into distance
  const opacity = useTransform(smoothProgress, (p) => {
    const current = mapScrollToCardProgress(p, total)
    const offset = index - current
    if (offset < 0) {
      const past = Math.min(1.2, Math.abs(offset))
      return Math.max(0, 1 - past * 2.0)
    }
    return Math.max(0, 1 - offset * 0.16)
  })

  // Scale: past card scales up as it flies past camera; waiting cards recede slightly
  const scale = useTransform(smoothProgress, (p) => {
    if (prefersReducedMotion) return 1
    const current = mapScrollToCardProgress(p, total)
    const offset = index - current
    if (offset < 0) {
      const past = Math.min(1.2, Math.abs(offset))
      return 1 + past * 0.2
    }
    const clamped = Math.min(offset, 4)
    return Math.max(0.86, 1 - clamped * 0.035)
  })

  // zIndex: Past card flies toward viewer, so it remains in front until it drops out
  const zIndex = useTransform(smoothProgress, (p) => {
    const current = mapScrollToCardProgress(p, total)
    const offset = index - current
    if (offset < 0) {
      const past = Math.min(1.2, Math.abs(offset))
      if (past > 0.8) return 0
      return total + 1
    }
    return total - index
  })

  return (
    <motion.div
      style={{
        z,
        y,
        rotateX,
        rotateZ,
        opacity,
        scale,
        zIndex,
        pointerEvents: isActive ? "auto" : "none",
      }}
      className="absolute inset-x-2 h-[290px] origin-center rounded-[2rem] sm:inset-x-6 sm:h-[310px]"
      aria-hidden={!isActive}
    >
      <ProjectCard project={project} isActive={isActive} />
    </motion.div>
  )
}

export function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeIndexRef = useRef(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  // Scroll tracking across the full section area:
  // Offset ["start center", "end center"] guarantees the card begins scrolling
  // at the exact moment it reaches the vertical center of the screen.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start center", "end center"],
  })

  // Apple critically-damped spring (SKILL.md §4): eliminates wheel/trackpad lag and notchiness
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 32,
    mass: 0.5,
    restDelta: 0.0001,
  })

  // Synchronize activeIndex only when card flips to keep re-renders near zero
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const cardProgress = mapScrollToCardProgress(latest, projects.length)
    const nextIndex = Math.min(
      projects.length - 1,
      Math.max(0, Math.round(cardProgress))
    )
    if (nextIndex !== activeIndexRef.current) {
      activeIndexRef.current = nextIndex
      setActiveIndex(nextIndex)
    }
  })

  const activeProject = projects[activeIndex]

  return (
    <section
      id="projects"
      ref={trackRef}
      className="relative scroll-mt-28"
      style={{ height: "calc(6 * 70vh + 100vh)" }}
    >
      {/* Sticky container: perfectly centered in viewport, matching profile card height */}
      <div className="sticky top-[calc(50vh-235px)] sm:top-[calc(50vh-235px)] w-full">
        {/* Section title — clean editorial look */}
        <h2 className="section-label mb-5 sm:mb-6">Recent Projects</h2>

        {/* Perspective stage with centered alignment and clean overflow clipping */}
        <div
          className="relative flex h-[460px] sm:h-[440px] w-full items-center justify-center overflow-hidden rounded-[2rem]"
          style={{ perspective: `${PERSPECTIVE}px` }}
        >
          {projects.map((project, index) => (
            <StackedProjectCard
              key={project.caseStudy}
              project={project}
              index={index}
              smoothProgress={smoothProgress}
              total={projects.length}
              activeIndex={activeIndex}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>

        <p className="sr-only" aria-live="polite">
          {activeProject.title}, {activeProject.year}
        </p>
      </div>
    </section>
  )
}
