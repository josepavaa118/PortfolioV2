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
          setVisibleSkills(prev => new Set([...prev, skill._id]))
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
    <div className="py-20 bg-gray-900/50 h-full flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Tecnologías
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Me especializo en crear interfaces web modernas y pensadas para el usuario. 
            Cuido los detalles, combinando diseño, rendimiento y buenas prácticas.
          </p>
        </motion.div>

        {/* Terminal Command */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="code-block max-w-md mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-green-400">$</span>
              <span className="text-white">skills --list</span>
            </div>
            <div className="text-sm text-gray-300">
              Cargando habilidades...
            </div>
          </div>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(groupedSkills).map(([category, categorySkills], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              className="bg-gray-900/50 border border-gray-800 rounded-lg p-6"
            >
              <h3 className="text-lg font-semibold mb-6 text-center">
                {skillCategories[category as keyof typeof skillCategories]}
              </h3>
              
              <div className="space-y-4">
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
                      className="w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0"
                    >
                      <svg 
                        className="w-3 h-3 text-black" 
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
                    <span className="text-gray-300">{skill.name}</span>
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
          className="mt-16 text-center"
        >
          <h3 className="text-xl font-semibold mb-8">Y muchas más...</h3>
          
          <div className="flex flex-wrap justify-center gap-4">
            {['Agile', 'Git', 'Figma', 'Photoshop', 'Illustrator', 'Vercel', 'Netlify'].map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-full text-gray-300 hover:border-gray-500 hover:text-white transition-colors duration-200"
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
