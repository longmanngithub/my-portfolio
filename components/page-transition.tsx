"use client"

import { usePathname } from "next/navigation"

/** Replays a fade + slide-up entrance every time the route changes, by
 *  remounting the wrapper (via the `key`) so the CSS animation restarts. */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <div key={pathname} className="animate-page-in">
      {children}
    </div>
  )
}
