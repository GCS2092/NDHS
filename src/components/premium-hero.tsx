"use client"

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface PremiumHeroProps {
  title: string
  description: string
  children?: ReactNode
  backgroundImage?: string
  overlay?: boolean
}

export function PremiumHero({ title, description, children, backgroundImage, overlay = true }: PremiumHeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
    >
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          {overlay && (
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />
          )}
        </div>
      )}
      
      <motion.div
        variants={contentVariants}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground mb-6">
          {title}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-foreground/70 mb-8 max-w-2xl mx-auto">
          {description}
        </p>
        {children && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            {children}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
