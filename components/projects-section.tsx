"use client"

import { useId, useMemo, useRef, useState, type KeyboardEvent, type TouchEvent } from "react"
import { motion, useReducedMotion } from "motion/react"
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
  description: string
  tech: string[]
  year: string
  icon: SvgIconComponent
  /** App logo, served via R2 through assetUrl(). Falls back to `icon`. */
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
    // Purpose-built mark: the previous scan2attend.png is watermarked stock art,
    // so this SVG replaces it. Lives only in /public, not R2 — the loader below
    // falls back to the local path, so it still resolves.
    logo: "/logos/scan2attend.svg",
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

/* ---------------------------------------------------------------------------
 * Card Time Machine geometry.
 *
 * Mechanics from Amicro's Card Time Machine
 * (https://amicro.vercel.app/carousels/card-time-machine): the deck recedes in
 * Z, each card behind peeks slightly higher, and the card you move past flies
 * toward the viewer and drops out of frame.
 *
 * Distances are scaled up from the 220x135 reference card to suit these
 * full-width project cards while keeping the same depth feel.
 * ------------------------------------------------------------------------- */
const DEPTH_STEP = 130 // z gap between stacked cards (also tapers their width)
const LIFT_STEP = 20 // vertical peek of each card behind the front one
const PAST_Z = 380 // how far a past card flies toward the viewer
const PAST_Y = 560 // how far a past card drops out of frame
const PERSPECTIVE = 1500

/* Vertical budget for the stage. The room above the front card is real content
 * (it holds the peeking deck: 4 visible cards x LIFT_STEP, plus a little
 * slack), while the room below only needs to cover the card's shadow, since a
 * past card is clipped as it flies out. Keeping the bottom tight avoids the
 * dead space a symmetrically centred stage leaves behind. */
const PEEK_ROOM = 96 // space above the front card
const BOTTOM_SLACK = 64 // space below the front card (clears its shadow)
/* The deck is bottom-weighted, so the front card's centre sits below the
 * stage's centre. Nudge the scrubber down by the same amount to line it up. */
const SCRUBBER_OFFSET = (PEEK_ROOM - BOTTOM_SLACK) / 2

/** Logo panel. No screenshots by design: each card is identified by its app
 *  logo shown large on a tinted, textured cover.
 *
 *  Sources are tried in order: the R2 asset host first, then the same path from
 *  /public for files that were never uploaded to R2, then the project's icon.
 *  Without the local step, any logo missing from the bucket silently degrades
 *  to an icon even though the file is sitting right there in the repo. */
