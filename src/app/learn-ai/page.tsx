export default function LearnAI() {
  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Learn AI</h1>
          <p className="text-xl text-gray-600">Master Artificial Intelligence with our comprehensive courses</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Fundamentals</h3>
            <p className="text-gray-600 mb-4">
              Learn the basics of artificial intelligence, machine learning, and deep learning concepts.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
              Start Learning
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-4xl mb-4">🧠</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Neural Networks</h3>
            <p className="text-gray-600 mb-4">
              Dive deep into neural network architecture, training, and optimization techniques.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
              Start Learning
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Data Science</h3>
            <p className="text-gray-600 mb-4">
              Master data analysis, visualization, and statistical methods for AI applications.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
              Start Learning
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Practice</h3>
            <p className="text-gray-600 mb-4">
              Hands-on projects and practical exercises to apply your AI knowledge.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
              Start Learning
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}