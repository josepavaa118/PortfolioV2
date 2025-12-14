'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface AboutSectionProps {
  profile: {
    name: string
    title: string
    description: string
    profileImage?: any
  }
}

export default function AboutSection({ profile }: AboutSectionProps) {
  const [typedCode, setTypedCode] = useState('')
  
  const codeBlock = `const ${profile.name.split(' ')[0]} = {
  perfil: "${profile.description}",
  tecnologias: [
    "JavaScript", "React", "Next.js", 
    "Astro", "Tailwind", "MySQL"
  ],
  superpoderes: [
    "👀 Si algo se mueve 1px, me doy cuenta",
    "⚡ Aprender rápido",
    "🤝 Trabajo en equipo"
  ],
  mision: "Ayudar a convertir ideas en realidad digital."
}

console.log("🚀 Ejecutando perfil:", ${profile.name.split(' ')[0]});`

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < codeBlock.length) {
        setTypedCode(codeBlock.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
      }
    }, 30)

    return () => clearInterval(timer)
  }, [codeBlock])

  return (
    <div className="py-8 sm:py-12 md:py-16 lg:py-20 w-full pb-16 px-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="mobile-heading-responsive font-bold mb-4 sm:mb-6">
            Sobre <span className="gradient-text">mí</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 gap-y-6 items-center">
          {/* Profile Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{profile.name}</h3>
              <p className="text-lg sm:text-xl text-gray-400 mb-4 sm:mb-6">{profile.title}</p>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{profile.description}</p>
            </div>

            {/* Skills Preview */}
            <div className="space-y-3 sm:space-y-4">
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Tecnologías principales:</h4>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {['JavaScript', 'React', 'Next.js', 'Tailwind', 'TypeScript', 'Node.js'].map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0"></div>
                    <span className="text-gray-300 text-sm sm:text-base">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Code Block */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="code-block p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-400 text-xs sm:text-sm ml-2 sm:ml-4">profile.js</span>
              </div>
              
              <pre className="text-xs sm:text-sm overflow-x-auto">
                <code className="text-green-400">
                  {typedCode}
                  <span className="animate-pulse">|</span>
                </code>
              </pre>
            </div>

            {/* Floating Elements - Hidden on mobile for better performance */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 w-6 h-6 sm:w-8 sm:h-8 bg-primary/20 rounded-full flex items-center justify-center hidden sm:flex"
            >
              <span className="text-primary text-xs sm:text-sm">💻</span>
            </motion.div>
            
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-4 -left-4 w-6 h-6 sm:w-8 sm:h-8 bg-secondary/20 rounded-full flex items-center justify-center hidden sm:flex"
            >
              <span className="text-secondary text-xs sm:text-sm">⚡</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mt-12 sm:mt-20"
        >
          {[
            { label: 'Proyectos Completados', value: '15+' },
            { label: 'Tecnologías Dominadas', value: '12+' },
            { label: 'Años de Experiencia', value: '3+' },
            { label: 'Clientes Satisfechos', value: '10+' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl font-bold gradient-text mb-1 sm:mb-2">{stat.value}</div>
              <div className="text-gray-400 text-xs sm:text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
