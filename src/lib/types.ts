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
