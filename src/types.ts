export interface Article {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string; // Markdown or rich text paragraphs
  date: string;
  readTime: string;
  image: string;
  tags: string[];
  author: {
    name: string;
    role: string;
    avatar: string;
    bio: string;
  };
}

export interface Presentation {
  id: string;
  title: string;
  event: string;
  location: string;
  date: string;
  duration: string;
  description: string;
  takeaways: string[];
  imageUrl: string;
  tags: string[];
  slides: {
    title: string;
    content: string;
    bullets: string[];
    image?: string;
  }[];
  resources: {
    name: string;
    type: 'pdf' | 'video' | 'link';
    url: string;
  }[];
}

export type View = 'home' | 'blog' | 'presentations' | 'about' | 'article-detail' | 'presentation-detail';
