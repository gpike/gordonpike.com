'use client'

import Image from 'next/image'
import Link from 'next/link'
import { format, parseISO, isValid } from 'date-fns'
import { marked } from 'marked'

interface MDXContentProps {
  content: string
  title: string
  date: string
  coverImage?: string
  tags?: string[]
  event?: string
  location?: string
  videoUrl?: string
  slidesUrl?: string
}

export function MDXContent({
  content,
  title,
  date,
  coverImage,
  tags,
  event,
  location,
  videoUrl,
  slidesUrl,
}: MDXContentProps) {
  // Format the date
  const formattedDate = (() => {
    try {
      const parsedDate = parseISO(date)
      if (isValid(parsedDate)) {
        return format(parsedDate, 'MMMM d, yyyy')
      }
      return date
    } catch (error) {
      return date
    }
  })()

  // Convert markdown to HTML
  const htmlContent = marked(content)

  return (
    <article className='mx-auto max-w-3xl'>
      <header className='mb-8'>
        <h1 className='mb-4 text-4xl font-bold'>{title}</h1>
        <div className='flex flex-wrap items-center gap-2 text-sm text-muted-foreground'>
          <time dateTime={date}>{formattedDate}</time>
          {event && (
            <>
              <span>•</span>
              <span>{event}</span>
            </>
          )}
          {location && (
            <>
              <span>•</span>
              <span>{location}</span>
            </>
          )}
        </div>
        {tags && tags.length > 0 && (
          <div className='mt-4 flex flex-wrap gap-2'>
            {tags.map((tag) => (
              <span
                key={tag}
                className='rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground'
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {coverImage && (
        <div className='mb-8 overflow-hidden rounded-lg'>
          <Image
            src={coverImage}
            alt={title}
            width={1200}
            height={630}
            className='w-full object-cover'
            priority
          />
        </div>
      )}

      <div
        className='prose prose-sm max-w-none dark:prose-invert'
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {(videoUrl || slidesUrl) && (
        <div className='mt-8 flex flex-wrap gap-4'>
          {videoUrl && (
            <a
              href={videoUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90'
            >
              Watch Video
            </a>
          )}
          {slidesUrl && (
            <a
              href={slidesUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90'
            >
              View Slides
            </a>
          )}
        </div>
      )}
    </article>
  )
}
