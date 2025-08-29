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
