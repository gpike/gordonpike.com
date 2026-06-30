'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, Github, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'

export function ContactContent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    }, 1500)

    // In a real implementation, you would send the form data to your backend
    // try {
    //   const response = await fetch('/api/contact', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData),
    //   })
    //   if (response.ok) {
    //     setSubmitStatus('success')
    //     setFormData({ name: '', email: '', subject: '', message: '' })
    //   } else {
    //     setSubmitStatus('error')
    //   }
    // } catch (error) {
    //   setSubmitStatus('error')
    // } finally {
    //   setIsSubmitting(false)
    // }
  }

  return (
    <div className='container mx-auto px-4 py-12'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='mb-12 text-center'
      >
        <h1 className='mb-4 text-4xl font-bold'>Contact Me</h1>
        <p className='mx-auto max-w-2xl text-lg text-muted-foreground'>
          Have a question or want to work together? Feel free to reach out!
        </p>
      </motion.div>

      <div className='mx-auto grid max-w-5xl gap-12 md:grid-cols-2'>
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className='rounded-lg border bg-card p-6 shadow-sm'
        >
          <h2 className='mb-6 text-2xl font-bold'>Send a Message</h2>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label htmlFor='name' className='mb-1 block text-sm font-medium'>
                Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                required
                className='w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                placeholder='Your name'
              />
            </div>
            <div>
              <label htmlFor='email' className='mb-1 block text-sm font-medium'>
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                required
                className='w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                placeholder='your.email@example.com'
              />
            </div>
            <div>
              <label
                htmlFor='subject'
                className='mb-1 block text-sm font-medium'
              >
                Subject
              </label>
              <input
                type='text'
                id='subject'
                name='subject'
                value={formData.subject}
                onChange={handleChange}
                required
                className='w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                placeholder='What is this regarding?'
              />
            </div>
            <div>
              <label
                htmlFor='message'
                className='mb-1 block text-sm font-medium'
              >
                Message
              </label>
              <textarea
                id='message'
                name='message'
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className='w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                placeholder='Your message here...'
              />
            </div>
            <button
              type='submit'
              disabled={isSubmitting}
              className='inline-flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50'
            >
              {isSubmitting ? (
                <>
                  <span className='mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent'></span>
                  Sending...
                </>
              ) : (
                <>
                  <Send className='mr-2 h-4 w-4' />
                  Send Message
                </>
              )}
            </button>
            {submitStatus === 'success' && (
              <p className='mt-2 text-sm text-green-600'>
                Message sent successfully!
              </p>
            )}
            {submitStatus === 'error' && (
              <p className='mt-2 text-sm text-red-600'>
                There was an error sending your message. Please try again.
              </p>
            )}
          </form>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='flex flex-col justify-between'
        >
          <div>
            <h2 className='mb-6 text-2xl font-bold'>Get in Touch</h2>
            <p className='mb-8 text-muted-foreground'>
              I'm always open to discussing new projects, creative ideas, or
              opportunities to be part of your visions.
            </p>
            <div className='mb-8 space-y-4'>
              <div className='flex items-start'>
                <Mail className='mr-3 mt-1 h-5 w-5 text-primary' />
                <div>
                  <h3 className='font-medium'>Email</h3>
                  <a
                    href='mailto:contact@gordonpike.com'
                    className='text-muted-foreground hover:text-primary'
                  >
                    contact@gordonpike.com
                  </a>
                </div>
              </div>
            </div>
            <div>
              <h3 className='mb-4 font-medium'>Connect with me</h3>
              <div className='flex space-x-4'>
                <Link
                  href='https://github.com/gordonpike'
                  className='text-muted-foreground hover:text-primary'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Github className='h-5 w-5' />
                  <span className='sr-only'>GitHub</span>
                </Link>
                <Link
                  href='https://linkedin.com/in/gordonpike'
                  className='text-muted-foreground hover:text-primary'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Linkedin className='h-5 w-5' />
                  <span className='sr-only'>LinkedIn</span>
                </Link>
                <Link
                  href='https://twitter.com/gordonpike'
                  className='text-muted-foreground hover:text-primary'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <Twitter className='h-5 w-5' />
                  <span className='sr-only'>Twitter</span>
                </Link>
              </div>
            </div>
          </div>
          <div className='mt-8 rounded-lg border bg-muted/50 p-6'>
            <h3 className='mb-2 font-medium'>Availability</h3>
            <p className='text-sm text-muted-foreground'>
              I'm currently available for freelance work and consulting
              opportunities. Feel free to reach out with your project details.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
