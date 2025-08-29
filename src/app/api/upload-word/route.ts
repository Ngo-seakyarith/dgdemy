import { NextRequest, NextResponse } from 'next/server';
import sql from '../../../lib/neon';
import mammoth from 'mammoth';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Check if it's a Word document
    if (!file.name.endsWith('.docx') && !file.name.endsWith('.doc')) {
      return NextResponse.json({ error: 'Only .docx or .doc files are supported' }, { status: 400 });
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log('File info:', {
      name: file.name,
      size: file.size,
      type: file.type
    });

    if (buffer.length === 0) {
      return NextResponse.json({ error: 'File is empty or corrupted' }, { status: 400 });
    }

    // Extract content from Word document using Mammoth
    let extractedContent = '';

    try {
      const result = await mammoth.convertToHtml({ buffer: buffer });
      extractedContent = result.value;

      if (result.messages && result.messages.length > 0) {
        console.log('Mammoth conversion messages:', result.messages);
      }

      console.log('✅ Document content extracted successfully with Mammoth');
    } catch (mammothError) {
      console.error('Mammoth conversion failed:', mammothError);
      extractedContent = '<p>Unable to extract document content. The file may be corrupted or in an unsupported format.</p>';
    }

    console.log('Document processed successfully');

    // Save to database
    const result_db = await sql`
      INSERT INTO word_documents (filename, html_content)
      VALUES (${file.name}, ${extractedContent})
      RETURNING id
    `;

    const documentId = result_db[0].id;

    return NextResponse.json({
      success: true,
      id: documentId,
      message: 'Document uploaded and processed successfully',
      filename: file.name,
      size: file.size,
      hasContent: extractedContent.length > 0,
      html: extractedContent
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      {
        error: 'Failed to upload document',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}