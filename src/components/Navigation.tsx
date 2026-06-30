'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Blog', path: '/blog' },
  { name: 'Presentations', path: '/presentations' },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-16 items-center'>
        <div className='mr-8'>
          <Link href='/' className='flex items-center space-x-2'>
            <motion.span
              className='text-xl font-bold'
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              Portfolio
            </motion.span>
          </Link>
        </div>
        <div className='flex flex-1 items-center justify-between space-x-2 md:justify-end'>
          <div className='flex items-center space-x-6'>
            {navItems.map((item) => {
              const isActive = pathname === item.path
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    'relative text-sm font-medium transition-colors hover:text-foreground/80',
                    isActive ? 'text-foreground' : 'text-foreground/60'
                  )}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      className='absolute -bottom-[17px] left-0 right-0 h-0.5 bg-foreground'
                      layoutId='navbar-indicator'
                      transition={{
                        type: 'spring',
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
