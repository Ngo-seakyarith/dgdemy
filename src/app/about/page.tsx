export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
          <p className="text-xl text-gray-600">Empowering learners through innovative education</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="prose prose-lg mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-6">
              At DGDemy, we are committed to providing high-quality education and training solutions
              that empower individuals and organizations to achieve their full potential in the digital age.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">What We Offer</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li>Professional training programs</li>
              <li>AI and machine learning courses</li>
              <li>Interactive workshops and webinars</li>
              <li>Comprehensive course catalog</li>
              <li>Latest AI news and updates</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-700">
              To be the leading platform for digital education, bridging the gap between traditional
              learning and cutting-edge technology.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}