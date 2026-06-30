'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Github, Linkedin, Twitter, Mail, Globe, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Footer() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setEmail('')
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)

      // Reset success message after 5 seconds
      if (submitStatus === 'success') {
        setTimeout(() => {
          setSubmitStatus('idle')
        }, 5000)
      }
    }
  }

  return (
    <footer className='relative mt-auto border-t bg-gradient-to-b from-background to-primary/5'>
      <div className='absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,white)]' />
      <div className='relative z-10 container mx-auto px-4 py-12'>
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
          <div>
            <Link href='/' className='inline-block'>
              <Image
                src='/images/gplogo.svg'
                alt='GordonPike Logo'
                width={40}
                height={40}
                className='text-primary'
              />
            </Link>
            <p className='mt-4 text-sm text-muted-foreground'>
              Exploring the intersection of technology, design, and innovation.
            </p>
          </div>

          <div>
            <h3 className='mb-4 text-lg font-semibold'>Navigation</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/'
                  className='text-sm text-muted-foreground hover:text-primary'
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href='/about'
                  className='text-sm text-muted-foreground hover:text-primary'
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href='/blog'
                  className='text-sm text-muted-foreground hover:text-primary'
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href='/presentations'
                  className='text-sm text-muted-foreground hover:text-primary'
                >
                  Presentations
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='mb-4 text-lg font-semibold'>Connect</h3>
            <div className='flex space-x-4'>
              <Button
                variant='ghost'
                size='icon'
                asChild
                className='text-muted-foreground hover:text-primary hover:bg-primary/10'
              >
                <Link
                  href='https://twitter.com/agilepike'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Twitter className='h-5 w-5' />
                  <span className='sr-only'>Twitter</span>
                </Link>
              </Button>
              <Button
                variant='ghost'
                size='icon'
                asChild
                className='text-muted-foreground hover:text-primary hover:bg-primary/10'
              >
                <Link
                  href='https://linkedin.com/in/gordonpike'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Linkedin className='h-5 w-5' />
                  <span className='sr-only'>LinkedIn</span>
                </Link>
              </Button>
              <Button
                variant='ghost'
                size='icon'
                asChild
                className='text-muted-foreground hover:text-primary hover:bg-primary/10'
              >
                <Link
                  href='https://github.com/agilepike'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Github className='h-5 w-5' />
                  <span className='sr-only'>GitHub</span>
                </Link>
              </Button>
              <Button
                variant='ghost'
                size='icon'
                asChild
                className='text-muted-foreground hover:text-primary hover:bg-primary/10'
              >
                <Link href='mailto:gordon@agilepike.com'>
                  <Mail className='h-5 w-5' />
                  <span className='sr-only'>Email</span>
                </Link>
              </Button>
            </div>
          </div>

          <div>
            <h3 className='mb-4 text-lg font-semibold'>Newsletter</h3>
            <p className='mb-4 text-sm text-muted-foreground'>
              Subscribe to my newsletter for updates and insights.
            </p>
            <form onSubmit={handleSubmit} className='space-y-3'>
              <div>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={email}
                  onChange={handleChange}
                  required
                  className='w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                  placeholder='your.email@example.com'
                />
              </div>
              <Button
                type='submit'
                disabled={isSubmitting}
                className='w-full border-primary/20 hover:bg-primary/10'
              >
                {isSubmitting ? (
                  <>
                    <span className='mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent'></span>
                    Subscribing...
                  </>
                ) : (
                  <>
                    <Send className='mr-2 h-4 w-4' />
                    Subscribe
                  </>
                )}
              </Button>
              {submitStatus === 'success' && (
                <p className='mt-2 text-sm text-green-600'>
                  Successfully subscribed to the newsletter!
                </p>
              )}
              {submitStatus === 'error' && (
                <p className='mt-2 text-sm text-red-600'>
                  There was an error subscribing. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>

        <div className='mt-12 border-t pt-8 text-center'>
          <p className='text-sm text-muted-foreground'>
            © {new Date().getFullYear()} Gordon Pike. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
