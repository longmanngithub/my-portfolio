"use client"

import { useEffect, useMemo, useRef } from "react"

import * as Icons from "simple-icons"

import { useLanguage } from "@/lib/language-context"

type LogoKey =
  | "html"
  | "css"
  | "js"
  | "ts"
  | "react"
  | "next"
  | "tailwind"
  | "python"
  | "node"
  | "docker"
  | "postgres"
  | "git"
  | "figma"
  | "tensorflow"
  | "spring"
  | "cpp"
  | "java"

type LogoItem = {
  key: LogoKey
  size: number
  base?: { x: number; y: number; z: number }
}

const floatingLogos: LogoItem[] = [
  { key: "html", size: 110 },
  { key: "css", size: 105 },
  { key: "js", size: 110 },
  { key: "ts", size: 105 },
  { key: "react", size: 100 },
  { key: "next", size: 95 },
  { key: "tailwind", size: 100 },
  { key: "python", size: 105 },
  { key: "node", size: 100 },
  { key: "docker", size: 100 },
  { key: "postgres", size: 105 },
  { key: "git", size: 100 },
  { key: "figma", size: 100 },
  { key: "tensorflow", size: 100 },
  { key: "spring", size: 100 },
  { key: "cpp", size: 105 },
  { key: "java", size: 105 },
]

const techItems = {
  languages: [
    { name: "C++", proficiency: 70 },
    { name: "Python", proficiency: 75 },
    { name: "PHP", proficiency: 65 },
    { name: "JavaScript", proficiency: 70 },
    { name: "TypeScript", proficiency: 80 },
    { name: "Dart", proficiency: 50 },
  ],
  frameworks: [
    { name: "Expo", proficiency: 85 },
    { name: "Flutter", proficiency: 65 },
    { name: "Docker", proficiency: 80 },
    { name: "Git", proficiency: 95 },
    { name: "MySQL", proficiency: 80 },
    { name: "PostgreSQL", proficiency: 75 },
  ],
  other: [
    { name: "Convex", proficiency: 80 },
    { name: "ESP32", proficiency: 50 },
    { name: "REST APIs", proficiency: 90 },
    { name: "DigitalOcean", proficiency: 80 },
  ],
}

