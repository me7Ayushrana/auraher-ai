"use client"

import { motion } from 'framer-motion'
import { useState, useMemo } from 'react'
import { Baby, Heart, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'

const weeklyData = [
  { week: 8, size: 'Raspberry', length: '1.6 cm', weight: '1 g', development: 'Tiny fingers and toes forming, heart is beating' },
  { week: 12, size: 'Lime', length: '5.4 cm', weight: '14 g', development: 'Reflexes developing, can open and close fingers' },
  { week: 16, size: 'Avocado', length: '11.6 cm', weight: '100 g', development: 'Can make facial expressions, bones hardening' },
  { week: 20, size: 'Banana', length: '16.4 cm', weight: '300 g', development: 'Can hear sounds and may respond to music' },
  { week: 24, size: 'Corn', length: '30 cm', weight: '600 g', development: 'Developing sleep/wake cycles, lungs maturing' },
  { week: 28, size: 'Eggplant', length: '37.6 cm', weight: '1 kg', development: 'Eyes can open and close, brain developing rapidly' },
  { week: 32, size: 'Squash', length: '42.4 cm', weight: '1.7 kg', development: 'Practicing breathing movements, gaining weight' },
  { week: 36, size: 'Honeydew', length: '47.4 cm', weight: '2.6 kg', development: 'Lungs nearly mature, head may engage' },
  { week: 40, size: 'Watermelon', length: '51.2 cm', weight: '3.4 kg', development: 'Full term - ready to meet you!' },
]

const milestones = [
  { week: 8, title: 'First Heartbeat', icon: Heart, color: '#ff9bbc' },
  { week: 12, title: 'First Trimester Complete', icon: Sparkles, color: '#d4b8ff' },
  { week: 20, title: 'Halfway There!', icon: Baby, color: '#ffb347' },
  { week: 28, title: 'Third Trimester Begins', icon: Heart, color: '#87ceeb' },
]

export function PregnancySection() {
  const [currentWeekIndex, setCurrentWeekIndex] = useState(3) // Start at week 20
  
  const data = weeklyData[currentWeekIndex]
  const progress = (data.week / 40) * 100
  
  const reachedMilestones = useMemo(() => 
    milestones.filter(m => m.week <= data.week),
    [data.week]
  )
  
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
            <Baby className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Pregnancy Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Pregnancy</span> Tracker
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Track your pregnancy journey with weekly insights and development milestones.
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Baby Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-8 text-center"
          >
            {/* Size visualization */}
            <div className="relative py-8">
              <div className="mx-auto w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-br from-soft-pink via-lavender to-peach flex items-center justify-center">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full glass flex flex-col items-center justify-center">
                  <span className="text-4xl sm:text-5xl mb-2">👶</span>
                  <div className="text-xl sm:text-2xl font-bold gradient-text">Week {data.week}</div>
                </div>
              </div>
            </div>
            
            {/* Week Slider */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setCurrentWeekIndex(Math.max(0, currentWeekIndex - 1))}
                  className="p-2 rounded-full glass-card hover:bg-white/20 transition-colors disabled:opacity-50"
                  disabled={currentWeekIndex === 0}
                  aria-label="Previous week"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <div className="flex-1 mx-4">
                  <input
                    type="range"
                    min={0}
                    max={weeklyData.length - 1}
                    value={currentWeekIndex}
                    onChange={(e) => setCurrentWeekIndex(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #ffb6d9 0%, #d4b8ff ${progress}%, #e5e5e5 ${progress}%, #e5e5e5 100%)`,
                    }}
                  />
                </div>
                
                <button
                  onClick={() => setCurrentWeekIndex(Math.min(weeklyData.length - 1, currentWeekIndex + 1))}
                  className="p-2 rounded-full glass-card hover:bg-white/20 transition-colors disabled:opacity-50"
                  disabled={currentWeekIndex === weeklyData.length - 1}
                  aria-label="Next week"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Week 8</span>
                <span>Week 40</span>
              </div>
            </div>
            
            {/* Development Info */}
            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-lavender/20 to-soft-pink/20">
              <div className="text-sm text-muted-foreground mb-2">Baby is the size of a</div>
              <div className="text-2xl font-bold gradient-text mb-3">{data.size}</div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm text-muted-foreground">Length</div>
                  <div className="font-semibold">{data.length}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Weight</div>
                  <div className="font-semibold">{data.weight}</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{data.development}</p>
            </div>
          </motion.div>
          
          {/* Milestones & Progress */}
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
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-rose to-lavender rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>Week {data.week} of 40</span>
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
                {milestones.map((milestone) => {
                  const isReached = data.week >= milestone.week
                  return (
                    <div
                      key={milestone.week}
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
                        <span className="text-green-500 font-medium">✓</span>
                      )}
                    </div>
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
                  <h3 className="font-semibold mb-2">Week {data.week} Tip</h3>
                  <p className="text-sm text-muted-foreground">
                    {data.week <= 12 
                      ? "Focus on taking your prenatal vitamins and staying hydrated. First trimester fatigue is normal - listen to your body and rest when needed."
                      : data.week <= 24
                      ? "This is often called the 'honeymoon phase' of pregnancy. Energy levels improve. Consider starting gentle prenatal exercises."
                      : data.week <= 32
                      ? "As baby grows, you may experience more discomfort. Pregnancy pillows can help with sleep. Stay active with gentle walks."
                      : "You are in the home stretch! Prepare your hospital bag and finalize birth plans. Practice relaxation techniques."}
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
