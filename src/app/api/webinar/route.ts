import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'DB', 'webinar', 'webinar.txt');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const imageUrls = fileContent
      .trim()
      .split('\n')
      .map(url => url.trim().replace('&dl=0', '&dl=1'))
      .filter(url => url !== '')
      .reverse(); // Show newest (last in file) first

    return NextResponse.json({ images: imageUrls });
  } catch (error) {
    console.error('Error reading webinar images:', error);
    return NextResponse.json({ error: 'Failed to load webinar images' }, { status: 500 });
  }
}
