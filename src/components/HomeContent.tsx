'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Post } from '@/lib/mdx'

interface HomeContentProps {
  featuredPosts: Post[]
  featuredPresentations: Post[]
}

export function HomeContent({
  featuredPosts,
  featuredPresentations,
}: HomeContentProps) {
  return (
    <div className='container mx-auto px-4 py-12'>
      <section className='relative mb-20 overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-background p-8 shadow-lg'>
        <div className='absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,transparent)]' />
        <div className='relative z-10'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='text-center'
          >
            <h1 className='mb-6 text-5xl font-bold tracking-tight'>
              Welcome to{' '}
              <span className='bg-primary bg-clip-text text-transparent'>
                Gordon Pike's Blog
              </span>
            </h1>
            <p className='mx-auto mb-8 max-w-2xl text-xl text-muted-foreground'>
              Exploring the intersection of technology, design, and innovation.
              Join me on this journey of discovery and learning.
            </p>
            <div className='flex justify-center gap-4'>
              <Button
                asChild
                size='lg'
                className='bg-primary hover:bg-primary/90'
              >
                <Link href='/about'>Learn More</Link>
              </Button>
              <Button
                asChild
                variant='outline'
                size='lg'
                className='border-primary/20 hover:bg-primary/10'
              >
                <Link href='/blog'>Read Blog</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Blog Posts */}
      <section className='mb-20'>
        <div className='mb-8 flex items-center justify-between'>
          <h2 className='text-3xl font-bold'>Latest Articles</h2>
          <Button
            variant='outline'
            asChild
            className='border-primary/20 hover:bg-primary/10'
          >
            <Link href='/blog'>View All</Link>
          </Button>
        </div>
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {featuredPosts.map((post) => (
            <div key={post.slug} className='h-full'>
              <Link href={`/blog/${post.slug}`}>
                <motion.div
                  className='h-full overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-colors hover:bg-muted/50'
                  whileHover={{ y: -5 }}
                >
                  {post.coverImage && (
                    <div className='relative h-48 w-full overflow-hidden'>
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className='object-cover'
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                      />
                    </div>
                  )}
                  <div className='p-6'>
                    <h3 className='mb-2 text-xl font-semibold'>{post.title}</h3>
                    <p className='text-muted-foreground'>{post.excerpt}</p>
                    {post.tags && post.tags.length > 0 && (
                      <div className='mt-4 flex flex-wrap gap-2'>
                        {post.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className='rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary'
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Presentations */}
      <section>
        <div className='mb-8 flex items-center justify-between'>
          <h2 className='text-3xl font-bold'>Featured Presentations</h2>
          <Button
            variant='outline'
            asChild
            className='border-primary/20 hover:bg-primary/10'
          >
            <Link href='/presentations'>View All</Link>
          </Button>
        </div>
        <div className='grid gap-6 md:grid-cols-2'>
          {featuredPresentations.map((presentation) => (
            <div key={presentation.slug} className='h-full'>
              <Link href={`/presentations/${presentation.slug}`}>
                <motion.div
                  className='group h-full overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-colors hover:bg-muted/50'
                  whileHover={{ y: -5 }}
                >
                  {presentation.coverImage && (
                    <div className='relative h-48 w-full overflow-hidden'>
                      <Image
                        src={presentation.coverImage}
                        alt={presentation.title}
                        fill
                        className='object-cover transition-transform duration-300 group-hover:scale-105'
                        sizes='(max-width: 768px) 100vw, 50vw'
                      />
                    </div>
                  )}
                  <div className='p-6'>
                    <h3 className='mb-2 text-xl font-semibold'>
                      {presentation.title}
                    </h3>
                    <p className='mb-4 text-muted-foreground'>
                      {presentation.excerpt}
                    </p>
                    {presentation.event && (
                      <div className='flex items-center text-sm text-muted-foreground'>
                        <span className='mr-2'>📍</span>
                        {presentation.event}
                        {presentation.location && ` • ${presentation.location}`}
                      </div>
                    )}
                  </div>
                </motion.div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
