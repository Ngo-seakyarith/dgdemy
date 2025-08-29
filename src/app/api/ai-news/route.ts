import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/firebase';
import { NEWS_CATEGORIES, getCategoryById, NewsCategory } from '../../../lib/categories';

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
      console.log('- Query created with category filter (no orderBy to avoid composite index requirement)');
    } else {
      // Only use orderBy when not filtering to avoid composite index issues
      query = db.collection('posts').orderBy('createdAt', 'desc');
    }

    const snapshot = await query.limit(limit).get();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const posts: any[] = [];
    snapshot.forEach((doc: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
      const data = doc.data();

      console.log(`  - Document ${doc.id}:`);
      console.log('    - Has category field:', 'category' in data);
      console.log('    - Category value:', data.category);
      console.log('    - All fields:', Object.keys(data));
      console.log('    - Sample data:', {
        title: data.title,
        createdAt: data.createdAt,
        image: data.image ? 'present' : 'missing'
      });

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
      console.log('- Sorting filtered results by createdAt (descending)');
      posts.sort((a, b) => {
        const dateA = a.createdAt?.seconds || 0;
        const dateB = b.createdAt?.seconds || 0;
        return dateB - dateA; // Descending order
      });
    }

    console.log('- Final posts count:', posts.length);
    console.log('- Categories available:', NEWS_CATEGORIES.map((c: NewsCategory) => c.id));

    return NextResponse.json({
      news: posts,
      categories: NEWS_CATEGORIES
    });
  } catch (error) {
    console.error('❌ Error fetching posts:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    const errorName = error instanceof Error ? error.name : 'Unknown';

    console.error('- Error details:', {
      message: errorMessage,
      stack: errorStack,
      name: errorName
    });
    return NextResponse.json(
      { error: 'Failed to fetch posts', details: errorMessage },
      { status: 500 }
    );
  }
}