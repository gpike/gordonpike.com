import { PageTransition } from '@/components/PageTransition'
import { getAboutData } from '@/lib/about'
import { AboutPage } from '@/components/AboutPage'

export default async function AboutPageRoute() {
  const aboutData = await getAboutData()

  return (
    <PageTransition>
      <AboutPage data={aboutData} />
    </PageTransition>
  )
}
