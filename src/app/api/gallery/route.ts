import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dbPath = path.join(process.cwd(), 'DB', 'gallery');

    // Read all gallery text files
    const [generalContent, gamesContent, sharingContent, workshopsContent] = await Promise.all([
      fs.readFile(path.join(dbPath, 'extracted_image_urls.txt'), 'utf-8'),
      fs.readFile(path.join(dbPath, 'extracted_games_image_urls.txt'), 'utf-8'),
      fs.readFile(path.join(dbPath, 'extracted_sharing_bts_image_urls.txt'), 'utf-8'),
      fs.readFile(path.join(dbPath, 'extracted_workshops_image_urls.txt'), 'utf-8')
    ]);

    const cleanAndSecureUrls = (content: string) => {
      return content
        .replace(/^\uFEFF/, '') // Remove BOM
        .replace(/http:\/\//g, 'https://') // Change http to https
        .split('\n')
        .map(url => url.trim()) // Trim whitespace and \r
        .filter(url => url);
    };

    const images = {
      general: cleanAndSecureUrls(generalContent),
      games: cleanAndSecureUrls(gamesContent),
      sharing: cleanAndSecureUrls(sharingContent),
      workshops: cleanAndSecureUrls(workshopsContent)
    };

    return NextResponse.json(images);
  } catch (error) {
    console.error('Error reading gallery files:', error);
    return NextResponse.json(
      { error: 'Failed to load gallery images' },
      { status: 500 }
    );
  }
}