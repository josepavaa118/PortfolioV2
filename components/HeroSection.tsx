'use client'

import { motion } from 'framer-motion'
import { Github, Download, ArrowDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ScrollAnimation, ElementReveal } from './ScrollAnimations'
import LottieBackground from './LottieBackground'

export default function HeroSection() {
  const [typedText, setTypedText] = useState('')
  const fullText = 'Desarrollo soluciones digitales que mejoran la experiencia del usuario y marcan la diferencia, combinando innovación y precisión.'

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
      }
    }, 50)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex items-center justify-center relative overflow-hidden w-full py-4 sm:py-12 pb-20 sm:pb-12">
      <LottieBackground />
      {/* Background Effects */}
      {/* Remove the following overlay effect divs: */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div> */}
      {/* <div className="absolute inset-0"> ... </div> */}

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center">
        <ScrollAnimation delay={0.2}>
          <h1 className="mobile-heading-responsive font-bold mb-6 sm:mb-8">
            <ElementReveal delay={0.5}>
              <span className="gradient-text">Portfolio V3</span>
            </ElementReveal>
          </h1>
        </ScrollAnimation>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mobile-text-responsive text-gray-300 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            {typedText}
            <span className="animate-pulse">|</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-10 sm:mb-12"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center gap-2 text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3"
            >
              <Github size={18} className="sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Ver GitHub</span>
              <span className="sm:hidden">GitHub</span>
            </motion.a>
            
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary flex items-center gap-2 text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3"
            >
              Conectar
            </motion.a>
            
            <motion.a
              href="/cv.pdf"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary flex items-center gap-2 text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3"
            >
              <Download size={18} className="sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Descargar CV</span>
              <span className="sm:hidden">CV</span>
            </motion.a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex flex-col items-center mb-4 sm:mb-0"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-gray-400 mb-2"
            >
              <ArrowDown size={24} />
            </motion.div>
            <span className="text-sm text-gray-500">Scroll para explorar</span>
          </motion.div>
      </div>

      {/* Floating Elements - Hidden on mobile for better performance */}
      <div className="absolute top-20 left-10 opacity-20 hidden sm:block">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-2 border-primary rounded-full"
        />
      </div>
      
      <div className="absolute bottom-20 right-10 opacity-20 hidden sm:block">
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-2 border-secondary rounded-full"
        />
      </div>
    </div>
  )
}
