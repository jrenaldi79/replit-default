# Markdown Preview Server with Mermaid Support

A simple markdown preview server that automatically renders your markdown files with full Mermaid diagram support.

## Features

- **Automatic File Discovery**: Finds all `.md` files in your project (excluding `node_modules`)
- **Mermaid Diagrams**: Full support for Mermaid diagrams embedded in markdown
- **Live Preview**: Click any file to see it rendered
- **Clean Interface**: Simple sidebar for file navigation
- **Secure**: Protected against path traversal attacks

## Usage

1. The server is already running and available in the Replit preview
2. All your markdown files will appear in the sidebar on the left
3. Click any file to preview it with rendered Mermaid diagrams
4. No changes needed to your existing markdown files!

## Markdown Format

Your markdown files work as-is. For Mermaid diagrams, use code blocks with the `mermaid` language:

\`\`\`markdown
# My Document

Some text here.

\`\`\`mermaid
graph TD
    A[Start] --> B[Process]
    B --> C[End]
\`\`\`
\`\`\`

## Technical Details

- **Server**: Express.js on port 3000
- **Markdown Parser**: marked
- **Diagram Renderer**: Mermaid.js (loaded from CDN)
- **Security**: Whitelist-based file access with path traversal protection

## Accessing the Markdown Preview

The markdown preview server runs on **port 3000** (leaving port 5000 free for your main app). To access it:
- Open the Replit "Ports" panel
- Click on port 3000 to open the markdown preview in a new tab
- Or access it via the webview URL with `:3000` appended
