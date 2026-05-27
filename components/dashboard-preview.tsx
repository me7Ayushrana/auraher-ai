"use client"

import { motion } from 'framer-motion'
import { 
  Droplets, Moon, Heart, Brain, Bell, 
  Activity, Calendar, Target
} from 'lucide-react'

const dashboardWidgets = [
  {
    title: 'Water Intake',
    value: '6/8',
    unit: 'glasses',
    icon: Droplets,
    color: 'from-blue-400 to-cyan-400',
    progress: 75,
  },
  {
    title: 'Sleep Score',
    value: '7.5',
    unit: 'hours',
    icon: Moon,
    color: 'from-purple-400 to-indigo-400',
    progress: 85,
  },
  {
    title: 'Wellness Score',
    value: '82',
    unit: '/100',
    icon: Heart,
    color: 'from-pink-400 to-rose-400',
    progress: 82,
  },
  {
    title: 'Mood Average',
    value: '4.2',
    unit: '/5',
    icon: Brain,
    color: 'from-orange-400 to-amber-400',
    progress: 84,
  },
]

const reminders = [
  { time: '8:00 AM', title: 'Morning meditation', icon: Heart },
  { time: '12:00 PM', title: 'Drink water reminder', icon: Droplets },
  { time: '6:00 PM', title: 'Evening walk', icon: Activity },
  { time: '10:00 PM', title: 'Sleep routine', icon: Moon },
]

export function DashboardPreview() {
  return (
    <section id="dashboard" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-4">
            <Activity className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Your Space</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Personalized <span className="gradient-text">Dashboard</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your wellness journey at a glance. Beautiful insights and tracking to help you thrive.
          </p>
        </motion.div>
        
        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative glass-card rounded-3xl p-6 sm:p-8 overflow-hidden">
            {/* Browser-like header */}
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border/50">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 mx-4">
                <div className="w-64 h-6 rounded-full glass mx-auto flex items-center justify-center text-xs text-muted-foreground">
                  dashboard.auraher.ai
                </div>
              </div>
            </div>
            
            {/* Dashboard Content */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left Column - Stats */}
              <div className="lg:col-span-2 space-y-6">
                {/* Welcome Card */}
                <div className="p-6 rounded-2xl bg-gradient-to-r from-primary/20 via-rose/20 to-lavender/20">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">Welcome back!</h3>
                      <p className="text-muted-foreground">Here is your wellness overview for today.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Stats Grid */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {dashboardWidgets.map((widget, index) => (
                    <motion.div
                      key={widget.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="glass rounded-2xl p-5"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${widget.color} flex items-center justify-center`}>
                          <widget.icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="text-2xl font-bold">
                        {widget.value} <span className="text-sm font-normal text-muted-foreground">{widget.unit}</span>
                      </div>
                      <div className="text-sm text-muted-foreground mb-3">{widget.title}</div>
                      <div className="h-2 rounded-full bg-muted/30 overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${widget.color}`}
                          style={{ width: `${widget.progress}%` }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Right Column - Reminders & Goals */}
              <div className="space-y-6">
                {/* Reminders */}
                <div className="glass rounded-2xl p-5">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-primary" />
                    Today&apos;s Reminders
                  </h4>
                  <div className="space-y-3">
                    {reminders.map((reminder, index) => (
                      <div
                        key={reminder.title}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-rose/30 flex items-center justify-center">
                          <reminder.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">{reminder.title}</div>
                          <div className="text-xs text-muted-foreground">{reminder.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Weekly Goal */}
                <div className="glass rounded-2xl p-5 bg-gradient-to-br from-lavender/20 to-soft-pink/20">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Weekly Goal
                  </h4>
                  <div className="text-center py-4">
                    <div className="relative w-24 h-24 mx-auto mb-4">
                      <svg className="w-full h-full -rotate-90">
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="8"
                          className="text-muted/20"
                        />
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          fill="none"
                          stroke="url(#goalGradient)"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray="200 251"
                        />
                        <defs>
                          <linearGradient id="goalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ffb6d9" />
                            <stop offset="100%" stopColor="#d4b8ff" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-bold gradient-text">80%</span>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">4 of 5 wellness goals completed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
