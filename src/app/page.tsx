import Link from 'next/link';

export default function Home() {
  const dashboardItems = [
    {
      title: 'Professional Training',
      description: 'Comprehensive training programs for professionals',
      href: '/dashboard/training',
      icon: '🎓'
    },
    {
      title: 'Webinar',
      description: 'Live online sessions and presentations',
      href: '/dashboard/webinar',
      icon: '🎥'
    },
    {
      title: 'Workshop',
      description: 'Interactive hands-on learning sessions',
      href: '/dashboard/workshop',
      icon: '🔧'
    },
    {
      title: 'Gallery',
      description: 'Showcase of projects and achievements',
      href: '/dashboard/gallery',
      icon: '🖼️'
    },
    {
      title: 'Up coming course',
      description: 'Preview of upcoming courses and programs',
      href: '/dashboard/upcoming',
      icon: '📅'
    },
    {
      title: 'AI practice',
      description: 'Practice exercises and AI tools',
      href: '/dashboard/ai-practice',
      icon: '🤖'
    },
    {
      title: 'AI News',
      description: 'Latest updates and news in AI',
      href: '/dashboard/ai-news',
      icon: '📰'
    },
    {
      title: 'Course Catalog',
      description: 'Complete list of available courses',
      href: '/dashboard/catalog',
      icon: '📚'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h2>
          <nav className="space-y-2">
            {dashboardItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 group"
              >
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <div className="font-medium text-gray-900 group-hover:text-blue-600">
                    {item.title}
                  </div>
                  <div className="text-sm text-gray-500 group-hover:text-blue-500">
                    {item.description}
                  </div>
                </div>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to <span className="text-blue-600">DGDemy</span>
            </h1>
            <p className="text-xl text-gray-600">
              Your comprehensive learning platform for professional development and AI education
            </p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  <strong>Quick Access:</strong> Use the sidebar to navigate to different sections of our platform.
                  Each section offers unique learning opportunities tailored to your professional development needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
