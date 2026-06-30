import { Article, Presentation } from './types';

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
        role: 'Principal Architect',
        avatar: firstNonEmpty(extractField(raw, 'author_image'), extractField(raw, 'authorImage')) || '/images/authors/GordonPike.jpg',
        bio: 'Principal Architect specializing in enterprise decoupled architectures, generative AI ecosystems, and content management strategies.',
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

export const PRESENTATIONS: Presentation[] = [
  {
    id: 'flexible-aem-architecture',
    title: 'Prepping for Tomorrow: Flexible AEM Architecture',
    event: 'Evolve 19',
    location: 'San Diego, CA',
    date: 'October 14, 2019',
    duration: '45 mins',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600&h=400',
    description: 'How to design a scalable Adobe Experience Manager deployment that supports modern headless and hybrid content delivery, decoupled SPA integrations, and cloud-native auto-scaling topologies.',
    tags: ['AEM', 'Software Architecture', 'Cloud Native', 'Headless'],
    takeaways: [
      'Decouple presentation from authoring using AEM Content Fragments and GraphQL APIs.',
      'Implement multi-tier dispatcher caching to achieve sub-100ms content delivery globally.',
      'Transition safely from AEM On-Premise/AMS to cloud-native AEM as a Cloud Service.'
    ],
    slides: [
      {
        title: 'Title Slide',
        content: 'Prepping for Tomorrow: Flexible AEM Architecture',
        bullets: [
          'Gordon Pike, Principal Architect',
          'Evolve 19 - San Diego, CA',
          'Building highly resilient, decoupled enterprise marketing platforms.'
        ]
      },
      {
        title: 'The Monolithic Trap',
        content: 'Why tightly-coupled web templates throttle performance and velocity.',
        bullets: [
          'JSP/HTL template loops block the main rendering process.',
          'CMS deployments become risky monolith deployments.',
          'Poor responsive rendering on non-web channels.'
        ]
      },
      {
        title: 'The Decoupled Ideal',
        content: 'Architecting AEM as a Content Engine with modern frontend heads.',
        bullets: [
          'AEM manages structured content fragments and assets.',
          'React/Next.js/Vite consumes content via highly-cached GraphQL.',
          'Extreme flexibility: Deploy frontends in seconds instead of hours.'
        ]
      },
      {
        title: 'Edge Caching Strategies',
        content: 'Optimizing the Content Delivery Network (CDN) for maximum throughput.',
        bullets: [
          'Leveraging Cloudflare/Fastly in front of the AEM Dispatcher.',
          'Setting precise stale-while-revalidate headers.',
          'Instant cache invalidation pipelines triggered by publish events.'
        ]
      },
      {
        title: 'Summary & Q&A',
        content: 'Key architectural decisions to implement next quarter.',
        bullets: [
          'Start auditing page templates for content-fragment extraction.',
          'Establish standard API endpoints for syndication.',
          'Reach out: gordon@gordonpike.com / @gordonpike'
        ]
      }
    ],
    resources: [
      { name: 'Presentation Slides (PDF)', type: 'pdf', url: '#' },
      { name: 'Session Recording (Video)', type: 'video', url: '#' },
      { name: 'GitHub Architecture Repo', type: 'link', url: 'https://github.com/gpike' }
    ]
  },
  {
    id: 'generative-ai-aem',
    title: 'Generative AI in Adobe Experience Manager (AEM)',
    event: 'Adobe Summit 2024',
    location: 'Las Vegas, NV',
    date: 'March 26, 2024',
    duration: '50 mins',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600&h=400',
    description: 'An in-depth exploration of integrating Large Language Models (LLMs) into the AEM content creation workflow. Learn how to automate asset tagging, generate personalized copy, and streamline localization pipelines securely.',
    tags: ['Generative AI', 'AEM', 'LLMs', 'Automation'],
    takeaways: [
      'Leverage generative AI in the side panel of AEM Assets for automatic captioning and smart tags.',
      'Design secure, enterprise-grade API gateways to connect AEM with LLM endpoints without exposing confidential data.',
      'Implement human-in-the-loop review chains for AI-generated copy to ensure brand compliance.'
    ],
    slides: [
      {
        title: 'Title Slide',
        content: 'Generative AI in Adobe Experience Manager (AEM)',
        bullets: [
          'Gordon Pike, Principal Architect',
          'Adobe Summit 2024 - Las Vegas, NV',
          'Bridging structured CMS with semantic intelligence.'
        ]
      },
      {
        title: 'The AI Authoring Assistant',
        content: 'Bringing LLM power directly into the content author’s workspace.',
        bullets: [
          'Dynamic copy variation generation for A/B testing inside AEM Assets.',
          'Automated summary generation for multi-screen viewport layouts.',
          'Context-aware translations that preserve brand voice.'
        ]
      },
      {
        title: 'Semantic Asset Ingestion',
        content: 'Replacing manual tagging with advanced multi-modal models.',
        bullets: [
          'Automatic image and video captioning upon asset upload.',
          'Deep metadata extraction (dominant colors, brand compliance).',
          'Search assets using standard, conversational human queries.'
        ]
      },
      {
        title: 'Security and Enterprise Guardrails',
        content: 'Ensuring your corporate data doesn’t become model training fodder.',
        bullets: [
          'Building custom proxy APIs to strip PII before routing to LLMs.',
          'Enforcing strict zero-data-retention (ZDR) agreements with AI vendors.',
          'Monitoring token usage and cost tracking at the corporate level.'
        ]
      }
    ],
    resources: [
      { name: 'Summit Slide Deck', type: 'pdf', url: '#' },
      { name: 'AEM Generative AI Plugin (GitHub)', type: 'link', url: 'https://github.com/gpike' }
    ]
  }
];
