"use client"

import { motion, Variants } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { GridBackground } from "@/components/aceternity/grid-background"
import Image from "next/image"

interface HeroSectionProps {
  title: string
  description: string
  ctaButtons?: React.ReactNode
  backgroundImage?: string
}

export function HeroSection({ title, description, ctaButtons, backgroundImage }: HeroSectionProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  }

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {backgroundImage ? (
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ) : (
        <GridBackground />
      )}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4 text-center"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.h1
          className={`text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 ${backgroundImage ? 'text-white' : 'text-primary'}`}
          variants={itemVariants}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h1>
        <motion.p
          className={`text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto ${backgroundImage ? 'text-white/95' : 'text-foreground/80'}`}
          variants={itemVariants}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {description}
        </motion.p>
        {ctaButtons && (
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {ctaButtons}
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
