"use client"

import { motion, Variants } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { SpotlightCard } from "@/components/aceternity/spotlight-card"
import Link from "next/link"

interface StaggeredGridProps {
  items: Array<{ title: string; href: string }>
  className?: string
}

export function StaggeredGrid({ items, className }: StaggeredGridProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div ref={ref} className={className}>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {items.map((item, index) => (
          <motion.div key={item.href} variants={itemVariants}>
            <Link href={item.href}>
              <SpotlightCard>
                <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors">
                  {item.title}
                </h3>
              </SpotlightCard>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
