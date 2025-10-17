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
    <div className="py-20 h-full flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Sobre <span className="gradient-text">mí</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Profile Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">{profile.name}</h3>
              <p className="text-xl text-gray-400 mb-6">{profile.title}</p>
              <p className="text-gray-300 leading-relaxed">{profile.description}</p>
            </div>

            {/* Skills Preview */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold mb-4">Tecnologías principales:</h4>
              <div className="grid grid-cols-2 gap-3">
                {['JavaScript', 'React', 'Next.js', 'Tailwind', 'TypeScript', 'Node.js'].map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-gray-300">{skill}</span>
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
            <div className="code-block">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-400 text-sm ml-4">profile.js</span>
              </div>
              
              <pre className="text-sm overflow-x-auto">
                <code className="text-green-400">
                  {typedCode}
                  <span className="animate-pulse">|</span>
                </code>
              </pre>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center"
            >
              <span className="text-primary text-sm">💻</span>
            </motion.div>
            
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-4 -left-4 w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center"
            >
              <span className="text-secondary text-sm">⚡</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
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
              <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
