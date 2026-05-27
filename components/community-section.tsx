"use client"

import { motion } from 'framer-motion'
import { Users, Heart, MessageCircle, Shield, Sparkles } from 'lucide-react'

const communityCards = [
  {
    title: 'Anxiety Support',
    members: '12.5K',
    posts: '2.3K',
    color: 'from-lavender to-primary',
    description: 'A safe space to share and find support',
  },
  {
    title: 'Pregnancy Journey',
    members: '8.2K',
    posts: '1.8K',
    color: 'from-soft-pink to-rose',
    description: 'Connect with other expecting mothers',
  },
  {
    title: 'Self-Care Circle',
    members: '15.7K',
    posts: '3.1K',
    color: 'from-peach to-soft-pink',
    description: 'Share tips and celebrate small wins',
  },
]

const supportMessages = [
  { user: 'Luna', message: "You're not alone in this journey 💜", time: '2m ago' },
  { user: 'Sofia', message: "Sending you so much love today ✨", time: '5m ago' },
  { user: 'Emma', message: "Remember to be gentle with yourself 🌸", time: '8m ago' },
]

export function CommunitySection() {
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
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-4"
          >
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Safe Space</span>
          </motion.div>
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
                whileHover={{ x: 10 }}
                className="glass-card rounded-2xl p-6 cursor-pointer group"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">{card.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-primary" />
                        {card.members} members
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4 text-rose" />
                        {card.posts} posts
                      </span>
                    </div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="text-primary"
                  >
                    →
                  </motion.div>
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
            
            <div className="space-y-4">
              {supportMessages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
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
                </motion.div>
              ))}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-4 py-3 rounded-xl glass hover:bg-white/20 transition-colors text-sm font-medium flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              Send Support
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
