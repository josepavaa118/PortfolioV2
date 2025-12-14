'use client'

import { motion } from 'framer-motion'

interface SectionProps {
  id: string
  children: React.ReactNode
  className?: string
}

export default function Section({ id, children, className = '' }: SectionProps) {
  // Check if items-center is specified in className, otherwise default to items-start
  const hasItemsCenter = className.includes('items-center')
  const baseClasses = hasItemsCenter 
    ? `bg-gray-900/50 w-full flex items-center justify-center relative snap-start mobile-section min-h-screen ${className}`
    : `bg-gray-900/50 w-full flex items-start justify-center relative snap-start mobile-section px-6 py-10 pb-12 ${className}`
  
  return (
    <section
      id={id}
      className={baseClasses}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  )
}
