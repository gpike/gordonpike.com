import { PageTransition } from '@/components/PageTransition'
import { BlogContent } from '@/components/BlogContent'
import { getAllPosts } from '@/lib/mdx'

export default async function BlogPage() {
  const posts = await getAllPosts('posts')

  return (
    <PageTransition>
      <BlogContent posts={posts} />
    </PageTransition>
  )
}
