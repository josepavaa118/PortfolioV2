'use client'

import { motion, useInView, useAnimation } from 'framer-motion'
import { useRef, useEffect } from 'react'

interface ScrollAnimationProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  duration?: number
  distance?: number
}

export function ScrollAnimation({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 0.6,
  distance = 50 
}: ScrollAnimationProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const variants = {
    hidden: {
      opacity: 0,
      x: direction === 'left' ? -distance : direction === 'right' ? distance : 0,
      y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth animation
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={controls}
    >
      {children}
    </motion.div>
  )
}

// Special animation for text that reveals character by character
export function TextReveal({ 
  children, 
  delay = 0,
  duration = 0.5 
}: { 
  children: string
  delay?: number
  duration?: number 
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const words = children.split(' ')
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      className="overflow-hidden"
    >
      {words.map((word, wordIndex) => (
        <motion.span
          key={wordIndex}
          variants={{
            hidden: { y: '100%' },
            visible: { 
              y: 0,
              transition: {
                duration,
                delay: delay + wordIndex * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }
            },
          }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

// Alternative component for JSX elements
export function ElementReveal({ 
  children, 
  delay = 0,
  duration = 0.5 
}: { 
  children: React.ReactNode
  delay?: number
  duration?: number 
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration,
            delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }
        },
      }}
    >
      {children}
    </motion.div>
  )
}

// Stagger animation for lists
export function StaggerAnimation({ 
  children, 
  staggerDelay = 0.1,
  delay = 0 
}: { 
  children: React.ReactNode[]
  staggerDelay?: number
  delay?: number 
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delayChildren: delay,
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: {
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
              }
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
