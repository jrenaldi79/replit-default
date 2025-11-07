# Project Rules & Guidelines

## Overview

This project is a Next.js 16 application built for the Replit platform. It utilizes TypeScript, Tailwind CSS, the App Router architecture, and the Turbopack bundler. Its primary purpose is to provide a platform for a welcome page and an interactive markdown previewer with live rendering and XSS protection.

The project strictly adheres to a Test-Driven Development (TDD) methodology and incorporates the BMad Method framework for AI-driven agile development.

## User Preferences

- **Preferred communication style**: Simple, everyday language.

---

## 🚨 MANDATORY: Test-Driven Development (TDD) First

**EVERY feature request MUST start with writing tests before any implementation.**

When receiving ANY feature request, your FIRST response should be:
1. "Let me start by writing the tests that define what success looks like for this feature."
2. Write comprehensive failing tests using the Red-Green-Refactor cycle.
3. Only then proceed with implementation to make tests pass.

### TDD Process - ALWAYS FOLLOW:

1.  **Red Phase** (REQUIRED FIRST STEP):
    -   Write failing tests for the functionality you want to implement.
    -   Run tests to confirm they fail (shows "red" in test runner). This validates that your test actually tests something.

2.  **Green Phase**:
    -   Implement the simplest code that makes the test pass.
    -   Focus on making it work, not making it optimal.
    -   Run tests to confirm they now pass (shows "green").

3.  **Refactor Phase**:
    -   Clean up and optimize your implementation without changing behavior.
    -   Run tests after each refactor to ensure nothing is broken.
    -   Improve both implementation code AND test code.

4.  **Finalization Phase**:
    -   Run the full test suite: `npm run test`
    -   Validate test coverage >90%: `npm run test:coverage`

**⚠️ If you start implementing before writing tests, STOP and write tests first.**

### TDD Enforcement Checklist

**Before writing ANY implementation code, you MUST:**

1.  ✅ **Explicitly state**: "Following TDD - writing tests first."
2.  ✅ **Create a test file** in the appropriate `tests/` directory.
3.  ✅ **Write failing tests** that define expected behavior.
4.  ✅ **Run tests and show RED output** proving tests fail.
5.  ✅ **Only then write implementation code.**
6.  ✅ **Run tests again and show GREEN output** proving tests pass.

### When TDD Can Be Skipped

TDD may be relaxed ONLY for:
-   Documentation-only changes (`*.md` files)
-   Configuration files (`package.json`, `tsconfig.json`)
-   Simple refactoring with existing test coverage
-   Emergency hotfixes (with tests added immediately after)

**All other code changes require tests first.**

---

## System Architecture

The application is built on **Next.js 16** with the stable **Turbopack** bundler, leveraging the **App Router** for modern React Server Components. **TypeScript** ensures type safety, and **Tailwind CSS v3.4.x** is used for utility-first styling. **Jest** with **React Testing Library** facilitates our TDD approach. The server-side logic uses Node.js within Next.js Route Handlers.

-   **Port Configuration**: The application is configured to run on **Port 5000** for seamless Replit webview integration.

### UI/UX Decisions:
-   **Home Page**: A Server Component with a Tailwind CSS gradient background and responsive design, providing navigation links.
-   **Markdown Preview**: A Client Component featuring an interactive sidebar for markdown file selection and a sanitized markdown renderer.
-   **Responsive Design**: Achieved through Tailwind CSS utility classes.

### Technical Implementations:
-   **File System API**: A Route Handler (`/api/files`) recursively scans for markdown files, excluding sensitive directories, and returns relative paths.
-   **Markdown Rendering API**: A Route Handler (`/api/markdown`) fetches and renders markdown content, applying server-side sanitization and validating file paths to prevent directory traversal.

---

## External Dependencies

### NPM Packages:
-   **Core Framework**: `next` (v16.x), `react` (v19.2.0), `react-dom` (v19.2.0), `typescript` (v5.x)
-   **Styling**: `tailwindcss` (v3.4.x), `autoprefixer`, `postcss`
-   **Testing**: `jest`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `jest-environment-jsdom`
-   **Security & Utilities**: `marked` (v16.4.1), `isomorphic-dompurify`
-   **Type Definitions**: `@types/node`, `@types/react`, `@types/react-dom`, `@types/jest`

### Runtime Environment:
-   **Node.js**
-   **Replit Platform**

