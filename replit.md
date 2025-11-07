# Northwestern MPD2 Starter Template - Project Rules & Guidelines

## Overview

This is a **Next.js 16 starter template** for Northwestern MPD2 master's students, featuring a dual-app architecture:
1.  **Document Viewer** (`/markdown-preview`) - A markdown viewer for BMAD methodology documentation.
2.  **Shell Main App** (`/`) - A minimal starter application to be replaced by student projects.

The template provides a production-ready foundation with TypeScript, Tailwind CSS, a TDD framework, and the Turbopack bundler pre-configured. It emphasizes security, mandatory TDD (80% coverage), and a Replit-style UI for the Document Viewer. The project uses the Next.js App Router, preferring Server Components.

## User Preferences

-   **Preferred communication style**: Simple, everyday language.

## System Architecture

The project utilizes Next.js 16.x with Turbopack (App Router), TypeScript 5.x (strict mode), and Tailwind CSS 3.4.x. It enforces a feature-based directory structure.

### UI/UX Decisions
-   The Document Viewer uses a Replit-style UI with light backgrounds and clean typography.
-   Students can style their main app independently.
-   A mobile-first approach is required for responsive design.
-   Shadcn UI component guidelines should be followed.

### Technical Implementations
-   **TDD is mandatory**: All code changes must begin with writing failing tests, followed by implementation, and then refactoring. 80% test coverage is required and enforced.
-   **Security**: All user input must be sanitized and validated using Zod for validation and `isomorphic-dompurify` for HTML sanitization.
-   **Next.js**: App Router is used, with a strong preference for Server Components over Client Components.
-   **React**: Emphasizes composition, state colocation, and strategic memoization. `function` declarations are preferred for components.
-   **Styling**: Exclusively uses Tailwind CSS utility classes.
-   **API Design**: Consistent HTTP methods, status codes, response formats, pagination, filtering, and sorting are required.
-   **Error Handling**: Route-level (`error.tsx`) and component-level (custom `ErrorBoundary` class components) error handling.
-   **Logging**: Uses a Winston-based logger (`/app/lib/logger.ts`) for structured logging, prohibiting `console.log`. Includes correlation IDs and rich metadata with appropriate log levels.
-   **Testing**: Jest and React Testing Library are used. Tests are organized mirroring the app structure, with separate unit and integration tests.
-   **Code Quality**: Adherence to ESLint/Prettier, TypeScript strict mode, path aliases, explicit type imports, and specific component structure order.
-   **Performance**: Utilizes lazy loading, streaming, and `next/image` for image optimization.
-   **Accessibility**: Focus on semantic HTML, ARIA attributes, focus management, and keyboard navigation.

### Feature Specifications
-   The Document Viewer (`/markdown-preview`) is for BMAD methodology documentation.
-   The Main App (`/`) is a placeholder for student projects.

### System Design Choices
-   Dual-app architecture to separate documentation from the main project.
-   Feature-based file organization within the `app/` directory.
-   Strict separation of concerns and clear guidelines for file placement (e.g., `app/api/`, `app/components/`, `types/`, `tests/`).
-   Secrets management via Replit Secrets, with `.env.example` for documentation and Zod validation at startup.

## External Dependencies

-   **Framework**: Next.js 16.x (App Router)
-   **Language**: TypeScript 5.x
-   **Styling**: Tailwind CSS 3.4.x with Typography plugin
-   **Bundler**: Turbopack
-   **Testing**: Jest, React Testing Library
-   **Markdown Processing**: `marked` (rendering), `isomorphic-dompurify` (sanitization)
-   **Syntax Highlighting**: `highlight.js`
-   **Diagrams**: Mermaid 10.x
-   **Schema Validation**: Zod
-   **Logging**: Winston
-   **Database**: Supabase (SDK, schema builder, RLS for access control)
-   **Pre-commit Hooks**: Husky (for secret scanning)