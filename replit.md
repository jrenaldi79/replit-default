# Overview

This is a **Markdown Preview Server** - a simple Node.js application that automatically discovers and renders markdown files with full support for Mermaid diagrams. The server provides a clean web interface with a file browser sidebar, allowing users to preview any `.md` file in their project with live Mermaid diagram rendering.

The project also contains the BMad Method framework in the `.bmad-core` directory, which is an AI-driven agile development methodology system with specialized agent personas for different development roles (Product Manager, Architect, Developer, QA, etc.).

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Core Application Design

**Problem Solved**: Developers need a quick way to preview markdown files with Mermaid diagrams without leaving their development environment or installing additional tools.

**Solution Approach**: A lightweight Express.js server that:
- Automatically discovers all markdown files in the project (excluding `node_modules`)
- Serves a static HTML/CSS/JS frontend for rendering
- Provides REST API endpoints for file discovery and content retrieval
- Uses client-side rendering with the `marked` library and Mermaid.js from CDN

**Architecture Pattern**: Simple client-server architecture with file-based markdown storage.

## Technology Stack

- **Backend**: Node.js with Express.js 5.x
- **Markdown Parsing**: `marked` library (v16.4.1)
- **Diagram Rendering**: Mermaid.js (v10, loaded from CDN)
- **Frontend**: Vanilla JavaScript with ES modules
- **Development Environment**: Designed for Replit deployment

## Application Components

### Backend (server.js)

**File Discovery System**:
- Recursive filesystem traversal to find `.md` files
- Excludes `node_modules` and hidden directories (starting with `.`)
- Maintains in-memory cache of discovered files
- Path resolution ensures all files are within project root

**Security Measures**:
- Whitelist-based file access (only discovered markdown files)
- Path traversal protection via whitelist validation
- Defense-in-depth: Combined absolute path resolution + relative path validation
- Returns relative paths to avoid leaking filesystem structure
- Rejects any paths attempting to escape project root (paths starting with '..')

**API Endpoints**:
- `GET /api/files` - Returns list of all markdown files (relative paths)
- `GET /api/markdown?file={path}` - Returns rendered HTML for specific file with security validation

### Frontend (public/index.html)

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

## Design Decisions

**File Discovery vs Manual Registration**:
- **Chosen**: Automatic discovery via filesystem traversal
- **Rationale**: Zero configuration for users - just add `.md` files and they appear
- **Trade-off**: Startup time increases with project size, but acceptable for typical projects

**Client-Side vs Server-Side Rendering**:
- **Chosen**: Client-side markdown and Mermaid rendering
- **Rationale**: Simpler server code, CDN-based dependencies, better browser caching
- **Trade-off**: Requires JavaScript enabled, but acceptable for development tool

**CDN vs Bundled Dependencies**:
- **Chosen**: CDN for Mermaid.js
- **Rationale**: Reduces bundle size, leverages browser caching, simpler deployment
- **Trade-off**: Requires internet connection, but typical for Replit environment

**Security Model**:
- **Chosen**: Whitelist-based file access with defense-in-depth path validation
- **Rationale**: Prevents directory traversal attacks while allowing legitimate file access
- **Implementation**: 
  - Resolve all paths to absolute for normalization
  - Validate using path.relative() to detect escape attempts
  - Cross-check against whitelist cache of discovered markdown files
  - Return relative paths to clients to avoid exposing filesystem structure

# External Dependencies

## NPM Packages

- **express** (v5.1.0) - Web server framework for API and static file serving
- **marked** (v16.4.1) - Markdown parsing library for converting `.md` to HTML
- **@types/node** (v22.13.11) - TypeScript type definitions for Node.js APIs

## CDN Resources

- **Mermaid.js** (v10) - Diagram rendering library loaded from jsdelivr CDN
  - Source: `https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs`
  - Used for rendering diagrams in markdown code blocks

## Runtime Environment

- **Node.js** - JavaScript runtime (version not strictly specified, but uses modern ES features)
- **Replit Platform** - Designed for deployment on Replit with preview on port 5000

## BMad Method Framework

The `.bmad-core` directory contains a complete AI-driven development methodology system:
- **Agent Personas**: Pre-configured AI agent definitions for PM, Architect, Developer, QA, UX, Scrum Master roles
- **Task Workflows**: Structured task definitions for story creation, documentation, quality assurance
- **Templates**: YAML-driven document templates for PRDs, architecture docs, user stories
- **Checklists**: Validation checklists for quality gates and definition of done
- **Data Resources**: Brainstorming techniques, elicitation methods, test frameworks

This framework is independent of the markdown preview application but shares the same repository.