'use client'

import { motion } from 'framer-motion'
import { ContentCard } from '@/components/ContentCard'
import { Presentation } from '@/lib/mdx'

interface PresentationsContentProps {
  presentations: Presentation[]
}

export function PresentationsContent({
  presentations,
}: PresentationsContentProps) {
  return (
    <div className='container mx-auto px-4 py-12'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='mb-12 text-center'
      >
        <h1 className='mb-4 text-4xl font-bold'>Presentations</h1>
        <p className='mx-auto max-w-2xl text-lg text-muted-foreground'>
          Talks and workshops I've given at conferences, meetups, and events.
        </p>
      </motion.div>

      <div className='grid gap-8 md:grid-cols-2'>
        {presentations.map((presentation, index) => (
          <motion.div
            key={presentation.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <ContentCard content={presentation} type='presentations' />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
