import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

// Configure marked to return synchronously
marked.setOptions({
  async: false,
})

const contentDirectory = path.join(process.cwd(), 'content')

export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  coverImage?: string
  tags?: string[]
  published?: boolean
  // Presentation specific fields
  event?: string
  location?: string
  videoUrl?: string
  slidesUrl?: string
}

export async function getAllPosts(
  type: 'posts' | 'presentations'
): Promise<Post[]> {
  const postsDirectory = path.join(contentDirectory, type)
  const files = fs.readdirSync(postsDirectory)

  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
      .map(async (file) => {
        const filePath = path.join(postsDirectory, file)
        const source = fs.readFileSync(filePath, 'utf8')
        const { data, content } = matter(source)

        // Convert markdown to HTML
        const htmlContent = marked(content) as string

        // Ensure date is a string
        const date = data.date || data.published_at
        const dateString =
          date instanceof Date ? date.toISOString() : String(date)

        return {
          slug: file.replace(/\.mdx?$/, ''),
          title: data.title,
          date: dateString,
          excerpt: data.excerpt || data.description,
          content: htmlContent,
          coverImage: data.coverImage || data.cover_image,
          tags: data.tags,
          published: data.published ?? true,
          // Presentation specific fields
          event: data.event,
          location: data.location,
          videoUrl: data.videoUrl,
          slidesUrl: data.slidesUrl,
        }
      })
  )

  return posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getPostBySlug(
  slug: string,
  type: 'posts' | 'presentations'
): Promise<Post | null> {
  try {
    const postsDirectory = path.join(contentDirectory, type)
    // Try both .md and .mdx extensions
    const filePath = fs.existsSync(path.join(postsDirectory, `${slug}.mdx`))
      ? path.join(postsDirectory, `${slug}.mdx`)
      : path.join(postsDirectory, `${slug}.md`)

    const source = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(source)

    // Convert markdown to HTML
    const htmlContent = marked(content) as string

    // Ensure date is a string
    const date = data.date || data.published_at
    const dateString = date instanceof Date ? date.toISOString() : String(date)

    return {
      slug,
      title: data.title,
      date: dateString,
      excerpt: data.excerpt || data.description,
      content: htmlContent,
      coverImage: data.coverImage || data.cover_image,
      tags: data.tags,
      published: data.published ?? true,
      // Presentation specific fields
      event: data.event,
      location: data.location,
      videoUrl: data.videoUrl,
      slidesUrl: data.slidesUrl,
    }
  } catch (error) {
    console.error('Error getting post by slug:', error)
    return null
  }
}
