'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface Skill {
  _id: string
  name: string
  category: 'frontend' | 'backend' | 'tools' | 'design'
}

interface SkillsSectionProps {
  skills: Skill[]
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const [visibleSkills, setVisibleSkills] = useState<Set<string>>(new Set())

  useEffect(() => {
    const timer = setTimeout(() => {
      skills.forEach((skill, index) => {
        setTimeout(() => {
          setVisibleSkills(prev => new Set([...Array.from(prev), skill._id]))
        }, index * 100)
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [skills])

  const skillCategories = {
    frontend: 'Frontend',
    backend: 'Backend', 
    tools: 'Herramientas',
    design: 'Diseño'
  }

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  return (
    <div className="py-8 sm:py-12 md:py-16 lg:py-20 w-full pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="mobile-heading-responsive font-bold mb-4 sm:mb-6">
            Tecnologías
          </h2>
          <p className="mobile-text-responsive text-gray-400 max-w-3xl mx-auto px-4">
            Me especializo en crear interfaces web modernas y pensadas para el usuario. 
            Cuido los detalles, combinando diseño, rendimiento y buenas prácticas.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {Object.entries(groupedSkills).map(([category, categorySkills], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 sm:p-6"
            >
              <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-center">
                {skillCategories[category as keyof typeof skillCategories]}
              </h3>
              
              <div className="space-y-3 sm:space-y-4">
                {categorySkills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill._id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5, 
                      delay: categoryIndex * 0.2 + skillIndex * 0.1 
                    }}
                    className="skill-item"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ 
                        scale: visibleSkills.has(skill._id) ? 1 : 0 
                      }}
                      transition={{ 
                        duration: 0.3, 
                        delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.5 
                      }}
                      className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0"
                    >
                      <svg 
                        className="w-2 h-2 sm:w-3 sm:h-3 text-black" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                    </motion.div>
                    <span className="text-gray-300 text-sm sm:text-base">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <h3 className="text-lg sm:text-xl font-semibold mb-6 sm:mb-8">Y muchas más...</h3>
          
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {['Agile', 'Git', 'Figma', 'Photoshop', 'Illustrator', 'Vercel', 'Netlify'].map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="px-3 py-1 sm:px-4 sm:py-2 bg-gray-800 border border-gray-700 rounded-full text-gray-300 hover:border-gray-500 hover:text-white transition-colors duration-200 text-xs sm:text-sm"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
