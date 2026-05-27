"use client"

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Baby, Heart, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const weeklyData = [
  { week: 8, size: 'Raspberry', length: '1.6 cm', development: 'Tiny fingers and toes forming' },
  { week: 12, size: 'Lime', length: '5.4 cm', development: 'Reflexes developing, can open and close fingers' },
  { week: 16, size: 'Avocado', length: '11.6 cm', development: 'Can make facial expressions' },
  { week: 20, size: 'Banana', length: '16.4 cm', development: 'Can hear sounds and may respond to music' },
  { week: 24, size: 'Corn', length: '30 cm', development: 'Developing sleep/wake cycles' },
  { week: 28, size: 'Eggplant', length: '37.6 cm', development: 'Eyes can open and close' },
  { week: 32, size: 'Squash', length: '42.4 cm', development: 'Practicing breathing movements' },
  { week: 36, size: 'Honeydew', length: '47.4 cm', development: 'Gaining weight, getting ready!' },
  { week: 40, size: 'Watermelon', length: '51.2 cm', development: 'Full term - ready to meet you!' },
]

const milestones = [
  { week: 8, title: 'First Heartbeat', icon: Heart, color: '#ff9bbc' },
  { week: 12, title: 'First Trimester Complete', icon: Sparkles, color: '#d4b8ff' },
  { week: 20, title: 'Gender Reveal Possible', icon: Baby, color: '#ffb347' },
  { week: 28, title: 'Third Trimester Begins', icon: Heart, color: '#87ceeb' },
]

export function PregnancySection() {
  const [currentWeek, setCurrentWeek] = useState(4)
  const data = weeklyData[currentWeek]
  const progress = ((data.week) / 40) * 100
  
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
            <Baby className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Pregnancy Journey</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Beautiful</span> Pregnancy Experience
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Track your pregnancy journey with interactive visualizations and weekly insights tailored just for you.
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Baby Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-8 text-center"
          >
            <div className="relative">
              {/* Glowing background */}
              <motion.div
                animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-br from-soft-pink/30 via-lavender/20 to-peach/30 rounded-full blur-3xl"
              />
              
              {/* Size visualization */}
              <motion.div
                key={currentWeek}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 py-12"
              >
                <div className="mx-auto w-40 h-40 sm:w-56 sm:h-56 rounded-full bg-gradient-to-br from-soft-pink via-lavender to-peach flex items-center justify-center animate-pulse-glow">
                  <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-full glass flex flex-col items-center justify-center">
                    <span className="text-4xl sm:text-5xl mb-2">👶</span>
                    <div className="text-lg sm:text-xl font-semibold">Week {data.week}</div>
                    <div className="text-sm text-muted-foreground">Size of a {data.size}</div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Week Slider */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentWeek(Math.max(0, currentWeek - 1))}
                  className="p-2 rounded-full glass-card"
                  disabled={currentWeek === 0}
                >
                  <ChevronLeft className="w-5 h-5" />
                </motion.button>
                
                <div className="flex-1 mx-4">
                  <input
                    type="range"
                    min={0}
                    max={weeklyData.length - 1}
                    value={currentWeek}
                    onChange={(e) => setCurrentWeek(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #ffb6d9 0%, #d4b8ff ${progress}%, #e5e5e5 ${progress}%, #e5e5e5 100%)`,
                    }}
                  />
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentWeek(Math.min(weeklyData.length - 1, currentWeek + 1))}
                  className="p-2 rounded-full glass-card"
                  disabled={currentWeek === weeklyData.length - 1}
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
              
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Week 8</span>
                <span>Week 40</span>
              </div>
            </div>
            
            {/* Development Info */}
            <motion.div
              key={`info-${currentWeek}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-lavender/20 to-soft-pink/20"
            >
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <div className="text-sm text-muted-foreground">Length</div>
                  <div className="font-semibold gradient-text">{data.length}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Size</div>
                  <div className="font-semibold gradient-text">{data.size}</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{data.development}</p>
            </motion.div>
          </motion.div>
          
          {/* Milestones & Tips */}
          <div className="space-y-6">
            {/* Progress Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-3xl p-6"
            >
              <h3 className="text-lg font-semibold mb-4">Your Journey Progress</h3>
              <div className="relative h-4 rounded-full bg-muted/30 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-rose to-lavender rounded-full"
                />
              </div>
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>Week {data.week}</span>
                <span>{Math.round(progress)}% complete</span>
              </div>
            </motion.div>
            
            {/* Milestones */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-3xl p-6"
            >
              <h3 className="text-lg font-semibold mb-4">Milestones</h3>
              <div className="space-y-4">
                {milestones.map((milestone, index) => {
                  const isReached = data.week >= milestone.week
                  return (
                    <motion.div
                      key={milestone.week}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center gap-4 p-3 rounded-xl transition-all ${
                        isReached ? 'bg-gradient-to-r from-primary/10 to-rose/10' : 'opacity-50'
                      }`}
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: isReached ? `${milestone.color}30` : '#e5e5e5' }}
                      >
                        <milestone.icon
                          className="w-5 h-5"
                          style={{ color: isReached ? milestone.color : '#999' }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{milestone.title}</div>
                        <div className="text-xs text-muted-foreground">Week {milestone.week}</div>
                      </div>
                      {isReached && (
                        <span className="text-primary">✓</span>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
            
            {/* Weekly Tips */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-3xl p-6 bg-gradient-to-br from-peach/20 to-transparent"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-rose flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">This Week&apos;s Tip</h3>
                  <p className="text-sm text-muted-foreground">
                    Stay hydrated and take your prenatal vitamins! Gentle walks and prenatal yoga can help with energy levels. Remember to rest when your body needs it. 💕
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
