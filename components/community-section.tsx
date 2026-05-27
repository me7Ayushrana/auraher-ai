"use client"

import { motion } from 'framer-motion'
import { Users, Heart, MessageCircle, Shield, Send } from 'lucide-react'
import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'

const communityCards = [
  {
    title: 'Anxiety Support',
    description: 'A safe space to share and find support',
    color: 'from-lavender to-primary',
  },
  {
    title: 'Pregnancy Journey',
    description: 'Connect with other expecting mothers',
    color: 'from-soft-pink to-rose',
  },
  {
    title: 'Self-Care Circle',
    description: 'Share tips and celebrate small wins',
    color: 'from-peach to-soft-pink',
  },
]

const initialMessages = [
  { user: 'Luna', message: "You are not alone in this journey", time: 'Just now' },
  { user: 'Sofia', message: "Sending you support today", time: '2m ago' },
  { user: 'Emma', message: "Remember to be gentle with yourself", time: '5m ago' },
]

export function CommunitySection() {
  const [supportMessages, setSupportMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState('')
  
  const handleSendSupport = useCallback(() => {
    if (!newMessage.trim()) return
    setSupportMessages(prev => [
      { user: 'You', message: newMessage, time: 'Just now' },
      ...prev.slice(0, 4)
    ])
    setNewMessage('')
  }, [newMessage])
  
  return (
    <section id="community" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-4">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Safe Space</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Supportive <span className="gradient-text">Community</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with like-minded women in a safe, anonymous, and supportive environment.
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Community Cards */}
          <div className="lg:col-span-2 space-y-4">
            {communityCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6 cursor-pointer group hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center shrink-0`}>
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{card.description}</p>
                  </div>
                  <span className="text-muted-foreground group-hover:text-primary transition-colors">
                    →
                  </span>
                </div>
              </motion.div>
            ))}
            
            {/* Anonymous Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-rose/10 border border-primary/20"
            >
              <Shield className="w-6 h-6 text-primary" />
              <div>
                <div className="font-medium">100% Anonymous & Safe</div>
                <div className="text-sm text-muted-foreground">Your privacy is our priority. Share freely without judgment.</div>
              </div>
            </motion.div>
          </div>
          
          {/* Support Wall */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-6 bg-gradient-to-br from-soft-pink/10 to-lavender/10"
          >
            <h3 className="font-semibold mb-6 flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary" />
              Support Wall
            </h3>
            
            <div className="space-y-4 mb-4">
              {supportMessages.map((msg, index) => (
                <div
                  key={index}
                  className="glass rounded-2xl p-4"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-rose flex items-center justify-center">
                      <span className="text-white text-sm font-medium">{msg.user[0]}</span>
                    </div>
                    <div>
                      <div className="font-medium text-sm">{msg.user}</div>
                      <div className="text-xs text-muted-foreground">{msg.time}</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{msg.message}</p>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendSupport()}
                placeholder="Send encouragement..."
                className="flex-1 px-4 py-2 rounded-xl glass bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Button
                onClick={handleSendSupport}
                disabled={!newMessage.trim()}
                size="sm"
                className="bg-gradient-to-r from-primary to-rose text-white rounded-xl"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
