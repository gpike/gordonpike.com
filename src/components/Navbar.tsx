'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { ThemeToggle } from './theme-toggle'
import { useState, useEffect } from 'react'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/presentations', label: 'Presentations' },
  { href: '/about', label: 'About' },
]

export function Navbar() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  // After mounting, we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-16 items-center'>
        <Link href='/' className='flex items-center space-x-2 text-primary'>
          <Image
            src='/images/gplogo.svg'
            alt='GordonPike Logo'
            width={32}
            height={32}
            className='h-8 w-8'
          />
          <span className='hidden font-bold sm:inline-block'>GordonPike</span>
        </Link>
        <nav className='flex flex-1 items-center justify-end space-x-6'>
          {navItems.map((item) => {
            const isActive = mounted && pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className='relative text-sm font-medium transition-colors hover:text-primary'
              >
                {isActive && (
                  <motion.div
                    layoutId='navbar-indicator'
                    className='absolute -bottom-1 left-0 right-0 h-0.5 bg-primary'
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {item.label}
              </Link>
            )
          })}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
