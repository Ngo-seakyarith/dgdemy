import { NextResponse } from 'next/server';
import sql from '../../../lib/neon';

// Define document type
interface Document {
  id: string;
  filename: string;
  html_content: string;
  category: string;
  thumbnail_url: string;
  uploaded_at: Date;
}

// Server-side cache for all documents
const cache = new Map<string, { data: Document[]; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function GET() {
  try {
    // Use single cache key for all documents
    const cacheKey = 'professional-training-all';
    
    // Check cache first
    const cached = cache.get(cacheKey);
    let documents: Document[];
    
    if (cached && (Date.now() - cached.timestamp) < CACHE_TTL) {
      documents = cached.data;
    } else {
      // Fetch all documents from database
      const query = sql`
        SELECT id, filename, html_content, category, thumbnail_url, uploaded_at
        FROM word_documents
        ORDER BY uploaded_at DESC
      `;
      const rawDocuments = await query;
      documents = rawDocuments as Document[];
      
      // Cache the results
      cache.set(cacheKey, { data: documents, timestamp: Date.now() });
    }

    // Always return all documents - let frontend handle filtering
    return NextResponse.json({ documents }, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        'X-Cache-Status': cached ? 'HIT' : 'MISS'
      }
    });
  } catch (error) {
    console.error('Error fetching documents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 }
    );
  }
}