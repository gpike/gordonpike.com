import { notFound } from 'next/navigation'
import { PageTransition } from '@/components/PageTransition'
import { MDXContent } from '@/components/MDXContent'
import { getPostBySlug, getAllPosts } from '@/lib/mdx'

interface PageParams {
  slug: string
}

interface PageProps {
  params: PageParams
}

export async function generateStaticParams() {
  const posts = await getAllPosts('posts')
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const post = await getPostBySlug(params.slug, 'posts')

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug, 'posts')

  if (!post) {
    notFound()
  }

  return (
    <PageTransition>
      <div className='container mx-auto px-4 py-12'>
        <MDXContent
          content={post.content}
          title={post.title}
          date={post.date}
          coverImage={post.coverImage}
          tags={post.tags}
        />
      </div>
    </PageTransition>
  )
}
