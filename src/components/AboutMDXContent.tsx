import { MDXRemote } from 'next-mdx-remote/rsc'

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

interface AboutMDXContentProps {
  content: string
}

export async function AboutMDXContent({ content }: AboutMDXContentProps) {
  return (
    <div className='prose prose-sm max-w-none dark:prose-invert'>
      <MDXRemote source={content} components={components} />
    </div>
  )
}
