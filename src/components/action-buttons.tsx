"use client"

import { useState, useEffect } from "react"
import { Heart, ShoppingCart, HeartOff, Check } from "lucide-react"
import { motion } from "framer-motion"
import { useWishlistStore } from "@/stores/wishlist-store"
import { useCartStore } from "@/stores/cart-store"
import { useToastStore } from "@/stores/toast-store"

interface ActionButtonsProps {
  id: string
  title: string
  type: string
  price?: number
  imageUrl?: string
}

export function ActionButtons({ id, title, type, price, imageUrl }: ActionButtonsProps) {
  const [liked, setLiked] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore()
  const { addToCart } = useCartStore()
  const { addToast } = useToastStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  const inWishlist = mounted ? isInWishlist(id) : false

  const handleLike = () => {
    setLiked(!liked)
    if (!liked) {
      addToast(`${title} ajouté aux favoris`, 'success')
    }
  }

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(id)
      addToast(`${title} retiré de la wishlist`, 'info')
    } else {
      addToWishlist({ id, title, type, price, imageUrl })
      addToast(`${title} ajouté à la wishlist`, 'success')
    }
  }

  const handleCart = () => {
    addToCart({ id, title, type, price, imageUrl })
    addToast(`${title} ajouté au panier`, 'success')
  }

  return (
    <div className="flex gap-2 mt-4">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleLike}
        className="p-2 rounded-full bg-secondary/10 hover:bg-secondary/20 transition-colors"
        title="J'aime"
      >
        {liked ? (
          <Heart className="w-5 h-5 text-red-500 fill-red-500" />
        ) : (
          <Heart className="w-5 h-5 text-secondary" />
        )}
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleWishlist}
        className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
        title={inWishlist ? "Retirer de la wishlist" : "Ajouter à la wishlist"}
      >
        {inWishlist ? (
          <HeartOff className="w-5 h-5 text-primary" />
        ) : (
          <Heart className="w-5 h-5 text-primary" />
        )}
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleCart}
        className="p-2 rounded-full bg-accent/10 hover:bg-accent/20 transition-colors"
        title="Ajouter au panier"
      >
        <ShoppingCart className="w-5 h-5 text-accent" />
      </motion.button>
    </div>
  )
}
