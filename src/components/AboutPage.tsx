'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { AboutData } from '@/lib/about'
import { Github, Linkedin, Twitter, Mail, Globe } from 'lucide-react'

interface AboutPageProps {
  data: AboutData
}

export function AboutPage({ data }: AboutPageProps) {
  const { name, image, skills, experience, education, social_links, content } =
    data

  return (
    <div className='container mx-auto px-4 py-12'>
      <div className='mx-auto max-w-4xl'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='mb-12 text-center'
        >
          <h1 className='mb-6 text-4xl font-bold'>{name}</h1>
          <div className='flex justify-center space-x-4'>
            {social_links.twitter && (
              <a
                href={social_links.twitter}
                target='_blank'
                rel='noopener noreferrer'
                className='text-muted-foreground hover:text-primary'
              >
                <Twitter className='h-5 w-5' />
                <span className='sr-only'>Twitter</span>
              </a>
            )}
            {social_links.linkedin && (
              <a
                href={social_links.linkedin}
                target='_blank'
                rel='noopener noreferrer'
                className='text-muted-foreground hover:text-primary'
              >
                <Linkedin className='h-5 w-5' />
                <span className='sr-only'>LinkedIn</span>
              </a>
            )}
            {social_links.github && (
              <a
                href={social_links.github}
                target='_blank'
                rel='noopener noreferrer'
                className='text-muted-foreground hover:text-primary'
              >
                <Github className='h-5 w-5' />
                <span className='sr-only'>GitHub</span>
              </a>
            )}
            {social_links.email && (
              <a
                href={`mailto:${social_links.email}`}
                className='text-muted-foreground hover:text-primary'
              >
                <Mail className='h-5 w-5' />
                <span className='sr-only'>Email</span>
              </a>
            )}
            {social_links.website && (
              <a
                href={social_links.website}
                target='_blank'
                rel='noopener noreferrer'
                className='text-muted-foreground hover:text-primary'
              >
                <Globe className='h-5 w-5' />
                <span className='sr-only'>Website</span>
              </a>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className='mb-12 grid gap-8 md:grid-cols-2 md:items-start'
        >
          <div className='relative aspect-square overflow-hidden rounded-lg'>
            <Image
              src={image}
              alt={name}
              fill
              className='object-cover'
              priority
            />
          </div>

          <div className='prose prose-sm max-w-none dark:prose-invert'>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='mb-12'
        >
          <h2 className='mb-6 text-2xl font-bold'>Skills</h2>
          <div className='flex flex-wrap gap-2'>
            {skills.map((skill) => (
              <span
                key={skill}
                className='rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground'
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='mb-12'
        >
          <h2 className='mb-6 text-2xl font-bold'>Experience</h2>
          <div className='space-y-6'>
            {experience.map((job) => (
              <div key={job.company} className='space-y-2'>
                <h3 className='text-xl font-semibold'>{job.title}</h3>
                <p className='text-muted-foreground'>
                  {job.company} • {job.period}
                </p>
                <p className='text-muted-foreground'>{job.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
