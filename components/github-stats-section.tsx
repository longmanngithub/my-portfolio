"use client"

import { useEffect, useMemo, useState } from "react"
import GitHubIcon from "@mui/icons-material/GitHub"
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded"
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded"

interface GitHubStats {
  publicRepos: number
  followers: number
  following: number
  contributions: number
}

interface HoveredDay {
  week: number
  day: number
  count: number
  date: string
  level: number
}

const emptyCounts = (totalWeeks = 53) => Array.from({ length: totalWeeks }, () => Array(7).fill(0))

function toContributionLevel(count: number): number {
  if (!count) return 0
  if (count <= 1) return 1
  if (count <= 3) return 2
  if (count <= 6) return 3
  return 4
}

function getCellDate(weekIndex: number, dayIndex: number, totalWeeks = 53): Date {
  const now = new Date()
  const currentDayOfWeek = now.getDay() // 0 = Sun, 6 = Sat
  const daysFromEndOfWeek = 6 - currentDayOfWeek
  const weeksAgo = totalWeeks - 1 - weekIndex
  const daysAgo = weeksAgo * 7 + (6 - dayIndex) - daysFromEndOfWeek
  const d = new Date(now)
  d.setDate(d.getDate() - daysAgo)
  return d
}

let cachedGitHubPayload: { target: GitHubStats; rawWeeks: number[][] } | null = null

