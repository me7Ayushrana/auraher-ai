"use client"

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Sparkles, TrendingUp } from 'lucide-react'

const moods = [
  { emoji: '😊', label: 'Happy', color: 'from-yellow-300 to-orange-300' },
  { emoji: '😌', label: 'Calm', color: 'from-green-300 to-teal-300' },
  { emoji: '🥰', label: 'Loved', color: 'from-pink-300 to-rose-300' },
  { emoji: '😔', label: 'Sad', color: 'from-blue-300 to-indigo-300' },
  { emoji: '😤', label: 'Stressed', color: 'from-red-300 to-orange-300' },
  { emoji: '😴', label: 'Tired', color: 'from-purple-300 to-indigo-300' },
]

const weekData = [
  { day: 'Mon', mood: 4, color: '#ffb6d9' },
  { day: 'Tue', mood: 5, color: '#d4b8ff' },
  { day: 'Wed', mood: 3, color: '#ffe4d4' },
  { day: 'Thu', mood: 4, color: '#ffb6d9' },
  { day: 'Fri', mood: 5, color: '#d4b8ff' },
  { day: 'Sat', mood: 4, color: '#ffb6d9' },
  { day: 'Sun', mood: 5, color: '#d4b8ff' },
]

export function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [hoveredMood, setHoveredMood] = useState<number | null>(null)
  
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
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-4"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">AI-Powered Tracking</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Smart Mood</span> Tracker
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our AI learns your emotional patterns and provides personalized insights to help you understand yourself better.
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Mood Selection */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-8"
          >
            <h3 className="text-xl font-semibold mb-6">{"How are you feeling today?"}</h3>
            <div className="grid grid-cols-3 gap-4">
              {moods.map((mood, index) => (
                <motion.button
                  key={mood.label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedMood(index)}
                  onMouseEnter={() => setHoveredMood(index)}
                  onMouseLeave={() => setHoveredMood(null)}
                  className={`relative p-6 rounded-2xl transition-all duration-300 ${
                    selectedMood === index
                      ? `bg-gradient-to-br ${mood.color} shadow-lg`
                      : 'glass hover:bg-white/20'
                  }`}
                >
                  <motion.span
                    animate={{
                      scale: hoveredMood === index ? 1.2 : 1,
                    }}
                    className="text-4xl block mb-2"
                  >
                    {mood.emoji}
                  </motion.span>
                  <span className="text-sm font-medium">{mood.label}</span>
                  
                  {selectedMood === index && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                    >
                      <span className="text-white text-xs">✓</span>
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
            
            {selectedMood !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-primary/10 to-rose/10 border border-primary/20"
              >
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">AI Insight:</span> You often feel {moods[selectedMood].label.toLowerCase()} on days like this. Consider taking a moment for self-care today. ✨
                </p>
              </motion.div>
            )}
          </motion.div>
          
          {/* Mood Graph */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">This Week</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span>+12% improvement</span>
              </div>
            </div>
            
            <div className="flex items-end justify-between gap-2 h-48 mb-4">
              {weekData.map((day, index) => (
                <motion.div
                  key={day.day}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${day.mood * 20}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex-1 flex flex-col items-center gap-2"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-full rounded-t-xl transition-all duration-300 cursor-pointer"
                    style={{
                      height: '100%',
                      background: `linear-gradient(to top, ${day.color}50, ${day.color})`,
                    }}
                  />
                </motion.div>
              ))}
            </div>
            
            <div className="flex justify-between">
              {weekData.map((day) => (
                <span key={day.day} className="text-xs text-muted-foreground flex-1 text-center">
                  {day.day}
                </span>
              ))}
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-soft-pink/30 to-transparent">
                <div className="text-2xl font-bold gradient-text">85%</div>
                <div className="text-xs text-muted-foreground">Positive Days</div>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-lavender/30 to-transparent">
                <div className="text-2xl font-bold gradient-text">7 days</div>
                <div className="text-xs text-muted-foreground">Current Streak</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
