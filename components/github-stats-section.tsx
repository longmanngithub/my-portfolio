"use client"

import { useEffect, useState } from "react"

interface GitHubStats {
  publicRepos: number
  followers: number
  following: number
  contributions: number
}

// Generate contribution data based on real GitHub activity pattern
// 0 = no contributions, 1-4 = increasing intensity
const emptyHeatmap = () => Array.from({ length: 52 }, () => Array(7).fill(0))

function toContributionLevel(count: number): number {
  if (!count) return 0
  if (count <= 1) return 1
  if (count <= 3) return 2
  if (count <= 6) return 3
  return 4
}

export function GitHubStatsSection() {
  const [stats, setStats] = useState<GitHubStats>({
    publicRepos: 0,
    followers: 0,
    following: 0,
    contributions: 0,
  })
  const [isVisible, setIsVisible] = useState(false)
  const [heatmap, setHeatmap] = useState<number[][]>(emptyHeatmap())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setIsVisible(true)

    const animateTo = (target: GitHubStats) => {
      const duration = 1200
      const steps = 60
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
      let target: GitHubStats = { publicRepos: 0, followers: 0, following: 0, contributions: 0 }

      try {
        const res = await fetch("/api/github/contributions", { cache: "no-store" })
        
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
              setHeatmap(weeks.map((week: number[]) => week.map(toContributionLevel)))
            } else {
              setHeatmap(emptyHeatmap())
            }
          }
        }
      } catch (error) {
        setHeatmap(emptyHeatmap())
      }

      setLoading(false)
      cleanup = animateTo(target)
    }

    load()

    return () => {
      if (cleanup) cleanup()
    }
  }, [])

  return (
    <section id="github" className="scroll-mt-28">
      <div>
        <h2 className="section-label mb-6">GitHub Stats</h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Repositories", value: stats.publicRepos },
            { label: "Followers", value: stats.followers },
            { label: "Following", value: stats.following },
            { label: "Contributions", value: stats.contributions },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className={`relative group bg-card border border-border rounded-xl p-4 text-center glow-cyan-hover transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="glass-subtle rounded-lg p-2 -m-2">
                {loading ? (
                  <div className="skeleton mx-auto mb-2 h-7 w-12" />
                ) : (
                  <div className="text-2xl font-bold text-primary mb-1 tabular-nums">
                    {stat.value.toLocaleString()}
                  </div>
                )}
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Contribution Graph */}
        <div className="mb-8 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative bg-card border border-border rounded-xl p-4 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              {loading ? (
                <div className="skeleton h-5 w-56" />
              ) : (
                <h3 className="text-base font-semibold text-foreground">{stats.contributions.toLocaleString()} contributions in the last year</h3>
              )}
            </div>
            {loading ? (
              <div className="skeleton h-[91px] w-full" />
            ) : (
            <div className="overflow-x-auto">
              <div className="flex gap-[3px] min-w-max">
                {/* Real contribution data - 52 weeks x 7 days */}
                {heatmap.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-[3px]">
                    {week.map((level, dayIndex) => {
                      const bgClass = 
                        level === 0 ? "bg-secondary/50" :
                        level === 1 ? "bg-green-900/60" :
                        level === 2 ? "bg-green-700/70" :
                        level === 3 ? "bg-green-500/80" :
                        "bg-green-400"
                      
                      return (
                        <div
                          key={dayIndex}
                          className={`w-[10px] h-[10px] rounded-sm ${bgClass} transition-all duration-200 hover:scale-150 hover:z-10`}
                        />
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
            )}
            <div className="flex items-center justify-end gap-2 mt-4 text-xs text-muted-foreground">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-[10px] h-[10px] rounded-sm bg-secondary/50" />
                <div className="w-[10px] h-[10px] rounded-sm bg-green-900/60" />
                <div className="w-[10px] h-[10px] rounded-sm bg-green-700/70" />
                <div className="w-[10px] h-[10px] rounded-sm bg-green-500/80" />
                <div className="w-[10px] h-[10px] rounded-sm bg-green-400" />
              </div>
              <span>More</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
