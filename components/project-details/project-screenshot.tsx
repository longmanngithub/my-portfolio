"use client"

import { useState } from "react"
import Image from "next/image"
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined"
import { cn } from "@/lib/utils"

interface ProjectScreenshotProps {
  src: string
  alt: string
  aspectRatio?: string
  priority?: boolean
  className?: string
}

export function ProjectScreenshot({
  src,
  alt,
  aspectRatio = "aspect-[16/10] sm:aspect-[16/9]",
  priority = false,
  className,
}: ProjectScreenshotProps) {
  const [errored, setErrored] = useState(false)

  return (
    <div className={cn("relative w-full overflow-hidden bg-secondary/40", aspectRatio, className)}>
      {!errored ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top"
          sizes="(max-width: 1024px) 100vw, 1000px"
          priority={priority}
          onError={() => setErrored(true)}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 text-muted-foreground p-6 text-center">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary text-primary">
            <ImageOutlinedIcon style={{ fontSize: 24 }} />
          </div>
          <span className="text-xs font-medium font-mono text-muted-foreground">
            Screenshot coming soon
          </span>
        </div>
      )}
    </div>
  )
}
