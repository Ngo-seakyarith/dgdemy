import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/firebase';
import { NEWS_CATEGORIES, getCategoryById } from '../../../lib/categories';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Fetch posts from Firestore
    let query;

    if (category && category !== 'all') {
      // Add additional validation
      if (category.trim() === '') {
        // Category is empty string after trim
      }

      // When filtering by category, we can't use orderBy with where clause due to Firestore index requirements
      // So we'll fetch all documents with the category and then sort them in memory
      query = db.collection('posts').where('category', '==', category);
    } else {
      // Only use orderBy when not filtering to avoid composite index issues
      query = db.collection('posts').orderBy('createdAt', 'desc');
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
        // Map content fields correctly for the dashboard
        excerpt: data.content || '', // Short excerpt for preview
        content: data.contentHtml || data.content || '', // Full content for modal
        categoryInfo: categoryInfo,
        // Use the image field from Firebase data
        images: data.image ? [data.image] : undefined
      });
    });

    // If we filtered by category, sort the results by createdAt in descending order
    if (category && category !== 'all') {
      posts.sort((a, b) => {
        const dateA = a.createdAt?.seconds || 0;
        const dateB = b.createdAt?.seconds || 0;
        return dateB - dateA; // Descending order
      });
    }

    return NextResponse.json({
      news: posts,
      categories: NEWS_CATEGORIES
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to fetch posts', details: errorMessage },
      { status: 500 }
    );
  }
}