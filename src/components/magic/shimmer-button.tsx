"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ShimmerButtonProps {
  children: React.ReactNode
  className?: string
  shimmerColor?: string
  shimmerSize?: string
  shimmerDuration?: number
  onClick?: () => void
  disabled?: boolean
}

export function ShimmerButton({
  children,
  className,
  shimmerColor = "#ffffff",
  shimmerSize = "105%",
  shimmerDuration = 2,
  onClick,
  disabled,
}: ShimmerButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative inline-flex overflow-hidden rounded-lg bg-primary px-8 py-4 text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        className="absolute inset-0 flex h-full w-full"
        style={{
          background: `linear-gradient(115deg, transparent 40%, ${shimmerColor} 45%, ${shimmerColor} 50%, transparent 54%)`,
          backgroundSize: shimmerSize,
        }}
        animate={{
          x: ["0%", "200%", "-200%", "0%"],
        }}
        transition={{
          duration: shimmerDuration,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}