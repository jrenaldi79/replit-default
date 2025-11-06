import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/MarkdownPreview.module.css'

export default function MarkdownPreview() {
  const [files, setFiles] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)
  const [markdown, setMarkdown] = useState('')
  const [html, setHtml] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchFiles()
  }, [])

  const fetchFiles = async () => {
    try {
      const response = await fetch('/api/files')
      const data = await response.json()
      setFiles(data)
    } catch (err) {
      setError('Failed to fetch files')
    }
  }

  const fetchMarkdown = async (file) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/markdown?file=${encodeURIComponent(file)}`)
      const data = await response.json()
      
      if (response.ok) {
        setMarkdown(data.content)
        setHtml(data.html)
        setSelectedFile(file)
      } else {
        setError(data.error || 'Failed to load file')
      }
    } catch (err) {
      setError('Failed to load markdown file')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Markdown Preview</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Markdown Preview</h1>
          <Link href="/" className={styles.homeLink}>
            ← Back to Home
          </Link>
        </header>
        
        <div className={styles.main}>
          <aside className={styles.sidebar}>
            <h2>Markdown Files</h2>
            {files.length === 0 ? (
              <p>No markdown files found</p>
            ) : (
              <ul className={styles.fileList}>
                {files.map((file) => (
                  <li
                    key={file}
                    className={selectedFile === file ? styles.active : ''}
                    onClick={() => fetchMarkdown(file)}
                  >
                    {file.split('/').pop()}
                  </li>
                ))}
              </ul>
            )}
          </aside>

          <main className={styles.content}>
            {loading && <p>Loading...</p>}
            {error && <p className={styles.error}>{error}</p>}
            {!selectedFile && !loading && !error && (
              <p className={styles.placeholder}>Select a markdown file to preview</p>
            )}
            {selectedFile && !loading && (
              <div
                className={styles.preview}
                dangerouslySetInnerHTML={{ __html: html }}
              />
            )}
          </main>
        </div>
      </div>
    </>
  )
}
