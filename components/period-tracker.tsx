"use client"

import { motion } from 'framer-motion'
import { useState } from 'react'
import { CalendarHeart, Droplets, Moon, Sparkles, Sun, Zap } from 'lucide-react'

const cyclePhases = [
  { name: 'Menstrual', days: '1-5', color: '#ff9bbc', icon: Droplets },
  { name: 'Follicular', days: '6-13', color: '#ffb347', icon: Sun },
  { name: 'Ovulation', days: '14-16', color: '#87ceeb', icon: Sparkles },
  { name: 'Luteal', days: '17-28', color: '#dda0dd', icon: Moon },
]

const symptoms = [
  { label: 'Cramps', active: true },
  { label: 'Headache', active: false },
  { label: 'Mood Swings', active: true },
  { label: 'Bloating', active: false },
  { label: 'Fatigue', active: true },
  { label: 'Cravings', active: true },
]

export function PeriodTracker() {
  const [currentDay] = useState(18)
  const cycleLength = 28
  const nextPeriod = 10
  
  const progress = (currentDay / cycleLength) * 100
  const currentPhase = cyclePhases[3] // Luteal phase for demo
  
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
            <CalendarHeart className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Cycle Awareness</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            AI <span className="gradient-text">Period Tracker</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Beautiful cycle visualization with AI-powered predictions and personalized insights for every phase of your journey.
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Circular Tracker */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-8 flex flex-col items-center"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80">
              {/* Background circle */}
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-muted/20"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="url(#cycleGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${progress * 2.83} 283`}
                  initial={{ strokeDasharray: '0 283' }}
                  whileInView={{ strokeDasharray: `${progress * 2.83} 283` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
                <defs>
                  <linearGradient id="cycleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ffb6d9" />
                    <stop offset="50%" stopColor="#d4b8ff" />
                    <stop offset="100%" stopColor="#ffe4d4" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-center"
                >
                  <div className="text-5xl sm:text-6xl font-bold gradient-text">Day {currentDay}</div>
                  <div className="text-muted-foreground mt-2">{currentPhase.name} Phase</div>
                </motion.div>
              </div>
              
              {/* Phase indicators */}
              {cyclePhases.map((phase, index) => {
                const angle = (index * 90 - 45) * (Math.PI / 180)
                const radius = 130
                const x = 50 + radius * Math.cos(angle)
                const y = 50 + radius * Math.sin(angle)
                
                return (
                  <motion.div
                    key={phase.name}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="absolute"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="w-10 h-10 rounded-full flex items-center justify-center glass-card"
                      style={{ backgroundColor: `${phase.color}40` }}
                    >
                      <phase.icon className="w-5 h-5" style={{ color: phase.color }} />
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>
            
            {/* Countdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-center"
            >
              <div className="glass-card rounded-2xl px-8 py-4 inline-flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-rose flex items-center justify-center animate-pulse-glow">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold gradient-text">{nextPeriod} days</div>
                  <div className="text-sm text-muted-foreground">until next period</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Info Cards */}
          <div className="space-y-6">
            {/* Phase Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-3xl p-6"
            >
              <h3 className="text-lg font-semibold mb-4">Cycle Phases</h3>
              <div className="space-y-3">
                {cyclePhases.map((phase, index) => (
                  <motion.div
                    key={phase.name}
                    whileHover={{ x: 5 }}
                    className={`flex items-center gap-4 p-3 rounded-xl transition-all ${
                      phase.name === currentPhase.name
                        ? 'bg-gradient-to-r from-primary/20 to-rose/20 border border-primary/30'
                        : 'hover:bg-white/10'
                    }`}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${phase.color}30` }}
                    >
                      <phase.icon className="w-5 h-5" style={{ color: phase.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{phase.name}</div>
                      <div className="text-xs text-muted-foreground">Days {phase.days}</div>
                    </div>
                    {phase.name === currentPhase.name && (
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
                        Current
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Symptoms */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-3xl p-6"
            >
              <h3 className="text-lg font-semibold mb-4">Log Symptoms</h3>
              <div className="flex flex-wrap gap-2">
                {symptoms.map((symptom) => (
                  <motion.button
                    key={symptom.label}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-full text-sm transition-all ${
                      symptom.active
                        ? 'bg-gradient-to-r from-primary to-rose text-white'
                        : 'glass hover:bg-white/20'
                    }`}
                  >
                    {symptom.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
            
            {/* AI Insight */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="glass-card rounded-3xl p-6 bg-gradient-to-br from-lavender/20 to-soft-pink/20"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-rose flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">AI Insight</h3>
                  <p className="text-sm text-muted-foreground">
                    {"You're in your luteal phase! Energy levels may dip this week. Consider gentle activities like yoga and prioritize rest. Your body is preparing for the next cycle. 💜"}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
