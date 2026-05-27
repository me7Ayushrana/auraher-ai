"use client"

import { motion } from 'framer-motion'
import { useState, useCallback, useRef, useEffect } from 'react'
import { Bot, Send, Sparkles, Heart, Moon, Sun } from 'lucide-react'

const suggestions = [
  { text: "How can I improve my sleep?", icon: Moon },
  { text: "Tips for managing stress", icon: Heart },
  { text: "Morning wellness routine", icon: Sun },
]

const initialMessages = [
  { role: 'assistant' as const, content: "Hi there! I'm your AuraHer AI companion. How are you feeling today?" },
]

const aiResponses: Record<string, string> = {
  "sleep": "For better sleep, try establishing a consistent bedtime routine. Avoid screens 1 hour before bed, keep your room cool and dark, and consider gentle stretching or meditation before sleep.",
  "stress": "Managing stress starts with recognizing your triggers. Deep breathing exercises, regular physical activity, and taking short breaks throughout the day can help significantly.",
  "morning": "A good morning routine sets the tone for your day. Consider starting with hydration, light stretching, a nutritious breakfast, and 5 minutes of mindfulness.",
  "sad": "I am sorry you are feeling this way. It is completely okay to have difficult days. Consider talking to someone you trust, going for a gentle walk, or doing something that usually brings you comfort.",
  "happy": "That is wonderful to hear! Embrace this positive energy. Consider journaling about what is making you happy to revisit during tougher times.",
  "tired": "Feeling tired is your body asking for rest. Ensure you are getting enough sleep, staying hydrated, and eating nutritious foods. If persistent, consider consulting a healthcare provider.",
  "default": "I hear you. Remember that your feelings are valid. Would you like to talk more about this, or shall I suggest some wellness activities that might help?"
}

function getAIResponse(message: string): string {
  const lowerMessage = message.toLowerCase()
  if (lowerMessage.includes('sleep')) return aiResponses.sleep
  if (lowerMessage.includes('stress') || lowerMessage.includes('anxious') || lowerMessage.includes('worried')) return aiResponses.stress
  if (lowerMessage.includes('morning') || lowerMessage.includes('routine')) return aiResponses.morning
  if (lowerMessage.includes('sad') || lowerMessage.includes('down') || lowerMessage.includes('depressed')) return aiResponses.sad
  if (lowerMessage.includes('happy') || lowerMessage.includes('good') || lowerMessage.includes('great')) return aiResponses.happy
  if (lowerMessage.includes('tired') || lowerMessage.includes('exhausted') || lowerMessage.includes('fatigue')) return aiResponses.tired
  return aiResponses.default
}

export function AIAssistant() {
  const [messages, setMessages] = useState(initialMessages)
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])
  
  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])
  
  const handleSend = useCallback(() => {
    if (!inputValue.trim()) return
    
    const userMessage = inputValue.trim()
    setMessages(prev => [...prev, { role: 'user' as const, content: userMessage }])
    setInputValue('')
    setIsTyping(true)
    
    // Simulate AI response delay
    setTimeout(() => {
      const response = getAIResponse(userMessage)
      setMessages(prev => [...prev, { role: 'assistant' as const, content: response }])
      setIsTyping(false)
    }, 1000)
  }, [inputValue])
  
  const handleSuggestionClick = useCallback((text: string) => {
    setInputValue(text)
  }, [])
  
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-4">
            <Bot className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">AI Companion</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Your <span className="gradient-text">AI Wellness</span> Assistant
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A compassionate AI companion that provides personalized wellness support.
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
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-rose flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold">AuraHer AI</div>
                <div className="text-xs text-green-500 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  Ready to help
                </div>
              </div>
            </div>
            
            {/* Messages */}
            <div className="p-4 h-80 overflow-y-auto space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
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
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="glass-card rounded-2xl rounded-bl-none px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input Area */}
            <div className="p-4 border-t border-border/50">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-3 rounded-full glass bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="p-3 rounded-full bg-gradient-to-r from-primary to-rose text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
          
          {/* Suggestions */}
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
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion.text}
                    onClick={() => handleSuggestionClick(suggestion.text)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl glass hover:bg-white/20 transition-all text-left"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-rose/30 flex items-center justify-center">
                      <suggestion.icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm">{suggestion.text}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="glass-card rounded-3xl p-6 bg-gradient-to-br from-lavender/20 to-soft-pink/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-rose flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold">Always Here</div>
                  <div className="text-xs text-muted-foreground">Available 24/7</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Your AI companion provides supportive responses based on wellness best practices. For medical concerns, please consult a healthcare professional.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
