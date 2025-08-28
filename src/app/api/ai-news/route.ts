import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/firebase';

export async function GET(request: NextRequest) {
  try {
    // Fetch posts from Firestore exactly like angkorgate.ai does
    const snapshot = await db.collection('posts').orderBy('createdAt', 'desc').get();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const posts: any[] = [];
    snapshot.forEach((doc: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
      posts.push({ id: doc.id, ...doc.data() });
    });

    return NextResponse.json({ news: posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}