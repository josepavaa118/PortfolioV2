'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Github, Linkedin, MessageCircle, Send } from 'lucide-react'

interface ContactSectionProps {
  profile: {
    githubUrl?: string
    linkedinUrl?: string
  }
}

export default function ContactSection({ profile }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', message: '' })
    }, 3000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

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
            Contacto
          </h2>
          <p className="mobile-text-responsive text-gray-400 max-w-3xl mx-auto px-4">
            Escuchando ideas y solicitudes de colaboración...
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          {/* Terminal Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="code-block p-4 sm:p-6"
          >
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-400 text-xs sm:text-sm ml-2 sm:ml-4">contact.sh</span>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="text-green-400 text-base sm:text-lg mb-3 sm:mb-4">✅ Mensaje enviado exitosamente!</div>
                <p className="text-gray-400 text-sm sm:text-base">Gracias por contactarme. Te responderé pronto.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-1 sm:mb-2">
                    <span className="text-green-400">$</span>
                    <span className="text-white text-sm sm:text-base">echo "Nombre:"</span>
                  </div>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="terminal-input w-full bg-transparent border-none outline-none text-white font-mono text-sm sm:text-base"
                    placeholder="Tu nombre aquí..."
                    required
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1 sm:mb-2">
                    <span className="text-green-400">$</span>
                    <span className="text-white text-sm sm:text-base">echo "Email:"</span>
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="terminal-input w-full bg-transparent border-none outline-none text-white font-mono text-sm sm:text-base"
                    placeholder="tu@email.com"
                    required
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1 sm:mb-2">
                    <span className="text-green-400">$</span>
                    <span className="text-white text-sm sm:text-base">echo "Mensaje:"</span>
                  </div>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="terminal-input w-full bg-transparent border-none outline-none text-white font-mono resize-none h-20 sm:h-24 text-sm sm:text-base"
                    placeholder="Cuéntame sobre tu proyecto..."
                    required
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1 sm:mb-2">
                    <span className="text-green-400">$</span>
                    <span className="text-white text-sm sm:text-base">echo "Acciones disponibles:"</span>
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span className="hidden sm:inline">Enviando...</span>
                        <span className="sm:hidden">...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} className="sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">Enviar</span>
                        <span className="sm:hidden">Enviar</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Conectemos</h3>
              <p className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">
                ¿Tienes un proyecto en mente? Me encantaría escuchar sobre él. 
                Siempre estoy abierto a nuevas oportunidades y colaboraciones interesantes.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {[
                {
                  icon: Github,
                  label: 'GitHub',
                  url: profile.githubUrl,
                  description: 'Revisa mi código y proyectos'
                },
                {
                  icon: Linkedin,
                  label: 'LinkedIn',
                  url: profile.linkedinUrl,
                  description: 'Conectemos profesionalmente'
                },
                {
                  icon: MessageCircle,
                  label: 'WhatsApp',
                  url: '#',
                  description: 'Chat directo y rápido'
                },
              ].map((contact, index) => (
                <motion.a
                  key={contact.label}
                  href={contact.url}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-gray-600 transition-colors duration-200 group"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-200">
                    <contact.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base">{contact.label}</h4>
                    <p className="text-xs sm:text-sm text-gray-400">{contact.description}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Response Time */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 sm:p-6"
            >
              <h4 className="font-semibold mb-3 text-sm sm:text-base">Tiempo de respuesta</h4>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Email:</span>
                  <span className="text-accent">24-48 horas</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">WhatsApp:</span>
                  <span className="text-accent">Inmediato</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">LinkedIn:</span>
                  <span className="text-accent">1-2 días</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
