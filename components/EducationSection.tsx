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
    <div className="py-8 sm:py-12 md:py-16 lg:py-20 w-full pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="mobile-heading-responsive font-bold mb-4 sm:mb-6">
            Educación
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary opacity-30"></div>
            
            {education.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative flex items-start mb-8 sm:mb-12"
              >
                {/* Timeline Dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                  className="absolute left-2 sm:left-6 w-3 h-3 sm:w-4 sm:h-4 bg-accent rounded-full border-2 sm:border-4 border-black flex items-center justify-center z-10"
                >
                  <span className="text-xs">{item.emoji}</span>
                </motion.div>

                {/* Content */}
                <div className="ml-8 sm:ml-16 bg-gray-900 border border-gray-800 rounded-lg p-4 sm:p-6 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4">
                    <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-0">{item.title}</h3>
                    <span className="text-accent font-semibold text-sm sm:text-base">{item.year}</span>
                  </div>
                  
                  <h4 className="text-base sm:text-lg text-gray-400 mb-2 sm:mb-3">{item.institution}</h4>
                  
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{item.description}</p>
                </div>

                {/* Floating Elements - Hidden on mobile for better performance */}
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
                  className="absolute -right-4 -top-2 w-6 h-6 sm:w-8 sm:h-8 bg-primary/20 rounded-full flex items-center justify-center opacity-60 hidden sm:flex"
                >
                  <span className="text-primary text-xs sm:text-sm">🎓</span>
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
            className="mt-12 sm:mt-16 text-center"
          >
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 sm:p-6 lg:p-8">
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Formación Continua</h3>
              <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
                Siempre aprendiendo nuevas tecnologías y manteniéndome actualizado 
                con las últimas tendencias en desarrollo web.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
                    <h4 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-400">{item.description}</p>
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
