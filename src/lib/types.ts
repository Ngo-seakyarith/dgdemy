export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  category: string;
  tags: string[];
  url?: string;
  images?: string[];
}

export interface Document {
  id: number;
  filename: string;
  html_content: string;
  category: 'ai_skill' | 'soft_skill';
  uploaded_at: string;
}

export interface Workshop {
  id: string;
  title: string;
  date: string;
  duration: string;
  thumbnailUrl: string;
  youtubeUrl: string;
}
