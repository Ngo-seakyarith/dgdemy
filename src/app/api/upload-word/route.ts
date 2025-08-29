import { NextRequest, NextResponse } from 'next/server';
import mammoth from 'mammoth';
import sql from '../../../lib/neon';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Check if it's a Word document
    if (!file.name.endsWith('.docx')) {
      return NextResponse.json({ error: 'Only .docx files are supported' }, { status: 400 });
    }

    // Convert file to ArrayBuffer for mammoth
    const arrayBuffer = await file.arrayBuffer();

    // Convert Word to HTML
    const result = await mammoth.convertToHtml({ arrayBuffer });

    if (result.messages.length > 0) {
      console.warn('Conversion warnings:', result.messages);
    }

    const htmlContent = result.value;

    // Save to database
    const result_db = await sql`
      INSERT INTO word_documents (filename, html_content)
      VALUES (${file.name}, ${htmlContent})
      RETURNING id
    `;

    const documentId = result_db[0].id;

    return NextResponse.json({
      success: true,
      id: documentId,
      message: 'Document uploaded and converted successfully'
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload document' },
      { status: 500 }
    );
  }
}