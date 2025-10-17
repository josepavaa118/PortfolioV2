'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'

interface ScrollContainerProps {
  children: React.ReactNode
  sections: string[]
}

export default function ScrollContainer({ children, sections }: ScrollContainerProps) {
  const [currentSection, setCurrentSection] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `-${(sections.length - 1) * 100}%`])
  const smoothY = useSpring(y, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true)
      
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      
      // Set new timeout to detect when scrolling stops
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false)
      }, 150)

      // Calculate current section based on scroll progress
      const progress = scrollYProgress.get()
      const sectionIndex = Math.round(progress * (sections.length - 1))
      const clampedIndex = Math.max(0, Math.min(sectionIndex, sections.length - 1))
      
      if (clampedIndex !== currentSection) {
        setCurrentSection(clampedIndex)
      }
    }

    const unsubscribe = scrollYProgress.on('change', handleScroll)
    return () => {
      unsubscribe()
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [scrollYProgress, currentSection, sections.length])

  const scrollToSection = (index: number) => {
    if (containerRef.current) {
      const sectionHeight = containerRef.current.clientHeight
      const targetScroll = (index / (sections.length - 1)) * (containerRef.current.scrollHeight - sectionHeight)
      
      containerRef.current.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      })
    }
  }

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault()
    
    if (isScrolling) return

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
  }, [currentSection, isScrolling])

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-800 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-primary via-accent to-secondary origin-left"
          style={{ scaleX: scrollYProgress }}
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

      {/* Scroll Container */}
      <div
        ref={containerRef}
        className="h-full overflow-y-auto scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <motion.div
          className="relative"
          style={{ y: smoothY }}
        >
          {children}
        </motion.div>
      </div>

      {/* Scroll Navigation Arrows */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => scrollToSection(Math.max(0, currentSection - 1))}
            disabled={currentSection === 0}
            className="w-10 h-10 bg-black/80 backdrop-blur-sm border border-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <ChevronUp size={20} />
          </button>
          
          <button
            onClick={() => scrollToSection(Math.min(sections.length - 1, currentSection + 1))}
            disabled={currentSection === sections.length - 1}
            className="w-10 h-10 bg-black/80 backdrop-blur-sm border border-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <ChevronDown size={20} />
          </button>
        </div>
      </div>

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