function CardMedia({ project }: { project: Project }) {
  const [sourceIndex, setSourceIndex] = useState(0)
  const Icon = project.icon

  const sources = project.logo
    ? Array.from(new Set([assetUrl(project.logo), project.logo]))
    : []
  const logoSrc = sources[sourceIndex]

  return (
    <div className="relative h-28 w-full shrink-0 overflow-hidden bg-secondary sm:h-full sm:w-[42%]">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary to-card" />
      <div
        className="absolute inset-0 text-muted-foreground opacity-25"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "12px 12px",
        }}
      />

      <div className="absolute inset-0 grid place-items-center p-3">
        {logoSrc ? (
          <Image
            // Remount on source change so the browser actually retries.
            key={logoSrc}
            src={logoSrc}
            alt=""
            width={160}
            height={160}
            className="h-20 w-20 rounded-2xl object-contain drop-shadow-sm sm:h-28 sm:w-28"
            onError={() => setSourceIndex((i) => i + 1)}
          />
        ) : (
          // Intentional icon mark, used when a project has no usable logo file.
          // Sized and styled to carry the same weight as the real logos.
          <span className="grid h-20 w-20 place-items-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20 sm:h-28 sm:w-28">
            <Icon className="text-[44px] sm:text-[56px]" />
          </span>
        )}
      </div>

      {/* Year chip in the card's outer corner, well away from the title. */}
      <span className="absolute left-3 top-3 rounded-full bg-foreground/70 px-2.5 py-1 font-mono text-[10px] font-medium leading-none text-background ring-1 ring-white/10 backdrop-blur-sm">
        {project.year}
      </span>
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
        "flex h-full w-full flex-col overflow-hidden rounded-3xl bg-card text-left ring-1 transition-all duration-300 sm:flex-row",
        isActive
          ? "ring-primary/45 shadow-[0_24px_50px_-18px_rgba(16,35,59,0.28)]"
          : "ring-border shadow-[0_12px_30px_-16px_rgba(16,35,59,0.22)]"
      )}
    >
      <CardMedia project={project} />

      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
        <h3
          className={cn(
            "text-base font-bold leading-snug tracking-[-0.01em] transition-colors duration-300 sm:text-lg",
            isActive ? "text-primary" : "text-foreground"
          )}
        >
          {project.title}
        </h3>

        <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-muted-foreground sm:line-clamp-3 sm:text-sm">
          {project.description}
        </p>

        <div className="mt-2.5 flex max-h-[52px] flex-wrap gap-1.5 overflow-hidden sm:mt-3 sm:max-h-none">
          {project.tech.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-secondary px-2 py-1 text-[10px] font-medium leading-none text-secondary-foreground/75"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-2 pt-3 sm:pt-4">
          {project.github &&
            (isActive ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-1.5 rounded-full px-3.5 text-xs font-medium text-muted-foreground ring-1 ring-border transition-colors hover:text-primary hover:ring-primary/45 sm:h-9 sm:px-3"
              >
                <GitHubIcon style={{ fontSize: 14 }} /> Code
              </a>
            ) : (
              <span className="inline-flex h-10 items-center gap-1.5 rounded-full px-3.5 text-xs font-medium text-muted-foreground ring-1 ring-border sm:h-9 sm:px-3">
                <GitHubIcon style={{ fontSize: 14 }} /> Code
              </span>
            ))}

          {isActive ? (
            <Link
              href={project.caseStudy}
              className="group/cta inline-flex h-10 items-center gap-1.5 rounded-full bg-primary px-4 text-xs font-semibold text-primary-foreground outline-none transition-colors hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:h-9 sm:px-3.5"
            >
              Case Study
              <NorthEastIcon
                style={{ fontSize: 13 }}
                className="transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
              />
            </Link>
          ) : (
            <span className="inline-flex h-10 items-center gap-1.5 rounded-full bg-secondary px-4 text-xs font-semibold text-muted-foreground sm:h-9 sm:px-3.5">
              Case Study
              <NorthEastIcon style={{ fontSize: 13 }} />
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const prefersReducedMotion = useReducedMotion()
  const rawId = useId()
  const gooId = `time-machine-goo-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  const activeProject = projects[activeIndex]

  // One main tick per project, plus two decorative sub-ticks between each pair.
  const timelineNodes = useMemo(() => {
    const nodes: { type: "main" | "sub"; index: number; year?: string }[] = []
    projects.forEach((project, i) => {
      nodes.push({ type: "main", index: i, year: project.year })
      if (i < projects.length - 1) {
        for (let j = 0; j < 2; j += 1) {
          nodes.push({ type: "sub", index: i + (j + 1) * 0.33 })
        }
      }
    })
    return nodes
  }, [])

  const select = (index: number) =>
    setActiveIndex(Math.min(projects.length - 1, Math.max(0, index)))

  const scrubTo = (index: number) => {
    setHoveredIndex(index)
    select(Math.round(index))
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return
    const next: Record<string, number> = {
      ArrowLeft: activeIndex - 1,
      ArrowUp: activeIndex - 1,
      ArrowRight: activeIndex + 1,
      ArrowDown: activeIndex + 1,
      Home: 0,
      End: projects.length - 1,
    }
    if (event.key in next) {
      event.preventDefault()
      select(next[event.key])
    }
  }

  const spring = prefersReducedMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 250, damping: 25, mass: 0.8 }

  // Swipe left/right on the stage to step through the deck. The scrubber's
  // touch targets are widened for tapping, but a horizontal swipe is the more
  // natural mobile gesture over the card stack itself, where there's no
  // scrubber to reach.
  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX
    touchStartY.current = event.touches[0].clientY
  }

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || touchStartY.current === null) return
    const deltaX = event.changedTouches[0].clientX - touchStartX.current
    const deltaY = event.changedTouches[0].clientY - touchStartY.current
    touchStartX.current = null
    touchStartY.current = null
    // Require a deliberate, mostly-horizontal swipe so a vertical page scroll
    // that starts over the stage doesn't accidentally change the active card.
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      select(activeIndex + (deltaX < 0 ? 1 : -1))
    }
  }

  return (
    <section id="projects" className="scroll-mt-28">
      <h2 className="section-label mb-6">Recent Projects</h2>

      <div
        className="flex flex-row items-center gap-1 outline-none sm:gap-2"
        role="group"
        aria-label="Recent projects time machine"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {/* Goo filter: the soft edge bleed as cards blur past each other. */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute h-0 w-0"
          aria-hidden="true"
        >
          <defs>
            <filter id={gooId}>
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -6"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>

        {/* Perspective stage. Height is PEEK_ROOM + card + BOTTOM_SLACK, so the
            deck gets its breathing room above without leaving a dead gap below.
            overflow-hidden only clips the card flying out of frame; it draws no
            border or background of its own. */}
        <div
          className="relative flex h-[480px] min-w-0 flex-1 items-end justify-center overflow-hidden pb-16 sm:h-[428px]"
          style={{ perspective: `${PERSPECTIVE}px`, touchAction: "pan-y" }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {projects.map((project, index) => {
            const offset = index - activeIndex
            const isPast = index < activeIndex
            const isActive = index === activeIndex

            return (
              <motion.div
                key={project.caseStudy}
                className="absolute inset-x-4 h-[320px] origin-center rounded-3xl sm:inset-x-8 sm:h-[268px]"
                initial={false}
                animate={{
                  z: isPast ? PAST_Z : -offset * DEPTH_STEP,
                  y: isPast ? PAST_Y : -offset * LIFT_STEP,
                  rotateX: isPast ? -20 : offset * 2,
                  opacity: isPast ? 0 : Math.max(0, 1 - Math.abs(offset) * 0.2),
                  scale: isPast ? 1.3 : 1,
                }}
                transition={spring}
                style={{
                  zIndex: projects.length - index,
                  // Goo only on the cards behind: it gives the deck its soft
                  // bleed while keeping the front card's text perfectly sharp.
                  filter: isActive ? undefined : `url(#${gooId})`,
                  pointerEvents: isPast ? "none" : "auto",
                }}
                aria-hidden={!isActive}
              >
                {isActive ? (
                  <ProjectCard project={project} isActive />
                ) : (
                  <button
                    type="button"
                    tabIndex={-1}
                    aria-label={`Show ${project.title}`}
                    className="block h-full w-full cursor-pointer rounded-3xl border-0 bg-transparent p-0"
                    onClick={() => select(index)}
                  >
                    <ProjectCard project={project} isActive={false} />
                  </button>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Scrubber */}
        <div
          className="relative z-50 flex shrink-0 flex-col items-end py-2"
          style={{ transform: `translateY(${SCRUBBER_OFFSET}px)` }}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {timelineNodes.map((node) => {
            if (node.type === "main") {
              const index = node.index
              const isSelected = activeIndex === index
              const isHovered = hoveredIndex === index

              return (
                <button
                  key={`main-${projects[index].caseStudy}`}
                  type="button"
                  aria-pressed={isSelected}
                  aria-label={`Show ${projects[index].title}, ${projects[index].year}`}
                  className="group relative inline-flex w-14 cursor-pointer items-center justify-end border-0 bg-transparent py-3 outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-20 sm:py-[3px]"
                  onMouseEnter={() => scrubTo(index)}
                  onFocus={() => scrubTo(index)}
                  onClick={() => select(index)}
                >
                  {isHovered && (
                    <motion.span
                      className={cn(
                        "absolute right-9 whitespace-nowrap font-mono text-[10px] font-semibold sm:right-11",
                        isSelected ? "text-primary" : "text-muted-foreground"
                      )}
                      style={{ top: "50%" }}
                      initial={{ opacity: 0, filter: "blur(2px)", scale: 0.8, y: "-50%" }}
                      animate={{ opacity: 1, filter: "blur(0px)", scale: 1, y: "-50%" }}
                      transition={{ duration: 0.15 }}
                      aria-hidden="true"
                    >
                      {node.year}
                    </motion.span>
                  )}
                  <motion.span
                    className={cn(
                      "block h-[3px] w-6 origin-right rounded-full transition-colors",
                      isSelected
                        ? "bg-primary"
                        : "bg-muted-foreground/40 group-hover:bg-muted-foreground/70"
                    )}
                    animate={{
                      scaleX:
                        hoveredIndex === null
                          ? 1
                          : isSelected
                            ? 1.4
                            : Math.abs(index - hoveredIndex) < 0.5
                              ? 1.25
                              : 1,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                </button>
              )
            }

            const isNear =
              hoveredIndex !== null && Math.abs(node.index - hoveredIndex) <= 0.5

            return (
              // Decorative in-between ticks: pointer sugar for smooth scrubbing.
              // Hidden from assistive tech since every project has a main tick.
              <div
                key={`sub-${node.index}`}
                aria-hidden="true"
                className="flex w-14 cursor-pointer justify-end py-2 sm:w-20 sm:py-[3px]"
                onMouseEnter={() => scrubTo(node.index)}
                onClick={() => select(Math.round(node.index))}
              >
                <motion.span
                  className="block h-[3px] w-6 origin-right rounded-full bg-muted-foreground/25"
                  animate={{
                    scaleX: hoveredIndex === null ? 1 : isNear ? 1.15 : 1,
                    opacity: hoveredIndex === null ? 0.5 : isNear ? 0.8 : 0.5,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                />
              </div>
            )
          })}
        </div>

        <p className="sr-only" aria-live="polite">
          {activeProject.title}, {activeProject.year}
        </p>
      </div>
    </section>
  )
}
