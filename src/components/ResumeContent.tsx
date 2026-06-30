'use client'

import { motion } from 'framer-motion'
import {
  Download,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Linkedin,
} from 'lucide-react'
import Link from 'next/link'
import { ResumeData } from '@/lib/resume'
import { MDXServerContent } from './MDXServerContent'

interface ResumeContentProps {
  data: ResumeData
}

export function ResumeContent({ data }: ResumeContentProps) {
  return (
    <div className='container mx-auto px-4 py-12'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='mb-12 text-center'
      >
        <h1 className='mb-2 text-4xl font-bold'>{data.contact.name}</h1>
        <p className='mb-4 text-xl text-muted-foreground'>
          {data.contact.title}
        </p>

        <div className='mb-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground'>
          <div className='flex items-center'>
            <MapPin className='mr-1 h-4 w-4' />
            <span>{data.contact.address}</span>
          </div>
          <div className='flex items-center'>
            <Phone className='mr-1 h-4 w-4' />
            <span>{data.contact.phone}</span>
          </div>
          <div className='flex items-center'>
            <Mail className='mr-1 h-4 w-4' />
            <a
              href={`mailto:${data.contact.email}`}
              className='hover:text-primary'
            >
              {data.contact.email}
            </a>
          </div>
          <div className='flex items-center'>
            <Linkedin className='mr-1 h-4 w-4' />
            <a
              href={`https://linkedin.com/in/${data.contact.linkedin}`}
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-primary'
            >
              {data.contact.linkedin}
            </a>
          </div>
        </div>

        <p className='mx-auto max-w-2xl text-lg text-muted-foreground'>
          {data.summary}
        </p>
        <div className='mt-6 flex justify-center gap-4'>
          <Link
            href={data.pdf_link}
            className='inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Download className='mr-2 h-4 w-4' />
            Download PDF
          </Link>
          <Link
            href={data.linkedin_link}
            className='inline-flex items-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground'
            target='_blank'
            rel='noopener noreferrer'
          >
            <ExternalLink className='mr-2 h-4 w-4' />
            View on LinkedIn
          </Link>
        </div>
      </motion.div>

      <div className='mx-auto max-w-4xl'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <MDXServerContent content={data.content} />
        </motion.div>
      </div>
    </div>
  )
}
