"use client"

import { motion } from 'framer-motion'
import { useState, useEffect, useCallback, useRef } from 'react'
import { Flower2, Heart, Brain, Wind, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'
import { Button } from '@/components/ui/button'

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
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('rest')
  const [breathCount, setBreathCount] = useState(0)
  const [currentAffirmation, setCurrentAffirmation] = useState(0)
  const [isBreathing, setIsBreathing] = useState(false)
  const [breathTimer, setBreathTimer] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  
  useEffect(() => {
    if (!isBreathing) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }
    
    const phases: Array<{ phase: 'inhale' | 'hold' | 'exhale'; duration: number }> = [
      { phase: 'inhale', duration: 4 },
      { phase: 'hold', duration: 4 },
      { phase: 'exhale', duration: 4 },
    ]
    
    let phaseIndex = 0
    let secondsInPhase = 0
    
    setBreathPhase(phases[0].phase)
    setBreathTimer(phases[0].duration)
    
    intervalRef.current = setInterval(() => {
      secondsInPhase++
      const currentPhaseDuration = phases[phaseIndex].duration
      
      setBreathTimer(currentPhaseDuration - secondsInPhase)
      
      if (secondsInPhase >= currentPhaseDuration) {
        secondsInPhase = 0
        phaseIndex = (phaseIndex + 1) % phases.length
        setBreathPhase(phases[phaseIndex].phase)
        setBreathTimer(phases[phaseIndex].duration)
        
        if (phaseIndex === 0) {
          setBreathCount(prev => prev + 1)
        }
      }
    }, 1000)
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isBreathing])
  
  const toggleBreathing = useCallback(() => {
    if (isBreathing) {
      setIsBreathing(false)
      setBreathPhase('rest')
      setBreathTimer(0)
    } else {
      setIsBreathing(true)
      setBreathCount(0)
    }
  }, [isBreathing])
  
  const nextAffirmation = useCallback(() => {
    setCurrentAffirmation((prev) => (prev + 1) % affirmations.length)
  }, [])
  
  const prevAffirmation = useCallback(() => {
    setCurrentAffirmation((prev) => (prev - 1 + affirmations.length) % affirmations.length)
  }, [])
  
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-4">
            <Flower2 className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Inner Peace</span>
          </div>
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
                  className={`relative overflow-hidden rounded-2xl p-6 cursor-pointer bg-gradient-to-br ${card.gradient} text-white group hover:shadow-lg transition-shadow`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <card.icon className="w-8 h-8 mb-4" />
                  <h4 className="font-semibold text-lg mb-1">{card.title}</h4>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <span>{card.category}</span>
                    <span>•</span>
                    <span>{card.duration}</span>
                  </div>
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <Play className="w-5 h-5 text-white" />
                    </div>
                  </div>
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
              <div 
                className={`absolute inset-0 rounded-full transition-all duration-1000 ${
                  breathPhase === 'inhale' ? 'scale-110 bg-lavender/30' : 
                  breathPhase === 'hold' ? 'scale-110 bg-primary/20' : 
                  breathPhase === 'exhale' ? 'scale-90 bg-soft-pink/30' :
                  'scale-100 bg-muted/20'
                }`}
              />
              <div 
                className={`absolute inset-4 rounded-full transition-all duration-1000 ${
                  breathPhase === 'inhale' ? 'scale-105 bg-primary/20' : 
                  breathPhase === 'hold' ? 'scale-105 bg-lavender/30' : 
                  breathPhase === 'exhale' ? 'scale-95 bg-rose/20' :
                  'scale-100 bg-muted/10'
                }`}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full glass-card flex flex-col items-center justify-center">
                  <span className="text-xl font-bold gradient-text capitalize">
                    {breathPhase === 'rest' ? 'Ready' : breathPhase}
                  </span>
                  {isBreathing && (
                    <span className="text-2xl font-bold text-primary">{breathTimer}s</span>
                  )}
                </div>
              </div>
            </div>
            
            <Button
              onClick={toggleBreathing}
              className={`px-8 py-3 rounded-full font-medium ${
                isBreathing
                  ? 'bg-muted text-muted-foreground hover:bg-muted/80'
                  : 'bg-gradient-to-r from-primary to-rose text-white'
              }`}
            >
              {isBreathing ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Stop
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Start Breathing
                </>
              )}
            </Button>
            
            {breathCount > 0 && (
              <div className="mt-4 text-sm text-muted-foreground">
                {breathCount} breath cycle{breathCount !== 1 ? 's' : ''} completed
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
          <h3 className="text-lg font-semibold text-center mb-6">Daily Affirmations</h3>
          
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={prevAffirmation}
              className="p-3 rounded-full glass-card hover:bg-white/20 transition-colors"
              aria-label="Previous affirmation"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="text-center max-w-md min-h-[60px] flex items-center justify-center">
              <p className="text-xl sm:text-2xl font-medium gradient-text">
                &ldquo;{affirmations[currentAffirmation]}&rdquo;
              </p>
            </div>
            
            <button
              onClick={nextAffirmation}
              className="p-3 rounded-full glass-card hover:bg-white/20 transition-colors"
              aria-label="Next affirmation"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {affirmations.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentAffirmation(index)}
                aria-label={`Go to affirmation ${index + 1}`}
                className={`h-2 rounded-full transition-all ${
                  index === currentAffirmation
                    ? 'w-6 bg-gradient-to-r from-primary to-rose'
                    : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
