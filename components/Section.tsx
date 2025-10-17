'use client'

import { motion } from 'framer-motion'

interface SectionProps {
  id: string
  children: React.ReactNode
  className?: string
}

export default function Section({ id, children, className = '' }: SectionProps) {
  return (
    <section
      id={id}
      className={`h-screen w-full flex items-center justify-center relative snap-start ${className}`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  )
}
