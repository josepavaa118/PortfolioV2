'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

const sections = [
  { id: 'home', label: 'Inicio', progress: 0 },
  { id: 'projects', label: 'Proyectos', progress: 0.2 },
  { id: 'about', label: 'Sobre mí', progress: 0.4 },
  { id: 'skills', label: 'Skills', progress: 0.6 },
  { id: 'education', label: 'Educación', progress: 0.8 },
  { id: 'contact', label: 'Contacto', progress: 1 },
]

export default function NavigationProgress() {
  const [activeSection, setActiveSection] = useState('home')
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      const progress = scrollPosition / (documentHeight - windowHeight)

      // Determine active section based on scroll progress
      for (let i = sections.length - 1; i >= 0; i--) {
        if (progress >= sections[i].progress - 0.1) {
          setActiveSection(sections[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const progress = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
      <div className="flex flex-col items-center space-y-4">
        {/* Progress Circle */}
        <div className="relative w-16 h-16">
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
            {/* Background circle */}
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="2"
            />
            {/* Progress circle */}
            <motion.circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={175.9}
              strokeDashoffset={useTransform(progress, [0, 100], [175.9, 0])}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#142" />
                <stop offset="50%" stopColor="#00ff88" />
                <stop offset="100%" stopColor="#338" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              className="text-xs font-mono text-white"
              animate={{ scale: activeSection ? 1.1 : 1 }}
            >
              {Math.round(useTransform(progress, [0, 100], [0, 100]).get())}%
            </motion.span>
          </div>
        </div>

        {/* Navigation dots */}
        <div className="flex flex-col space-y-3">
          {sections.map((section) => (
            <motion.button
              key={section.id}
              onClick={() => {
                document.getElementById(section.id)?.scrollIntoView({
                  behavior: 'smooth'
                })
              }}
              className="relative group"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              {/* Tooltip */}
              <div className="absolute right-8 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  {section.label}
                </div>
              </div>

              {/* Dot */}
              <div className="w-3 h-3 rounded-full border-2 transition-all duration-200"
                style={{
                  backgroundColor: activeSection === section.id ? '#00ff88' : 'transparent',
                  borderColor: activeSection === section.id ? '#00ff88' : 'rgba(255, 255, 255, 0.3)',
                  boxShadow: activeSection === section.id ? '0 0 10px rgba(0, 255, 136, 0.5)' : 'none'
                }}
              />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}

