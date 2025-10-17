'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black border-t border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6 md:mb-0"
          >
            <div className="text-xl font-bold gradient-text mb-2">
              Portfolio V3
            </div>
            <p className="text-gray-400 text-sm">
              Desarrollado con ❤️ usando Next.js y Sanity
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-6"
          >
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <Github size={24} />
            </motion.a>
            
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              <Linkedin size={24} />
            </motion.a>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 md:mt-0 text-center md:text-right"
          >
            <p className="text-gray-400 text-sm">
              © {currentYear} Portfolio V3. Todos los derechos reservados.
            </p>
          </motion.div>
        </div>

        {/* Bottom Border */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 pt-8 border-t border-gray-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
            <div className="mb-4 md:mb-0">
              Inspirado en{' '}
              <a
                href="https://byronjvh.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-accent transition-colors duration-200"
              >
                Byron Vargas Hernández
              </a>
            </div>
            
            <div className="flex items-center gap-1">
              <span>Hecho con</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart size={12} className="text-red-500 fill-current" />
              </motion.div>
              <span>y Next.js</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

