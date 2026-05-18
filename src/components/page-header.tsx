"use client"

import { motion } from 'framer-motion'
import { FadeIn } from '@/components/fade-in'
import { GridBackground } from '@/components/aceternity/grid-background'

interface PageHeaderProps {
  title: string
  description?: string
  icon?: React.ReactNode
}

export function PageHeader({ title, description, icon }: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden bg-secondary text-secondary-foreground">
      <GridBackground />
      <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeIn direction="up" delay={0.1}>
            <div className="flex items-center gap-4 mb-4">
              {icon && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, type: 'spring' }}
                  className="w-16 h-16 bg-secondary-foreground/20 rounded-2xl flex items-center justify-center backdrop-blur-sm"
                >
                  {icon}
                </motion.div>
              )}
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold mb-4"
            >
              {title}
            </motion.h1>
            {description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-lg sm:text-xl md:text-2xl opacity-90 max-w-3xl"
              >
                {description}
              </motion.p>
            )}
          </FadeIn>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
    </div>
  )
}
