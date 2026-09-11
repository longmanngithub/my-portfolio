"use client"

import { useState } from "react"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import CheckIcon from "@mui/icons-material/Check"
import CodeIcon from "@mui/icons-material/Code"
import { cn } from "@/lib/utils"

interface AppleCodeViewerProps {
  sectionLabel?: string
  title?: string
  description?: string
  fileName: string
  language?: string
  code: string
  className?: string
}

export function AppleCodeViewer({
  sectionLabel = "Code Implementation",
  title = "Core Architecture Sample",
  description,
  fileName,
  language,
  code,
  className,
}: AppleCodeViewerProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }

  const lines = code.trim().split("\n")

  return (
    <section className={cn("max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16", className)}>
      <div className="mb-8 sm:mb-12 max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-primary font-semibold mb-2">
          {sectionLabel}
        </p>
        <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
      </div>

      <div
        className={cn(
          "relative overflow-hidden rounded-2xl",
          "border border-black/[0.08] dark:border-white/[0.12]",
          "bg-[#0d1117] text-white shadow-[0_20px_45px_-12px_rgba(0,0,0,0.5)]",
          "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:z-20 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/30 dark:before:via-white/20 before:to-transparent"
        )}
      >
        {/* Apple Developer Title Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.04] border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <CodeIcon style={{ fontSize: 16 }} className="text-primary" />
            <span className="font-mono text-xs text-white/80 font-medium">
              {fileName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {language && (
              <span className="rounded-md bg-white/[0.08] px-2 py-0.5 font-mono text-[10px] text-white/60 uppercase">
                {language}
              </span>
            )}
            <button
              type="button"
              onClick={copyToClipboard}
              className="inline-flex h-7 items-center gap-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] px-2.5 text-xs text-white/80 transition-all active:scale-95"
              aria-label="Copy code to clipboard"
            >
              {copied ? (
                <>
                  <CheckIcon style={{ fontSize: 13 }} className="text-emerald-400" />
                  <span className="text-[11px] text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <ContentCopyIcon style={{ fontSize: 13 }} />
                  <span className="text-[11px]">Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="overflow-x-auto p-4 sm:p-5 text-[12px] sm:text-[13px] font-mono leading-relaxed">
          <table className="w-full border-collapse">
            <tbody>
              {lines.map((line, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02]">
                  <td className="w-8 select-none pr-4 text-right text-white/25 align-top">
                    {idx + 1}
                  </td>
                  <td className="whitespace-pre text-white/90">
                    {line}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
