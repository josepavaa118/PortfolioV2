'use client'

import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'
import Image from 'next/image'

interface Project {
  _id: string
  title: string
  description: string
  emoji: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  image?: any
  featured: boolean
}

interface ProjectsSectionProps {
  projects: Project[]
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const featuredProjects = projects.filter(project => project.featured)
  const otherProjects = projects.filter(project => !project.featured)

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
            Mi <span className="gradient-text">trabajo</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Proyectos creados con precisión y propósito para ofrecer experiencias inolvidables.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="project-card group"
            >
              {project.image && (
                <div className="mb-6 overflow-hidden rounded-lg">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{project.emoji}</span>
                <h3 className="text-xl font-bold">{project.title}</h3>
              </div>
              
              <p className="text-gray-400 mb-6">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-4">
                {project.githubUrl && (
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <Github size={18} />
                    Ver GitHub
                  </motion.a>
                )}
                {project.liveUrl && (
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <ExternalLink size={18} />
                    Visitar Web
                  </motion.a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="project-card"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xl">{project.emoji}</span>
                  <h3 className="text-lg font-bold">{project.title}</h3>
                </div>
                
                <p className="text-gray-400 mb-4 text-sm">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
                
                <div className="flex gap-4">
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      <Github size={16} />
                    </motion.a>
                  )}
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      <ExternalLink size={16} />
                    </motion.a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
