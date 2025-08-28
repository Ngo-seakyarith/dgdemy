export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">Get in touch with us</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Information</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <span className="text-2xl">📞</span>
                <div className="text-left">
                  <p className="font-medium text-gray-900">Phone Numbers</p>
                  <p className="text-gray-600">010 801 601</p>
                  <p className="text-gray-600">099 200 805</p>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-3">
                <a
                  href="https://maps.app.goo.gl/LLJZbfL2MBqT15EK8?g_st=ipc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                >
                  <span className="text-2xl">📍</span>
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Address</p>
                    <p className="text-blue-600 hover:text-blue-800">PPIU Building #36, Street 169</p>
                    <p className="text-blue-600 hover:text-blue-800">Sangkat Veal Vong, Khan 7 Makara</p>
                    <p className="text-blue-600 hover:text-blue-800">Phnom Penh, Kingdom of Cambodia</p>
                  </div>
                </a>
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Learn?</h3>
                <p className="text-gray-600">
                  Contact us today to explore our comprehensive training programs and AI learning opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}