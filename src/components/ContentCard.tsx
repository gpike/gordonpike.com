'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { format, parseISO } from 'date-fns'
import { Post, Presentation } from '@/lib/mdx'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface ContentCardProps {
  content: Post | Presentation
  type: 'blog' | 'presentations'
}

export function ContentCard({ content, type }: ContentCardProps) {
  const { slug, title, date, excerpt, coverImage } = content

  // Safely format the date with error handling
  let formattedDate = 'No date'
  try {
    if (date && typeof date === 'string') {
      // Try to parse the date string as ISO format
      const parsedDate = parseISO(date)
      formattedDate = format(parsedDate, 'MMMM d, yyyy')
    } else if (date && typeof date === 'object' && 'getTime' in date) {
      // If it's already a Date object
      formattedDate = format(date as Date, 'MMMM d, yyyy')
    } else if (date) {
      // If it's some other format, try to convert to string
      formattedDate = String(date)
    }
  } catch (error) {
    console.error('Error formatting date:', error)
    // Fallback to displaying the raw date string
    formattedDate = date ? String(date) : 'No date'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Link href={`/${type}/${slug}`}>
        <Card className='h-full overflow-hidden transition-colors hover:bg-muted/50'>
          {coverImage && (
            <div className='relative h-48 w-full'>
              <Image
                src={coverImage}
                alt={title}
                fill
                className='object-cover'
              />
            </div>
          )}
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{formattedDate}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-muted-foreground'>{excerpt}</p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
