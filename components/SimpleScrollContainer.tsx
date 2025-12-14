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
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isScrollingRef = useRef(false)

  const scrollToSection = (index: number) => {
    const sectionElements = Array.from(document.querySelectorAll('section'));
    const targetSection = sectionElements[index];
    if (targetSection) {
      const viewportHeight = window.innerHeight;
      const sectionHeight = targetSection.scrollHeight;
      
      // For sections taller than viewport (like education and contact), 
      // use center alignment to show more content
      // Otherwise use start alignment for normal sections
      const blockAlignment = sectionHeight > viewportHeight * 1.2 ? 'center' : 'start';
      targetSection.scrollIntoView({ behavior: 'smooth', block: blockAlignment });
      setCurrentSection(index);
    }
  }

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Desktop: scroll exactly one section per wheel gesture
  useEffect(() => {
    if (isMobile) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (isScrollingRef.current) return

      const direction = e.deltaY > 0 ? 1 : -1
      const nextSection = Math.min(Math.max(currentSection + direction, 0), sections.length - 1)
      if (nextSection === currentSection) return

      isScrollingRef.current = true
      scrollToSection(nextSection)

      // Cooldown to avoid multiple jumps per gesture
      setTimeout(() => {
        isScrollingRef.current = false
      }, 700)
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [currentSection, isMobile, sections.length])

  useEffect(() => {
    function findCurrentSection() {
      const sectionEls = Array.from(document.querySelectorAll('section'));
      let closestIndex = 0;
      let minDist = Number.POSITIVE_INFINITY;
      sectionEls.forEach((el, idx) => {
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top);
        if (dist < minDist) {
          minDist = dist;
          closestIndex = idx;
        }
      });
      if (closestIndex !== currentSection) {
        setCurrentSection(closestIndex);
      }
    }

    window.addEventListener('scroll', findCurrentSection);
    findCurrentSection();
    return () => window.removeEventListener('scroll', findCurrentSection);
  }, [currentSection, sections.length]);

  return (
    <div
      ref={containerRef}
      className="relative snap-y snap-mandatory scroll-smooth"
    >
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-800 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-primary via-accent to-secondary origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: (currentSection + 1) / sections.length }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Desktop Left Side Navigation Menu */}
      {!isMobile && (
        <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40">
          <div className="bg-slate-800/90 backdrop-blur-md border border-blue-400/30 rounded-xl px-2 py-3">
            <div className="flex flex-col items-center space-y-2">
              {sections.map((section, index) => {
                const icons = [Home, FolderOpen, User, Code, GraduationCap, Mail];
                const Icon = icons[index];
                const isActive = index === currentSection;
                return (
                  <div key={section} className="relative group">
                    <motion.button
                      className={`relative flex items-center justify-center p-2 rounded-lg transition-all duration-300 ${isActive ? "bg-blue-500/20" : "hover:bg-slate-700/50"}`}
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
                        className={`relative z-10 transition-colors duration-300 ${isActive ? "text-blue-400" : "text-white/70"}`} 
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
      )}
      {/* Mobile Bottom Navigation Menu */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 z-50">
          <div className="bg-slate-800/95 backdrop-blur-md border-t border-blue-400/30">
            <div className="max-w-lg mx-auto px-4 py-2">
              <div className="flex items-center justify-around gap-2">
                {sections.map((section, index) => {
                  const icons = [Home, FolderOpen, User, Code, GraduationCap, Mail];
                  const Icon = icons[index];
                  const isActive = index === currentSection;
                  return (
                    <motion.button
                      key={section}
                      className={`relative flex flex-col items-center justify-center p-3 min-w-[48px] min-h-[48px] rounded-lg transition-all duration-300 ${isActive ? "bg-blue-500/20" : "hover:bg-slate-700/50"}`}
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
                        size={20} 
                        className={`relative z-10 transition-colors duration-300 mb-1 ${isActive ? "text-blue-400" : "text-white/70"}`} 
                      />
                      <span className={`text-xs transition-colors duration-300 ${isActive ? "text-blue-400" : "text-white/70"}`}>
                        {section}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      {children}

      {/* Section Counter - Desktop only */}
      {!isMobile && (
        <div className="fixed bottom-8 left-8 z-40">
          <div className="bg-black/80 backdrop-blur-sm border border-gray-800 rounded-lg px-4 py-2">
            <div className="text-sm text-gray-400 font-mono">
              {currentSection + 1} / {sections.length}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

