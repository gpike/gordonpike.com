'use client'

import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { useEffect, useState } from 'react'

const components = {
  h1: (props: any) => <h1 className='mb-6 text-4xl font-bold' {...props} />,
  h2: (props: any) => (
    <h2 className='mb-4 mt-8 text-2xl font-bold' {...props} />
  ),
  h3: (props: any) => <h3 className='mb-3 mt-6 text-xl font-bold' {...props} />,
  p: (props: any) => <p className='mb-4 text-muted-foreground' {...props} />,
  ul: (props: any) => <ul className='mb-4 ml-6 list-disc' {...props} />,
  li: (props: any) => <li className='mb-2 text-muted-foreground' {...props} />,
}

interface MDXServerContentProps {
  content: string
}

export function MDXServerContent({ content }: MDXServerContentProps) {
  const [serializedContent, setSerializedContent] = useState<any>(null)

  useEffect(() => {
    const serializeContent = async () => {
      try {
        const serialized = await serialize(content)
        setSerializedContent(serialized)
      } catch (error) {
        console.error('Error serializing MDX content:', error)
      }
    }

    serializeContent()
  }, [content])

  if (!serializedContent) {
    return <div>Loading...</div>
  }

  return (
    <div className='prose prose-sm max-w-none dark:prose-invert'>
      <MDXRemote {...serializedContent} components={components} />
    </div>
  )
}
