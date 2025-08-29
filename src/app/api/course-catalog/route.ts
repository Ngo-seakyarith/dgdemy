import { NextRequest, NextResponse } from 'next/server';
import sql from '../../../lib/neon';

export async function GET(request: NextRequest) {
  try {
    const documents = await sql`
      SELECT id, filename, html_content, uploaded_at
      FROM word_documents
      ORDER BY uploaded_at DESC
    `;

    return NextResponse.json({ documents });
  } catch (error) {
    console.error('Error fetching documents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch documents' },
      { status: 500 }
    );
  }
}