import fs from 'fs/promises'
import path from 'path'

const PROJECT_ROOT = path.resolve(process.cwd())

async function findMarkdownFiles(dir, fileList = []) {
  const files = await fs.readdir(dir, { withFileTypes: true })
  const excludedDirs = ['node_modules', '.git', '.cache', '.config', '.npm', '.next']
  
  for (const file of files) {
    const filePath = path.join(dir, file.name)
    
    if (file.isDirectory() && !excludedDirs.includes(file.name)) {
      try {
        await findMarkdownFiles(filePath, fileList)
      } catch (err) {
        continue
      }
    } else if (file.isFile() && file.name.endsWith('.md')) {
      fileList.push(filePath)
    }
  }
  
  return fileList
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const files = await findMarkdownFiles(PROJECT_ROOT)
    res.status(200).json(files)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
