import { NextResponse } from 'next/server';
import sql from '../../../lib/neon';

interface AiPractiseRow {
  id: number;
  title: string;
  date: Date;
  duration: string;
  thumbnail_url: string | null;
  youtube_url: string;
}

export async function GET() {
  try {
    const query = sql`
      SELECT id, title, date, duration, thumbnail_url, youtube_url
      FROM ai_practise
      ORDER BY date DESC
    `;

    const aiPractises = await query as AiPractiseRow[];

    // Convert id to string to match the type
    const formattedAiPractises = aiPractises.map((item) => ({
      id: item.id.toString(),
      title: item.title,
      date: item.date.toISOString().split('T')[0], // Format date as YYYY-MM-DD
      duration: item.duration,
      thumbnailUrl: item.thumbnail_url || '',
      youtubeUrl: item.youtube_url,
    }));

    return NextResponse.json({ aiPractises: formattedAiPractises });
  } catch (error) {
    console.error('Error fetching ai practise:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ai practise' },
      { status: 500 }
    );
  }
}
