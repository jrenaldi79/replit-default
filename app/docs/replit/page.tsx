'use client'

import { useState, useEffect } from 'react'
import Navigation from '../../components/Navigation'
import { marked } from 'marked'
import DOMPurify from 'isomorphic-dompurify'

export default function ReplitDocsPage() {
  const [content, setContent] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadMarkdown() {
      try {
        const response = await fetch('/api/files?path=replit.md')
        const data = await response.json()
        
        if (data.content) {
          const html = await marked(data.content)
          const sanitized = DOMPurify.sanitize(html)
          setContent(sanitized)
        }
      } catch (error) {
        console.error('Error loading replit.md:', error)
        setContent('<p class="text-red-600">Error loading documentation</p>')
      } finally {
        setIsLoading(false)
      }
    }

    loadMarkdown()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                📋 Project Guidelines (replit.md)
              </h1>
              <p className="text-gray-600">
                This file contains all the rules, guidelines, and best practices for this project.
                It instructs AI coding assistants on how to help you build your app.
              </p>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                <p className="mt-4 text-gray-600">Loading documentation...</p>
              </div>
            ) : (
              <div 
                className="prose prose-sm max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-code:text-purple-600 prose-code:bg-purple-50 prose-code:px-1 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
