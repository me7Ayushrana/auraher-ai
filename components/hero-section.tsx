"use client"

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { AIOrb } from './hero-scene'
import { ArrowRight, Play, Sparkles, Heart, Brain, Flower2 } from 'lucide-react'

const floatingIcons = [
  { Icon: Heart, color: 'text-rose', position: 'top-20 left-10', delay: 0 },
  { Icon: Brain, color: 'text-lavender', position: 'top-40 right-20', delay: 0.2 },
  { Icon: Flower2, color: 'text-peach', position: 'bottom-40 left-20', delay: 0.4 },
  { Icon: Sparkles, color: 'text-primary', position: 'bottom-20 right-10', delay: 0.6 },
]

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-24">
      {/* Floating Icons */}
      {floatingIcons.map(({ Icon, color, position, delay }, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + 0.5, duration: 0.5 }}
          className={`absolute ${position} hidden lg:block`}
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay }}
            className="p-4 glass-card rounded-2xl"
          >
            <Icon className={`w-8 h-8 ${color}`} />
          </motion.div>
        </motion.div>
      ))}
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">AI-Powered Wellness Journey</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6"
          >
            <span className="text-foreground">Your AI</span>
            <br />
            <span className="gradient-text">Wellness</span>
            <br />
            <span className="text-foreground">Companion</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0"
          >
            Experience personalized wellness with AI that understands you. Track your mood, cycle, and mental health with a companion that truly cares.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-rose hover:opacity-90 text-white rounded-full px-8 py-6 text-lg glow group"
              >
                Track My Wellness
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 py-6 text-lg border-2 border-primary/30 hover:border-primary/50 hover:bg-primary/5 group"
              >
                <Play className="mr-2 w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                Start My Journey
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex gap-8 mt-12 justify-center lg:justify-start"
          >
            {[
              { value: '2M+', label: 'Active Users' },
              { value: '98%', label: 'Satisfaction' },
              { value: '4.9', label: 'App Rating' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Right Content - AI Orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex justify-center items-center relative"
        >
          <div className="relative">
            {/* Outer glow rings */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -inset-12 rounded-full border border-primary/20"
            />
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
              className="absolute -inset-20 rounded-full border border-rose/15"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 6, repeat: Infinity, delay: 1 }}
              className="absolute -inset-28 rounded-full border border-lavender/10"
            />
            
            <AIOrb />
            
            {/* Floating chat bubbles */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="absolute -left-16 top-0 glass-card rounded-2xl rounded-bl-none px-4 py-3 max-w-[140px]"
            >
              <p className="text-xs text-muted-foreground">{"How are you feeling today?"}</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3 }}
              className="absolute -right-12 bottom-8 glass-card rounded-2xl rounded-br-none px-4 py-3 max-w-[120px]"
            >
              <p className="text-xs text-muted-foreground">{"I'm here for you ♥"}</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground">Scroll to explore</span>
          <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
