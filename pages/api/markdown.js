import fs from 'fs/promises'
import path from 'path'
import { marked } from 'marked'

const PROJECT_ROOT = path.resolve(process.cwd())

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { file } = req.query
    if (!file) {
      return res.status(400).json({ error: 'File parameter is required' })
    }
    
    const resolvedPath = path.resolve(file)
    const relativePath = path.relative(PROJECT_ROOT, resolvedPath)
    
    if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
      return res.status(403).json({ error: 'Access denied: path outside project root' })
    }
    
    const content = await fs.readFile(resolvedPath, 'utf-8')
    const html = marked(content)
    
    res.status(200).json({ content, html, file })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
