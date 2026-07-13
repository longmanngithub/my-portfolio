import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Next's dev-mode streaming can leave a stale `hidden` copy of a Suspense
 * boundary in the DOM alongside the live one, so a duplicate `id` briefly
 * exists. Plain `getElementById` returns whichever comes first in document
 * order — sometimes the hidden copy — which throws off scroll-target math.
 * This finds the first match that isn't sitting inside a `[hidden]` ancestor.
 */
export function getVisibleElementById(id: string): HTMLElement | null {
  const matches = document.querySelectorAll<HTMLElement>(`#${id}`)
  for (const el of matches) {
    if (!el.closest('[hidden]')) return el
  }
  return null
}

/**
 * Builds an easing function from CSS cubic-bezier control points, solved via
 * Newton-Raphson. Lets JS-driven scroll animations match the same curve
 * (cubic-bezier(0.22, 1, 0.36, 1)) used by the site's CSS transitions.
 */
export function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const a = (v1: number, v2: number) => 1 - 3 * v2 + 3 * v1
  const b = (v1: number, v2: number) => 3 * v2 - 6 * v1
  const c = (v1: number) => 3 * v1

  const bezierX = (t: number) => ((a(x1, x2) * t + b(x1, x2)) * t + c(x1)) * t
  const bezierY = (t: number) => ((a(y1, y2) * t + b(y1, y2)) * t + c(y1)) * t
  const derivX = (t: number) => 3 * a(x1, x2) * t * t + 2 * b(x1, x2) * t + c(x1)

  const solveT = (x: number) => {
    let t = x
    for (let i = 0; i < 8; i++) {
      const dx = bezierX(t) - x
      if (Math.abs(dx) < 1e-6) return t
      const d = derivX(t)
      if (Math.abs(d) < 1e-6) break
      t -= dx / d
    }
    let lo = 0
    let hi = 1
    t = x
    while (lo < hi) {
      const xEst = bezierX(t)
      if (Math.abs(xEst - x) < 1e-6) return t
      if (xEst < x) lo = t
      else hi = t
      t = (lo + hi) / 2
    }
    return t
  }

  return (x: number) => bezierY(solveT(x))
}

const scrollEase = cubicBezier(0.22, 1, 0.36, 1)

/** Animates window scroll to targetY using the site's standard ease-out curve. */
export function smoothScrollTo(targetY: number, duration = 900) {
  if (typeof window === 'undefined') return

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const startY = window.scrollY
  const diff = targetY - startY

  if (reduced || Math.abs(diff) < 1) {
    window.scrollTo(0, targetY)
    return
  }

  const startTime = performance.now()

  const step = (now: number) => {
    const elapsed = now - startTime
    const t = Math.min(elapsed / duration, 1)
    // "instant" bypasses the global `scroll-behavior: smooth` CSS — without
    // it, each per-frame scrollTo would itself animate and fight this loop.
    window.scrollTo({ top: startY + diff * scrollEase(t), behavior: "instant" })
    if (t < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}
