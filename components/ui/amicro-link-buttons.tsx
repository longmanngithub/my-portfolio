"use client"

import type { ComponentProps, ReactNode } from "react"
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded"
import CheckRoundedIcon from "@mui/icons-material/CheckRounded"
import GitHubIcon from "@mui/icons-material/GitHub"
import StarRoundedIcon from "@mui/icons-material/StarRounded"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ButtonProps = ComponentProps<typeof Button>

type AmicroLinkButtonProps = Omit<ComponentProps<"a">, "children" | "className"> & {
  children: ReactNode
  className?: string
  size?: ButtonProps["size"]
  variant?: ButtonProps["variant"]
}

/** Amicro btn-21: Download icon morphs into a confirmation check. */
export function AmicroDownloadLink({
  children,
  className,
  size = "lg",
  variant = "default",
  ...linkProps
}: AmicroLinkButtonProps) {
  return (
    <Button
      asChild
      size={size}
      variant={variant}
      className={cn("amicro-btn-21", className)}
    >
      <a {...linkProps}>
        <span className="amicro-btn-icon" aria-hidden="true">
          <DownloadRoundedIcon className="amicro-btn-21__download" />
          <CheckRoundedIcon className="amicro-btn-21__check" />
        </span>
        <span>{children}</span>
      </a>
    </Button>
  )
}

/** Amicro btn-2: GitHub icon morphs into a star with small sparkles. */
export function AmicroGitHubLink({
  children,
  className,
  size = "default",
  variant = "default",
  ...linkProps
}: AmicroLinkButtonProps) {
  return (
    <Button
      asChild
      size={size}
      variant={variant}
      className={cn("amicro-btn-2", className)}
    >
      <a {...linkProps}>
        <span className="amicro-btn-icon amicro-btn-2__stage" aria-hidden="true">
          <GitHubIcon className="amicro-btn-2__github" />
          <StarRoundedIcon className="amicro-btn-2__star" />
          <span className="amicro-btn-2__spark amicro-btn-2__spark--one" />
          <span className="amicro-btn-2__spark amicro-btn-2__spark--two" />
        </span>
        <span>{children}</span>
      </a>
    </Button>
  )
}
