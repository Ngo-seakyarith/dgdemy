export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-12 px-4 sm:px-6 lg:px-8">
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
            <p className="text-gray-700 mb-8">
              To be the leading platform for digital education, bridging the gap between traditional
              learning and cutting-edge technology.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-start space-x-3">
                <a
                  href="https://maps.app.goo.gl/LLJZbfL2MBqT15EK8?g_st=ipc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start space-x-3 hover:opacity-80 transition-opacity"
                >
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="font-medium text-gray-900 mb-2">Our Location</p>
                    <p className="text-blue-600 hover:text-blue-800">PPIU Building #36, Street 169</p>
                    <p className="text-blue-600 hover:text-blue-800">Sangkat Veal Vong, Khan 7 Makara</p>
                    <p className="text-blue-600 hover:text-blue-800">Phnom Penh, Kingdom of Cambodia</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}