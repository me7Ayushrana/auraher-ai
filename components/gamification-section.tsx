"use client"

import { motion } from 'framer-motion'
import { useState, useCallback } from 'react'
import { Trophy, Flame, Star, Gift, Zap, Crown, Heart, Brain, Check } from 'lucide-react'

const achievements = [
  { title: '7-Day Streak', icon: Flame, color: 'from-orange-400 to-red-400', unlocked: true },
  { title: 'Mood Master', icon: Brain, color: 'from-purple-400 to-pink-400', unlocked: true },
  { title: 'Self-Care Queen', icon: Crown, color: 'from-yellow-400 to-orange-400', unlocked: true },
  { title: 'Wellness Warrior', icon: Zap, color: 'from-blue-400 to-cyan-400', unlocked: false },
  { title: 'Meditation Pro', icon: Star, color: 'from-pink-400 to-rose-400', unlocked: false },
  { title: 'Community Hero', icon: Heart, color: 'from-red-400 to-pink-400', unlocked: false },
]

const initialRewards = [
  { day: 1, reward: 10, claimed: true },
  { day: 2, reward: 15, claimed: true },
  { day: 3, reward: 20, claimed: true },
  { day: 4, reward: 25, claimed: false },
  { day: 5, reward: 30, claimed: false },
  { day: 6, reward: 40, claimed: false },
  { day: 7, reward: 100, claimed: false, special: true },
]

export function GamificationSection() {
  const [dailyRewards, setDailyRewards] = useState(initialRewards)
  const [totalPoints, setTotalPoints] = useState(45) // Sum of claimed rewards
  
  const claimReward = useCallback((dayIndex: number) => {
    const reward = dailyRewards[dayIndex]
    if (reward.claimed || dayIndex > 0 && !dailyRewards[dayIndex - 1].claimed) return
    
    setDailyRewards(prev => prev.map((r, i) => 
      i === dayIndex ? { ...r, claimed: true } : r
    ))
    setTotalPoints(prev => prev + reward.reward)
  }, [dailyRewards])
  
  const unlockedCount = achievements.filter(a => a.unlocked).length
  const nextUnclaimedIndex = dailyRewards.findIndex(r => !r.claimed)
  
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
            <Trophy className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Rewards & Progress</span>
          </div>
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
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center">
                    <Flame className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Current Streak</div>
                    <div className="text-3xl font-bold gradient-text">3 Days</div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between gap-1">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                  <div
                    key={index}
                    className={`flex-1 h-12 rounded-xl flex items-center justify-center text-xs font-medium ${
                      index < 3
                        ? 'bg-gradient-to-br from-orange-400 to-red-400 text-white'
                        : 'glass'
                    }`}
                  >
                    {index < 3 ? <Check className="w-4 h-4" /> : day}
                  </div>
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
                {dailyRewards.map((reward, index) => {
                  const canClaim = !reward.claimed && (index === 0 || dailyRewards[index - 1].claimed)
                  return (
                    <button
                      key={reward.day}
                      onClick={() => claimReward(index)}
                      disabled={!canClaim}
                      className={`relative p-3 rounded-xl text-center transition-all ${
                        reward.claimed
                          ? 'bg-gradient-to-br from-primary/30 to-rose/30'
                          : reward.special
                          ? 'bg-gradient-to-br from-yellow-400/20 to-orange-400/20 border border-yellow-400/50'
                          : canClaim
                          ? 'glass hover:bg-white/20 cursor-pointer'
                          : 'glass opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="text-xs text-muted-foreground mb-1">Day {reward.day}</div>
                      <div className={`font-bold ${reward.special ? 'text-yellow-500' : ''}`}>
                        +{reward.reward}
                      </div>
                      {reward.claimed && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
              
              {nextUnclaimedIndex !== -1 && nextUnclaimedIndex > 0 && (
                <p className="text-xs text-muted-foreground text-center mt-4">
                  Click Day {dailyRewards[nextUnclaimedIndex].day} to claim your reward!
                </p>
              )}
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
              Achievements ({unlockedCount}/{achievements.length})
            </h3>
            
            <div className="grid grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.title}
                  className={`relative p-4 rounded-2xl text-center transition-all ${
                    achievement.unlocked
                      ? 'glass'
                      : 'bg-muted/20 opacity-60'
                  }`}
                >
                  <div
                    className={`w-14 h-14 mx-auto mb-3 rounded-2xl flex items-center justify-center ${
                      achievement.unlocked
                        ? `bg-gradient-to-br ${achievement.color}`
                        : 'bg-muted/30'
                    }`}
                  >
                    <achievement.icon className={`w-7 h-7 ${achievement.unlocked ? 'text-white' : 'text-muted-foreground'}`} />
                  </div>
                  <div className="text-xs font-medium">{achievement.title}</div>
                  
                  {!achievement.unlocked && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-2xl">
                      <span className="text-2xl">🔒</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Progress to next achievement */}
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-rose/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Next Achievement</span>
                <span className="text-xs text-muted-foreground">75%</span>
              </div>
              <div className="h-3 rounded-full bg-muted/30 overflow-hidden mb-2">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-rose"
                  style={{ width: '75%' }}
                />
              </div>
              <div className="text-xs text-muted-foreground">Complete 4 more days to unlock &quot;Wellness Warrior&quot;</div>
            </div>
            
            {/* Points Display */}
            <div className="mt-6 p-4 rounded-xl glass text-center">
              <div className="text-sm text-muted-foreground mb-1">Total Points</div>
              <div className="text-4xl font-bold gradient-text">{totalPoints}</div>
              <div className="text-xs text-muted-foreground mt-1">Wellness Coins</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
