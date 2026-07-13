"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { LiquidGlass } from "react-liquid-glass-svg"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined"
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined"
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined"
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined"
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined"
import type { SvgIconComponent } from "@mui/icons-material"
import { cn, smoothScrollTo, getVisibleElementById } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

// keep in sync with the `scroll-mt-28` (7rem) offset applied to each section
const SCROLL_OFFSET = 112

const items: { id: string; label: string; icon: SvgIconComponent }[] = [
  { id: "home", label: "Home", icon: HomeOutlinedIcon },
  { id: "tech", label: "Skills", icon: CodeOutlinedIcon },
  { id: "projects", label: "Projects", icon: FolderOutlinedIcon },
  { id: "experience", label: "Experience", icon: WorkOutlineOutlinedIcon },
  { id: "services", label: "Services", icon: BuildOutlinedIcon },
  { id: "contact", label: "Contact", icon: MailOutlineOutlinedIcon },
]

export function Navigation() {
  const [active, setActive] = useState("home")
  const [hovered, setHovered] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const ids = items.map((i) => i.id)
    const onScroll = () => {
      if (window.scrollY < 160) {
        setActive("home")
        return
      }
      // Near the bottom of the page the last section's top may never cross
      // the 200px threshold below (short final section, page can't scroll
      // any further) — treat "at the bottom" as that last section active.
      const atBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
      if (atBottom) {
        setActive(ids[ids.length - 1])
        return
      }
      for (const id of [...ids].reverse()) {
        const el = getVisibleElementById(id)
        if (el && el.getBoundingClientRect().top <= 200) {
          setActive(id)
          break
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  const go = (id: string) => {
    setActive(id)
    if (id === "home") {
      smoothScrollTo(0)
      return
    }
    const el = getVisibleElementById(id)
    if (!el) return
    const targetY = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET
    smoothScrollTo(targetY)
  }

  const isDark = mounted && resolvedTheme === "dark"

  return (
    <div className="fixed left-1/2 top-5 z-50 -translate-x-1/2">
      <LiquidGlass
        // The library's built-in glassBorder bakes in a hardcoded white
        // highlight/border meant for light glass — looks like a stray white
        // outline on a dark surface. We disable it in dark mode and draw our
        // own subtle, theme-correct ring instead (see the span below).
        glassBorder={!isDark}
        backdropBlur={7}
        // Pitch-black dark mode has no ambient light for the glass to pick up,
        // so the tint needs to be lighter/more opaque than in light mode or
        // the pill disappears into the page background.
        tintColor={isDark ? "rgba(48,48,48,0.7)" : "rgba(255,255,255,0.3)"}
        displacementScale={26}
        turbulenceBaseFrequency={0.008}
        className={cn(
          "rounded-full p-1.5",
          isDark && "shadow-[0_8px_28px_rgba(0,0,0,0.55)] ring-1 ring-white/15 ring-inset"
        )}
      >
        <div className="flex items-center gap-0.5">
          {items.map(({ id, label, icon: Icon }) => {
            const isHover = hovered === id
            const isActive = active === id
            return (
              <button
                key={id}
                onClick={() => go(id)}
                onMouseEnter={() => setHovered(id)}
                onMouseLeave={() => setHovered(null)}
                aria-label={label}
                className={cn(
                  "flex h-9 items-center rounded-full transition-all duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                  isHover
                    ? "gap-1.5 bg-primary px-3 text-primary-foreground shadow-sm"
                    : isActive
                      ? "px-2 text-primary"
                      : "px-2 text-foreground/55 hover:text-foreground"
                )}
              >
                <Icon style={{ fontSize: 18 }} />
                <span
                  className={cn(
                    "overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isHover ? "max-w-[7rem] opacity-100" : "max-w-0 opacity-0"
                  )}
                >
                  {label}
                </span>
              </button>
            )
          })}
          <span className="mx-1 h-5 w-px shrink-0 bg-foreground/10" />
          <ThemeToggle />
        </div>
      </LiquidGlass>
    </div>
  )
}
