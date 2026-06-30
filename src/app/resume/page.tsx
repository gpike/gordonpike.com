import { PageTransition } from '@/components/PageTransition'
import { ResumeContent } from '@/components/ResumeContent'
import { getResumeData } from '@/lib/resume'

export default async function ResumePage() {
  const resumeData = await getResumeData()

  return (
    <PageTransition>
      <ResumeContent data={resumeData} />
    </PageTransition>
  )
}
