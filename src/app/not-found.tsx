import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PageTransition } from '@/components/PageTransition'

export default function NotFound() {
  return (
    <PageTransition>
      <div className='container flex flex-col items-center justify-center px-4 py-24 text-center'>
        <h1 className='mb-4 text-6xl font-bold'>404</h1>
        <h2 className='mb-6 text-2xl font-semibold'>Page Not Found</h2>
        <p className='mb-8 max-w-md text-muted-foreground'>
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button asChild>
          <Link href='/'>Return Home</Link>
        </Button>
      </div>
    </PageTransition>
  )
}
