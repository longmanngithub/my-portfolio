"use client"

import Image from "next/image"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import GitHubIcon from "@mui/icons-material/GitHub"
import TelegramIcon from "@mui/icons-material/Telegram"
import MailOutlineIcon from "@mui/icons-material/MailOutlineRounded"
import { cn } from "@/lib/utils"
import { assetUrl } from "@/lib/assets"

const socials = [
  { label: "LinkedIn", href: "https://linkedin.com/in/henglong-loeung-38040b231", icon: LinkedInIcon },
  { label: "GitHub", href: "https://github.com/longmanngithub", icon: GitHubIcon },
  { label: "Telegram", href: "https://t.me/LongFromTelegram", icon: TelegramIcon },
  { label: "Email", href: "mailto:henglong0000@gmail.com", icon: MailOutlineIcon },
]

/* Space-themed personality doodles — hand-drawn-style stars and a dashed
   orbiting planet, echoing the sketch-in-the-corner treatment. */
function SpaceDoodles() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      overflow="hidden"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden"
      viewBox="0 0 100 160"
      preserveAspectRatio="none"
      fill="none"
    >
      <g className="text-white" fill="currentColor">
        <path
          d="M14 8 L15.2 11.4 L18.6 12.6 L15.2 13.8 L14 17.2 L12.8 13.8 L9.4 12.6 L12.8 11.4 Z"
          opacity="0.35"
        />
        <path
          d="M87 5.5 L87.8 7.7 L90 8.5 L87.8 9.3 L87 11.5 L86.2 9.3 L84 8.5 L86.2 7.7 Z"
          opacity="0.25"
        />
        <circle cx="24" cy="16" r="0.55" opacity="0.4" />
        <circle cx="77" cy="11" r="0.45" opacity="0.35" />
        <circle cx="50" cy="4.5" r="0.4" opacity="0.3" />
        <circle cx="6" cy="15" r="0.4" opacity="0.3" />
      </g>
      {/* Safely tucked inside the card boundaries so dashed strokes never bleed into adjacent sections */}
      <g
        className="text-primary"
        stroke="currentColor"
        transform="translate(80 144) rotate(-16)"
        opacity="0.22"
      >
        <ellipse cx="0" cy="0" rx="8" ry="3.4" strokeWidth="0.6" strokeDasharray="1.4 2.2" />
        <circle cx="8" cy="0" r="1.4" fill="currentColor" stroke="none" />
      </g>
    </svg>
  )
}

export function ProfileCard() {
  return (
    <div
      className={cn(
        // Navy reads as a nice grounding accent against the light theme's
        // off-white page, but the same saturated navy on the pitch-black
        // dark theme looks like a mismatched, overly loud blue block —
        // so dark mode gets a near-black tone (barely-there navy) with a
        // soft ring for definition instead of relying on a shadow, since a
        // shadow is invisible against a black page anyway.
        "relative overflow-hidden rounded-[1.75rem] bg-[#0f2338] p-5 text-white shadow-[0_30px_60px_-20px_rgba(16,35,59,0.45)]",
        "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:z-20 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/30 dark:before:via-white/15 before:to-transparent",
        "dark:bg-[#0a0f16] dark:shadow-none dark:ring-1 dark:ring-white/10",
        "isolate [transform:translateZ(0)]"
      )}
    >
      <SpaceDoodles />
      <div className="relative z-10">
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-inner">
          <Image
            src={assetUrl("/profile.png")}
            alt="Henglong Loeung"
            fill
            className="object-cover"
            priority
          />
        </div>

        <h2 className="mt-6 text-center text-2xl font-bold tracking-tight">
          Henglong Loeung
        </h2>
        <p className="mx-auto mt-2 max-w-[15rem] text-center text-sm leading-relaxed text-white/65">
          A software engineer and project manager who leads teams building
          scalable, AI-powered systems from architecture to production.
        </p>

        <div className="mt-5 flex justify-center gap-5">
          {socials.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={label}
              className="text-primary transition-all duration-150 hover:-translate-y-0.5 hover:text-primary/80 active:scale-90"
            >
              <Icon style={{ fontSize: 20 }} />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
