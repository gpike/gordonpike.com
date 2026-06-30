import { Article, Presentation } from './types';

export const ARTICLES: Article[] = [
  {
    id: 'cousin-eddie-to-neo',
    title: 'From Cousin Eddie to Neo: Why Skills Turn AI Agents into Super Agents',
    category: 'ARTIFICIAL INTELLIGENCE',
    summary: 'A general LLM knows everything but can do nothing. Explore how adding concrete skills and tools elevates AI from a comic sidekick to an expert matrix-level agent.',
    date: 'July 24, 2024',
    readTime: '11 min read',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXlsrfWqMXzYEHY4Y_YqZ4WvCtz2g5XENdTmh1zhT1kxa_fOMTEHUIXYksPPkLCVE2bEFHthsz_i_g8palq8b4PTdgFi5gJ1komVZapdeN_6MJsySp-UyXkfNz0XYGv2n5LtqjUjDPOKKLG6RXaUmsPyy9q0ElOU18B_HvtnEyIehPsgf_f-Uerc_3W1MVT5wGsNUZlugBiKmk7Iqjt34vrdUyOjKSGgTbFrD8ScUHKkyyKnRSso2upLX73W28m05bepr0KMJ9IAw',
    tags: ['AI Agents', 'LLM Tools', 'Agentic Workflows', 'Software Architecture'],
    author: {
      name: 'Gordon Pike',
      role: 'Principal Architect',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256&h=256',
      bio: 'Principal Architect specializing in enterprise decoupled architectures, generative AI ecosystems, and content management strategies. Gordon explores where raw computing meets human creativity.'
    },
    content: `### The Limitations of Raw Cognitive Power

Imagine hiring an assistant who has memorized every encyclopedia, historical record, and medical textbook ever written, but doesn't know how to open a spreadsheet, send an email, or access a database. 

When you ask them to write a marketing report, they'll write a beautifully worded essay based on knowledge from two years ago, but they cannot look up today’s stock prices or verify if your website is currently online.

This is the **Cousin Eddie** state of Large Language Models (LLMs). Like the lovable, chaotic uncle from National Lampoon, raw LLMs are enthusiastic, full of random opinions, and highly capable of confidently telling you something completely incorrect with absolute sincerity. They have massive raw intelligence, but zero structural capability to interact with the world.

To turn Cousin Eddie into **Neo**—the matrix-bending, hyper-focused expert who can dodge bullets, read code, and solve precise problems instantly—we must give them **Skills**.

---

### What is an AI Skill?

In modern agentic architectures, a **Skill** (or **Tool**) is a structured interface that allows an LLM to interact with external environments. It bridges the gap between *understanding* and *action*.

A skill consists of three parts:
1. **The Code**: The actual implementation (e.g., executing a file edit, calling a weather API, or reading a database).
2. **The JSON Schema**: A precise description of what the skill does and what arguments it accepts.
3. **The System Instructions**: Guardrails telling the agent *when* and *how* to use the skill.

For example, when an agent acquires a \`file_edit\` skill, it can stop "guessing" what the file should look like and instead inspect and modify it programmatically:

\`\`\`typescript
// Example: Registering a file editing skill to the agent container
agent.acquire_skill({
  name: 'edit_file',
  description: 'Surgically edits an existing file with replacement content',
  parameters: {
    type: 'object',
    properties: {
      filePath: { type: 'string', description: 'Absolute path to file' },
      targetContent: { type: 'string', description: 'Exact text block to replace' },
      replacementContent: { type: 'string', description: 'New text block' }
    },
    required: ['filePath', 'targetContent', 'replacementContent']
  },
  execute: async ({ filePath, targetContent, replacementContent }) => {
    return await applySurgicalEdit(filePath, targetContent, replacementContent);
  }
});
\`\`\`

---

### The Architecture of Agentic Loops

When an agent has skills, its operational loop changes from a simple **Single-Shot Response** to an iterative **Observe-Think-Act-Verify Loop**:

1. **Observe**: Receive the user input and current workspace context.
2. **Think**: Plan the overall strategy. Decide if a skill is needed to accomplish the sub-task.
3. **Act**: Execute the skill (e.g., compile code, execute search) and capture the raw output.
4. **Verify**: Evaluate the results. Did the compile succeed? If not, read the error and try again.

This loop repeats until the goal is achieved with high-fidelity, mimicking how a human software engineer actually works.

> "A general model knows everything but can do nothing. It is through the rigorous definition of specialized tools and deterministic interfaces that cognitive power translates into productive outcome."

---

### Why Decoupling Matters

By keeping skills decoupled from the core LLM, we can:
* **Upgrade Core Models Effortlessly**: Swapping a model (e.g., from Gemini 1.5 Pro to Gemini 2.0 Flash) requires zero rewrite of the skills.
* **Audit Actions Safely**: We can intercept, inspect, or block any skill execution before it occurs, ensuring absolute security.
* **Minimize Latency**: Short, specialized, server-side tools run in milliseconds, preventing the LLM from trying to "simulate" complex calculations.

The future of AI is not just bigger models with more parameters. The future belongs to **Agentic Ecosystems**—intelligent systems empowered with robust, secure, and deterministic tools. By equipping our models with fine-tuned skills, we elevate them from conversational toys into the ultimate software engineering partners.`
  },
  {
    id: 'is-your-pwa-ready',
    title: 'Is Your PWA Ready for the Prime Time?',
    category: 'WEB DEVELOPMENT',
    summary: 'High-fidelity offline web apps are no longer a luxury. Dive into service worker patterns, sync managers, and responsive client-side persistence strategies.',
    date: 'March 18, 2024',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600&h=400',
    tags: ['PWA', 'Service Workers', 'Offline Cache', 'Performance'],
    author: {
      name: 'Gordon Pike',
      role: 'Principal Architect',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256&h=256',
      bio: 'Principal Architect specializing in enterprise decoupled architectures, generative AI ecosystems, and content management strategies.'
    },
    content: `### The Standard of the Modern Web

A Progressive Web App (PWA) is not just a standard web page pinned to a home screen. It represents a paradigm shift in web engineering: **treating network latency and offline state as first-class citizens in your architecture.**

When a user opens your application in a tunnel or on an airplane, the interface shouldn't crash or display a generic "No Internet Connection" screen. It should load instantly, let the user continue their work, and sync changes seamlessly once connection is restored.

---

### Core Pillars of a Resilient PWA

To build a truly bulletproof offline experience, your PWA must leverage three main pillars:

#### 1. Service Workers: The Intelligent Proxy
The service worker is a client-side network proxy that runs in the background, independent of your active tab. It can intercept every HTTP request made by your application and decide where to resolve it: from the network, from the local CacheStorage, or a combination of both.

#### 2. Cache-First vs. Network-First Strategies
* **Cache-First**: Great for static assets (JS, CSS, images). Load from cache instantly; update cache in background.
* **Network-First**: Great for dynamic data that changes frequently (e.g. dashboards). Attempt to fetch from network first; fallback to local cache if offline.

#### 3. IndexedDB: Structured Local Persistence
For complex applications, simply caching HTML pages is not enough. You must store structured data (such as articles, form drafts, or user preferences) in a local transactional database like **IndexedDB** using libraries like \`idb\` or \`Dexie.js\`.

---

### Implementing a Seamless Service Worker Update

One of the biggest friction points in PWA architecture is service worker lifecycle management. When you update your app's code, the browser installs the new service worker but keeps it in a "waiting" state so it doesn't disrupt the active session.

Here is how you can prompt users to reload when a critical update is ready:

\`\`\`typescript
// Registering service worker and handling update prompts
navigator.serviceWorker.register('/sw.js').then((reg) => {
  reg.addEventListener('updatefound', () => {
    const newWorker = reg.installing;
    if (newWorker) {
      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          // Notify the UI that an update is available
          dispatchCustomEvent('pwa-update-available');
        }
      });
    }
  });
});
\`\`\`

By giving users a subtle banner with a "Refresh to Update" button, you keep their application secure and up-to-date without abruptly refreshing their screen in the middle of a task.`
  },
  {
    id: 'headless-cms-future',
    title: 'Why Headless CMS is the Future of Enterprise Content',
    category: 'ARCHITECTURE',
    summary: 'Going headless with Adobe Experience Manager (AEM) allows decoupling content delivery from presentation, enabling fast React frontends and cross-channel content syndication.',
    date: 'January 12, 2024',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600&h=400',
    tags: ['AEM', 'Headless CMS', 'GraphQL', 'React Architecture'],
    author: {
      name: 'Gordon Pike',
      role: 'Principal Architect',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256&h=256',
      bio: 'Principal Architect specializing in enterprise decoupled architectures, generative AI ecosystems, and content management strategies.'
    },
    content: `### The Death of the Monolith

For decades, Enterprise Content Management Systems (CMS) were built as monolithic suites. The database, the authoring interface, the content rendering engine, and the server-side HTML generator were tightly bound in a single software package.

While convenient initially, this architecture creates a major bottleneck:
* **Frustrated Developers**: Front-end engineers had to write code inside complex JSP files or proprietary templates.
* **Slower Deployments**: A minor CSS fix required rebuilding and deploying the entire monolithic Java server.
* **Channel Lock-in**: Delivering content to a native mobile app, a smartwatch, or a smart kiosk required duplicating work or building fragile scrapers.

A **Headless CMS** solves this by completely decoupling the content repository (the "body") from the presentation layers (the "heads").

---

### Enter Adobe Experience Manager (AEM) Headless

Adobe Experience Manager has evolved from a traditional page-based monolith to a highly flexible hybrid and headless platform. By using **Content Fragments** and **GraphQL APIs**, content authors can write, organize, and enrich content once, while developers pull that content into highly optimized React or Next.js applications:

\`\`\`graphql
# Fetching editorial articles from AEM via GraphQL
query GetAEMArticles {
  articleList {
    items {
      _path
      title
      publishDate
      summary {
        html
      }
      heroImage {
        ... on ImageRef {
          _path
          mimeType
        }
      }
    }
  }
}
\`\`\`

---

### Key Benefits of Decoupled Content

1. **True Front-End Freedom**: Your UI team can build with modern tools like Vite, React, Tailwind, and Framer Motion, free from the constraints of Java-based component loops.
2. **Sub-100ms Page Loads**: By hosting your decoupled React frontend on global edge networks (like Cloud Run, Vercel, or Cloudflare Pages) and querying AEM via cached GraphQL endpoints, you achieve incredible speed.
3. **Omnichannel Content Syndication**: The exact same Content Fragment that feeds your blog can be syndicated to your native iOS app, Alexa skill, and marketing emails.

Decoupling is no longer just a trend—it is a mandatory architectural standard for organizations that want to remain agile, performant, and future-proof.`
  }
];

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
