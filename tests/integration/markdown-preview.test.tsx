import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import MarkdownPreviewPage from '../../app/markdown-preview/page'

// Mock fetch
global.fetch = jest.fn()

describe('MarkdownPreviewPage Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('fetches and displays markdown files on mount', async () => {
    const mockFiles = [
      { path: 'README.md', name: 'README.md' },
      { path: 'docs/guide.md', name: 'guide.md' }
    ]
    
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockFiles.map(f => f.path)
    })

    render(<MarkdownPreviewPage />)

    await waitFor(() => {
      expect(screen.getByText('README.md')).toBeInTheDocument()
      expect(screen.getByText('guide.md')).toBeInTheDocument()
    })
  })

  it('displays error when file fetch fails', async () => {
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))

    render(<MarkdownPreviewPage />)

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch files')).toBeInTheDocument()
    })
  })

  it('loads and displays markdown content when file is clicked', async () => {
    const mockFiles = ['README.md']
    const mockMarkdownResponse = {
      content: '# Test',
      html: '<h1>Test</h1>',
      file: 'README.md'
    }

    ;(global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockFiles
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockMarkdownResponse
      })

    render(<MarkdownPreviewPage />)

    await waitFor(() => {
      expect(screen.getByText('README.md')).toBeInTheDocument()
    })

    const fileItem = screen.getByText('README.md')
    const user = userEvent.setup()
    await user.click(fileItem)

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1, name: 'Test' })).toBeInTheDocument()
    })
  })

  it('displays error when markdown load fails', async () => {
    const mockFiles = ['README.md']

    ;(global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockFiles
      })
      .mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: 'File not found' })
      })

    render(<MarkdownPreviewPage />)

    await waitFor(() => {
      expect(screen.getByText('README.md')).toBeInTheDocument()
    })

    const fileItem = screen.getByText('README.md')
    const user = userEvent.setup()
    await user.click(fileItem)

    await waitFor(() => {
      expect(screen.getByText('File not found')).toBeInTheDocument()
    })
  })
})