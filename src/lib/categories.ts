export interface NewsCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
}

export const NEWS_CATEGORIES: NewsCategory[] = [
  {
    id: 'ai-news',
    name: 'AI News',
    description: 'Latest developments and breakthroughs in Artificial Intelligence',
    color: 'bg-blue-500',
    icon: '🧠'
  },
  {
    id: 'ai-bio',
    name: 'AI Biology',
    description: 'AI applications in biotechnology, bioinformatics, and life sciences',
    color: 'bg-green-500',
    icon: '🧬'
  },
  {
    id: 'insight',
    name: 'AI Insights',
    description: 'Deep analysis and insights into AI trends and implications',
    color: 'bg-yellow-500',
    icon: '💡'
  },
  {
    id: 'robotics',
    name: 'Robotics',
    description: 'Advancements in robotics and automation technology',
    color: 'bg-purple-500',
    icon: '🤖'
  },
  {
    id: 'ai-toolbox',
    name: 'AI Toolbox',
    description: 'AI tools, resources, and practical applications',
    color: 'bg-indigo-500',
    icon: '🛠️'
  },
  {
    id: 'skill-builder',
    name: 'Skill Builder',
    description: 'AI skills, tools, and learning resources',
    color: 'bg-red-500',
    icon: '📚'
  }
];

export const getCategoryById = (id: string): NewsCategory | undefined => {
  return NEWS_CATEGORIES.find(category => category.id === id);
};

export const getAllCategories = (): NewsCategory[] => {
  return NEWS_CATEGORIES;
};

export const categorizeNewsItem = (title: string, content: string): string => {
  const text = `${title} ${content}`.toLowerCase();

  // Define keywords for each category based on actual database categories
  const categoryKeywords = {
    'ai-news': ['artificial intelligence', 'ai breakthrough', 'ai development', 'neural network', 'deep learning', 'machine learning', 'openai', 'google', 'anthropic', 'chatgpt', 'gemini'],
    'ai-bio': ['biotechnology', 'bioinformatics', 'genomics', 'protein', 'dna', 'medical ai', 'healthcare', 'drug discovery', 'rna', 'cell mapping', 'neuralink', 'longevity'],
    'insight': ['analysis', 'trend', 'future', 'prediction', 'strategy', 'market', 'industry', 'practical skills', 'professionals', 'leadership', 'economy', 'cambodia'],
    'robotics': ['robot', 'automation', 'robotic', 'drone', 'autonomous', 'mechanical', 'tesla', 'optimus', 'humanoid', 'sophia', 'unitree'],
    'ai-toolbox': ['tool', 'toolbox', 'resource', 'application', 'software', 'platform', 'framework'],
    'skill-builder': ['skill', 'learning', 'education', 'training', 'tutorial', 'course', 'builder']
  };

  // Find the category with the most matching keywords
  let bestCategory = 'ai-news';
  let maxMatches = 0;

  for (const [categoryId, keywords] of Object.entries(categoryKeywords)) {
    const matches = keywords.filter(keyword => text.includes(keyword)).length;
    if (matches > maxMatches) {
      maxMatches = matches;
      bestCategory = categoryId;
    }
  }

  return bestCategory;
};