import { LogoIcon } from '../components/Icon';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="flex items-center space-x-4 mb-8">
            <LogoIcon size="2xl" className="flex-shrink-0" />
            <h1 className="text-4xl font-bold text-gray-900">About NextAuth</h1>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              NextAuth is a comprehensive authentication scaffold built with Next.js, providing a complete 
              foundation for secure user authentication and authorization in modern web applications.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Features</h2>
            <ul className="space-y-3 text-gray-600 mb-8">
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">•</span>
                <span>Secure user registration and login system</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">•</span>
                <span>Protected routes and dashboard access</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">•</span>
                <span>Dynamic navigation with user authentication state</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">•</span>
                <span>Responsive design with Tailwind CSS</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">•</span>
                <span>API routes for authentication endpoints</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-3">•</span>
                <span>Context-based state management</span>
              </li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Technology Stack</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Frontend</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Next.js 15</li>
                  <li>• React 18</li>
                  <li>• TypeScript</li>
                  <li>• Tailwind CSS</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Backend</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• Next.js API Routes</li>
                  <li>• JWT Authentication</li>
                  <li>• Local Storage</li>
                  <li>• Mock Database</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Getting Started</h2>
            <p className="text-gray-600 mb-4">
              This scaffold provides everything you need to get started with user authentication in your Next.js application. 
              Simply register a new account or login with the demo credentials to explore the features.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Demo Credentials</h3>
              <p className="text-blue-800 text-sm">
                Email: john@example.com<br />
                Password: password123
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
