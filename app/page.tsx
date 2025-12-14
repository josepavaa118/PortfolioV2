import SimpleScrollContainer from '@/components/SimpleScrollContainer'
import Section from '@/components/Section'
import HeroSection from '@/components/HeroSection'
import ProjectsSection from '@/components/ProjectsSection'
import AboutSection from '@/components/AboutSection'
import SkillsSection from '@/components/SkillsSection'
import EducationSection from '@/components/EducationSection'
import ContactSection from '@/components/ContactSection'

// Mock data for development - replace with Sanity queries in production
const mockData = {
  profile: {
    name: 'Tu Nombre',
    title: 'Frontend Developer',
    description: 'Desarrollo soluciones digitales que mejoran la experiencia del usuario y marcan la diferencia, combinando innovación y precisión.',
    githubUrl: 'https://github.com/tuusuario',
    linkedinUrl: 'https://linkedin.com/in/tuusuario',
  },
  projects: [
    {
      _id: '1',
      title: 'Popix Editor',
      description: 'Editor de imágenes, rápido, online y gratis.',
      emoji: '🌅',
      technologies: ['React', 'Tailwind', 'HTML', 'Canvas'],
      githubUrl: 'https://github.com/tuusuario/popix-editor',
      liveUrl: 'https://popix-editor.vercel.app',
      featured: true,
    },
    {
      _id: '2',
      title: '4Imagenes1Palabra',
      description: 'Adivina la palabra a partir de las cuatro imágenes.',
      emoji: '🎮',
      technologies: ['React', 'Tailwind'],
      githubUrl: 'https://github.com/tuusuario/4imagenes1palabra',
      liveUrl: 'https://4imagenes1palabra.vercel.app',
      featured: true,
    },
    {
      _id: '3',
      title: 'FPS Calculator',
      description: 'Calculadora de FPS para gaming.',
      emoji: '⚡',
      technologies: ['React', 'Tailwind', 'Vercel'],
      githubUrl: 'https://github.com/tuusuario/fps-calculator',
      featured: false,
    },
    {
      _id: '4',
      title: 'Reading List',
      description: 'Lista de libros para leer.',
      emoji: '📚',
      technologies: ['React', 'Tailwind'],
      githubUrl: 'https://github.com/tuusuario/reading-list',
      featured: false,
    },
  ],
  skills: [
    { _id: '1', name: 'React', category: 'frontend' as const },
    { _id: '2', name: 'JavaScript', category: 'frontend' as const },
    { _id: '3', name: 'TypeScript', category: 'frontend' as const },
    { _id: '4', name: 'Next.js', category: 'frontend' as const },
    { _id: '5', name: 'Astro', category: 'frontend' as const },
    { _id: '6', name: 'MySQL', category: 'backend' as const },
    { _id: '7', name: 'Git', category: 'tools' as const },
    { _id: '8', name: 'Tailwind', category: 'frontend' as const },
    { _id: '9', name: 'HTML', category: 'frontend' as const },
    { _id: '10', name: 'CSS', category: 'frontend' as const },
    { _id: '11', name: 'Figma', category: 'design' as const },
    { _id: '12', name: 'Agile', category: 'tools' as const },
  ],
  education: [
    {
      _id: '1',
      title: 'Computer Science',
      institution: 'Universidad Fidélitas',
      year: '2027',
      description: 'Carrera universitaria enfocada en fundamentos de programación, estructuras de datos, bases de datos y sistemas informáticos.',
      emoji: '💻',
    },
    {
      _id: '2',
      title: 'Especialización en Diseño y Desarrollo Web',
      institution: 'Universidad Fidélitas',
      year: '2025',
      description: 'Formación práctica en Bootstrap, JavaScript, JQuery, MySQL, AJAX, PHP y Wordpress.',
      emoji: '🎓',
    },
  ],
}

export default function Home() {
  const sections = ['Inicio', 'Proyectos', 'Sobre mí', 'Skills', 'Educación', 'Contacto']

  return (
    <SimpleScrollContainer sections={sections}>
      <Section id="home" className="items-center">
        <HeroSection />
      </Section>
      
      <Section id="projects">
        <ProjectsSection projects={mockData.projects} />
      </Section>
      
      <Section id="about">
        <AboutSection profile={mockData.profile} />
      </Section>
      
      <Section id="skills">
        <SkillsSection skills={mockData.skills} />
      </Section>
      
      <Section id="education" className="pt-16 pb-32">
        <EducationSection education={mockData.education} />
      </Section>
      
      <Section id="contact" className="pt-16 pb-32">
        <ContactSection profile={mockData.profile} />
      </Section>
    </SimpleScrollContainer>
  )
}

// Uncomment and use these functions when Sanity is configured
/*
export async function getStaticProps() {
  const profile = await client.fetch(`*[_type == "profile"][0]`)
  const projects = await client.fetch(`*[_type == "project"]`)
  const skills = await client.fetch(`*[_type == "skill"]`)
  const education = await client.fetch(`*[_type == "education"]`)

  return {
    props: {
      profile,
      projects,
      skills,
      education,
    },
    revalidate: 60, // Revalidate every minute
  }
}
*/