### Databases:
-   **Supabase**: Preferred database provider. Use the Supabase SDK for all data interactions.

---

## Workflow & Maintenance

-   **FIRST PRIORITY**: Follow the mandatory TDD process.
-   **Test File Naming**: Match implementation files: `src/utils/foo.ts` → `tests/unit/test_foo.test.ts`.
-   **Linting**: Always use appropriate linting to check for errors (Next.js has this built-in).
-   **Dev Server Validation**: After starting any development server, ALWAYS check the server output for warnings or errors and address them immediately.
-   **Maintenance**: Update this file when adding major dependencies, changing architecture, or modifying core patterns.

## Error Handling & Resilience
-   Implement comprehensive error handling at all levels (API, component, utility).
-   Use Next.js App Router's `error.js` and `loading.js` files.
-   Create standardized error response formats for APIs.
-   Implement retry logic for network requests.
-   Validate and sanitize all inputs at API boundaries.

## Security Best Practices
-   Implement proper authentication and authorization with Supabase.
-   Use Row Level Security (RLS) policies in Supabase for data access control.
-   Sanitize all user inputs to prevent XSS attacks (using `isomorphic-dompurify`).
-   Configure CORS policies appropriately for API Route Handlers.
-   Implement rate limiting on API endpoints.
-   Store sensitive configuration in environment variables.
-   Validate JWT tokens and handle expiration gracefully.

## Testing Guidelines
-   **Unit Tests**:
    -   Focus on critical functionality (business logic, utility functions).
    -   Mock dependencies (API calls, external modules) until they are built.
    -   Test various data scenarios (valid, invalid, edge cases).
    -   Place unit tests in their own directory.
-   **Integration & Component Tests**:
    -   Create integration tests for API endpoints (full request/response cycle).
    -   Use React Testing Library for component testing, focusing on user interactions.
    -   Test component behavior with different props, states, and error/loading states.

## Code Quality & Style
-   **Formatting**: Use ESLint and Prettier for consistent code formatting.
-   **Type Safety**: Use TypeScript in strict mode.
-   **Structure**:
    -   Write concise, technical code. Use functional and declarative patterns; avoid classes.
    -   Co-locate backend (Route Handlers) and frontend (pages, components) logic within the `app` directory.
    -   File Structure Order: exported component, subcomponents, helpers, static content, types.
    -   Place shared types in a `types` directory.
-   **Imports**:
    -   Use path aliases (`@/components/...`).
    -   Use explicit `type` imports: `import type { MyType } from '@/types/index'`.
-   **Naming Conventions**:
    -   `PascalCase` for types and components.
    -   `camelCase` for variables and functions.
    -   `UPPER_CASE` for constants.

## React & Frontend Development
-   **Favor React Server Components (RSC)**. Minimize the use of `'use client'`, `useEffect`, and `useState`.
-   Use `function`, not `const`, for components.
-   Use a mobile-first approach for responsive design.
-   Use Zod for form validation.
-   Optimize images using `next/image`.
-   **Component Structure Order**:
    1.  `useState` declarations
    2.  Computed values (`const isRunning = status === 'RUNNING'`)
    3.  Function definitions
    4.  `useEffect` hooks
    5.  JSX return

## UI and Styling (Tailwind CSS)
-   Utilize Tailwind CSS utility classes for all styling.
-   Follow Shadcn UI component guidelines and best practices.
-   **ALWAYS use Tailwind CSS v3.4.x**: `npm install -D tailwindcss@^3.4.0`.
-   Use traditional PostCSS configuration and `@tailwind` directives.
-   If styles aren't loading, restart the dev server completely.

## API Design & Monitoring
-   **API Design**:
    -   Use consistent HTTP methods in Route Handlers (GET, POST, PUT/PATCH, DELETE).
    -   Implement standardized pagination, filtering, and sorting.
    -   Use consistent response formats and proper status codes.
-   **Monitoring**:
    -   Implement structured logging with consistent levels (error, warn, info, debug).
    -   Log all API requests and responses with timing.
    -   Implement health check endpoints.

## Database (Supabase)
-   Use the Supabase SDK for all data fetching and querying.
-   Use Supabase's schema builder for data model creation.
-   Use TypeScript for type safety when interacting with Supabase.
-   Enforce data access control with Row Level Security (RLS).

## Response Constraints
-   Do not remove any existing code or comments unless necessary.
-   Do not change the formatting of existing code unless important for new functionality.