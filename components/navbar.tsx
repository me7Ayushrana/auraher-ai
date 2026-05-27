"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Sparkles, Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navLinks = [
  { name: 'Features', href: '#features' },
  { name: 'Wellness', href: '#wellness' },
  { name: 'Dashboard', href: '#dashboard' },
  { name: 'Community', href: '#community' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const toggleDarkMode = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }
  
  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'glass-card py-3' : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-primary to-rose flex items-center justify-center glow-sm">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold gradient-text">AuraHer AI</span>
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <motion.div
                  key={link.name}
                  whileHover={{ y: -2 }}
                >
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors relative group"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-rose group-hover:w-full transition-all duration-300" />
                  </Link>
                </motion.div>
              ))}
            </div>
            
            {/* Right Section */}
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleDarkMode}
                className="p-2 rounded-full glass-card"
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-peach" />
                ) : (
                  <Moon className="w-5 h-5 text-lavender" />
                )}
              </motion.button>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:block"
              >
                <Button className="bg-gradient-to-r from-primary to-rose hover:opacity-90 text-white rounded-full px-6 glow-sm">
                  Get Started
                </Button>
              </motion.div>
              
              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-full glass-card"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>
      
      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: isMobileMenuOpen ? 'auto' : 0,
          opacity: isMobileMenuOpen ? 1 : 0,
        }}
        className="fixed top-20 left-0 right-0 z-40 glass-card overflow-hidden md:hidden"
      >
        <div className="px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <motion.div
              key={link.name}
              whileHover={{ x: 10 }}
            >
              <Link
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-lg text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
          <Button className="w-full bg-gradient-to-r from-primary to-rose hover:opacity-90 text-white rounded-full">
            Get Started
          </Button>
        </div>
      </motion.div>
    </>
  )
}
