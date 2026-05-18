"use client"

import { motion, Variants } from 'framer-motion'
import { ReactNode } from 'react'

interface PremiumCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
}

export function PremiumCard({ children, className = '', hover = true, onClick }: PremiumCardProps) {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    },
    ...(hover ? {
      hover: {
        y: -4,
        boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.15)',
        transition: {
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94] as const
        }
      }
    } : {})
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      whileHover={hover ? "hover" : undefined}
      onClick={onClick}
      className={`
        bg-card rounded-2xl border border-border/50 
        overflow-hidden shadow-sm
        ${hover ? 'cursor-pointer' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      <div className="p-6">
        {children}
      </div>
    </motion.div>
  )
}
