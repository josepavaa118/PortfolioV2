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
            Contacto
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Escuchando ideas y solicitudes de colaboración...
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Terminal Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="code-block"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-400 text-sm ml-4">contact.sh</span>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="text-green-400 text-lg mb-4">✅ Mensaje enviado exitosamente!</div>
                <p className="text-gray-400">Gracias por contactarme. Te responderé pronto.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-green-400">$</span>
                    <span className="text-white">echo "Nombre:"</span>
                  </div>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="terminal-input w-full bg-transparent border-none outline-none text-white font-mono"
                    placeholder="Tu nombre aquí..."
                    required
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-green-400">$</span>
                    <span className="text-white">echo "Email:"</span>
                  </div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="terminal-input w-full bg-transparent border-none outline-none text-white font-mono"
                    placeholder="tu@email.com"
                    required
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-green-400">$</span>
                    <span className="text-white">echo "Mensaje:"</span>
                  </div>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="terminal-input w-full bg-transparent border-none outline-none text-white font-mono resize-none h-24"
                    placeholder="Cuéntame sobre tu proyecto..."
                    required
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-green-400">$</span>
                    <span className="text-white">echo "Acciones disponibles:"</span>
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Enviar
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
              <h3 className="text-xl font-semibold mb-6">Conectemos</h3>
              <p className="text-gray-400 mb-8">
                ¿Tienes un proyecto en mente? Me encantaría escuchar sobre él. 
                Siempre estoy abierto a nuevas oportunidades y colaboraciones interesantes.
              </p>
            </div>

            <div className="space-y-6">
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
                  className="flex items-center gap-4 p-4 bg-gray-900/50 border border-gray-800 rounded-lg hover:border-gray-600 transition-colors duration-200 group"
                >
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-200">
                    <contact.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{contact.label}</h4>
                    <p className="text-sm text-gray-400">{contact.description}</p>
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
              className="bg-gray-900/50 border border-gray-800 rounded-lg p-6"
            >
              <h4 className="font-semibold mb-3">Tiempo de respuesta</h4>
              <div className="space-y-2 text-sm">
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
