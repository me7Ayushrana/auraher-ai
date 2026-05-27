"use client"

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export function FloatingHearts() {
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; delay: number; duration: number; size: number }>>([])
  
  useEffect(() => {
    const newHearts = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 6,
      size: 12 + Math.random() * 16,
    }))
    setHearts(newHearts)
  }, [])
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-5">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-primary/30"
          style={{ left: `${heart.x}%`, fontSize: heart.size }}
          initial={{ y: '100vh', opacity: 0, rotate: 0 }}
          animate={{ 
            y: '-10vh', 
            opacity: [0, 0.6, 0.6, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          ♥
        </motion.div>
      ))}
    </div>
  )
}

export function FloatingPetals() {
  const [petals, setPetals] = useState<Array<{ id: number; x: number; delay: number; duration: number; rotation: number }>>([])
  
  useEffect(() => {
    const newPetals = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 12 + Math.random() * 8,
      rotation: Math.random() * 360,
    }))
    setPetals(newPetals)
  }, [])
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-5">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute w-3 h-4 rounded-full bg-gradient-to-br from-soft-pink to-rose opacity-20"
          style={{ left: `${petal.x}%` }}
          initial={{ y: '-5vh', rotate: petal.rotation }}
          animate={{ 
            y: '105vh',
            rotate: petal.rotation + 360,
            x: [0, 30, -30, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}

export function AnimatedStars() {
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([])
  
  useEffect(() => {
    const newStars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 3,
      delay: Math.random() * 3,
    }))
    setStars(newStars)
  }, [])
  
  return (
    <div className="fixed inset-0 pointer-events-none -z-10">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-primary/40"
          style={{ 
            left: `${star.x}%`, 
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{ 
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: star.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export function AnimatedBlobs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-20">
      <motion.div
        className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-lavender/20 blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-soft-pink/20 blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, -60, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-1/3 h-1/3 rounded-full bg-peach/15 blur-3xl"
        animate={{
          x: [0, 60, 0],
          y: [0, 80, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
