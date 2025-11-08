'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import DOMPurify from 'isomorphic-dompurify'
import mermaid from 'mermaid'
import hljs from 'highlight.js'
import './highlight-theme.css'
import './mermaid-styles.css'
import FileTree from './FileTree'
import { FileNode } from '@/app/api/files/route'

interface MarkdownContent {
  content: string
  html: string
  file: string
}

export default function MarkdownPreviewPage() {
  const searchParams = useSearchParams()
  const [fileTree, setFileTree] = useState<FileNode[]>([])
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [markdown, setMarkdown] = useState('')
  const [html, setHtml] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    mermaid.initialize({ startOnLoad: false, theme: 'default' })
  }, [])

  useEffect(() => {
    fetchFiles()
  }, [])

  useEffect(() => {
    // Check if there's a file parameter in the URL
    const fileParam = searchParams?.get('file')
    if (fileParam && fileParam !== selectedFile) {
      fetchMarkdown(fileParam)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  useEffect(() => {
    const renderMermaidDiagrams = async () => {
      if (!contentRef.current || !html) return

      // Wait for DOM to be ready and add retries
      await new Promise(resolve => setTimeout(resolve, 150))

      try {
        const codeBlocks = contentRef.current.querySelectorAll('code.language-mermaid')
        
        if (codeBlocks.length === 0) return

        // Show loading indicators
        codeBlocks.forEach(block => {
          const pre = block.parentElement
          if (pre && pre.tagName === 'PRE') {
            pre.style.position = 'relative'
            const loader = document.createElement('div')
            loader.className = 'mermaid-loader'
            loader.innerHTML = '🔄 Rendering diagram...'
            loader.style.cssText = 'position: absolute; top: 8px; right: 8px; background: rgba(255,255,255,0.95); padding: 4px 12px; border-radius: 4px; font-size: 12px; color: #6b7280; font-style: italic; z-index: 10;'
            pre.appendChild(loader)
          }
        })

        // Configure mermaid for FORCED vertical layouts
        mermaid.initialize({ 
          startOnLoad: false, 
          theme: 'default',
          securityLevel: 'loose',
          themeVariables: {
            primaryColor: '#f3f4f6',
            primaryTextColor: '#111827',
            primaryBorderColor: '#d1d5db',
            lineColor: '#9ca3af',
            secondaryColor: '#e5e7eb',
            background: '#ffffff',
            mainBkg: '#f9fafb',
            secondBkg: '#f3f4f6',
            tertiaryColor: '#ffffff'
          },
          flowchart: {
            useMaxWidth: false,
            htmlLabels: true,
            curve: 'basis',
            rankSpacing: 150,     // Much larger vertical spacing to stretch vertically
            nodeSpacing: 10,      // Very tight horizontal spacing to compress horizontally
            diagramPadding: 20,
            defaultRenderer: 'dagre-wrapper',  // Use dagre-wrapper for better control
            wrappingWidth: 200    // Force text wrapping in nodes
          },
          sequence: {
            useMaxWidth: false,
            diagramMarginX: 50,
            diagramMarginY: 20,
            actorMargin: 50,
            width: 150,
            height: 65,
            boxMargin: 10,
            boxTextMargin: 5,
            noteMargin: 10,
            messageMargin: 35
          },
          gitGraph: {
            mainBranchName: 'main',
            showCommitLabel: true,
            showBranches: true,
            rotateCommitLabel: true
          }
        })
        
        // Process each mermaid block with retries
        for (let i = 0; i < codeBlocks.length; i++) {
          const codeBlock = codeBlocks[i]
          const pre = codeBlock.parentElement
          if (!pre || pre.tagName !== 'PRE') continue

          let mermaidCode = codeBlock.textContent || ''
          
          // Force vertical orientation by restructuring the graph
          if (mermaidCode.includes('graph')) {
            // Always use TB (top-bottom)
            mermaidCode = mermaidCode.replace(/graph\s+(TD|LR|RL|BT)/gi, 'graph TB')
            
            // If no direction specified, add TB
            if (!mermaidCode.match(/graph\s+(TD|TB|LR|RL|BT)/)) {
              mermaidCode = mermaidCode.replace(/graph(\s|$)/, 'graph TB$1')
            }
            
            // Parse the graph to extract nodes and connections
            const lines = mermaidCode.split('\n')
            const nodes = new Map<string, string>()
            const connections: Array<{from: string, to: string, label?: string}> = []
            let inSubgraph = false
            let subgraphContent: string[] = []
            
            for (const line of lines) {
              // Skip subgraph processing for now
              if (line.includes('subgraph')) {
                inSubgraph = true
                subgraphContent.push(line)
                continue
              }
              if (line.includes('end') && inSubgraph) {
                inSubgraph = false
                subgraphContent.push(line)
                continue
              }
              if (inSubgraph) {
                subgraphContent.push(line)
                continue
              }
              
              // Parse node definitions and connections
              const connectionMatch = line.match(/(\w+)(?:\[([^\]]+)\])?\s*-->(.*?)\s*(\w+)(?:\[([^\]]+)\])?/)
              if (connectionMatch) {
                const [, from, fromLabel, arrow, to, toLabel] = connectionMatch
                
                // Store node labels if present
                if (fromLabel) nodes.set(from, fromLabel)
                if (toLabel) nodes.set(to, toLabel)
                
                // Store connection
                connections.push({ from, to, label: arrow.includes('|') ? arrow : undefined })
              } else if (line.includes('[') && line.includes(']')) {
                // Standalone node definition
                const nodeMatch = line.match(/(\w+)\[([^\]]+)\]/)
                if (nodeMatch) {
                  nodes.set(nodeMatch[1], nodeMatch[2])
                }
              }
            }
            
            // Rebuild the graph with forced vertical structure
            // Add invisible nodes between connections to force vertical spacing
            let rebuiltCode = mermaidCode.split('\n')[0] + '\n' // Keep the graph TB line
            
            // Add subgraph content back first
            if (subgraphContent.length > 0) {
              rebuiltCode += subgraphContent.join('\n') + '\n'
            }
            
            // Add all node definitions first
            for (const [nodeId, label] of nodes) {
              rebuiltCode += `    ${nodeId}[${label}]\n`
            }
            
            // Add connections with invisible spacer nodes to force vertical layout
            let spacerCount = 0
            for (let i = 0; i < connections.length; i++) {
              const conn = connections[i]
              
              // For parallel branches (multiple nodes connecting from the same source),
              // add invisible nodes to force them to stack vertically
              const parallelConnections = connections.filter(c => c.from === conn.from)
              if (parallelConnections.length > 1 && parallelConnections[0] === conn) {
                // This is the first of multiple parallel connections
                // Add invisible spacers between them
                for (let j = 0; j < parallelConnections.length; j++) {
                  const pc = parallelConnections[j]
                  if (j > 0) {
                    // Add invisible spacer node
                    const spacerId = `spacer${spacerCount++}`
                    rebuiltCode += `    ${spacerId}[ ]\n`
                    rebuiltCode += `    ${pc.from} --> ${spacerId}\n`
                    rebuiltCode += `    ${spacerId} --> ${pc.to}\n`
                    rebuiltCode += `    style ${spacerId} fill:transparent,stroke:transparent\n`
                  } else {
                    // First connection, add normally
                    rebuiltCode += `    ${pc.from} --> ${pc.to}\n`
                  }
                }
                // Skip the parallel connections we just processed
                i += parallelConnections.length - 1
              } else if (parallelConnections.length === 1) {
                // Single connection, add normally
                rebuiltCode += `    ${conn.from} --> ${conn.to}\n`
              }
            }
            
            mermaidCode = rebuiltCode
          }
          
          let attempts = 3
          let rendered = false
          
          while (attempts > 0 && !rendered) {
            try {
              // Generate unique ID for each attempt
              const id = `mermaid-${Date.now()}-${i}-${Math.random().toString(36).substr(2, 5)}`
              
              // Create container
              const container = document.createElement('div')
              container.className = 'mermaid-container my-6'
              container.style.cssText = 'display: block; width: 100%; max-width: 100%; overflow-x: auto; margin: 1.5rem 0; background: #f9fafb; padding: 1.5rem; border-radius: 8px; border: 1px solid #e5e7eb;'
              
              // Render diagram
              const { svg } = await mermaid.render(id, mermaidCode)
              
              // Insert SVG
              container.innerHTML = svg
              
              // Optimize SVG dimensions for display
              const svgElement = container.querySelector('svg')
              if (svgElement) {
                // Remove any fixed dimensions
                svgElement.removeAttribute('width')
                svgElement.removeAttribute('height')
                svgElement.style.maxWidth = '100%'
                svgElement.style.height = 'auto'
                
                // Check viewBox to see if we need to adjust container
                const viewBox = svgElement.getAttribute('viewBox')
                if (viewBox) {
                  const [x, y, width, height] = viewBox.split(' ').map(Number)
                  
                  // Log for debugging
                  console.log(`Diagram ${i}: ${width}x${height} (${width > height * 1.5 ? 'horizontal' : 'vertical'}) - spacer nodes added to force vertical layout`)
                  
                  // Adjust container based on diagram proportions
                  if (width > height * 2) {
                    // Very wide diagram - constrain width more
                    container.style.maxWidth = '100%'
                    container.style.overflow = 'auto'
                  } else {
                    // Normal proportions
                    container.style.maxWidth = '900px'
                  }
                  container.style.margin = '1.5rem auto'
                } else {
                  // No viewBox, apply safe defaults
                  container.style.maxWidth = '900px'
                  container.style.margin = '1.5rem auto'
                }
              }
              
              // Replace pre with container
              pre.replaceWith(container)
              rendered = true
              
            } catch (renderError) {
              attempts--
              console.warn(`Mermaid render attempt ${4 - attempts} failed for diagram ${i}:`, renderError)
              
              if (attempts > 0) {
                // Wait before retry
                await new Promise(resolve => setTimeout(resolve, 200))
              } else {
                // All attempts failed - show error with original code
                const errorContainer = document.createElement('div')
                errorContainer.className = 'mermaid-error'
                errorContainer.style.cssText = 'background: #fef2f2; border: 1px solid #fca5a5; padding: 1rem; border-radius: 8px; margin: 1.5rem 0;'
                errorContainer.innerHTML = `
                  <div style="color: #dc2626; font-weight: 600; margin-bottom: 0.5rem;">
                    ⚠️ Diagram rendering failed
                  </div>
                  <div style="color: #7f1d1d; font-size: 14px; margin-bottom: 0.75rem;">
                    The Mermaid diagram could not be rendered. Original code:
                  </div>
                  <pre style="background: white; padding: 1rem; border-radius: 4px; overflow-x: auto; font-size: 13px; border: 1px solid #e5e7eb;"><code>${codeBlock.textContent}</code></pre>
                `
                pre.replaceWith(errorContainer)
              }
            }
          }
          
          // Remove loader
          const loader = pre.querySelector('.mermaid-loader')
          if (loader) loader.remove()
        }
      } catch (error) {
        console.error('Mermaid initialization error:', error)
        // Remove all loaders on error
        contentRef.current?.querySelectorAll('.mermaid-loader').forEach(el => el.remove())
      }
    }

    renderMermaidDiagrams()
  }, [html])

  useEffect(() => {
    if (!contentRef.current || !html) return

    const codeBlocks = contentRef.current.querySelectorAll('pre code:not(.language-mermaid)')
    codeBlocks.forEach((block) => {
      hljs.highlightElement(block as HTMLElement)
    })
  }, [html])

  const fetchFiles = async () => {
    try {
      const response = await fetch('/api/files')
      const data = await response.json()
      setFileTree(data)
    } catch (err) {
      setError('Failed to fetch files')
    }
  }

  const fetchMarkdown = async (file: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/markdown?file=${encodeURIComponent(file)}`)
      const data: MarkdownContent = await response.json()
      
      if (response.ok) {
        setMarkdown(data.content)
        // Sanitize HTML before setting it (preserve class attributes for syntax highlighting)
        const sanitizedHtml = DOMPurify.sanitize(data.html, {
          ADD_ATTR: ['class'],
          ALLOWED_ATTR: ['class', 'id', 'href', 'target', 'rel', 'src', 'alt', 'title']
        })
        setHtml(sanitizedHtml)
        setSelectedFile(file)
      } else {
        setError((data as any).error || 'Failed to load file')
      }
    } catch (err) {
      setError('Failed to load markdown file')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-purple-600 text-white px-8 py-6 flex justify-between items-center shadow-lg">
        <h1 className="text-3xl font-bold">Markdown Preview</h1>
        <Link 
          href="/"
          className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
        >
          ← Back to Home
        </Link>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Markdown Files</h2>
          <FileTree
            tree={fileTree}
            onFileSelect={fetchMarkdown}
            selectedFile={selectedFile}
          />
        </aside>

        <main className="flex-1 p-8 overflow-y-auto bg-white">
          {loading && <p className="text-gray-600">Loading...</p>}
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200">
              {error}
            </div>
          )}
          {!selectedFile && !loading && !error && (
            <p className="text-center text-gray-500 text-xl mt-12">
              Select a markdown file to preview
            </p>
          )}
          {selectedFile && !loading && html && (
            <div
              ref={contentRef}
              className="prose max-w-none
                prose-h1:text-black prose-h1:font-bold prose-h1:text-3xl prose-h1:mb-4
                prose-h2:text-black prose-h2:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                prose-h3:text-black prose-h3:font-bold prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                prose-p:text-gray-800 prose-p:leading-relaxed prose-p:mb-4
                prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
                prose-code:bg-transparent prose-code:text-red-700 prose-code:px-0 prose-code:py-0 prose-code:text-sm
                prose-pre:bg-gray-100 prose-pre:my-6 prose-pre:font-mono
                prose-pre:code:bg-transparent prose-pre:code:text-gray-900 prose-pre:code:p-0 prose-pre:code:text-sm prose-pre:code:leading-relaxed
                prose-pre:p-4 prose-pre:rounded-md prose-pre:overflow-x-auto prose-pre:border prose-pre:border-gray-200
                prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:py-2 prose-blockquote:text-gray-700
                prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-700
                prose-strong:text-black prose-strong:font-bold
                prose-em:italic
                prose-ul:my-4 prose-ul:list-disc prose-ul:ml-6
                prose-ol:my-4 prose-ol:list-decimal prose-ol:ml-6
                prose-li:text-gray-800 prose-li:my-2
                prose-hr:border-t prose-hr:border-gray-300 prose-hr:my-8
                prose-table:border-collapse prose-table:w-full prose-table:my-6
                prose-th:bg-gray-100 prose-th:border prose-th:border-gray-300 prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:font-semibold prose-th:text-gray-800
                prose-td:border prose-td:border-gray-300 prose-td:px-4 prose-td:py-2 prose-td:text-gray-700"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          )}
        </main>
      </div>
    </div>
  )
}