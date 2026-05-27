"use client"

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play, Sparkles } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-soft-pink/30 via-background to-lavender/20 -z-10" />
      
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">AI-Powered Wellness Journey</span>
          </div>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
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
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Experience personalized wellness with AI that understands you. Track your mood, cycle, and mental health with a companion that truly cares.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-rose hover:opacity-90 text-white rounded-full px-8 py-6 text-lg"
          >
            Start Your Journey
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          
          <Button
            size="lg"
            variant="outline"
            className="rounded-full px-8 py-6 text-lg border-2 border-primary/30 hover:border-primary/50 hover:bg-primary/5"
          >
            <Play className="mr-2 w-5 h-5 text-primary" />
            Watch Demo
          </Button>
        </motion.div>
        
        {/* AI Orb visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative mx-auto w-48 h-48 md:w-64 md:h-64"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-rose/15 to-lavender/20 blur-2xl" />
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-soft-pink via-lavender/80 to-peach opacity-90" />
          <div className="absolute inset-8 rounded-full glass flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-primary to-rose flex items-center justify-center">
              <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-white" />
            </div>
          </div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-muted-foreground">Scroll to explore</span>
            <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center pt-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-primary"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
