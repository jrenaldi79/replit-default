import React from 'react'
import Link from 'next/link'
import ExampleComponent from './components/ExampleComponent'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              My Next.js App
            </h1>
            <nav className="flex gap-4">
              <Link 
                href="/markdown-preview"
                className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
              >
                📚 BMAD Docs
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              🚀 Northwestern MPD2 Starter Template
            </h2>
            <p className="text-gray-600 mb-6">
              Welcome to your Next.js starter project! This is a "shell" app that you'll replace with your own amazing idea.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <p className="text-blue-800 font-semibold mb-2">💡 Quick Start Guide:</p>
              <ol className="list-decimal list-inside text-blue-700 space-y-1">
                <li>Replace this page with your app's home page</li>
                <li>Add your components in the <code className="bg-blue-100 px-1 rounded">app/components</code> folder</li>
                <li>Create API routes in <code className="bg-blue-100 px-1 rounded">app/api</code></li>
                <li>Use the BMAD Docs viewer to understand the methodology while you code</li>
              </ol>
            </div>

            <div className="flex gap-4">
              <Link 
                href="/markdown-preview"
                className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                View BMAD Documentation
              </Link>
              <a 
                href="https://nextjs.org/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
              >
                Next.js Docs →
              </a>
            </div>
          </div>

          {/* Example Component Section */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Example Component
            </h3>
            <p className="text-gray-600 mb-4">
              Below is a simple example component to show you the structure. Feel free to modify or delete it!
            </p>
            <ExampleComponent />
          </div>

          {/* Resources Section */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              📚 Helpful Resources
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <a 
                href="https://tailwindcss.com/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 border border-gray-200 rounded-lg hover:border-purple-500 transition-colors"
              >
                <h4 className="font-semibold text-gray-800 mb-1">Tailwind CSS</h4>
                <p className="text-sm text-gray-600">Utility-first CSS framework</p>
              </a>
              <a 
                href="https://www.typescriptlang.org/docs/"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 border border-gray-200 rounded-lg hover:border-purple-500 transition-colors"
              >
                <h4 className="font-semibold text-gray-800 mb-1">TypeScript</h4>
                <p className="text-sm text-gray-600">JavaScript with syntax for types</p>
              </a>
              <a 
                href="https://react.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 border border-gray-200 rounded-lg hover:border-purple-500 transition-colors"
              >
                <h4 className="font-semibold text-gray-800 mb-1">React</h4>
                <p className="text-sm text-gray-600">Library for web and native UIs</p>
              </a>
              <a 
                href="https://jestjs.io/docs/getting-started"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 border border-gray-200 rounded-lg hover:border-purple-500 transition-colors"
              >
                <h4 className="font-semibold text-gray-800 mb-1">Jest</h4>
                <p className="text-sm text-gray-600">Testing framework (TDD)</p>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-200 bg-white">
        <div className="container mx-auto px-6 py-8">
          <p className="text-center text-gray-600">
            Northwestern MPD2 Starter Template | Built with Next.js 16, TypeScript & Tailwind CSS
          </p>
          <p className="text-center text-sm text-gray-500 mt-2">
            💡 Tip: Start by editing <code className="bg-gray-100 px-2 py-1 rounded">app/page.tsx</code>
          </p>
        </div>
      </footer>
    </div>
  )
}