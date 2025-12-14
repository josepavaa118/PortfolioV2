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
    <div className="py-8 sm:py-12 md:py-16 lg:py-20 w-full pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="mobile-heading-responsive font-bold mb-4 sm:mb-6">
            Mi <span className="gradient-text">trabajo</span>
          </h2>
          <p className="mobile-text-responsive text-gray-400 max-w-3xl mx-auto px-4">
            Proyectos creados con precisión y propósito para ofrecer experiencias inolvidables.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 gap-y-6 mb-12 sm:mb-16">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="project-card group p-4 sm:p-6"
            >
              {project.image && (
                <div className="mb-4 sm:mb-6 overflow-hidden rounded-lg">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={300}
                    className="w-full h-32 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <span className="text-xl sm:text-2xl">{project.emoji}</span>
                <h3 className="text-lg sm:text-xl font-bold">{project.title}</h3>
              </div>
              
              <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 sm:px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs sm:text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                {project.githubUrl && (
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 text-sm sm:text-base"
                  >
                    <Github size={16} className="sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Ver GitHub</span>
                    <span className="sm:hidden">GitHub</span>
                  </motion.a>
                )}
                {project.liveUrl && (
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 text-sm sm:text-base"
                  >
                    <ExternalLink size={16} className="sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Visitar Web</span>
                    <span className="sm:hidden">Web</span>
                  </motion.a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 gap-y-6">
            {otherProjects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="project-card p-4 sm:p-6"
              >
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <span className="text-lg sm:text-xl">{project.emoji}</span>
                  <h3 className="text-base sm:text-lg font-bold">{project.title}</h3>
                </div>
                
                <p className="text-gray-400 mb-3 sm:mb-4 text-xs sm:text-sm">{project.description}</p>
                
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
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
                
                <div className="flex gap-3 sm:gap-4">
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      className="text-gray-400 hover:text-white transition-colors duration-200 p-2"
                    >
                      <Github size={14} className="sm:w-4 sm:h-4" />
                    </motion.a>
                  )}
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      className="text-gray-400 hover:text-white transition-colors duration-200 p-2"
                    >
                      <ExternalLink size={14} className="sm:w-4 sm:h-4" />
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
