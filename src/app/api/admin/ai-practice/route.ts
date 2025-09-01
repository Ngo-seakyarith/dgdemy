import { NextRequest, NextResponse } from 'next/server';
import sql from '../../../../lib/neon';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, date, duration, thumbnail_url, youtube_url } = body;

    if (!title || !date || !duration || !youtube_url) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate date format
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      return NextResponse.json({ error: 'Invalid date format' }, { status: 400 });
    }

    // Save to database
    const result = await sql`
      INSERT INTO ai_practise (title, date, duration, thumbnail_url, youtube_url)
      VALUES (${title}, ${date}, ${duration}, ${thumbnail_url || null}, ${youtube_url})
      RETURNING id
    `;

    const practiseId = result[0].id;

    return NextResponse.json({
      success: true,
      id: practiseId,
      message: 'AI Practice uploaded successfully',
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      {
        error: 'Failed to upload AI practice',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}