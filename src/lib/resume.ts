import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'

export interface ContactInfo {
  name: string
  title: string
  address: string
  phone: string
  email: string
  linkedin: string
}

export interface ResumeData {
  title: string
  summary: string
  pdf_link: string
  linkedin_link: string
  contact: ContactInfo
  content: any // MDXRemoteSerializeResult
}

export async function getResumeData(): Promise<ResumeData> {
  const filePath = path.join(process.cwd(), 'content', 'resume.md')
  const fileContents = fs.readFileSync(filePath, 'utf8')

  const { data, content } = matter(fileContents)

  // Serialize the MDX content
  const mdxSource = await serialize(content)

  return {
    title: data.title || 'Resume',
    summary: data.summary || '',
    pdf_link: data.pdf_link || '/resume.pdf',
    linkedin_link: data.linkedin_link || 'https://linkedin.com/in/gordon-pike',
    contact: data.contact || {
      name: 'Gordon Pike',
      title:
        'Software Engineering Manager | Cloud & Enterprise Solutions Leader',
      address: '11201 Lansing St. | Henderson, CO 80640',
      phone: '(303) 359-2044',
      email: 'gopike@gmail.com',
      linkedin: 'gordon-pike',
    },
    content: mdxSource,
  }
}
