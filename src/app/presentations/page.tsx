import { PageTransition } from '@/components/PageTransition'
import { PresentationsContent } from '@/components/PresentationsContent'
import { getAllPosts } from '@/lib/mdx'

export default async function PresentationsPage() {
  const presentations = await getAllPosts('presentations')

  return (
    <PageTransition>
      <PresentationsContent presentations={presentations} />
    </PageTransition>
  )
}
