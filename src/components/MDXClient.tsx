'use client'

import { MDXRemote } from 'next-mdx-remote'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import Image from 'next/image'
import Link from 'next/link'
import { format, parseISO, isValid } from 'date-fns'

interface MDXClientProps {
  content: MDXRemoteSerializeResult
  title: string
  date: string
  coverImage?: string
  tags?: string[]
  event?: string
  location?: string
  videoUrl?: string
  slidesUrl?: string
}

const components = {
  img: (props: any) => (
    <div className='my-6 overflow-hidden rounded-lg'>
      <Image
        src={props.src}
        alt={props.alt || ''}
        width={800}
        height={400}
        className='w-full object-cover'
      />
    </div>
  ),
  a: (props: any) => (
    <Link
      href={props.href}
      className='text-primary underline underline-offset-4 hover:text-primary/80'
      {...props}
    />
  ),
  h1: (props: any) => (
    <h1 className='mb-6 mt-8 text-3xl font-bold' {...props} />
  ),
  h2: (props: any) => (
    <h2 className='mb-4 mt-8 text-2xl font-bold' {...props} />
  ),
  h3: (props: any) => <h3 className='mb-3 mt-6 text-xl font-bold' {...props} />,
  p: (props: any) => <p className='mb-4 leading-7' {...props} />,
  ul: (props: any) => <ul className='mb-4 ml-6 list-disc' {...props} />,
  ol: (props: any) => <ol className='mb-4 ml-6 list-decimal' {...props} />,
  li: (props: any) => <li className='mb-2' {...props} />,
  blockquote: (props: any) => (
    <blockquote
      className='my-4 border-l-4 border-primary pl-4 italic'
      {...props}
    />
  ),
  code: (props: any) => (
    <code
      className='rounded bg-muted px-1 py-0.5 font-mono text-sm'
      {...props}
    />
  ),
  pre: (props: any) => (
    <pre className='mb-4 overflow-x-auto rounded-lg bg-muted p-4' {...props} />
  ),
}

export function MDXClient({
  content,
  title,
  date,
  coverImage,
  tags,
  event,
  location,
  videoUrl,
  slidesUrl,
}: MDXClientProps) {
  // Safely format the date with error handling
  let formattedDate = 'Date not available'
  try {
    if (date) {
      const parsedDate = parseISO(date)
      if (isValid(parsedDate)) {
        formattedDate = format(parsedDate, 'MMMM d, yyyy')
      }
    }
  } catch (error) {
    console.error('Error formatting date:', error)
  }

  return (
    <article className='prose prose-neutral mx-auto max-w-3xl dark:prose-invert'>
      <header className='mb-8 text-center'>
        <h1 className='mb-2 text-4xl font-bold'>{title}</h1>
        <time className='text-muted-foreground'>{formattedDate}</time>

        {event && location && (
          <p className='mt-2 text-muted-foreground'>
            {event} • {location}
          </p>
        )}

        {tags && tags.length > 0 && (
          <div className='mt-4 flex flex-wrap justify-center gap-2'>
            {tags.map((tag) => (
              <span
                key={tag}
                className='rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground'
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {coverImage && (
          <div className='relative mt-6 h-64 w-full overflow-hidden rounded-lg'>
            <Image src={coverImage} alt={title} fill className='object-cover' />
          </div>
        )}

        {(videoUrl || slidesUrl) && (
          <div className='mt-6 flex justify-center gap-4'>
            {videoUrl && (
              <a
                href={videoUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90'
              >
                Watch Video
              </a>
            )}
            {slidesUrl && (
              <a
                href={slidesUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='rounded-md bg-secondary px-4 py-2 text-secondary-foreground hover:bg-secondary/90'
              >
                View Slides
              </a>
            )}
          </div>
        )}
      </header>

      <div className='mt-8'>
        <MDXRemote {...content} components={components} />
      </div>
    </article>
  )
}

export { MDXClient as default }
