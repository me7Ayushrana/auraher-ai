"use client"

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Flower2, Heart, Brain, Wind, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'

const meditationCards = [
  { title: 'Morning Calm', duration: '10 min', category: 'Meditation', gradient: 'from-soft-pink to-lavender', icon: Flower2 },
  { title: 'Stress Relief', duration: '15 min', category: 'Breathing', gradient: 'from-lavender to-rose', icon: Wind },
  { title: 'Sleep Better', duration: '20 min', category: 'Sleep', gradient: 'from-peach to-soft-pink', icon: Brain },
  { title: 'Self Love', duration: '12 min', category: 'Affirmations', gradient: 'from-rose to-primary', icon: Heart },
]

const affirmations = [
  "You are worthy of love and happiness",
  "Your feelings are valid and important",
  "You have the strength to overcome any challenge",
  "You deserve peace and calm in your life",
  "You are beautiful inside and out",
]

export function SelfCareSection() {
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale')
  const [breathCount, setBreathCount] = useState(0)
  const [currentAffirmation, setCurrentAffirmation] = useState(0)
  const [isBreathing, setIsBreathing] = useState(false)
  
  useEffect(() => {
    if (!isBreathing) return
    
    const phases = [
      { phase: 'inhale' as const, duration: 4000 },
      { phase: 'hold' as const, duration: 4000 },
      { phase: 'exhale' as const, duration: 4000 },
    ]
    
    let phaseIndex = 0
    const runPhase = () => {
      setBreathPhase(phases[phaseIndex].phase)
      setBreathCount((prev) => prev + 1)
      phaseIndex = (phaseIndex + 1) % phases.length
    }
    
    runPhase()
    const interval = setInterval(runPhase, 4000)
    
    return () => clearInterval(interval)
  }, [isBreathing])
  
  const nextAffirmation = () => {
    setCurrentAffirmation((prev) => (prev + 1) % affirmations.length)
  }
  
  const prevAffirmation = () => {
    setCurrentAffirmation((prev) => (prev - 1 + affirmations.length) % affirmations.length)
  }
  
  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-4"
          >
            <Flower2 className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Inner Peace</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Self-Care & <span className="gradient-text">Mental Wellness</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Nurture your mind and soul with guided meditations, breathing exercises, and daily affirmations.
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Meditation Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 glass-card rounded-3xl p-6"
          >
            <h3 className="text-lg font-semibold mb-6">Guided Sessions</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {meditationCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className={`relative overflow-hidden rounded-2xl p-6 cursor-pointer bg-gradient-to-br ${card.gradient} text-white`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <card.icon className="w-8 h-8 mb-4" />
                  <h4 className="font-semibold text-lg mb-1">{card.title}</h4>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <span>{card.category}</span>
                    <span>•</span>
                    <span>{card.duration}</span>
                  </div>
                  <motion.div
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    className="absolute bottom-0 left-0 h-1 bg-white/30"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Breathing Exercise */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-6 flex flex-col items-center justify-center"
          >
            <h3 className="text-lg font-semibold mb-6">Breathing Exercise</h3>
            
            <div className="relative w-48 h-48 mb-6">
              <motion.div
                animate={{
                  scale: breathPhase === 'inhale' ? 1.3 : breathPhase === 'hold' ? 1.3 : 1,
                }}
                transition={{ duration: 4, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full bg-gradient-to-br from-lavender/30 to-soft-pink/30 blur-xl"
              />
              <motion.div
                animate={{
                  scale: breathPhase === 'inhale' ? 1.2 : breathPhase === 'hold' ? 1.2 : 1,
                }}
                transition={{ duration: 4, ease: 'easeInOut' }}
                className="absolute inset-4 rounded-full bg-gradient-to-br from-primary/20 to-rose/20"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: breathPhase === 'inhale' ? 1.1 : breathPhase === 'hold' ? 1.1 : 0.9,
                  }}
                  transition={{ duration: 4, ease: 'easeInOut' }}
                  className="w-24 h-24 rounded-full glass-card flex flex-col items-center justify-center"
                >
                  <span className="text-2xl font-bold gradient-text capitalize">{breathPhase}</span>
                </motion.div>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsBreathing(!isBreathing)}
              className={`px-8 py-3 rounded-full font-medium transition-all ${
                isBreathing
                  ? 'bg-muted text-muted-foreground'
                  : 'bg-gradient-to-r from-primary to-rose text-white glow-sm'
              }`}
            >
              {isBreathing ? 'Pause' : 'Start Breathing'}
            </motion.button>
            
            {breathCount > 0 && (
              <div className="mt-4 text-sm text-muted-foreground">
                {Math.floor(breathCount / 3)} breaths completed
              </div>
            )}
          </motion.div>
        </div>
        
        {/* Affirmations Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 glass-card rounded-3xl p-8 bg-gradient-to-br from-soft-pink/20 via-lavender/20 to-peach/20"
        >
          <div className="flex items-center gap-2 justify-center mb-6">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Daily Affirmations</h3>
          </div>
          
          <div className="flex items-center justify-center gap-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevAffirmation}
              className="p-3 rounded-full glass-card"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            
            <motion.div
              key={currentAffirmation}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center max-w-md"
            >
              <p className="text-xl sm:text-2xl font-medium gradient-text">
                &ldquo;{affirmations[currentAffirmation]}&rdquo;
              </p>
            </motion.div>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextAffirmation}
              className="p-3 rounded-full glass-card"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
          
          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {affirmations.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentAffirmation(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentAffirmation
                    ? 'w-6 bg-gradient-to-r from-primary to-rose'
                    : 'bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
