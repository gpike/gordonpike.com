import { AboutProfile, Article, Presentation } from './types';

const postModules = import.meta.glob('../content/posts/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

function cleanupQuoted(value: string): string {
  return value
    .trim()
    .replace(/^['"]|['"]$/g, '')
    .replace(/''/g, "'");
}

function removeFrontmatter(raw: string): string {
  return raw.replace(/^---\n[\s\S]*?\n---\n?/, '').trim();
}

function extractField(raw: string, fieldName: string): string {
  const match = raw.match(new RegExp(`^${fieldName}:\\s*(.+)$`, 'm'));
  return match ? cleanupQuoted(match[1]) : '';
}

function extractArrayField(raw: string, fieldName: string): string[] {
  const block = raw.match(new RegExp(`^${fieldName}:\\n((?:\\s*-\\s.*\\n?)+)`, 'm'));
  if (!block) return [];
  return block[1]
    .split('\n')
    .map((line) => line.match(/^\s*-\s*(.+)$/)?.[1] ?? '')
    .map((value) => cleanupQuoted(value))
    .filter(Boolean);
}

function computeReadTime(content: string): string {
  const words = content.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 220));
  return `${minutes} min read`;
}

function formatDate(dateInput: string): string {
  const date = new Date(dateInput);
  if (Number.isNaN(date.getTime())) {
    return dateInput || 'Unknown date';
  }
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function getSlugFromPath(path: string): string {
  return path.split('/').pop()?.replace(/\.md$/, '') ?? path;
}

function buildSummary(raw: string, content: string): string {
  const excerpt = extractField(raw, 'excerpt');
  const description = extractField(raw, 'description');
  const isYamlBlockIndicator = (value: string): boolean => ['>', '>-', '|', '|-'].includes(value.trim());
  if (excerpt) return excerpt;
  if (description && !isYamlBlockIndicator(description)) return description;

  const firstParagraph = content
    .split(/\n\n+/)
    .map((p) => p.replace(/^#+\s*/, '').trim())
    .find((p) => p.length > 0);

  if (!firstParagraph) return 'Read the full article.';
  return firstParagraph.length > 220 ? `${firstParagraph.slice(0, 217)}...` : firstParagraph;
}

function firstNonEmpty(...values: string[]): string {
  return values.find((value) => value && value.trim().length > 0) ?? '';
}

function extractNestedMap(raw: string, sectionName: string): Record<string, string> {
  const block = raw.match(new RegExp(`^${sectionName}:\\n((?:\\s{2}[a-zA-Z_][a-zA-Z0-9_]*:\\s*.*\\n?)+)`, 'm'));
  if (!block) return {};

  return block[1]
    .split('\n')
    .map((line) => line.match(/^\s{2}([a-zA-Z_][a-zA-Z0-9_]*):\s*(.+)$/))
    .filter((match): match is RegExpMatchArray => Boolean(match))
    .reduce<Record<string, string>>((acc, match) => {
      acc[match[1]] = cleanupQuoted(match[2]);
      return acc;
    }, {});
}

function markdownToPlainText(text: string): string {
  return text
    .replace(/^#+\s*/gm, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/`(.*?)`/g, '$1')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .trim();
}

export const ARTICLES: Article[] = Object.entries(postModules)
  .map(([path, raw]) => {
    const content = removeFrontmatter(raw);
    const tags = extractArrayField(raw, 'tags');
    const publishedAt = firstNonEmpty(extractField(raw, 'published_at'), extractField(raw, 'date'));
    const publishedFlag = extractField(raw, 'published');
    const title = extractField(raw, 'title') || getSlugFromPath(path).replace(/-/g, ' ');
    const category = (tags[0] || 'Blog').toUpperCase();
    const image = firstNonEmpty(extractField(raw, 'cover_image'), extractField(raw, 'coverImage')) || '/images/gpike.png';

    return {
      published: !/^false$/i.test(publishedFlag || 'true'),
      publishedAt,
      id: getSlugFromPath(path),
      title,
      category,
      summary: buildSummary(raw, content),
      content,
      date: formatDate(publishedAt),
      readTime: computeReadTime(content),
      image,
      tags,
      author: {
        name: extractField(raw, 'author') || 'Gordon Pike',
        role: 'Senior Architect',
        avatar: firstNonEmpty(extractField(raw, 'author_image'), extractField(raw, 'authorImage')) || '/images/authors/GordonPike.jpg',
        bio: 'Senior Architect specializing in enterprise decoupled architectures, generative AI ecosystems, and content management strategies.',
      },
    };
  })
  .filter((article) => article.content.length > 0)
  .filter((article) => article.published)
  .sort((a, b) => {
    const aDate = new Date(a.publishedAt || '').getTime();
    const bDate = new Date(b.publishedAt || '').getTime();
    return bDate - aDate;
  })
  .map(({ published, publishedAt, ...article }) => article);

const aboutModule = import.meta.glob('../content/about.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const aboutRaw = Object.values(aboutModule)[0] ?? '';
const aboutContent = removeFrontmatter(aboutRaw);
const aboutSocial = extractNestedMap(aboutRaw, 'social_links');
const aboutTagline = (() => {
  const match = aboutContent.match(/^##\s+(.+)$/m);
  return match ? markdownToPlainText(match[1]) : 'Mastering the Digital Craft.';
})();
const aboutBioParagraphs = aboutContent
  .split(/\n\n+/)
  .map((block) => block.trim())
  .filter((block) => block.length > 0)
  .filter((block) => !/^#+\s/.test(block))
  .filter((block) => !/^[-*]\s/.test(block))
  .map((block) => markdownToPlainText(block))
  .filter((block) => block.length > 50)
  .slice(0, 3);

export const ABOUT_PROFILE: AboutProfile = {
  name: extractField(aboutRaw, 'name') || 'Gordon Pike',
  image: extractField(aboutRaw, 'image') || '/images/gpike.png',
  tagline: aboutTagline,
  bioParagraphs: aboutBioParagraphs,
  skills: extractArrayField(aboutRaw, 'skills'),
  socialLinks: {
    twitter: aboutSocial.twitter,
    linkedin: aboutSocial.linkedin,
    github: aboutSocial.github,
    email: aboutSocial.email,
    website: aboutSocial.website,
  },
};

const presentationModules = import.meta.glob('../content/presentations/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

function extractPresentationAbstract(content: string): string {
  return content
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter((block) => block.length > 0)
    .filter((block) => !/^#/.test(block))
    .filter((block) => !/^[-*]\s/.test(block))
    .filter((block) => !/^\d+\.\s/.test(block))
    .slice(0, 2)
    .map((block) => markdownToPlainText(block))
    .join('\n\n');
}

function extractPresentationSlides(title: string, event: string, location: string, content: string) {
  const sectionRegex = /^##\s+(.+)$/gm;
  const sections: { title: string; body: string }[] = [];
  let lastIndex = 0;
  let lastTitle = 'Overview';
  let match: RegExpExecArray | null;

  while ((match = sectionRegex.exec(content)) !== null) {
    const body = content.slice(lastIndex, match.index).trim();
    if (body) {
      sections.push({ title: lastTitle, body });
    }
    lastTitle = markdownToPlainText(match[1]);
    lastIndex = sectionRegex.lastIndex;
  }

  const tail = content.slice(lastIndex).trim();
  if (tail) {
    sections.push({ title: lastTitle, body: tail });
  }

  const parsedSlides = sections
    .map((section) => {
      const lines = section.body.split('\n').map((line) => line.trim()).filter(Boolean);
      const bullets = lines
        .filter((line) => /^[-*]\s+/.test(line) || /^\d+\.\s+/.test(line))
        .map((line) => markdownToPlainText(line.replace(/^[-*]\s+/, '').replace(/^\d+\.\s+/, '')))
        .filter(Boolean)
        .slice(0, 6);
      const contentLine = lines
        .find((line) => !/^[-*]\s+/.test(line) && !/^\d+\.\s+/.test(line) && !/^###\s+/.test(line)) || section.title;

      return {
        title: section.title,
        content: markdownToPlainText(contentLine),
        bullets,
      };
    })
    .filter((slide) => slide.content.length > 0)
    .slice(0, 8);

  return [
    {
      title: 'Title Slide',
      content: title,
      bullets: [
        'Gordon Pike, Senior Architect',
        `${event} - ${location}`,
        'Technical session overview and implementation strategy.',
      ],
    },
    ...parsedSlides,
  ];
}

function extractPresentationTakeaways(raw: string, content: string): string[] {
  const explicitTakeaways = extractArrayField(raw, 'takeaways');
  if (explicitTakeaways.length > 0) {
    return explicitTakeaways;
  }

  const keyInsights = content.match(/##\s+Key (Insights|Takeaways)([\s\S]*?)(\n##\s+|$)/i);
  if (!keyInsights) {
    return [];
  }

  return keyInsights[2]
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => /^[-*]\s+/.test(line) || /^\d+\.\s+/.test(line))
    .map((line) => markdownToPlainText(line.replace(/^[-*]\s+/, '').replace(/^\d+\.\s+/, '')))
    .filter(Boolean)
    .slice(0, 5);
}

export const PRESENTATIONS: Presentation[] = Object.entries(presentationModules)
  .map(([path, raw]) => {
    const content = removeFrontmatter(raw);
    const title = extractField(raw, 'title') || getSlugFromPath(path).replace(/-/g, ' ');
    const event = extractField(raw, 'event') || 'Conference Session';
    const location = extractField(raw, 'location') || 'Virtual';
    const dateRaw = extractField(raw, 'date');
    const duration = extractField(raw, 'duration') || '45 mins';
    const imageUrl = firstNonEmpty(extractField(raw, 'cover_image'), extractField(raw, 'coverImage')) || '/images/gpike.png';
    const description = firstNonEmpty(extractField(raw, 'description'), extractField(raw, 'excerpt')) || extractPresentationAbstract(content);
    const tags = extractArrayField(raw, 'tags');
    const slidesUrl = firstNonEmpty(extractField(raw, 'slides_url'), extractField(raw, 'slidesUrl'));
    const videoUrl = firstNonEmpty(extractField(raw, 'video_url'), extractField(raw, 'videoUrl'));
    const resources: Presentation['resources'] = [];

    if (slidesUrl) {
      resources.push({ name: 'Presentation Slides', type: 'pdf', url: slidesUrl });
    }
    if (videoUrl) {
      resources.push({ name: 'Session Recording', type: 'video', url: videoUrl });
    }

    return {
      id: getSlugFromPath(path),
      title,
      event,
      location,
      date: formatDate(dateRaw),
      duration,
      description,
      abstract: extractPresentationAbstract(content),
      takeaways: extractPresentationTakeaways(raw, content),
      imageUrl,
      tags,
      slides: extractPresentationSlides(title, event, location, content),
      resources,
    };
  })
  .sort((a, b) => {
    const aTime = new Date(a.date).getTime();
    const bTime = new Date(b.date).getTime();
    return bTime - aTime;
  });
