"use client"

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react"
import { TECH_STACK, resolveIcon, type Tech } from "@/lib/tech-stack"
import { cn } from "@/lib/utils"

/* On a light canvas, darken any near-white brand marks so they stay visible. */
function displayHex(hex: string): string {
  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)
  const lum = 0.299 * r + 0.587 * g + 0.114 * b
  return lum > 225 ? "10233b" : hex
}

function TechGlyph({ slug, className }: { slug: string; className?: string }) {
  const icon = resolveIcon(slug)
  if (!icon) return null
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={`#${displayHex(icon.hex)}`}
      role="img"
      aria-label={icon.title}
    >
      <path d={icon.path} />
    </svg>
  )
}

export function TechStackSection() {
  return (
    <section id="tech" className="scroll-mt-28">
      <h2 className="section-label mb-6 sm:mb-8">Tech Stack</h2>

      <FloatingLogoCloud />

      <TechCarousel />
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* 3D Fibonacci Sphere Cloud (Apple Direct Manipulation & Springs)     */
/* ------------------------------------------------------------------ */

const BASE_YAW = -0.18 // rad/s idle spin (negative yaw rotates right)
const MAX_POINTER_YAW = 1.8 // rad/s at horizontal cursor edge
const MAX_POINTER_PITCH = 1.2 // rad/s at vertical cursor edge
const APPROACH = 5.0 // velocity easing rate
const FOCUS_MS = 620 // tap-to-center smooth transition duration (graceful ease-out)
const FOCUS_HOLD_MS = 140 // brief settling beat (0.14s) before smoothly resuming dynamic orbit
const MAX_VEL = 2.4 // maximum momentum flick velocity

function FloatingLogoCloud() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const chipRefs = useRef<Map<string, HTMLDivElement>>(new Map())

  const yaw = useRef(0)
  const pitch = useRef(0.28)
  const velYaw = useRef(BASE_YAW)
  const velPitch = useRef(0)

  const hovering = useRef(false)
  const pointer = useRef<{ dx: number; dy: number } | null>(null)
  const hasFlickMomentum = useRef(false)

  // Direct manipulation pointer tracking (SKILL.md §2 & §5)
  const pointerState = useRef<{
    isDragging: boolean
    isDown: boolean
    pointerId: number
    startX: number
    startY: number
    lastX: number
    lastY: number
    lastTime: number
    vx: number
    vy: number
    moved: number
  }>({
    isDragging: false,
    isDown: false,
    pointerId: -1,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    lastTime: 0,
    vx: 0,
    vy: 0,
    moved: 0,
  })

  // Tap-to-center interruptible focus animation (SKILL.md §3)
  const focusing = useRef(false)
  const focusStart = useRef(0)
  const focusFrom = useRef({ yaw: 0, pitch: 0 })
  const focusTo = useRef({ yaw: 0, pitch: 0 })

  const running = useRef(true)
  const radiusX = useRef(240)
  const radiusY = useRef(180)
  const depth = useRef(160)
  const sizeScale = useRef(1)
  const reduced = useRef(false)

  const points = useMemo(() => {
    const n = TECH_STACK.length
    const golden = Math.PI * (3 - Math.sqrt(5))
    return TECH_STACK.map((tech, i) => {
      const y = 1 - (i / Math.max(n - 1, 1)) * 2
      const r = Math.sqrt(Math.max(0, 1 - y * y))
      const theta = golden * i
      return { tech, x: Math.cos(theta) * r, y, z: Math.sin(theta) * r }
    })
  }, [])

  const measure = useRef(() => {
    const el = containerRef.current
    if (!el) return
    const w = el.clientWidth
    const h = el.clientHeight
    const min = Math.min(w, h)
    radiusX.current = w * 0.41
    radiusY.current = h * 0.42
    depth.current = min * 0.35
    sizeScale.current = Math.min(Math.max(min / 440, 0.6), 1.15)
  }).current

  const rotate = (p: { x: number; y: number; z: number }, y: number, pt: number) => {
    const cy = Math.cos(y)
    const sy = Math.sin(y)
    const cp = Math.cos(pt)
    const sp = Math.sin(pt)
    const x1 = p.x * cy - p.z * sy
    const z1 = p.x * sy + p.z * cy
    const y2 = p.y * cp - z1 * sp
    const z2 = p.y * sp + z1 * cp
    return { x: x1, y: y2, z: z2 }
  }

  const render = useRef(() => {
    const RX = radiusX.current
    const RY = radiusY.current
    const D = depth.current
    const S = sizeScale.current

    for (const p of points) {
      const el = chipRefs.current.get(p.tech.key)
      if (!el) continue
      const r = rotate(p, yaw.current, pitch.current)
      const depthFactor = (r.z + 1) / 2
      const scale = (0.64 + depthFactor * 0.52) * S
      el.style.transform = `translate(-50%, -50%) translate3d(${r.x * RX}px, ${r.y * RY}px, ${r.z * D}px) scale(${scale})`
      el.style.opacity = (0.32 + depthFactor * 0.68).toFixed(3)
      el.style.zIndex = String(Math.round(depthFactor * 1000))
    }
  }).current

  // Bring the tapped tech to the front-center, pause briefly, then dynamically resume
  const focusNearest = (clientX: number, clientY: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = clientX - rect.left - rect.width / 2
    const cy = clientY - rect.top - rect.height / 2
    const RX = radiusX.current
    const RY = radiusY.current

    let best: (typeof points)[number] | null = null
    let bestDist = Infinity
    for (const p of points) {
      const r = rotate(p, yaw.current, pitch.current)
      const dx = r.x * RX - cx
      const dy = r.y * RY - cy
      const d = dx * dx + dy * dy - r.z * 280
      if (d < bestDist) {
        bestDist = d
        best = p
      }
    }
    if (!best) return

    const targetYaw = Math.atan2(best.x, best.z)
    const targetPitch = Math.atan2(best.y, Math.sqrt(best.x * best.x + best.z * best.z))
    const norm = (d: number) => {
      const twoPi = Math.PI * 2
      const n = ((d % twoPi) + twoPi) % twoPi
      return n > Math.PI ? n - twoPi : n
    }

    focusFrom.current = { yaw: yaw.current, pitch: pitch.current }
    focusTo.current = {
      yaw: yaw.current + norm(targetYaw - yaw.current),
      pitch: pitch.current + norm(targetPitch - pitch.current),
    }
    focusStart.current = performance.now()
    focusing.current = true
    velYaw.current = 0
    velPitch.current = 0
  }

  useEffect(() => {
    reduced.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    measure()
    render()
    if (reduced.current) return

    let last = performance.now()
    let raf = 0
    // Apple smooth deceleration curve (starts immediately without hesitation, eases smoothly into center)
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

    const frame = (now: number) => {
      let dt = (now - last) / 1000
      last = now
      raf = requestAnimationFrame(frame)
      if (!running.current) return
      if (dt > 0.05) dt = 0.05

      if (focusing.current) {
        const elapsed = now - focusStart.current
        const t = Math.min(elapsed / FOCUS_MS, 1)
        const e = easeOut(t)
        yaw.current = focusFrom.current.yaw + (focusTo.current.yaw - focusFrom.current.yaw) * e
        pitch.current = focusFrom.current.pitch + (focusTo.current.pitch - focusFrom.current.pitch) * e
        velYaw.current = BASE_YAW
        velPitch.current = 0

        // Once centered and held for brief beat, seamlessly release to dynamic motion
        if (elapsed >= FOCUS_MS + FOCUS_HOLD_MS) {
          focusing.current = false
        }
      } else if (!pointerState.current.isDragging) {
        // If release momentum exists, decay it smoothly toward pointer/idle velocity
        if (hasFlickMomentum.current) {
          velYaw.current *= 0.94
          velPitch.current *= 0.94
          if (Math.abs(velYaw.current) < 0.25 && Math.abs(velPitch.current) < 0.08) {
            hasFlickMomentum.current = false
          }
        } else {
          let tgtYaw: number
          let tgtPitch: number
          if (hovering.current && pointer.current) {
            // Follow the pointer direction on desktop while maintaining baseline dynamic motion
            tgtYaw = BASE_YAW - pointer.current.dx * MAX_POINTER_YAW
            tgtPitch = Math.sin(now * 0.0003) * 0.08 - pointer.current.dy * MAX_POINTER_PITCH
          } else {
            tgtYaw = BASE_YAW
            tgtPitch = Math.sin(now * 0.0003) * 0.12
          }
          const a = 1 - Math.exp(-APPROACH * dt)
          velYaw.current += (tgtYaw - velYaw.current) * a
          velPitch.current += (tgtPitch - velPitch.current) * a
        }

        yaw.current += velYaw.current * dt
        pitch.current += velPitch.current * dt

        // Normalize angles to keep values clean within [0, 2π)
        const twoPi = Math.PI * 2
        yaw.current = ((yaw.current % twoPi) + twoPi) % twoPi
        pitch.current = ((pitch.current % twoPi) + twoPi) % twoPi
      }
      render()
    }
    raf = requestAnimationFrame(frame)

    const onResize = () => {
      measure()
      render()
    }
    window.addEventListener("resize", onResize)

    const io = new IntersectionObserver(
      ([entry]) => {
        running.current = entry.isIntersecting && !document.hidden
        last = performance.now()
      },
      { threshold: 0.05 }
    )
    if (containerRef.current) io.observe(containerRef.current)

    const onVis = () => {
      running.current =
        !document.hidden &&
        !!containerRef.current &&
        containerRef.current.getBoundingClientRect().bottom > 0
      last = performance.now()
    }
    document.addEventListener("visibilitychange", onVis)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", onResize)
      document.removeEventListener("visibilitychange", onVis)
      io.disconnect()
    }
  }, [measure, points, render])

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative mx-auto aspect-[4/5] sm:aspect-[4/3] min-h-[500px] sm:min-h-[640px] w-full overflow-hidden rounded-[2rem] bg-card text-left transition-all duration-300 select-none",
        "border border-black/[0.08] dark:border-white/[0.12]",
        "shadow-[0_16px_40px_-12px_rgba(0,0,0,0.06)] dark:shadow-[0_24px_50px_-12px_rgba(0,0,0,0.7)]",
        "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:z-10 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/70 dark:before:via-white/20 before:to-transparent",
        "touch-none cursor-default"
      )}
      style={{ perspective: "1100px" }}
      onPointerDown={(e) => {
        const el = containerRef.current
        if (!el) return
        el.setPointerCapture(e.pointerId)
        hasFlickMomentum.current = false
        pointerState.current = {
          isDragging: false,
          isDown: true,
          pointerId: e.pointerId,
          startX: e.clientX,
          startY: e.clientY,
          lastX: e.clientX,
          lastY: e.clientY,
          lastTime: performance.now(),
          vx: 0,
          vy: 0,
          moved: 0,
        }
      }}
      onPointerMove={(e) => {
        const el = containerRef.current
        if (!el) return

        const ps = pointerState.current
        if (ps.isDown) {
          const dx = e.clientX - ps.lastX
          const dy = e.clientY - ps.lastY
          ps.moved += Math.abs(dx) + Math.abs(dy)

          // Only consider it a drag once moved past threshold
          if (ps.moved > 6) {
            ps.isDragging = true
            focusing.current = false
          }

          if (ps.isDragging) {
            const now = performance.now()
            const dt = Math.max((now - ps.lastTime) / 1000, 0.001)

            // 1:1 direct tracking in all directions without limits
            const SENSITIVITY = 0.0055
            yaw.current -= dx * SENSITIVITY
            pitch.current -= dy * SENSITIVITY

            // Instantaneous velocity calculation for momentum release handoff
            const instantVx = (-dx * SENSITIVITY) / dt
            const instantVy = (-dy * SENSITIVITY) / dt
            ps.vx = ps.vx * 0.4 + instantVx * 0.6
            ps.vy = ps.vy * 0.4 + instantVy * 0.6

            ps.lastX = e.clientX
            ps.lastY = e.clientY
            ps.lastTime = now
            render()
            return
          }
        }

        // On desktop mouse hover: follow pointer direction directly
        // Does NOT interrupt ongoing centering animation flow
        hovering.current = true
        hasFlickMomentum.current = false
        const rect = el.getBoundingClientRect()
        pointer.current = {
          dx: (e.clientX - rect.left - rect.width / 2) / (rect.width / 2),
          dy: (e.clientY - rect.top - rect.height / 2) / (rect.height / 2),
        }
      }}
      onPointerUp={(e) => {
        const el = containerRef.current
        if (el && el.hasPointerCapture(e.pointerId)) {
          el.releasePointerCapture(e.pointerId)
        }

        const ps = pointerState.current
        const wasDragging = ps.isDragging
        ps.isDragging = false
        ps.isDown = false

        // Tap detected -> immediately animate to center with smooth easing (never stops first)
        if (!wasDragging && ps.moved < 10 && performance.now() - ps.lastTime < 450) {
          focusNearest(ps.startX, ps.startY)
        } else if (wasDragging && ps.moved >= 10) {
          // Hand off release velocity into momentum spin
          hasFlickMomentum.current = true
          velYaw.current = Math.max(-MAX_VEL, Math.min(MAX_VEL, ps.vx * 0.85))
          velPitch.current = Math.max(-MAX_VEL, Math.min(MAX_VEL, ps.vy * 0.85))
        }
      }}
      onPointerCancel={(e) => {
        const el = containerRef.current
        if (el && el.hasPointerCapture(e.pointerId)) {
          el.releasePointerCapture(e.pointerId)
        }
        pointerState.current.isDragging = false
        pointerState.current.isDown = false
        hasFlickMomentum.current = false
        velYaw.current = BASE_YAW
      }}
      onMouseLeave={() => {
        hovering.current = false
        pointer.current = null
        hasFlickMomentum.current = false
      }}
    >
      {/* Subtle atmospheric ambient glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(15,143,143,0.06),transparent_65%)] dark:bg-[radial-gradient(circle_at_50%_45%,rgba(45,212,191,0.05),transparent_65%)]" />

      {/* Floating 3D technology nodes */}
      {points.map((p) => (
        <div
          key={p.tech.key}
          ref={(el) => {
            if (el) chipRefs.current.set(p.tech.key, el)
            else chipRefs.current.delete(p.tech.key)
          }}
          className="absolute left-1/2 top-1/2 grid place-items-center will-change-transform"
          style={{
            width: p.tech.size,
            height: p.tech.size,
            backfaceVisibility: "hidden",
            pointerEvents: "none",
          }}
        >
          <TechGlyph slug={p.tech.slug} className="h-[62%] w-[62%] drop-shadow-sm" />
        </div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Apple Glass Carousel (Auto-scroll + Manual Swipeable + Right Fade) */
/* ------------------------------------------------------------------ */

function CarouselItem({ tech }: { tech: Tech }) {
  return (
    <div className="group/item flex flex-col items-center justify-center gap-2 shrink-0 px-2 py-1 transition-all duration-200 hover:scale-105 select-none">
      <TechGlyph
        slug={tech.slug}
        className="h-7 w-7 sm:h-8 sm:w-8 transition-transform duration-200 group-hover/item:scale-110 shrink-0 pointer-events-none drop-shadow-xs"
      />
      <span className="text-xs sm:text-[13px] font-medium text-muted-foreground group-hover/item:text-foreground transition-colors duration-200 whitespace-nowrap pointer-events-none text-center">
        {tech.label}
      </span>
    </div>
  )
}

function TechCarousel() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [rightBleed, setRightBleed] = useState(0)

  // Tripled list for seamless infinite looping in both directions
  const tripleList = useMemo(() => [...TECH_STACK, ...TECH_STACK, ...TECH_STACK], [])

  // Position accumulator (float, in pixels) & pointer interaction refs
  const pos = useRef(0)
  const isDragging = useRef(false)
  const pointerId = useRef<number | null>(null)
  const lastX = useRef(0)
  const lastTime = useRef(0)
  const velocity = useRef(0)

  // Measure distance to right edge of viewport for full bleed
  useEffect(() => {
    const updateBleed = () => {
      if (!containerRef.current) return
      const parent = containerRef.current.parentElement
      if (!parent) return
      const parentRect = parent.getBoundingClientRect()
      const diff = Math.max(0, window.innerWidth - parentRect.right)
      setRightBleed(diff)
    }

    updateBleed()
    window.addEventListener("resize", updateBleed)
    return () => window.removeEventListener("resize", updateBleed)
  }, [])

  // RAF Continuous Auto-Scroll & Inertia Momentum Loop
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let rafId = 0
    let lastTick = performance.now()
    const AUTO_SPEED = 42 // px per second continuous auto-scroll

    const tick = (now: number) => {
      const dt = Math.min((now - lastTick) / 1000, 0.05)
      lastTick = now

      const singleWidth = track.scrollWidth / 3

      if (singleWidth > 0) {
        if (!isDragging.current) {
          // If flick velocity exists, decay smoothly toward auto-speed
          if (Math.abs(velocity.current) > AUTO_SPEED) {
            pos.current += velocity.current * dt
            velocity.current *= 0.94
          } else {
            velocity.current = 0
            // Continuous auto-scroll while not dragging
            pos.current += AUTO_SPEED * dt
          }
        }

        // Seamless infinite wrap in both directions
        const norm = ((pos.current % singleWidth) + singleWidth) % singleWidth
        track.style.transform = `translate3d(-${norm}px, 0, 0)`
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <div ref={containerRef} className="mt-8 sm:mt-10">
      {/* Auto Horizontal Scroll Marquee (Continuous auto-scroll + manual drag/swipe + dual fade transitions) */}
      <div
        className="overflow-hidden py-4 sm:py-5 cursor-grab active:cursor-grabbing select-none"
        style={{
          marginRight: rightBleed > 0 ? `-${rightBleed}px` : undefined,
          maskImage: "linear-gradient(to right, transparent 0px, black 48px, black calc(100% - 64px), transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0px, black 48px, black calc(100% - 64px), transparent 100%)",
          touchAction: "pan-y",
        }}
        onPointerDown={(e) => {
          isDragging.current = true
          pointerId.current = e.pointerId
          lastX.current = e.clientX
          lastTime.current = performance.now()
          velocity.current = 0
          ;(e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId)
        }}
        onPointerMove={(e) => {
          if (!isDragging.current || pointerId.current !== e.pointerId) return
          const now = performance.now()
          const dt = Math.max((now - lastTime.current) / 1000, 0.001)
          const dx = e.clientX - lastX.current

          // Dragging left (dx < 0) advances forward; dragging right (dx > 0) moves backward
          pos.current -= dx

          const instantV = -dx / dt
          velocity.current = velocity.current * 0.3 + instantV * 0.7
          lastX.current = e.clientX
          lastTime.current = now

          const track = trackRef.current
          if (track) {
            const singleWidth = track.scrollWidth / 3
            if (singleWidth > 0) {
              const norm = ((pos.current % singleWidth) + singleWidth) % singleWidth
              track.style.transform = `translate3d(-${norm}px, 0, 0)`
            }
          }
        }}
        onPointerUp={(e) => {
          isDragging.current = false
          pointerId.current = null
          try {
            ;(e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId)
          } catch {}
        }}
        onPointerCancel={(e) => {
          isDragging.current = false
          pointerId.current = null
          try {
            ;(e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId)
          } catch {}
        }}
        onWheel={(e) => {
          // Only manual scroll when scrolling horizontally; ignore vertical page scrolling
          if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            pos.current += e.deltaX * 0.8
          }
        }}
      >
        <div ref={trackRef} className="flex w-max gap-6 sm:gap-8 items-center will-change-transform">
          {tripleList.map((tech, i) => (
            <CarouselItem key={`${tech.key}-${i}`} tech={tech} />
          ))}
        </div>
      </div>
    </div>
  )
}
