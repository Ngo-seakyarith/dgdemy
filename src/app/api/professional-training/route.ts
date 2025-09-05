import { NextRequest, NextResponse } from 'next/server';
import sql from '../../../lib/neon';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let query;

    if (category && (category === 'ai_skill' || category === 'soft_skill')) {
      query = sql`
        SELECT id, filename, html_content, category, thumbnail_url, uploaded_at
        FROM word_documents
        WHERE category = ${category}
        ORDER BY uploaded_at DESC
      `;
    } else {
      query = sql`
        SELECT id, filename, html_content, category, thumbnail_url, uploaded_at
        FROM word_documents
        ORDER BY uploaded_at DESC
      `;
    }

    const documents = await query;

    return NextResponse.json({ documents }, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600'
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