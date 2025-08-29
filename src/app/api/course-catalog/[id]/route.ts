import { NextRequest, NextResponse } from 'next/server';
import sql from '../../../../lib/neon';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const documents = await sql`
      SELECT id, filename, html_content, category, uploaded_at
      FROM word_documents
      WHERE id = ${params.id}
    `;

    if (documents.length === 0) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    return NextResponse.json({ document: documents[0] });
  } catch (error) {
    console.error('Error fetching document:', error);
    return NextResponse.json(
      { error: 'Failed to fetch document' },
      { status: 500 }
    );
  }
}