import { PageTransition } from '@/components/PageTransition'
import { HomeContent } from '@/components/HomeContent'
import { getAllPosts } from '@/lib/mdx'

export default async function Home() {
  const posts = await getAllPosts('posts')
  const presentations = await getAllPosts('presentations')

  const featuredPosts = posts.slice(0, 3)
  const featuredPresentations = presentations.slice(0, 2)

  return (
    <PageTransition>
      <HomeContent
        featuredPosts={featuredPosts}
        featuredPresentations={featuredPresentations}
      />
    </PageTransition>
  )
}
