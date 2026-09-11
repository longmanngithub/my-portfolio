"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { LiquidGlass } from "react-liquid-glass-svg"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import GitHubIcon from "@mui/icons-material/GitHub"
import NorthEastIcon from "@mui/icons-material/NorthEast"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

interface FloatingNavProps {
  title: string
  year: string
  github?: string
  liveDemo?: string
}

export function FloatingNav({ title, year, github, liveDemo }: FloatingNavProps) {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  const isDark = mounted && resolvedTheme === "dark"

  return (
    <header className="fixed top-3.5 sm:top-5 inset-x-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-4xl">
        <LiquidGlass
          glassBorder={!isDark}
          backdropBlur={7}
          tintColor={isDark ? "rgba(48,48,48,0.7)" : "rgba(255,255,255,0.35)"}
          displacementScale={26}
          turbulenceBaseFrequency={0.008}
          className={cn(
            "w-full rounded-full px-2.5 py-2 sm:px-4 sm:py-2.5 transition-all duration-300",
            isDark
              ? "shadow-[0_8px_28px_rgba(0,0,0,0.55)] ring-1 ring-white/15 ring-inset"
              : "shadow-[0_8px_28px_rgba(0,0,0,0.06)] ring-1 ring-black/5 ring-inset"
          )}
        >
          <div className="flex items-center justify-between gap-2 sm:gap-4 w-full">
            {/* Left: Back Link */}
            <Link
              href="/#projects"
              replace
              className="group inline-flex h-9 sm:h-9.5 items-center gap-1.5 sm:gap-2 rounded-full px-3 sm:px-3.5 text-xs sm:text-sm font-medium text-muted-foreground transition-all duration-150 hover:bg-secondary/80 hover:text-foreground active:scale-95"
              aria-label="Back to projects"
            >
              <ArrowBackIcon
                style={{ fontSize: 17 }}
                className="transition-transform duration-200 group-hover:-translate-x-0.5"
              />
              <span className="font-medium">Projects</span>
            </Link>

            {/* Center: Title & Year Breadcrumb */}
            <div className="flex min-w-0 items-center gap-2 px-1 text-center">
              <span className="truncate text-xs sm:text-sm md:text-base font-semibold tracking-[-0.015em] text-foreground">
                {title}
              </span>
              <span className="hidden sm:inline-flex rounded-full bg-secondary/80 px-2.5 py-0.5 font-mono text-[11px] font-medium leading-none text-muted-foreground border border-black/[0.04] dark:border-white/[0.06]">
                {year}
              </span>
            </div>

            {/* Right: Quick Action Buttons & Theme Toggle */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 sm:h-9.5 items-center gap-1.5 rounded-full px-3 sm:px-3.5 text-xs sm:text-sm font-medium text-foreground bg-secondary/80 hover:bg-secondary transition-all active:scale-95"
                  aria-label="View source code on GitHub"
                >
                  <GitHubIcon style={{ fontSize: 15 }} />
                  <span className="hidden md:inline">Code</span>
                </a>
              )}

              {liveDemo && (
                <a
                  href={liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 sm:h-9.5 items-center gap-1.5 rounded-full bg-primary px-3.5 sm:px-4 text-xs sm:text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-all active:scale-95"
                  aria-label="View live demo"
                >
                  <span>Demo</span>
                  <NorthEastIcon style={{ fontSize: 13 }} />
                </a>
              )}

              <span className="mx-0.5 sm:mx-1 h-5 w-px shrink-0 bg-foreground/15" />
              <ThemeToggle className="h-9 w-9 sm:h-9.5 sm:w-9.5" />
            </div>
          </div>
        </LiquidGlass>
      </div>
    </header>
  )
}
