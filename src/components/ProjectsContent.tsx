'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

// Sample project data - replace with your actual projects
const projects = [
  {
    title: 'Portfolio Website',
    description:
      'Personal website and blog built with Next.js, Tailwind CSS, and MDX.',
    image: '/images/gplogo.svg',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'MDX'],
    link: 'https://github.com/gordonpike/portfolio',
    external: true,
  },
  {
    title: 'Project 2',
    description:
      'Description of your second project. Add details about what you built and the technologies used.',
    image: '/images/gplogo.svg',
    tags: ['React', 'Node.js', 'MongoDB'],
    link: '#',
    external: false,
  },
  {
    title: 'Project 3',
    description:
      'Description of your third project. Add details about what you built and the technologies used.',
    image: '/images/gplogo.svg',
    tags: ['TypeScript', 'AWS', 'Serverless'],
    link: '#',
    external: false,
  },
]

export function ProjectsContent() {
  return (
    <div className='container mx-auto px-4 py-12'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='mb-12 text-center'
      >
        <h1 className='mb-4 text-4xl font-bold'>Projects</h1>
        <p className='mx-auto max-w-2xl text-lg text-muted-foreground'>
          A collection of projects I've worked on, showcasing my skills and
          experience.
        </p>
      </motion.div>

      <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className='group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md'
          >
            <div className='relative h-48 w-full overflow-hidden text-primary'>
              <Image
                src={project.image}
                alt={project.title}
                fill
                className='object-cover transition-transform duration-300 group-hover:scale-105'
              />
            </div>
            <div className='p-6'>
              <h3 className='mb-2 text-xl font-semibold'>{project.title}</h3>
              <p className='mb-4 text-sm text-muted-foreground'>
                {project.description}
              </p>
              <div className='mb-4 flex flex-wrap gap-2'>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className='rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary'
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={project.link}
                className='inline-flex items-center text-sm font-medium text-primary hover:underline'
                target={project.external ? '_blank' : undefined}
                rel={project.external ? 'noopener noreferrer' : undefined}
              >
                View Project
                {project.external && <ExternalLink className='ml-1 h-3 w-3' />}
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
