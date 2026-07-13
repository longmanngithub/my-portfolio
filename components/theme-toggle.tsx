"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined"
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import { cn } from "@/lib/utils"

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = mounted && resolvedTheme === "dark"

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-foreground/55 transition-all duration-[500ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-foreground",
        className
      )}
    >
      {mounted ? (
        isDark ? (
          <LightModeOutlinedIcon key="light" className="theme-icon-pop" style={{ fontSize: 18 }} />
        ) : (
          <DarkModeOutlinedIcon key="dark" className="theme-icon-pop" style={{ fontSize: 18 }} />
        )
      ) : (
        <span className="block h-[18px] w-[18px]" />
      )}
    </button>
  )
}
