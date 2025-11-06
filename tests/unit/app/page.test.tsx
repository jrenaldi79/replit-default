import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import HomePage from '../../../app/page'

describe('HomePage', () => {
  it('renders the main heading', () => {
    render(<HomePage />)
    const heading = screen.getByRole('heading', { name: /hello world/i })
    expect(heading).toBeInTheDocument()
  })

  it('renders the success message', () => {
    render(<HomePage />)
    const message = screen.getByText(/your next.js app is running successfully/i)
    expect(message).toBeInTheDocument()
  })

  it('renders the port information', () => {
    render(<HomePage />)
    const portInfo = screen.getByText(/running on port 5000/i)
    expect(portInfo).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<HomePage />)
    const mainAppLink = screen.getByRole('link', { name: /main app/i })
    const markdownLink = screen.getByRole('link', { name: /markdown preview/i })
    
    expect(mainAppLink).toBeInTheDocument()
    expect(mainAppLink).toHaveAttribute('href', '/')
    
    expect(markdownLink).toBeInTheDocument()
    expect(markdownLink).toHaveAttribute('href', '/markdown-preview')
  })
})