import { AiPractiseCard } from '@/components';
import { AiPractise } from '@/lib/types';

async function getAiPractises(): Promise<AiPractise[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/ai-practice`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch ai practise');
    const data = await res.json();
    return data.aiPractises || [];
  } catch (error) {
    console.error('Error fetching ai practise:', error);
    return [];
  }
}

export default async function AiPractisePage() {
  const aiPractises = await getAiPractises();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Practise</h1>
        <p className="text-gray-600">
          Explore our collection of AI practise videos and presentations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {aiPractises.map((aiPractise) => (
          <AiPractiseCard key={aiPractise.id} aiPractise={aiPractise} />
        ))}
      </div>

      {aiPractises.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No AI practise available at the moment.</p>
        </div>
      )}
    </div>
  );
}