export function TechStackSection() {
  const { t } = useLanguage()

  const techCategories = [
    { title: t("tech.languages"), items: techItems.languages },
    { title: t("tech.frameworks"), items: techItems.frameworks },
    { title: t("tech.other"), items: techItems.other },
  ]

  return (
    <section id="tech" className="py-24 px-4 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="text-primary text-sm tracking-wider mb-2">{t("tech.label")}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">{t("tech.title")}</h2>
        </div>

        <FloatingLogoCloud />

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {techCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-4">
              <h3 className="text-base font-semibold text-primary">{category.title}</h3>
              <div className="grid grid-cols-2 gap-2">
                {category.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="group relative bg-card border border-border rounded-lg p-3 text-center text-sm text-foreground glow-cyan-hover transition-all duration-300 hover:border-primary/50 overflow-hidden"
                  >
                    <span className="relative z-10 group-hover:text-primary transition-colors">{item.name}</span>

                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary/50">
                      <div
                        className="h-full bg-primary/60 transition-all duration-500 ease-out origin-left md:scale-x-0 md:group-hover:scale-x-100"
                        style={{ width: `${item.proficiency}%` }}
                      />
                    </div>

                    <span className="absolute top-1 right-1 text-[10px] text-primary opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                      {item.proficiency}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FloatingLogoCloud() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const isVisibleRef = useRef(false)
  const yawRef = useRef(0)
  const pitchRef = useRef(0)
  const targetYawRef = useRef<number | null>(null)
  const targetPitchRef = useRef<number | null>(null)
  const clickTimeRef = useRef<number>(0)
  const clickAnimStartTimeRef = useRef<number>(0)
  const clickStartYawRef = useRef<number>(0)
  const clickStartPitchRef = useRef<number>(0)
  const logoRefsRef = useRef<Map<string, HTMLDivElement>>(new Map())
  const rafRef = useRef<number>()
  const isMobileRef = useRef(typeof window !== "undefined" && window.innerWidth < 768)
  const lastTouchRef = useRef<{ x: number; y: number } | null>(null)
  const isHoveringRef = useRef(false)
  const pointerAngleRef = useRef<{ angle: number; distance: number } | null>(null)
  const lastPointerAngleRef = useRef<number | null>(null)

  const items = useMemo(() => {
    const count = floatingLogos.length
    const golden = Math.PI * (3 - Math.sqrt(5))
    return floatingLogos.map((logo, i) => {
      const y = 1 - (i / (count - 1)) * 2
      const radius = Math.sqrt(1 - y * y)
      const theta = golden * i
      const x = Math.cos(theta) * radius
      const z = Math.sin(theta) * radius
      return { ...logo, base: { x, y, z } }
    })
  }, [])

  // Direct DOM manipulation for maximum performance
  const updateLogos = useRef((yaw: number, pitch: number) => {
    const isMobile = isMobileRef.current
    const mobileScale = isMobile ? 0.8 : 1.2
    const projectionRadius = isMobile ? 38 : 32
    
    // Batch DOM updates for better performance
    items.forEach((logo) => {
      const el = logoRefsRef.current.get(logo.key)
      if (!el || !logo.base) return

      const rotated = rotatePoint(logo.base, yaw, pitch)
      const scale = 0.8 + ((rotated.z + 1) / 2) * 0.5
      const depth = rotated.z * (isMobile ? 180 : 260)
      const depthFactor = (rotated.z + 1) / 2
      // Gradual fade for back objects, full brightness for front/center
      const opacity = depthFactor > 0.6 ? 1 : 0.15 + Math.pow(depthFactor / 0.6, 1.5) * 0.35
      const zIndex = Math.round((rotated.z + 1) * 1000)

      // Use single transform for all positioning and scaling
      const finalScale = scale * mobileScale
      const left = 50 + rotated.x * projectionRadius
      const top = 50 + rotated.y * projectionRadius
      const transformValue = `translate(-50%, -50%) translate3d(0, 0, ${depth}px) scale(${finalScale})`
      
      // Batch style updates in single write with GPU acceleration hints
      el.style.cssText = `
        position: absolute;
        left: ${left}%;
        top: ${top}%;
        transform: ${transformValue};
        width: ${logo.size}px;
        height: ${logo.size}px;
        opacity: ${opacity};
        z-index: ${zIndex};
        will-change: transform, opacity;
        -webkit-backface-visibility: hidden;
        -webkit-perspective: 1000;
        pointer-events: none;
        cursor: pointer;
      `
    })
  }).current

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const clickX = ((e.clientX - rect.left) / rect.width) * 100
    const clickY = ((e.clientY - rect.top) / rect.height) * 100

    // Find closest logo to click position
    let closestLogo: typeof items[0] | null = null
    let minDist = Infinity

    items.forEach((logo) => {
      if (!logo.base) return
      const rotated = rotatePoint(logo.base, yawRef.current, pitchRef.current)
      const projectionRadius = isMobileRef.current ? 42 : 32
      const logoX = 50 + rotated.x * projectionRadius
      const logoY = 50 + rotated.y * projectionRadius
      const dist = Math.sqrt((logoX - clickX) ** 2 + (logoY - clickY) ** 2)
      
      if (dist < minDist && dist < 8) { // Within ~8% radius
        minDist = dist
        closestLogo = logo
      }
    })

    if (closestLogo && closestLogo.base) {
      const targetRotation = pointToFront(closestLogo.base)
      clickStartYawRef.current = yawRef.current
      clickStartPitchRef.current = pitchRef.current
      targetYawRef.current = yawRef.current + normalizeAngleDiff(targetRotation.yaw - yawRef.current)
      targetPitchRef.current = pitchRef.current + normalizeAngleDiff(targetRotation.pitch - pitchRef.current)
      clickAnimStartTimeRef.current = performance.now()
      clickTimeRef.current = performance.now()
    }
  }

  useEffect(() => {
    // Set up Intersection Observer to pause animation when not visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const wasVisible = isVisibleRef.current
          isVisibleRef.current = entry.isIntersecting
          
          // If just became visible, immediately update positions
          if (!wasVisible && entry.isIntersecting) {
            updateLogos(yawRef.current, pitchRef.current)
          }
        })
      },
      { threshold: 0.1 } // Trigger when at least 10% is visible
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [updateLogos])

  useEffect(() => {
    // Initial position on mount
    updateLogos(yawRef.current, pitchRef.current)
    
    let last = performance.now()
    const baseIdleYaw = 0.08
    const baseIdlePitch = 0.03

    const step = (now: number) => {
      const dt = (now - last) / 1000
      last = now

      // Skip animation updates if section is not visible or tab is hidden, but keep the RAF loop running
      if (!isVisibleRef.current || (typeof document !== "undefined" && document.visibilityState === "hidden")) {
        rafRef.current = requestAnimationFrame(step)
        return
      }

      // Varied idle animation using sine waves for organic motion
      const time = now / 1000
      const idleYaw = baseIdleYaw + Math.sin(time * 0.3) * 0.05
      const idlePitch = baseIdlePitch + Math.cos(time * 0.5) * 0.02

      if (targetYawRef.current !== null && targetPitchRef.current !== null) {
        // Animating to clicked target with ease-in-out
        const duration = 0.7
        const elapsed = (now - clickAnimStartTimeRef.current) / 1000
        const t = Math.min(Math.max(elapsed / duration, 0), 1)
        const eased = easeOutCubic(t)

        const yawDelta = normalizeAngleDiff((targetYawRef.current ?? 0) - clickStartYawRef.current)
        const pitchDelta = normalizeAngleDiff((targetPitchRef.current ?? 0) - clickStartPitchRef.current)

        yawRef.current = clickStartYawRef.current + yawDelta * eased
        pitchRef.current = clickStartPitchRef.current + pitchDelta * eased
        
        if (t >= 1) {
          // Store the direction of movement for continuing idle animation
          const angle = Math.atan2(pitchDelta, yawDelta)
          lastPointerAngleRef.current = angle
          targetYawRef.current = null
          targetPitchRef.current = null
        }
      } else if (isHoveringRef.current && pointerAngleRef.current) {
        // Continuous rotation based on pointer direction
        const { angle, distance } = pointerAngleRef.current
        const distanceFactor = Math.min(distance, 1)
        const rotationSpeed = distanceFactor * 1.0
        // Rotate in opposite direction of pointer
        yawRef.current += Math.cos(angle) * rotationSpeed * dt
        pitchRef.current += Math.sin(angle) * rotationSpeed * dt
      } else if (!isHoveringRef.current && lastPointerAngleRef.current !== null) {
        // Idle rotation - continue in same direction as pointer was moving
        const angle = lastPointerAngleRef.current
        const rotationSpeed = 0.5 * 0.5 // Start with half speed in idle
        yawRef.current += Math.cos(angle) * rotationSpeed * dt
        pitchRef.current += Math.sin(angle) * rotationSpeed * dt
      } else if (!isHoveringRef.current && !isMobileRef.current) {
        // Desktop idle rotation when no pointer interaction
        // (Mobile has continuous idle handled separately)
        yawRef.current += idleYaw * dt
        pitchRef.current += idlePitch * dt
      } else if (isMobileRef.current) {
        // Mobile always has idle animation
        yawRef.current += idleYaw * dt
        pitchRef.current += idlePitch * dt
      }

      updateLogos(yawRef.current, pitchRef.current)
      rafRef.current = requestAnimationFrame(step)
    }

    rafRef.current = requestAnimationFrame(step)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [items, updateLogos])

  return (
    <div
      ref={(el) => {
        containerRef.current = el
        sectionRef.current = el
      }}
      className="relative mx-auto aspect-square md:aspect-[3/2] w-full overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-background/70 via-secondary/10 to-background/80 shadow-[0_30px_120px_rgba(0,0,0,0.15)] touch-none cursor-pointer"
      onClick={handleContainerClick}
      onMouseMove={(e) => {
        if (!containerRef.current || isMobileRef.current) return
        isHoveringRef.current = true
        const rect = containerRef.current.getBoundingClientRect()
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const x = e.clientX - rect.left - centerX
        const y = e.clientY - rect.top - centerY
        // Calculate angle and distance for continuous directional rotation
        const angle = Math.atan2(y, x)
        const distance = Math.sqrt(x * x + y * y) / Math.sqrt(centerX * centerX + centerY * centerY)
        pointerAngleRef.current = { angle, distance }
      }}
      onMouseLeave={() => {
        if (pointerAngleRef.current) {
          lastPointerAngleRef.current = pointerAngleRef.current.angle
        }
        isHoveringRef.current = false
        pointerAngleRef.current = null
      }}
      onTouchMove={(e) => {
        e.preventDefault() // Prevent scrolling
        if (!containerRef.current || e.touches.length === 0) return
        const touch = e.touches[0]
        const currentX = touch.clientX
        const currentY = touch.clientY
        
        if (lastTouchRef.current) {
          // Calculate drag distance and rotate accordingly
          const deltaX = currentX - lastTouchRef.current.x
          const deltaY = currentY - lastTouchRef.current.y
          yawRef.current += deltaX * 0.01
          pitchRef.current -= deltaY * 0.01
        }
        
        lastTouchRef.current = { x: currentX, y: currentY }
      }}
      onTouchStart={(e) => {
        e.preventDefault() // Prevent scrolling
        if (e.touches.length > 0) {
          lastTouchRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
        }
      }}
      onTouchEnd={() => {
        lastTouchRef.current = null
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.08),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(236,72,153,0.08),transparent_38%)]" />

      <div className="absolute inset-0" style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}>
        {items.map((logo) => {
          return (
            <div
              key={logo.key}
              ref={(el) => {
                if (el) logoRefsRef.current.set(logo.key, el)
              }}
              className="logo-chip"
            >
              <div className="flex h-full w-full items-center justify-center">
                <LogoIcon name={logo.key} />
              </div>
            </div>
          )
        })}
      </div>

      <style jsx global>{`
        .logo-chip {
          position: absolute;
          transform-style: preserve-3d;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          -webkit-transform-style: preserve-3d;
          -webkit-font-smoothing: antialiased;
          -webkit-perspective: 1000;
          pointer-events: none;
        }
      `}</style>
    </div>
  )
}

