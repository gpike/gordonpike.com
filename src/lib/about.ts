import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

export interface AboutData {
  name: string
  image: string
  skills: string[]
  experience: {
    title: string
    company: string
    period: string
    description: string
  }[]
  education: {
    institution: string
    year: string
  }[]
  social_links: {
    twitter: string
    linkedin: string
    github: string
    email: string
    website: string
  }
  content: string
}

export async function getAboutData(): Promise<AboutData> {
  const filePath = path.join(process.cwd(), 'content', 'about.md')
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContent)

  // Convert markdown to HTML
  const htmlContent = marked(content)

  return {
    ...data,
    content: htmlContent,
  } as AboutData
}
