'use client'

import { motion } from 'framer-motion'
import { ContentCard } from '@/components/ContentCard'
import { Post } from '@/lib/mdx'

interface BlogContentProps {
  posts: Post[]
}

export function BlogContent({ posts }: BlogContentProps) {
  return (
    <div className='container mx-auto px-4 py-12'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='mb-12 text-center'
      >
        <h1 className='mb-4 text-4xl font-bold'>Blog</h1>
        <p className='mx-auto max-w-2xl text-lg text-muted-foreground'>
          Thoughts, tutorials, and insights on web development, technology, and
          software engineering.
        </p>
      </motion.div>

      <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {posts.map((post, index) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <ContentCard content={post} type='blog' />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