function normalizeAngle(angle: number) {
  const twoPi = Math.PI * 2
  return ((angle % twoPi) + twoPi) % twoPi
}

function normalizeAngleDiff(diff: number) {
  const twoPi = Math.PI * 2
  const normalized = ((diff % twoPi) + twoPi) % twoPi
  return normalized > Math.PI ? normalized - twoPi : normalized
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function easeOutCubic(t: number) {
  const inv = 1 - t
  return 1 - inv * inv * inv
}

function lerpAngle(from: number, to: number, t: number) {
  const diff = to - from
  return from + diff * t
}

function rotatePoint(p: { x: number; y: number; z: number }, yaw: number, pitch: number) {
  const cy = Math.cos(yaw)
  const sy = Math.sin(yaw)
  const cp = Math.cos(pitch)
  const sp = Math.sin(pitch)

  const x1 = p.x * cy - p.z * sy
  const z1 = p.x * sy + p.z * cy
  const y2 = p.y * cp - z1 * sp
  const z2 = p.y * sp + z1 * cp
  return { x: x1, y: y2, z: z2 }
}

function pointToFront(p: { x: number; y: number; z: number }) {
  const yaw = Math.atan2(p.x, p.z)
  const hyp = Math.sqrt(p.x * p.x + p.z * p.z)
  const pitch = Math.atan2(p.y, hyp)
  return { yaw, pitch }
}

function LogoIcon({ name }: { name: LogoKey }) {
  const iconMap: Record<LogoKey, { slug: string; title: string }> = {
    html: { slug: "html5", title: "HTML5" },
    css: { slug: "css3", title: "CSS3" },
    js: { slug: "javascript", title: "JavaScript" },
    ts: { slug: "typescript", title: "TypeScript" },
    react: { slug: "react", title: "React" },
    next: { slug: "nextdotjs", title: "Next.js" },
    tailwind: { slug: "tailwindcss", title: "Tailwind CSS" },
    python: { slug: "python", title: "Python" },
    node: { slug: "nodedotjs", title: "Node.js" },
    docker: { slug: "docker", title: "Docker" },
    postgres: { slug: "postgresql", title: "PostgreSQL" },
    git: { slug: "git", title: "Git" },
    figma: { slug: "figma", title: "Figma" },
    tensorflow: { slug: "tensorflow", title: "TensorFlow" },
    spring: { slug: "spring", title: "Spring" },
    cpp: { slug: "cplusplus", title: "C++" },
    java: { slug: "openjdk", title: "Java" },
  }

  const iconConfig = iconMap[name]
  const icon = Icons[`si${iconConfig.slug.charAt(0).toUpperCase()}${iconConfig.slug.slice(1)}` as keyof typeof Icons] as typeof Icons.siReact | undefined

  if (!icon) return null

  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[70%] w-[70%]"
      fill={`#${icon.hex}`}
      role="img"
      aria-label={iconConfig.title}
    >
      <path d={icon.path} />
    </svg>
  )
}
