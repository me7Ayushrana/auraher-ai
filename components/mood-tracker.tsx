"use client"

import { motion } from 'framer-motion'
import { useState, useCallback } from 'react'
import { Sparkles, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

const moods = [
  { emoji: '😊', label: 'Happy', color: 'from-yellow-300 to-orange-300' },
  { emoji: '😌', label: 'Calm', color: 'from-green-300 to-teal-300' },
  { emoji: '🥰', label: 'Loved', color: 'from-pink-300 to-rose-300' },
  { emoji: '😔', label: 'Sad', color: 'from-blue-300 to-indigo-300' },
  { emoji: '😤', label: 'Stressed', color: 'from-red-300 to-orange-300' },
  { emoji: '😴', label: 'Tired', color: 'from-purple-300 to-indigo-300' },
]

const aiInsights: Record<string, string> = {
  Happy: "Wonderful! Consider journaling about what made you happy today to revisit during tougher times.",
  Calm: "Great state of mind! This is a perfect time for reflection or creative activities.",
  Loved: "Beautiful feeling! Expressing gratitude to those who make you feel loved strengthens bonds.",
  Sad: "It is okay to feel sad. Consider a gentle walk, talking to someone you trust, or some self-care.",
  Stressed: "Take a moment to breathe deeply. Breaking tasks into smaller steps can help reduce overwhelm.",
  Tired: "Your body is asking for rest. Prioritize sleep tonight and consider limiting screen time.",
}

export function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [moodLog, setMoodLog] = useState<Array<{ mood: number; timestamp: Date }>>([])
  const [showSaved, setShowSaved] = useState(false)
  
  const handleMoodSelect = useCallback((index: number) => {
    setSelectedMood(index)
    setShowSaved(false)
  }, [])
  
  const handleLogMood = useCallback(() => {
    if (selectedMood === null) return
    setMoodLog(prev => [...prev, { mood: selectedMood, timestamp: new Date() }])
    setShowSaved(true)
    setTimeout(() => setShowSaved(false), 2000)
  }, [selectedMood])
  
  // Calculate today's mood stats from logged moods
  const todayMoods = moodLog.filter(log => {
    const today = new Date()
    return log.timestamp.toDateString() === today.toDateString()
  })
  
  return (
    <section id="features" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">AI-Powered Tracking</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Smart Mood</span> Tracker
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Track how you feel and get personalized insights to understand yourself better.
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Mood Selection */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-8"
          >
            <h3 className="text-xl font-semibold mb-6">How are you feeling today?</h3>
            <div className="grid grid-cols-3 gap-4">
              {moods.map((mood, index) => (
                <button
                  key={mood.label}
                  onClick={() => handleMoodSelect(index)}
                  className={`relative p-6 rounded-2xl transition-all duration-200 ${
                    selectedMood === index
                      ? `bg-gradient-to-br ${mood.color} shadow-lg`
                      : 'glass hover:bg-white/20'
                  }`}
                >
                  <span className="text-4xl block mb-2">{mood.emoji}</span>
                  <span className="text-sm font-medium">{mood.label}</span>
                  
                  {selectedMood === index && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
            
            {selectedMood !== null && (
              <div className="mt-6 space-y-4">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-primary/10 to-rose/10 border border-primary/20">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">AI Insight: </span>
                    {aiInsights[moods[selectedMood].label]}
                  </p>
                </div>
                
                <Button 
                  onClick={handleLogMood}
                  className="w-full bg-gradient-to-r from-primary to-rose text-white rounded-xl"
                >
                  {showSaved ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Mood Logged!
                    </>
                  ) : (
                    'Log This Mood'
                  )}
                </Button>
              </div>
            )}
          </motion.div>
          
          {/* Mood Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-8"
          >
            <h3 className="text-xl font-semibold mb-6">Today&apos;s Mood Log</h3>
            
            {moodLog.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">📝</div>
                <p className="text-muted-foreground">No moods logged yet today.</p>
                <p className="text-sm text-muted-foreground mt-2">Select a mood to get started!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {moodLog.slice(-5).reverse().map((log, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-xl glass"
                  >
                    <span className="text-2xl">{moods[log.mood].emoji}</span>
                    <div className="flex-1">
                      <div className="font-medium">{moods[log.mood].label}</div>
                      <div className="text-xs text-muted-foreground">
                        {log.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {moodLog.length > 0 && (
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-soft-pink/30 to-transparent">
                  <div className="text-2xl font-bold gradient-text">{todayMoods.length}</div>
                  <div className="text-xs text-muted-foreground">Moods Logged Today</div>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-lavender/30 to-transparent">
                  <div className="text-2xl font-bold gradient-text">{moodLog.length}</div>
                  <div className="text-xs text-muted-foreground">Total Entries</div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
