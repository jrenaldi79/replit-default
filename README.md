# Next.js Markdown Preview Application

A modern, secure markdown preview application built with Next.js 16, featuring Replit-style rendering, syntax highlighting, and Mermaid diagram support.

## 🚀 Features

### ✨ Markdown Preview System
- **Interactive File Browser**: Expandable folder tree for easy markdown file navigation
- **Live Rendering**: Real-time markdown to HTML conversion with secure sanitization
- **Syntax Highlighting**: Beautiful code blocks with custom Replit-style theme
  - Blue keywords, orange strings, green numbers, purple functions
  - Support for JavaScript, TypeScript, Python, YAML, Bash, CSS, HTML, SQL, JSON, and more
- **Mermaid Diagrams**: Full support for flowcharts, sequence diagrams, and more
- **Security First**: XSS protection via DOMPurify, path traversal prevention
- **Clean UI**: Light code blocks with dark text, matching Replit's aesthetic

### 🏠 Home Page
- Welcome screen with gradient background
- Navigation to all application features
- Built as React Server Component for optimal performance

## 🛠️ Technology Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 16.0.1 with App Router & Turbopack |
| **Language** | TypeScript 5.x (strict mode) |
| **Styling** | Tailwind CSS 3.4.x + Typography plugin |
| **Testing** | Jest + React Testing Library |
| **Markdown** | marked (rendering), isomorphic-dompurify (sanitization) |
| **Syntax Highlighting** | highlight.js with custom Replit theme |
| **Diagrams** | Mermaid 10.x |
| **Runtime** | Node.js on Replit platform |

## 📁 Project Structure

```
.
├── app/                          # Next.js App Router
│   ├── api/                      # API Route Handlers
│   │   ├── files/                # File discovery API
│   │   └── markdown/             # Markdown rendering API
│   ├── markdown-preview/         # Markdown preview feature
│   │   ├── page.tsx             # Preview page (Client Component)
│   │   ├── FileTree.tsx         # File navigation component
│   │   └── highlight-theme.css  # Syntax highlighting styles
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
│
├── tests/                        # Test suite (TDD)
│   ├── integration/              # Integration tests
│   └── unit/                     # Unit tests (mirrors app structure)
│
├── types/                        # TypeScript type definitions
│   └── index.ts
│
├── jest.config.js               # Jest configuration
├── next.config.js               # Next.js configuration
├── tailwind.config.js           # Tailwind CSS configuration
└── tsconfig.json                # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (already installed on Replit)
- npm (already installed on Replit)

### Installation

```bash
# Install dependencies
npm install
```

### Running the Application

```bash
# Development mode (with hot reload)
npm run dev

# Production build
npm run build
npm start

# Lint code
npm run lint
```

The application runs on **port 5000** and is accessible via the Replit webview.

## 🧪 Testing

This project follows **Test-Driven Development (TDD)** methodology.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (auto-rerun on changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run specific test file
npm test -- tests/unit/app/api/markdown/route.test.ts

# Run unit tests only
npm test -- tests/unit/

# Run integration tests only
npm test -- tests/integration/
```

### Test Coverage
- **Minimum coverage threshold**: 80%
- Coverage enforced for: branches, functions, lines, statements
- Coverage report: `/coverage/lcov-report/index.html`

## 📡 API Endpoints

### GET `/api/files`
Recursively scans the project for markdown files.

**Response:**
```json
{
  "files": [
    {
      "name": "README.md",
      "path": "README.md",
      "type": "file"
    },
    {
      "name": "docs",
      "path": "docs",
      "type": "folder",
      "children": [...]
    }
  ]
}
```

**Features:**
- Excludes: `node_modules`, `.git`, `.next`, `.cache`
- Sorts: folders before files, alphabetically within each category

### GET `/api/markdown?file={path}`
Renders a markdown file to HTML.

**Parameters:**
- `file` (required): Path to markdown file

**Response:**
```json
{
  "html": "<h1>Title</h1><p>Content...</p>",
  "raw": "# Title\nContent..."
}
```

**Features:**
- Markdown to HTML conversion via `marked`
- XSS protection via `isomorphic-dompurify`
- Path traversal protection
- Mermaid diagram support

## 🔒 Security

### Input Sanitization
All user-provided HTML is sanitized using `isomorphic-dompurify` to prevent XSS attacks.

### Path Traversal Protection
API endpoints validate file paths to prevent directory traversal attacks.

### Environment Variables
Use Replit Secrets for sensitive credentials - never commit `.env` files.

## 🎨 Styling

### Replit-Style Markdown Rendering
- **Code blocks**: Light gray background (`bg-gray-100`) with dark text
- **Inline code**: Red text (`text-red-700`) with light gray background
- **Headings**: Bold with proper hierarchy
- **Links**: Blue with hover effects
- **Lists**: Clean bullet points and numbered lists

### Syntax Highlighting Colors
- **Keywords**: Blue (`#2563eb`)
- **Strings**: Orange (`#c2410c`)
- **Numbers**: Green (`#059669`)
- **Functions**: Purple (`#7c3aed`)
- **Comments**: Gray (`#6b7280`)

## 📝 Development Guidelines

### Test-Driven Development (TDD)
1. **Write tests first** - Define expected behavior
2. **Watch tests fail** - Confirm RED state
3. **Implement feature** - Make tests pass (GREEN)
4. **Refactor** - Improve code quality
5. **Verify coverage** - Ensure >80% coverage

### Code Quality
- TypeScript strict mode enabled
- ESLint and Prettier configured
- Path aliases: `@/components/...`
- Explicit type imports: `import type { ... }`

### Component Patterns
- **Favor Server Components** - Use Client Components only when necessary
- **Composition over configuration** - Accept `children` prop
- **State colocation** - Keep state close to usage

## 🚢 Deployment

The application is configured for Replit deployment on port 5000.

### Workflow Configuration
```bash
# The following workflow is pre-configured:
nextjs-app: npm run dev
```

## 📄 License

ISC

## 🤝 Contributing

This project follows strict TDD methodology. Before contributing:
1. Read `replit.md` for complete project rules and guidelines
2. Write tests before implementation
3. Ensure test coverage >80%
4. Follow the existing code style

## 📚 Additional Documentation

- **Project Rules**: See `replit.md` for comprehensive development guidelines
- **Test Markdown**: See `test-markdown.md` for syntax highlighting examples
- **Type Definitions**: See `types/index.ts` for TypeScript types

---

Built with ❤️ using Next.js 16, TypeScript, and Tailwind CSS
