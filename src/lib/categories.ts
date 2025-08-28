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

