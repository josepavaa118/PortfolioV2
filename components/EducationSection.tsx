'use client'

import { motion } from 'framer-motion'

interface Education {
  _id: string
  title: string
  institution: string
  year: string
  description: string
  emoji: string
}

interface EducationSectionProps {
  education: Education[]
}

export default function EducationSection({ education }: EducationSectionProps) {
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
            Educación
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary opacity-30"></div>
            
            {education.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative flex items-start mb-12"
              >
                {/* Timeline Dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                  className="absolute left-6 w-4 h-4 bg-accent rounded-full border-4 border-black flex items-center justify-center z-10"
                >
                  <span className="text-xs">{item.emoji}</span>
                </motion.div>

                {/* Content */}
                <div className="ml-16 bg-gray-900 border border-gray-800 rounded-lg p-6 flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h3 className="text-xl font-bold mb-2 md:mb-0">{item.title}</h3>
                    <span className="text-accent font-semibold">{item.year}</span>
                  </div>
                  
                  <h4 className="text-lg text-gray-400 mb-3">{item.institution}</h4>
                  
                  <p className="text-gray-300 leading-relaxed">{item.description}</p>
                </div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    delay: index * 0.5 
                  }}
                  className="absolute -right-4 -top-2 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center opacity-60"
                >
                  <span className="text-primary text-sm">🎓</span>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4">Formación Continua</h3>
              <p className="text-gray-400 mb-6">
                Siempre aprendiendo nuevas tecnologías y manteniéndome actualizado 
                con las últimas tendencias en desarrollo web.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'Cursos Online', description: 'Plataformas como Udemy, Coursera, YouTube' },
                  { title: 'Comunidad', description: 'Participación activa en Discord y GitHub' },
                  { title: 'Proyectos', description: 'Aprendizaje mediante proyectos personales' },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <h4 className="font-semibold mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
