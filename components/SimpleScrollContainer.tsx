'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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

      {/* Section Indicator */}
      <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <div className="flex flex-col items-center space-y-4">
          {/* Current Section Number */}
          <div className="w-12 h-12 bg-black/80 backdrop-blur-sm border border-gray-800 rounded-full flex items-center justify-center">
            <span className="text-accent font-mono font-bold text-lg">
              {String(currentSection + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Section Dots */}
          <div className="flex flex-col space-y-3">
            {sections.map((section, index) => (
              <button
                key={section}
                onClick={() => scrollToSection(index)}
                className="relative group"
              >
                {/* Tooltip */}
                <div className="absolute left-8 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {section}
                  </div>
                </div>

                {/* Dot */}
                <div className="w-3 h-3 rounded-full border-2 transition-all duration-200"
                  style={{
                    backgroundColor: index === currentSection ? '#00ff88' : 'transparent',
                    borderColor: index === currentSection ? '#00ff88' : 'rgba(255, 255, 255, 0.3)',
                    boxShadow: index === currentSection ? '0 0 10px rgba(0, 255, 136, 0.5)' : 'none'
                  }}
                />
              </button>
            ))}
          </div>

          {/* Total Sections */}
          <div className="text-xs text-gray-500 font-mono">
            {String(sections.length).padStart(2, '0')}
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

