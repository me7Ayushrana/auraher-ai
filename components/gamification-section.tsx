"use client"

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Trophy, Flame, Star, Gift, Zap, Crown, Heart, Sparkles } from 'lucide-react'

const achievements = [
  { title: '7-Day Streak', icon: Flame, color: 'from-orange-400 to-red-400', unlocked: true },
  { title: 'Mood Master', icon: Brain, color: 'from-purple-400 to-pink-400', unlocked: true },
  { title: 'Self-Care Queen', icon: Crown, color: 'from-yellow-400 to-orange-400', unlocked: true },
  { title: 'Wellness Warrior', icon: Zap, color: 'from-blue-400 to-cyan-400', unlocked: false },
  { title: 'Meditation Pro', icon: Star, color: 'from-pink-400 to-rose-400', unlocked: false },
  { title: 'Community Hero', icon: Heart, color: 'from-red-400 to-pink-400', unlocked: false },
]

import { Brain } from 'lucide-react'

const dailyRewards = [
  { day: 1, reward: 10, claimed: true },
  { day: 2, reward: 15, claimed: true },
  { day: 3, reward: 20, claimed: true },
  { day: 4, reward: 25, claimed: true },
  { day: 5, reward: 30, claimed: false },
  { day: 6, reward: 40, claimed: false },
  { day: 7, reward: 100, claimed: false, special: true },
]

export function GamificationSection() {
  const [selectedAchievement, setSelectedAchievement] = useState<number | null>(null)
  
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
            <Trophy className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Rewards & Progress</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Celebrate Your <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Earn rewards, unlock achievements, and track your wellness streaks as you grow.
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Streaks & Points */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Current Streak */}
            <div className="glass-card rounded-3xl p-6 bg-gradient-to-br from-orange-500/10 to-red-500/10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center"
                  >
                    <Flame className="w-7 h-7 text-white" />
                  </motion.div>
                  <div>
                    <div className="text-sm text-muted-foreground">Current Streak</div>
                    <div className="text-3xl font-bold gradient-text">7 Days 🔥</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Best Streak</div>
                  <div className="text-xl font-semibold">21 Days</div>
                </div>
              </div>
              
              <div className="flex justify-between gap-1">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex-1 h-12 rounded-xl flex items-center justify-center text-xs font-medium ${
                      index < 7
                        ? 'bg-gradient-to-br from-orange-400 to-red-400 text-white'
                        : 'glass'
                    }`}
                  >
                    {index < 7 ? '✓' : day}
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Daily Rewards */}
            <div className="glass-card rounded-3xl p-6">
              <h3 className="font-semibold mb-6 flex items-center gap-2">
                <Gift className="w-5 h-5 text-primary" />
                Daily Rewards
              </h3>
              
              <div className="grid grid-cols-7 gap-2">
                {dailyRewards.map((reward, index) => (
                  <motion.div
                    key={reward.day}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: reward.claimed ? 1 : 1.1 }}
                    className={`relative p-3 rounded-xl text-center cursor-pointer transition-all ${
                      reward.claimed
                        ? 'bg-gradient-to-br from-primary/30 to-rose/30'
                        : reward.special
                        ? 'bg-gradient-to-br from-yellow-400/20 to-orange-400/20 border border-yellow-400/50'
                        : 'glass hover:bg-white/20'
                    }`}
                  >
                    <div className="text-xs text-muted-foreground mb-1">Day {reward.day}</div>
                    <div className={`font-bold ${reward.special ? 'text-yellow-500' : ''}`}>
                      +{reward.reward}
                    </div>
                    {reward.claimed && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center"
                      >
                        <span className="text-white text-xs">✓</span>
                      </motion.div>
                    )}
                    {reward.special && !reward.claimed && (
                      <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-6"
          >
            <h3 className="font-semibold mb-6 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              Achievements
            </h3>
            
            <div className="grid grid-cols-3 gap-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  onMouseEnter={() => setSelectedAchievement(index)}
                  onMouseLeave={() => setSelectedAchievement(null)}
                  className={`relative p-4 rounded-2xl text-center cursor-pointer transition-all ${
                    achievement.unlocked
                      ? 'glass'
                      : 'bg-muted/20 opacity-50'
                  }`}
                >
                  <motion.div
                    animate={selectedAchievement === index && achievement.unlocked ? {
                      rotate: [0, -10, 10, 0],
                      scale: [1, 1.1, 1],
                    } : {}}
                    transition={{ duration: 0.5 }}
                    className={`w-14 h-14 mx-auto mb-3 rounded-2xl flex items-center justify-center ${
                      achievement.unlocked
                        ? `bg-gradient-to-br ${achievement.color}`
                        : 'bg-muted/30'
                    }`}
                  >
                    <achievement.icon className={`w-7 h-7 ${achievement.unlocked ? 'text-white' : 'text-muted-foreground'}`} />
                  </motion.div>
                  <div className="text-xs font-medium">{achievement.title}</div>
                  
                  {achievement.unlocked && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute -top-1 -right-1 text-lg"
                    >
                      ✨
                    </motion.div>
                  )}
                  
                  {!achievement.unlocked && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-background/50">
                      <span className="text-2xl">🔒</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
            
            {/* Progress to next achievement */}
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-rose/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Next Achievement</span>
                <span className="text-xs text-muted-foreground">75%</span>
              </div>
              <div className="h-3 rounded-full bg-muted/30 overflow-hidden mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '75%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-primary to-rose"
                />
              </div>
              <div className="text-xs text-muted-foreground">Complete 3 more days to unlock &quot;Wellness Warrior&quot;</div>
            </div>
            
            {/* Points Display */}
            <div className="mt-6 p-4 rounded-xl glass text-center">
              <div className="text-sm text-muted-foreground mb-1">Total Points</div>
              <motion.div
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="text-4xl font-bold gradient-text"
              >
                2,450
              </motion.div>
              <div className="text-xs text-muted-foreground mt-1">Wellness Coins 💜</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
