"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface MovingBorderProps {
  children: React.ReactNode
  className?: string
  duration?: number
  borderRadius?: string
}

export function MovingBorder({
  children,
  className,
  duration = 2000,
  borderRadius = "1rem",
}: MovingBorderProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-[var(--border-radius)]", className)} style={{ "--border-radius": borderRadius } as React.CSSProperties}>
      <motion.div
        className="absolute inset-0"
        style={{
          background: "conic-gradient(from 0deg, transparent 0 340deg, #3b82f6 360deg)",
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: duration / 1000,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <div className="absolute inset-[2px] rounded-[calc(var(--border-radius)-2px)] bg-background" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
