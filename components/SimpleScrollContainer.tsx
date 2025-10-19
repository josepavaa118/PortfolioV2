'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, FolderOpen, User, Code, GraduationCap, Mail } from "lucide-react"

interface SimpleScrollContainerProps {
  children: React.ReactNode
  sections: string[]
}

export default function SimpleScrollContainer({ children, sections }: SimpleScrollContainerProps) {
  const [currentSection, setCurrentSection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const scrollToSection = (index: number) => {
    if (containerRef.current) {
      const sectionHeight = window.innerHeight
      const targetScroll = index * sectionHeight
      
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      })
      setCurrentSection(index)
    }
  }

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault()
    
    const direction = e.deltaY > 0 ? 1 : -1
    const nextSection = currentSection + direction
    
    if (nextSection >= 0 && nextSection < sections.length) {
      scrollToSection(nextSection)
    }
  }

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false })
      return () => container.removeEventListener('wheel', handleWheel)
    }
  }, [currentSection])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const sectionHeight = window.innerHeight
      const sectionIndex = Math.round(scrollY / sectionHeight)
      const clampedIndex = Math.max(0, Math.min(sectionIndex, sections.length - 1))
      
      if (clampedIndex !== currentSection) {
        setCurrentSection(clampedIndex)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [currentSection, sections.length])

  return (
    <div ref={containerRef} className="relative">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-800 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-primary via-accent to-secondary origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: (currentSection + 1) / sections.length }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Left Side Navigation Menu */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <div className="bg-slate-800/90 backdrop-blur-md border border-blue-400/30 rounded-xl px-2 py-3">
          <div className="flex flex-col items-center space-y-2">
            {sections.map((section, index) => {
              const icons = [Home, FolderOpen, User, Code, GraduationCap, Mail];
              const Icon = icons[index];
              const isActive = index === currentSection;
              
              return (
                <div key={section} className="relative group">
                  <motion.button
                    className={`relative flex items-center justify-center p-2 rounded-lg transition-all duration-300 ${
                      isActive ? "bg-blue-500/20" : "hover:bg-slate-700/50"
                    }`}
                    onClick={() => scrollToSection(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-blue-400 rounded-lg"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 0.2, scale: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                    
                    <Icon 
                      size={16} 
                      className={`relative z-10 transition-colors duration-300 ${
                        isActive ? "text-blue-400" : "text-white/70"
                      }`} 
                    />
                  </motion.button>
                  
                  {/* Tooltip */}
                  <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-black/90 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                    {section}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      {children}

      {/* Section Counter */}
      <div className="fixed bottom-8 left-8 z-40">
        <div className="bg-black/80 backdrop-blur-sm border border-gray-800 rounded-lg px-4 py-2">
          <div className="text-sm text-gray-400 font-mono">
            {currentSection + 1} / {sections.length}
          </div>
        </div>
      </div>
    </div>
  )
}