export function GitHubStatsSection() {
  const [stats, setStats] = useState<GitHubStats>(() => cachedGitHubPayload?.target ?? {
    publicRepos: 0,
    followers: 0,
    following: 0,
    contributions: 0,
  })
  const [rawWeeks, setRawWeeks] = useState<number[][]>(() => cachedGitHubPayload?.rawWeeks ?? emptyCounts())
  const [loading, setLoading] = useState(() => !cachedGitHubPayload)
  const [hoveredDay, setHoveredDay] = useState<HoveredDay | null>(null)

  useEffect(() => {
    const animateTo = (target: GitHubStats) => {
      const isReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches

      if (isReduced) {
        setStats(target)
        return () => {}
      }

      const duration = 1000
      const steps = 45
      const interval = duration / steps
      let step = 0
      const timer = setInterval(() => {
        step++
        const progress = step / steps
        const easeOut = 1 - Math.pow(1 - progress, 3)

        setStats({
          publicRepos: Math.round(target.publicRepos * easeOut),
          followers: Math.round(target.followers * easeOut),
          following: Math.round(target.following * easeOut),
          contributions: Math.round(target.contributions * easeOut),
        })

        if (step >= steps) {
          clearInterval(timer)
          setStats(target)
        }
      }, interval)
      return () => clearInterval(timer)
    }

    let cleanup: (() => void) | null = null

    const load = async () => {
      if (cachedGitHubPayload) {
        setStats(cachedGitHubPayload.target)
        setRawWeeks(cachedGitHubPayload.rawWeeks)
        setLoading(false)
        return
      }

      if (typeof window !== "undefined") {
        try {
          const cached = sessionStorage.getItem("gh_stats_cache_v6")
          if (cached) {
            const parsed = JSON.parse(cached)
            if (parsed?.target && parsed?.rawWeeks) {
              cachedGitHubPayload = parsed
              setStats(parsed.target)
              setRawWeeks(parsed.rawWeeks)
              setLoading(false)
              cleanup = animateTo(parsed.target)
              return
            }
          }
        } catch {
          // ignore storage errors
        }
      }

      let target: GitHubStats = { publicRepos: 0, followers: 0, following: 0, contributions: 0 }
      let fetchedWeeks = emptyCounts()

      try {
        const res = await fetch("/api/github/contributions")
        if (res.ok) {
          const json = await res.json()
          const apiStats = json?.stats
          if (apiStats) {
            target = {
              publicRepos: apiStats.publicRepos ?? 0,
              followers: apiStats.followers ?? 0,
              following: apiStats.following ?? 0,
              contributions: apiStats.totalContributions ?? 0,
            }

            const weeks: number[][] | undefined = apiStats.weeks
            if (weeks?.length) {
              fetchedWeeks = weeks
            }
          }
        }
      } catch {
        fetchedWeeks = emptyCounts()
      }

      cachedGitHubPayload = { target, rawWeeks: fetchedWeeks }
      if (typeof window !== "undefined") {
        try {
          sessionStorage.setItem("gh_stats_cache_v6", JSON.stringify(cachedGitHubPayload))
        } catch {
          // ignore storage errors
        }
      }
      setRawWeeks(fetchedWeeks)
      setLoading(false)
      cleanup = animateTo(target)
    }

    load()

    return () => {
      if (cleanup) cleanup()
    }
  }, [])

  const totalWeeks = rawWeeks.length || 53

  // Month labels layout across all weeks
  const monthMarkers = useMemo(() => {
    const markers: { week: number; label: string }[] = []
    let lastMonth = -1
    for (let w = 0; w < totalWeeks; w++) {
      const d = getCellDate(w, 0, totalWeeks)
      const m = d.getMonth()
      if (m !== lastMonth) {
        markers.push({
          week: w,
          label: d.toLocaleDateString("en-US", { month: "short" }),
        })
        lastMonth = m
      }
    }
    return markers
  }, [totalWeeks])

  const metricTiles = [
    {
      label: "Repositories",
      value: stats.publicRepos,
    },
    {
      label: "Contributions",
      value: stats.contributions,
    },
    {
      label: "Followers",
      value: stats.followers,
    },
    {
      label: "Following",
      value: stats.following,
    },
  ]

  return (
    <section id="github" className="scroll-mt-28">
      <h2 className="section-label mb-6">GitHub Stats</h2>

      {/* Header telemetry row (no enclosing white background) */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.06] dark:border-white/[0.08] grid place-items-center shrink-0">
            <GitHubIcon sx={{ fontSize: 18 }} className="text-foreground" />
          </div>
          <span className="text-base font-semibold tracking-tight text-foreground font-mono">
            longmanngithub
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 select-none">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            Active
          </span>
        </div>

        <a
          href="https://github.com/longmanngithub"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 rounded-full border border-border/70 dark:border-white/10 bg-card/70 dark:bg-card/40 hover:bg-card px-3.5 py-1.5 text-xs font-medium text-foreground transition-all duration-200 active:scale-95 select-none"
        >
          <span>View GitHub Profile</span>
          <OpenInNewRoundedIcon
            sx={{ fontSize: 14 }}
            className="text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </div>

      {/* 4 Clean Apple Design Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4 mb-6">
        {metricTiles.map((tile) => (
          <div
            key={tile.label}
            className="group relative rounded-2xl border border-border/70 dark:border-white/10 bg-card/60 dark:bg-card/30 backdrop-blur-md p-4 sm:p-5 transition-all duration-200 hover:border-primary/40 hover:bg-card/80 active:scale-[0.98] select-none shadow-[0_2px_8px_-2px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.25)]"
          >
            {/* Category Label */}
            <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">
              {tile.label}
            </div>

            {/* Bold Tabular Display Number */}
            {loading ? (
              <div className="skeleton h-8 w-16 my-1 rounded-lg" />
            ) : (
              <div className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground tabular-nums leading-none">
                {tile.value.toLocaleString()}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Activity Heatmap Card */}
      <div className="rounded-2xl border border-border/70 dark:border-white/10 bg-card/60 dark:bg-card/30 backdrop-blur-md p-4 sm:p-5 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.25)]">
        {/* Activity Header & Live Inspection Capsule */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <div className="flex items-center gap-2">
            <TrendingUpRoundedIcon sx={{ fontSize: 18 }} className="text-emerald-500 dark:text-emerald-400" />
            <h3 className="text-sm sm:text-base font-semibold text-foreground">
              Activity Heatmap
            </h3>
          </div>

          {/* Apple Floating Inspection Pill HUD */}
          <div className="min-h-[28px] flex items-center">
            {hoveredDay ? (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 animate-fade-in shadow-sm">
                <span className="font-semibold tabular-nums">
                  {hoveredDay.count} {hoveredDay.count === 1 ? "contribution" : "contributions"}
                </span>
                <span className="text-emerald-600/50 dark:text-emerald-400/50">•</span>
                <span>{hoveredDay.date}</span>
              </div>
            ) : (
              <div className="text-xs text-muted-foreground/80 flex items-center gap-1.5">
                <span className="font-medium tabular-nums text-foreground/90">
                  {stats.contributions.toLocaleString()}
                </span>
                <span>contributions in the last year</span>
              </div>
            )}
          </div>
        </div>

        {/* Matrix Grid with Smooth Scroll and No Mask Clipping */}
        {loading ? (
          <div className="skeleton h-[115px] w-full rounded-xl" />
        ) : (
          <div className="overflow-x-auto pb-2 scroll-smooth">
            <div className="min-w-max pr-8 py-1.5">
              {/* Month labels header */}
              <div className="flex gap-[2.5px] mb-2 text-[10px] text-muted-foreground/80 pl-[30px] select-none font-mono">
                {Array.from({ length: totalWeeks }).map((_, w) => {
                  const marker = monthMarkers.find((m) => m.week === w)
                  return (
                    <div key={w} className="w-[10px] shrink-0 text-left overflow-visible">
                      {marker ? (
                        <span className="inline-block whitespace-nowrap">{marker.label}</span>
                      ) : null}
                    </div>
                  )
                })}
              </div>

              {/* Day Labels + Grid Columns */}
              <div className="flex gap-2">
                {/* Day of week labels */}
                <div className="w-[22px] h-[85px] flex flex-col justify-between text-[9px] text-muted-foreground/70 select-none font-medium shrink-0 pt-[12.5px] pb-[12.5px]">
                  <span className="h-[10px] leading-[10px]">Mon</span>
                  <span className="h-[10px] leading-[10px]">Wed</span>
                  <span className="h-[10px] leading-[10px]">Fri</span>
                </div>

                {/* Week Columns x Days */}
                <div className="flex gap-[2.5px]">
                  {rawWeeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-[2.5px]">
                      {week.map((count, dayIndex) => {
                        const level = toContributionLevel(count)
                        const cellDate = getCellDate(weekIndex, dayIndex, totalWeeks)
                        const formattedDate = cellDate.toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })

                        // Activity luminescence palette
                        const bgStyle =
                          level === 0
                            ? "bg-black/[0.04] dark:bg-white/[0.06] hover:ring-1 hover:ring-black/20 dark:hover:ring-white/30"
                            : level === 1
                            ? "bg-emerald-500/25 dark:bg-emerald-400/25 hover:bg-emerald-500/40"
                            : level === 2
                            ? "bg-emerald-500/50 dark:bg-emerald-400/50 hover:bg-emerald-500/70"
                            : level === 3
                            ? "bg-emerald-500/80 dark:bg-emerald-400/80 shadow-[0_0_8px_rgba(16,185,129,0.35)]"
                            : "bg-emerald-400 dark:bg-emerald-300 shadow-[0_0_12px_rgba(52,211,153,0.55)]"

                        const isSelected =
                          hoveredDay?.week === weekIndex && hoveredDay?.day === dayIndex

                        return (
                          <div
                            key={dayIndex}
                            onMouseEnter={() =>
                              setHoveredDay({
                                week: weekIndex,
                                day: dayIndex,
                                count,
                                date: formattedDate,
                                level,
                              })
                            }
                            onMouseLeave={() => setHoveredDay(null)}
                            className={`w-[10px] h-[10px] rounded-[2.5px] ${bgStyle} cursor-pointer transition-all duration-150 ${
                              isSelected
                                ? "scale-125 z-20 ring-2 ring-emerald-500 dark:ring-emerald-400 shadow-md"
                                : "hover:scale-115 hover:z-10"
                            }`}
                          />
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Heatmap Footer Legend & Telemetry note */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4 pt-3 border-t border-border/50 text-xs text-muted-foreground select-none">
          <span className="text-[11px] text-muted-foreground/75">
            Syncs with GitHub GraphQL API v4
          </span>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-[11px]">Less</span>
            <div className="flex gap-1 items-center">
              <div className="w-[10px] h-[10px] rounded-[2.5px] bg-black/[0.04] dark:bg-white/[0.06]" />
              <div className="w-[10px] h-[10px] rounded-[2.5px] bg-emerald-500/25 dark:bg-emerald-400/25" />
              <div className="w-[10px] h-[10px] rounded-[2.5px] bg-emerald-500/50 dark:bg-emerald-400/50" />
              <div className="w-[10px] h-[10px] rounded-[2.5px] bg-emerald-500/80 dark:bg-emerald-400/80" />
              <div className="w-[10px] h-[10px] rounded-[2.5px] bg-emerald-400 dark:bg-emerald-300 shadow-[0_0_6px_rgba(52,211,153,0.4)]" />
            </div>
            <span className="text-[11px]">More</span>
          </div>
        </div>
      </div>
    </section>
  )
}
