"use client"

import { useState } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from "framer-motion"
import Image from "next/image"
import { X, ZoomIn } from "lucide-react"

interface ImageZoomProps {
  src: string
  alt: string
  className?: string
}

export function ImageZoom({ src, alt, className }: ImageZoomProps) {
  const [isZoomed, setIsZoomed] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isTapped, setIsTapped] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const handlePan = (event: PanInfo, info: PanInfo) => {
    x.set(info.offset.x)
    y.set(info.offset.y)
  }

  const handlePanEnd = () => {
    x.set(0)
    y.set(0)
  }

  const handleTap = () => {
    setIsTapped(true)
    setTimeout(() => setIsTapped(false), 200)
    setIsZoomed(true)
  }

  return (
    <>
      <motion.div
        className={`relative overflow-hidden cursor-pointer ${className}`}
        whileHover={{ scale: 1.05 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onTap={handleTap}
        onTapCancel={() => setIsTapped(false)}
        onClick={() => setIsZoomed(true)}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {(isHovered || isTapped) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/20 flex items-center justify-center"
          >
            <ZoomIn className="w-8 h-8 text-white" />
          </motion.div>
        )}
      </motion.div>

      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setIsZoomed(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-5xl max-h-[90vh] w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              drag
              dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
              dragElastic={0.1}
              onPan={handlePan}
              onPanEnd={handlePanEnd}
              style={{ x, y }}
            >
              <button
                onClick={() => setIsZoomed(false)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
              >
                <X className="w-8 h-8" />
              </button>
              <img
                src={src}
                alt={alt}
                className="w-full h-full object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
