"use client"

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Bot, Mic, Send, Sparkles, Heart, Moon, Sun, Volume2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const suggestions = [
  { text: "How can I improve my sleep?", icon: Moon },
  { text: "Tips for managing stress", icon: Heart },
  { text: "Morning wellness routine", icon: Sun },
]

const chatMessages = [
  { role: 'assistant', content: "Hi there! 💜 I'm your AuraHer AI companion. How are you feeling today?" },
  { role: 'user', content: "I've been feeling a bit stressed lately" },
  { role: 'assistant', content: "I understand, and it's completely okay to feel that way. Stress is a normal part of life, but managing it is important for your wellbeing. Would you like me to suggest some calming techniques or breathing exercises that might help? 🌸" },
]

export function AIAssistant() {
  const [messages, setMessages] = useState(chatMessages)
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [displayedText, setDisplayedText] = useState('')
  
  // Typing animation effect
  useEffect(() => {
    if (isTyping) {
      const text = "I'm here to support you through anything. Let's take a deep breath together... 🌿"
      let index = 0
      const timer = setInterval(() => {
        setDisplayedText(text.slice(0, index + 1))
        index++
        if (index === text.length) {
          clearInterval(timer)
          setIsTyping(false)
        }
      }, 30)
      return () => clearInterval(timer)
    }
  }, [isTyping])
  
  const handleSend = () => {
    if (!inputValue.trim()) return
    setMessages([...messages, { role: 'user', content: inputValue }])
    setInputValue('')
    setIsTyping(true)
  }
  
  return (
    <section id="wellness" className="py-24 px-4">
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
            <Bot className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">AI Companion</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Your <span className="gradient-text">AI Wellness</span> Assistant
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A compassionate AI companion that understands your emotions and provides personalized support 24/7.
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto grid lg:grid-cols-5 gap-6">
          {/* Chat Interface */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 glass-card rounded-3xl overflow-hidden"
          >
            {/* Chat Header */}
            <div className="p-4 border-b border-border/50 flex items-center gap-3">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-rose flex items-center justify-center"
              >
                <Sparkles className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <div className="font-semibold">AuraHer AI</div>
                <div className="text-xs text-green-500 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Online
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="ml-auto p-2 rounded-full glass"
              >
                <Volume2 className="w-5 h-5 text-muted-foreground" />
              </motion.button>
            </div>
            
            {/* Messages */}
            <div className="p-4 h-80 overflow-y-auto space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-primary to-rose text-white rounded-br-none'
                        : 'glass-card rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="glass-card rounded-2xl rounded-bl-none px-4 py-3">
                    <p className="text-sm">{displayedText}<span className="animate-pulse">|</span></p>
                  </div>
                </motion.div>
              )}
            </div>
            
            {/* Input Area */}
            <div className="p-4 border-t border-border/50">
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 rounded-full glass-card text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mic className="w-5 h-5" />
                </motion.button>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-3 rounded-full glass bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSend}
                  className="p-3 rounded-full bg-gradient-to-r from-primary to-rose text-white"
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
          
          {/* Suggestions & Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            <div className="glass-card rounded-3xl p-6">
              <h3 className="font-semibold mb-4">Quick Topics</h3>
              <div className="space-y-3">
                {suggestions.map((suggestion, index) => (
                  <motion.button
                    key={suggestion.text}
                    whileHover={{ x: 5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setInputValue(suggestion.text)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl glass hover:bg-white/20 transition-all text-left"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-rose/30 flex items-center justify-center">
                      <suggestion.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm">{suggestion.text}</span>
                  </motion.button>
                ))}
              </div>
            </div>
            
            <div className="glass-card rounded-3xl p-6 bg-gradient-to-br from-lavender/20 to-soft-pink/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-rose flex items-center justify-center animate-pulse-glow">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold">Emotion-Aware</div>
                  <div className="text-xs text-muted-foreground">AI that truly understands</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Our AI adapts to your emotional state and provides personalized responses based on your mood patterns.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
