"use client"

import { motion } from 'framer-motion'
import { useState, useCallback, useMemo } from 'react'
import { CalendarHeart, Droplets, Moon, Sparkles, Sun, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

const cyclePhases = [
  { name: 'Menstrual', days: '1-5', color: '#ff9bbc', icon: Droplets, description: 'Rest and gentle self-care' },
  { name: 'Follicular', days: '6-13', color: '#ffb347', icon: Sun, description: 'Energy levels rising' },
  { name: 'Ovulation', days: '14-16', color: '#87ceeb', icon: Sparkles, description: 'Peak energy and focus' },
  { name: 'Luteal', days: '17-28', color: '#dda0dd', icon: Moon, description: 'Time for reflection' },
]

const symptomOptions = [
  'Cramps', 'Headache', 'Mood Changes', 'Bloating', 'Fatigue', 'Cravings', 'Back Pain', 'Tender Breasts'
]

function getPhaseFromDay(day: number) {
  if (day >= 1 && day <= 5) return 0
  if (day >= 6 && day <= 13) return 1
  if (day >= 14 && day <= 16) return 2
  return 3
}

export function PeriodTracker() {
  const [currentDay, setCurrentDay] = useState(14)
  const [cycleLength, setCycleLength] = useState(28)
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [lastPeriodDate] = useState(new Date(Date.now() - 14 * 24 * 60 * 60 * 1000))
  
  const currentPhaseIndex = useMemo(() => getPhaseFromDay(currentDay), [currentDay])
  const currentPhase = cyclePhases[currentPhaseIndex]
  
  const daysUntilNextPeriod = useMemo(() => {
    return Math.max(0, cycleLength - currentDay)
  }, [cycleLength, currentDay])
  
  const progress = (currentDay / cycleLength) * 100
  
  const toggleSymptom = useCallback((symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    )
  }, [])
  
  const handleDayChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const day = Math.min(Math.max(1, parseInt(e.target.value) || 1), cycleLength)
    setCurrentDay(day)
  }, [cycleLength])
  
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
            <CalendarHeart className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Cycle Awareness</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Period Tracker</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Understand your cycle with visual tracking and personalized insights for every phase.
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Circular Tracker */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-8 flex flex-col items-center"
          >
            <div className="relative w-64 h-64 sm:w-72 sm:h-72">
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
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="url(#cycleGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${progress * 2.83} 283`}
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
                <div className="text-5xl sm:text-6xl font-bold gradient-text">Day {currentDay}</div>
                <div className="text-muted-foreground mt-2 flex items-center gap-2">
                  <currentPhase.icon className="w-4 h-4" style={{ color: currentPhase.color }} />
                  {currentPhase.name} Phase
                </div>
              </div>
            </div>
            
            {/* Day selector */}
            <div className="w-full mt-8">
              <label className="text-sm text-muted-foreground mb-2 block">Adjust current day:</label>
              <input
                type="range"
                min={1}
                max={cycleLength}
                value={currentDay}
                onChange={(e) => setCurrentDay(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer bg-muted/30"
                style={{
                  background: `linear-gradient(to right, #ffb6d9 0%, #d4b8ff ${progress}%, #e5e5e5 ${progress}%, #e5e5e5 100%)`,
                }}
              />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>Day 1</span>
                <span>Day {cycleLength}</span>
              </div>
            </div>
            
            {/* Next period countdown */}
            <div className="mt-6 glass-card rounded-2xl px-6 py-4 text-center w-full">
              <div className="text-sm text-muted-foreground mb-1">Next period in</div>
              <div className="text-2xl font-bold gradient-text">{daysUntilNextPeriod} days</div>
              <div className="text-xs text-muted-foreground mt-1">
                Estimated: {new Date(Date.now() + daysUntilNextPeriod * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </div>
            </div>
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
                  <div
                    key={phase.name}
                    className={`flex items-center gap-4 p-3 rounded-xl transition-all ${
                      index === currentPhaseIndex
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
                    {index === currentPhaseIndex && (
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
                        Current
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Symptoms */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-3xl p-6"
            >
              <h3 className="text-lg font-semibold mb-4">Log Symptoms</h3>
              <div className="flex flex-wrap gap-2">
                {symptomOptions.map((symptom) => (
                  <button
                    key={symptom}
                    onClick={() => toggleSymptom(symptom)}
                    className={`px-4 py-2 rounded-full text-sm transition-all ${
                      selectedSymptoms.includes(symptom)
                        ? 'bg-gradient-to-r from-primary to-rose text-white'
                        : 'glass hover:bg-white/20'
                    }`}
                  >
                    {selectedSymptoms.includes(symptom) && <Check className="w-3 h-3 inline mr-1" />}
                    {symptom}
                  </button>
                ))}
              </div>
              {selectedSymptoms.length > 0 && (
                <Button className="w-full mt-4 bg-gradient-to-r from-primary to-rose text-white rounded-xl">
                  Save Symptoms ({selectedSymptoms.length})
                </Button>
              )}
            </motion.div>
            
            {/* AI Insight */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-3xl p-6 bg-gradient-to-br from-lavender/20 to-soft-pink/20"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-rose flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Phase Insight</h3>
                  <p className="text-sm text-muted-foreground">
                    {currentPhase.description}. {currentPhaseIndex === 3 
                      ? "Energy levels may dip this week. Consider gentle activities like yoga and prioritize rest."
                      : currentPhaseIndex === 2 
                      ? "This is your peak energy time. Great for important meetings and physical activities."
                      : currentPhaseIndex === 1
                      ? "Your energy is building. Perfect time to start new projects or habits."
                      : "Focus on rest and comfort. Warm drinks and light stretching can help."}
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
