import { notFound } from 'next/navigation'
import { PageTransition } from '@/components/PageTransition'
import { MDXContent } from '@/components/MDXContent'
import { getPostBySlug, getAllPosts } from '@/lib/mdx'

interface PresentationPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const presentations = await getAllPosts('presentations')
  return presentations.map((presentation) => ({
    slug: presentation.slug,
  }))
}

export async function generateMetadata({ params }: PresentationPageProps) {
  const presentation = await getPostBySlug(params.slug, 'presentations')

  if (!presentation) {
    return {
      title: 'Presentation Not Found',
    }
  }

  return {
    title: presentation.title,
    description: presentation.excerpt,
  }
}

export default async function PresentationPage({
  params,
}: PresentationPageProps) {
  const presentation = await getPostBySlug(params.slug, 'presentations')

  if (!presentation) {
    notFound()
  }

  return (
    <PageTransition>
      <div className='container mx-auto px-4 py-12'>
        <MDXContent
          content={presentation.content}
          title={presentation.title}
          date={presentation.date}
          coverImage={presentation.coverImage}
          tags={presentation.tags}
          event={presentation.event}
          location={presentation.location}
          videoUrl={presentation.videoUrl}
          slidesUrl={presentation.slidesUrl}
        />
      </div>
    </PageTransition>
  )
}
