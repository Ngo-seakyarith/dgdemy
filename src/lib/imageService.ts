import { db } from './firebase';

export interface NewsImage {
  url: string;
  alt: string;
  caption?: string;
}

/**
 * Extract images from Firebase document data
 * Works with the actual Firebase schema we discovered
 */
export async function getNewsImages(newsId: string): Promise<NewsImage[]> {
  try {
    const doc = await db.collection('posts').doc(newsId).get();
    if (!doc.exists) {
      return [];
    }

    const data = doc.data();
    const images: NewsImage[] = [];

    // Use the actual 'image' field from Firebase data
    if (data?.image && typeof data.image === 'string') {
      // Check if it's a Dropbox link and convert if needed
      const imageUrl = convertDropboxLink(data.image);
      images.push({
        url: imageUrl,
        alt: data.title ? `${data.title} - Featured image` : 'News image'
      });
    }

    // Check for any additional images in content (if they contain image URLs)
    if (data?.content && typeof data.content === 'string') {
      const contentImages = extractImagesFromContent(data.content);
      images.push(...contentImages);
    }

    return images;
  } catch (error) {
    console.error('Error fetching news images:', error);
    return [];
  }
}

/**
 * Convert Dropbox share link to direct image link
 */
function convertDropboxLink(dropboxLink: string): string {
  // If it's already a direct link, return as is
  if (dropboxLink.includes('dl=1') || dropboxLink.includes('raw=1')) {
    return dropboxLink;
  }

  // Convert share link to direct link
  let directLink = dropboxLink.replace('dropbox.com', 'dl.dropboxusercontent.com');

  // Add dl=1 parameter if not present
  if (!directLink.includes('?')) {
    directLink += '?dl=1';
  } else {
    directLink += '&dl=1';
  }

  return directLink;
}

/**
 * Extract images from content text
 */
function extractImagesFromContent(content: string): NewsImage[] {
  const images: NewsImage[] = [];
  const imageRegex = /(https?:\/\/[^\s]+\.(?:jpg|jpeg|png|gif|webp|svg))(?=\s|$)/gi;
  const matches = content.match(imageRegex);

  if (matches) {
    matches.forEach((url, index) => {
      images.push({
        url: convertDropboxLink(url),
        alt: `Content image ${index + 1}`
      });
    });
  }

  return images;
}

/**
 * Get all images from a collection of news items
 */
export async function getAllNewsImages(newsIds: string[]): Promise<Record<string, NewsImage[]>> {
  const imagesMap: Record<string, NewsImage[]> = {};

  await Promise.all(
    newsIds.map(async (newsId) => {
      const images = await getNewsImages(newsId);
      imagesMap[newsId] = images;
    })
  );

  return imagesMap;
}

/**
 * Validate if a URL is a valid image URL
 */
export function isValidImageUrl(url: string): boolean {
  return /\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i.test(url) ||
         url.includes('dropbox.com') ||
         url.includes('cloudinary.com') ||
         url.includes('imgur.com');
}