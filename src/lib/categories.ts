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
    id: 'robotics',
    name: 'Robotics',
    description: 'Advancements in robotics and automation technology',
    color: 'bg-green-500',
    icon: '🤖'
  },
  {
    id: 'insight',
    name: 'AI Insights',
    description: 'Deep analysis and insights into AI trends and implications',
    color: 'bg-yellow-500',
    icon: '💡'
  },
  {
    id: 'skill-builder',
    name: 'Skill Builder',
    description: 'AI skills, tools, and learning resources',
    color: 'bg-purple-500',
    icon: '🛠️'
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

  // Define keywords for each category
  const categoryKeywords = {
    'ai-news': ['artificial intelligence', 'ai breakthrough', 'ai development', 'ai advancement', 'neural network', 'deep learning'],
    'robotics': ['robot', 'automation', 'robotic', 'drone', 'autonomous', 'mechanical'],
    'ai-bio': ['biotechnology', 'bioinformatics', 'genomics', 'protein', 'dna', 'medical ai', 'healthcare'],
    'insight': ['analysis', 'trend', 'future', 'prediction', 'strategy', 'market', 'industry'],
    'machine-learning': ['machine learning', 'ml', 'algorithm', 'model', 'training', 'dataset', 'supervised', 'unsupervised'],
    'computer-vision': ['computer vision', 'image', 'vision', 'recognition', 'detection', 'opencv', 'yolo'],
    'nlp': ['natural language', 'nlp', 'language model', 'text', 'chatbot', 'conversation', 'sentiment', 'gpt', 'bert'],
    'ai-business': ['business', 'enterprise', 'startup', 'commercial', 'market', 'investment', 'deployment']
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