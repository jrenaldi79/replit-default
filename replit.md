# Northwestern MPD2 Starter Template - Project Rules & Guidelines

## Overview
This project is a Next.js 16 starter template for Northwestern MPD2 master's students, designed with a dual-app architecture. It includes a Document Viewer (`/markdown-preview`) for BMAD methodology documentation and a Shell Main App (`/`) as a placeholder for student projects. The template provides a production-ready foundation with TypeScript, Tailwind CSS, a TDD framework, and the Turbopack bundler. Key aspects include a focus on security, mandatory TDD (80% coverage), a Replit-style UI for the Document Viewer, and leveraging the Next.js App Router with a preference for Server Components. The overall ambition is to provide a robust, scalable, and maintainable foundation for student applications.

## User Preferences
- Preferred communication style: Simple, everyday language.

## System Architecture
The project is built with Next.js 16.x (App Router with Turbopack), TypeScript 5.x (strict mode), and Tailwind CSS 3.4.x. It enforces a feature-based directory structure.

### UI/UX Decisions
The Document Viewer features a Replit-style UI with light backgrounds and clean typography. Student applications can be styled independently. A mobile-first approach is required for responsive design, and Shadcn UI component guidelines should be followed.

### Technical Implementations
-   **TDD**: Mandatory for all code changes (tests first, 80% coverage).
-   **Security**: Zod for input validation, `isomorphic-dompurify` for HTML sanitization.
-   **Next.js**: App Router with strong preference for Server Components.
-   **React**: Emphasizes composition, state colocation, strategic memoization, and `function` declarations for components.
-   **Styling**: Exclusively Tailwind CSS utility classes.
-   **API Design**: Consistent HTTP methods, status codes, and response formats; pagination, filtering, and sorting support.
-   **Error Handling**: Route-level (`error.tsx`) and component-level (custom `ErrorBoundary`) handling.
-   **Logging**: Winston-based logger (`/app/lib/logger.ts`) for structured logging with correlation IDs; `console.log` is prohibited.
-   **Testing**: Jest and React Testing Library; tests mirror the app structure, separated into unit and integration.
-   **Code Quality**: ESLint/Prettier, TypeScript strict mode, path aliases, explicit type imports, and a specific React component structure order.
-   **Performance**: Lazy loading, streaming, and `next/image` optimization.
-   **Accessibility**: Semantic HTML, ARIA attributes, focus management, and keyboard navigation.

### Feature Specifications
-   **Document Viewer (`/markdown-preview`)**: Dedicated to BMAD methodology documentation.
-   **Main App (`/`)**: Placeholder for student projects.

### System Design Choices
A dual-app architecture separates documentation from the main project. File organization is feature-based within the `app/` directory, with strict separation of concerns (e.g., `app/api/`, `app/components/`, `types/`, `tests/`). Secrets are managed via Replit Secrets, with `.env.example` for documentation and Zod validation at startup.

## External Dependencies
-   **Framework**: Next.js 16.x (App Router)
-   **Language**: TypeScript 5.x
-   **Styling**: Tailwind CSS 3.4.x with Typography plugin
-   **Bundler**: Turbopack
-   **Testing**: Jest, React Testing Library
-   **Markdown Processing**: `marked`, `isomorphic-dompurify`
-   **Syntax Highlighting**: `highlight.js`
-   **Diagrams**: Mermaid 10.x
-   **Schema Validation**: Zod
-   **Logging**: Winston
-   **Database**: Supabase (SDK, schema builder, RLS)
-   **Pre-commit Hooks**: Husky