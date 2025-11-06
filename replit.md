# Overview

This project contains **two separate Node.js applications** running on different ports:

1. **Main App** (Port 5000) - Primary application with structured Node.js architecture
2. **Markdown Preview Server** (Port 3000) - Utility for previewing markdown files with Mermaid diagrams

The project also contains the **BMad Method framework** in the `.bmad-core` directory, which is an AI-driven agile development methodology system with specialized agent personas for different development roles.

# User Preferences

Preferred communication style: Simple, everyday language.

# Project Structure

```
├── main-app/              # Main application (Port 5000)
│   ├── src/               # Application source code
│   │   └── app.js        # Main Express server
│   ├── routes/           # Express route handlers
│   ├── middleware/       # Custom middleware functions
│   ├── config/           # Configuration files
│   ├── public/           # Static assets (HTML, CSS, JS, images)
│   ├── package.json      # App-specific dependencies
│   └── README.md         # App documentation
│
├── markdown-preview/      # Markdown preview utility (Port 3000)
│   ├── server.js         # Express server with markdown rendering
│   ├── public/           # Frontend static files
│   │   └── index.html   # Markdown viewer UI
│   └── README.md         # Preview documentation
│
├── .bmad-core/           # BMad Method Framework
│   └── ...               # AI-driven development methodology
│
├── package.json          # Root-level shared dependencies
└── README.md             # Project overview
```

# System Architecture

## Main App (Port 5000)

**Purpose**: Primary application for user-facing functionality

**Architecture Pattern**: Traditional Express.js MVC structure ready for scaling

**Directory Organization**:
- **src/**: Application source code and main server file
- **routes/**: Modular route handlers (organized by feature/resource)
- **middleware/**: Custom middleware for authentication, validation, logging, etc.
- **config/**: Environment-specific configuration
- **public/**: Static assets served directly to clients

**Current State**: Hello World implementation demonstrating the basic setup

**Technology Stack**:
- Node.js with Express.js 5.x
- Organized for future expansion with database, authentication, APIs, etc.

## Markdown Preview Server (Port 3000)

**Purpose**: Developer utility for previewing markdown files with Mermaid diagram support

**Problem Solved**: Developers need a quick way to preview markdown files with Mermaid diagrams without leaving their development environment or installing additional tools.

**Architecture Pattern**: Simple client-server architecture with file-based markdown storage

**Technology Stack**:
- **Backend**: Node.js with Express.js 5.x
- **Markdown Parsing**: `marked` library (v16.4.1)
- **Diagram Rendering**: Mermaid.js (v10, loaded from CDN)
- **Frontend**: Vanilla JavaScript with ES modules

### Markdown Preview Components

**Backend (markdown-preview/server.js)**

**File Discovery System**:
- Recursive filesystem traversal starting from project root
- Searches entire project for `.md` files
- Excludes specific directories: `node_modules`, `.git`, `.cache`, `.config`, `.npm`
- Maintains in-memory cache of discovered files
- Searches from project root (parent of markdown-preview directory)

**Security Measures**:
- Whitelist-based file access (only discovered markdown files)
- Defense-in-depth path validation:
  - Resolve all paths to absolute for normalization
  - Validate using path.relative() to detect escape attempts
  - Cross-check against whitelist cache
  - Returns relative paths to avoid leaking filesystem structure
  - Rejects any paths attempting to escape project root

**API Endpoints**:
- `GET /api/files` - Returns list of all markdown files (relative paths from project root)
- `GET /api/markdown?file={path}` - Returns rendered HTML for specific file with security validation

**Frontend (markdown-preview/public/index.html)**

**UI Structure**:
- Fixed sidebar (300px) with file list navigation
- Main content area for rendered markdown
- Responsive styling with modern font stack

**Rendering Flow**:
1. Fetch file list on page load
2. User clicks file in sidebar
3. Fetch markdown content via API
4. Parse markdown with `marked`
5. Initialize Mermaid and render diagrams
6. Display in main content area

**Mermaid Integration**:
- Loaded as ES module from jsdelivr CDN
- Initialized with default theme
- Manual rendering trigger after markdown insertion
- Handles code blocks with `mermaid` language tag

### Design Decisions

**Multi-Application Structure**:
- **Chosen**: Separate directories for main app and utilities
- **Rationale**: Clean separation of concerns, independent scaling, easier maintenance
- **Implementation**: Each app has its own directory, README, and can have its own dependencies

**File Discovery Scope**:
- **Chosen**: Scan entire project root, not just markdown-preview directory
- **Rationale**: Users want to preview all markdown files in project (including .bmad-core, docs, etc.)
- **Implementation**: Server runs from markdown-preview/ but scans parent directory

**Port Allocation**:
- **Port 5000**: Main app (webview default in Replit)
- **Port 3000**: Markdown preview (accessible via Replit Ports panel)
- **Rationale**: Port 5000 as default preview keeps main app front and center

# External Dependencies

## NPM Packages (Shared)

- **express** (v5.1.0) - Web server framework for both applications
- **marked** (v16.4.1) - Markdown parsing library for markdown preview
- **@types/node** (v22.13.11) - TypeScript type definitions for Node.js APIs

## CDN Resources

- **Mermaid.js** (v10) - Diagram rendering library loaded from jsdelivr CDN
  - Source: `https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs`
  - Used for rendering diagrams in markdown code blocks

## Runtime Environment

- **Node.js** - JavaScript runtime (uses modern ES features)
- **Replit Platform** - Configured for dual-app deployment:
  - Main app: Port 5000 (webview)
  - Markdown preview: Port 3000 (console/background)

## Workflows

Two Replit workflows configured:

1. **main-app**: 
   - Command: `node main-app/src/app.js`
   - Port: 5000
   - Output: webview (default preview)

2. **markdown-preview**:
   - Command: `node markdown-preview/server.js`
   - Port: 3000
   - Output: console (accessible via Ports panel)

# BMad Method Framework

The `.bmad-core` directory contains a complete AI-driven development methodology system:
- **Agent Personas**: Pre-configured AI agent definitions for PM, Architect, Developer, QA, UX, Scrum Master roles
- **Task Workflows**: Structured task definitions for story creation, documentation, quality assurance
- **Templates**: YAML-driven document templates for PRDs, architecture docs, user stories
- **Checklists**: Validation checklists for quality gates and definition of done
- **Data Resources**: Brainstorming techniques, elicitation methods, test frameworks

This framework is independent of both applications but shares the same repository.

# Development Notes

## Accessing Applications

**Main App**: 
- Automatically visible in Replit webview (default)
- URL: Main Replit preview URL

**Markdown Preview**:
- Access via Replit Ports panel → Click port 3000
- Or append `:3000` to Replit URL in new tab

## Adding Features to Main App

The main app is structured for easy expansion:
- Add routes in `main-app/routes/`
- Add middleware in `main-app/middleware/`
- Add config in `main-app/config/`
- Add static assets in `main-app/public/`

## Recent Changes (November 2025)

- Reorganized project from flat structure to organized multi-app structure
- Moved main application to `main-app/` directory
- Moved markdown preview to `markdown-preview/` directory
- Added proper Node.js directory structure to main app
- Updated workflows to reflect new paths
- Cleaned up root directory (removed temporary files)
