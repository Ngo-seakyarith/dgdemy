import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/firebase';
import { NEWS_CATEGORIES, getCategoryById } from '../../../lib/categories';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Fetch posts from Firestore
    let query = db.collection('posts').orderBy('createdAt', 'desc');

    if (category && category !== 'all') {
      query = query.where('category', '==', category);
    }

    const snapshot = await query.limit(limit).get();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const posts: any[] = [];
    snapshot.forEach((doc: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
      const data = doc.data();

      // Add category info and format the data
      const categoryInfo = getCategoryById(data.category);

      posts.push({
        id: doc.id,
        ...data,
        categoryInfo: categoryInfo,
        // Use the image field from Firebase data
        images: data.image ? [data.image] : undefined
      });
    });

    return NextResponse.json({
      news: posts,
      categories: NEWS_CATEGORIES
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}