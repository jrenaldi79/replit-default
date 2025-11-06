# Overview

This project is a **Next.js 15** application with **TypeScript** and **Tailwind CSS**, using the **App Router** architecture and running on port 5000. It includes:

1. **Home Page** - Welcome page with navigation using Tailwind CSS styling
2. **Markdown Preview** - Interactive markdown file viewer with live rendering and XSS protection

The project follows:
- **Test-Driven Development (TDD)** methodology with Jest and React Testing Library
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Next.js 15 App Router** for modern React Server Components architecture

The project also contains the **BMad Method framework** in the `web-bundles` directory, which is an AI-driven agile development methodology system with specialized agent personas for different development roles.

# User Preferences

Preferred communication style: Simple, everyday language.

# Project Structure

```
├── app/                   # Next.js 15 App Router directory
│   ├── layout.tsx        # Root layout with Tailwind CSS
│   ├── page.tsx          # Home page component
│   ├── globals.css       # Global Tailwind CSS imports
│   ├── markdown-preview/ # Markdown preview route
│   │   └── page.tsx      # Markdown viewer component (client-side)
│   └── api/              # API Route Handlers
│       ├── files/        
│       │   └── route.ts  # GET endpoint for listing markdown files
│       └── markdown/
│           └── route.ts  # GET endpoint for rendering markdown
│
├── tests/                # Test files (TDD approach)
│   ├── unit/            # Unit tests
│   └── integration/     # Integration tests
│
├── types/               # Shared TypeScript type definitions
│
├── web-bundles/         # BMad Method Framework
│   └── ...              # AI-driven development methodology
│
├── jest.config.js       # Jest testing configuration
├── jest.setup.js        # Jest setup with Testing Library
├── tsconfig.json        # TypeScript configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration for Tailwind
├── next.config.js       # Next.js configuration
├── package.json         # Project dependencies and scripts
└── README.md            # Project overview
```

# System Architecture


**Architecture Pattern**: Next.js 15 with App Router (React Server Components)

**Technology Stack**:
- **Framework**: Next.js 15 with React 19 and App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS v3.4.x with PostCSS
- **Testing**: Jest with React Testing Library (TDD approach)
- **Markdown Parsing**: `marked` library with DOMPurify sanitization
- **Server**: Node.js with Route Handlers

## Pages

**Home Page (`app/page.tsx`)**:
- Server Component with Tailwind CSS gradient background
- Navigation links to main app and markdown preview
- Responsive design using Tailwind utility classes

**Markdown Preview (`app/markdown-preview/page.tsx`)**:
- Client Component ('use client') for interactivity
- Interactive sidebar showing all markdown files in project
- Click-to-preview functionality with state management
- Sanitized markdown rendering with DOMPurify
- Responsive layout using Tailwind CSS

## API Route Handlers

**`/app/api/files/route.ts` (GET)**:
- TypeScript Route Handler using Next.js 15 conventions
- Recursively scans project for markdown files
- Excludes directories: `node_modules`, `.git`, `.cache`, `.config`, `.npm`, `.next`
- Returns relative paths instead of absolute paths for security

**`/app/api/markdown/route.ts` (GET)**:
- TypeScript Route Handler with NextRequest/NextResponse
- Query parameter: `file` (relative path to markdown file)
- Server-side sanitization with DOMPurify
- Security validation to prevent directory traversal
- Returns JSON with `content`, sanitized `html`, and `file` properties

## Security Features

**File Access Control**:
- Path validation prevents directory traversal attacks
- Only markdown files within project root are accessible
- Relative path checking to prevent escape attempts

**API Security**:
- Method validation (only GET allowed)
- Query parameter validation
- Error messages don't leak filesystem information

## Design Decisions

**Framework & Architecture**:
- **Next.js 15 App Router**: Modern React Server Components for better performance
- **TypeScript**: Type safety and better developer experience
- **Tailwind CSS v3.4**: Utility-first CSS for rapid UI development
- **Test-Driven Development**: Jest and React Testing Library for quality assurance

**Port Configuration**:
- **Port 5000**: Required for Replit webview integration
- **Host**: 0.0.0.0 to allow external access

**Security Decisions**:
- **Server-side HTML sanitization**: DOMPurify prevents XSS attacks
- **Relative path returns**: API doesn't expose filesystem structure
- **Path validation**: Prevents directory traversal attacks

# External Dependencies

## NPM Packages

### Core Framework
- **next** (v15.x) - React framework with App Router and Server Components
- **react** (v19.2.0) - UI library
- **react-dom** (v19.2.0) - React DOM renderer
- **typescript** (v5.x) - TypeScript language support

### Styling
- **tailwindcss** (v3.4.x) - Utility-first CSS framework
- **autoprefixer** - PostCSS plugin for vendor prefixes
- **postcss** - CSS transformations

### Testing (TDD)
- **jest** - JavaScript testing framework
- **@testing-library/react** - React component testing utilities
- **@testing-library/jest-dom** - Jest DOM matchers
- **@testing-library/user-event** - User interaction simulation
- **jest-environment-jsdom** - DOM environment for Jest

### Security & Utilities
- **marked** (v16.4.1) - Markdown parsing library
- **isomorphic-dompurify** - XSS sanitization for HTML content

### Type Definitions
- **@types/node** - Node.js type definitions
- **@types/react** - React type definitions
- **@types/react-dom** - React DOM type definitions
- **@types/jest** - Jest type definitions

## Runtime Environment

- **Node.js** - JavaScript runtime
- **Replit Platform** - Configured for Next.js deployment on port 5000

## Workflows

One Replit workflow configured:

**nextjs-app**: 
- Command: `npm run dev`
- Port: 5000
- Output: webview (default preview)
- Starts Next.js development server with hot reload

# Development Notes

## Accessing the Application

**Main App**: 
- Automatically visible in Replit webview
- Navigate between pages using the links on the home page
- All pages use React Server Components by default (except client components marked with 'use client')

## Adding Features (Following TDD)

**Test-First Development**:
1. Write tests in `tests/` directory BEFORE implementation
2. Run `npm test` to see tests fail (RED phase)
3. Implement feature to make tests pass (GREEN phase)
4. Refactor code while keeping tests passing

**New Pages**:
- Create TypeScript files in `app/` directory
- File-based routing: `app/about/page.tsx` → `/about`
- Use Server Components by default, add 'use client' only when needed

**New API Route Handlers**:
- Create TypeScript files in `app/api/` directory
- Example: `app/api/users/route.ts` → `/api/users`
- Use NextRequest and NextResponse for type safety

**Styling with Tailwind CSS**:
- Use Tailwind utility classes directly in components
- Customize in `tailwind.config.js` for project-specific needs
- Global styles in `app/globals.css`

## Testing Commands

- `npm test` - Run all tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report (target: >90%)

## Recent Changes (November 6, 2025)

**Full Architecture Migration**:
- Migrated from JavaScript/Next.js 16 Pages Router to TypeScript/Next.js 15 App Router
- Implemented Tailwind CSS v3.4 replacing CSS Modules
- Set up comprehensive testing infrastructure with Jest and React Testing Library
- Added security enhancements (DOMPurify, relative paths)
- Aligned entire project with Project Rules for TDD, TypeScript, and modern React patterns


# Project Rules

#You are an expert in TypeScript, Node.js, React, Next.js, and Tailwind. We are using the **Next.js 15** stack, with a focus on the **App Router** and **Turbopack** for development and production builds. Use Node.js for backend logic within Next.js Route Handlers. If needed, Supabase is our preferred database provider.

## 🚨 MANDATORY: Test-Driven Development (TDD) First

**EVERY feature request MUST start with writing tests before any implementation.**

When receiving ANY feature request, your FIRST response should be:
1. "Let me start by writing the tests that define what success looks like for this feature"
2. Write comprehensive failing tests using the Red-Green-Refactor cycle
3. Only then proceed with implementation to make tests pass

**TDD Process - ALWAYS FOLLOW:**

1. **Red Phase** (REQUIRED FIRST STEP):
   - Write failing tests for the functionality you want to implement
   - Run tests to confirm they fail (shows "red" in test runner)
   - This validates that your test actually tests something

2. **Green Phase**:
   - Implement the simplest code that makes the test pass
   - Focus on making it work, not making it optimal
   - Run tests to confirm they now pass (shows "green")

3. **Refactor Phase**:
   - Clean up and optimize your implementation without changing behavior
   - Run tests after each refactor to ensure nothing is broken
   - Improve both implementation code AND test code

4. **Finalization Phase**:
   - Run full test suite: `npm run test`
   - Validate test coverage >90%: `npm run test:coverage`

**⚠️ If you start implementing before writing tests, STOP and write tests first.**

## 🚨 TDD Enforcement Checklist

**Before writing ANY implementation code, Claude MUST:**

1. ✅ **Explicitly state**: "Following TDD - writing tests first"
2. ✅ **Create test file** in appropriate `tests/` directory
3. ✅ **Write failing tests** that define expected behavior
4. ✅ **Run tests and show RED output** proving tests fail
5. ✅ **Only then write implementation**
6. ✅ **Run tests again and show GREEN output** proving tests pass

**Red Flags - STOP immediately if:**
- ❌ Creating files in `src/` before creating tests
- ❌ Using `Write` tool for implementation before tests exist
- ❌ Planning describes implementation details before test strategy
- ❌ User asks for feature and you immediately start coding

**Correct TDD Pattern:**
```
User: "Add streaming tracing support"
Assistant: "Following TDD - I'll write tests first to define what success looks like"
Assistant: *Creates tests/unit/test_streaming_tracing.test.ts*
Assistant: *Runs tests - shows RED (failing)*
Assistant: *Now creates src/utils/streaming-tracer.ts*
Assistant: *Runs tests - shows GREEN (passing)*
```

**Incorrect Pattern (DO NOT DO THIS):**
```
User: "Add streaming tracing support"
Assistant: *Immediately creates src/utils/streaming-tracer.ts*
Assistant: *Then writes tests afterward*
```

## TDD Self-Check Questions

Before writing implementation, ask yourself:
1. Have I written tests that will fail without this code?
2. Have I run those tests and confirmed they're RED?
3. Can I describe what "passing" looks like in concrete test assertions?

If the answer to ANY of these is "no", STOP and write tests first.

## When TDD Can Be Skipped

TDD may be relaxed ONLY for:
- Documentation-only changes (*.md files)
- Configuration files (package.json, tsconfig.json)
- Simple refactoring with existing test coverage
- Emergency hotfixes (with tests added immediately after)

**All other code changes require tests first.**


## Workflow
- **FIRST PRIORITY**: Follow the mandatory TDD process above - always write tests before implementation.
- **TDD Verification**: Before using Write/Edit tools on src/, verify tests exist and are RED
- **Test File Naming**: Match implementation files: `src/utils/foo.ts` → `tests/unit/test_foo.test.ts`
- Always use appropriate linting to check for errors in code formatting and syntax (Next.js has this built-in).
- **Development Server Validation**: After starting any development server, ALWAYS check the server output for warnings, errors, or compilation issues. Use BashOutput tool to monitor server logs and address any issues before proceeding with development.
- Test authentication and external API connections with simple scripts before building features.
- When encountering styling issues, check CSS framework version compatibility first.

## Maintenance Guidelines

Update this file when:

- [ ] Adding new major dependencies
- [ ] Changing architectural patterns
- [ ] Modifying directory structure
- [ ] Adding new environment variables
- [ ] Changing API response formats
- [ ] Implementing new testing patterns
- [ ] Discovering performance bottlenecks
- [ ] Making security changes

## Error Handling & Resilience
- Implement comprehensive error handling patterns at all levels (API, component, utility functions).
- Use Next.js App Router's `error.js` files for component-level error catching and React Error Boundaries for more granular control.
- Create standardized error response formats for APIs with consistent status codes and messages.
- Implement retry logic for network requests and external API calls.
- Handle loading states (`loading.js`), error states (`error.js`), and empty states in UI components.
- Use proper error logging with contextual information for debugging.
- Implement graceful degradation for non-critical features.
- Validate and sanitize all inputs at API boundaries.

## Security Best Practices
- Implement proper authentication and authorization patterns with Supabase.
- Use Row Level Security (RLS) policies in Supabase for data access control.
- Sanitize all user inputs to prevent XSS and injection attacks.
- Configure CORS policies appropriately for API Route Handlers.
- Implement rate limiting on API endpoints to prevent abuse.
- Store sensitive configuration in environment variables, never in code.
- Use HTTPS for all production communications.
- Validate JWT tokens and handle token expiration gracefully.
- Follow the principle of least privilege for database access and API permissions.

## Unit Testing Focus
- Prefer running single tests, and not the whole test suite, for performance.
- Run unit tests after completing medium-sized tasks so we find bugs while we build.
- Create unit tests that focus on critical functionality (business logic, utility functions).
- Mock dependencies (API calls, external modules) until they are built; once they are built, then swap to use the real API calls or modules.
- Test various data scenarios (valid inputs, invalid inputs, edge cases).
- Write maintainable tests with descriptive names grouped in describe blocks.
- Unit tests should be easily runnable via the configured test runner (e.g., Jest, Vitest).
- Unit tests should be placed in their own directory.

## Integration & Component Testing
- Create integration tests for API endpoints that test the full request/response cycle.
- Use React Testing Library for component testing, focusing on user interactions.
- Test component behavior with different props and state combinations.
- Mock external dependencies (APIs, third-party libraries) in component tests.
- Test error states and loading states in components.
- Use test data factories for consistent test data generation.
- Test API contract compliance between frontend and backend.

## Code Quality Tools
- Use ESLint and Prettier for consistent code formatting - let tooling suggest appropriate configurations. Next.js has built-in support.
- Implement pre-commit hooks to run linting and basic tests.
- Use TypeScript in strict mode for maximum type safety.
- Set up automated quality checks in the development workflow.
- Use consistent import ordering and structure.

## Best Practices
- Follow RESTful API design principles and best practices for Route Handlers.
- Implement input validation for API endpoints.
- Implement global logging of functions so we can set various debug levels in an environment variable and not have to go back and add logging manually to code blocks in order to debug. Every function should have appropriate logging to help with our unit tests. Logs should be available to the backend so you can access them via terminal. Avoid console logs where possible.
- Apply best practices for logging, project structure, and environment variable usage.

## API Design Details
- Use consistent HTTP methods in Route Handlers: GET for retrieval, POST for creation, PUT/PATCH for updates, DELETE for removal.
- Implement standardized pagination using limit/offset or cursor-based patterns.
- Provide filtering and sorting capabilities with query parameters.
- Use consistent response formats with data, metadata, and error information.
- Implement proper status codes (200, 201, 400, 401, 403, 404, 422, 500).
- Use middleware for request/response validation.
- Design APIs to be idempotent where appropriate.
- Use nested routes for related data (e.g., `/api/users/[id]/posts`).

## Monitoring & Observability (Must-Haves)
- Implement structured logging with consistent log levels (error, warn, info, debug).
- Log all API requests and responses with timing information.
- Set up error tracking to capture and alert on application errors.
- Monitor critical application metrics (response times, error rates).
- Use correlation IDs to track requests across services.
- Implement health check endpoints for services.

## Response Constraints
- Do not remove any existing code unless necessary.
- Do not remove my comments or commented-out code unless necessary.
- Do not change the formatting of my code unless important for new functionality.

## Code Style and Structure
- Write concise, technical code with accurate examples.
- Use functional and declarative programming patterns; avoid classes.
- Prefer iteration and modularization over code duplication.
- Co-locate backend (Route Handlers) and frontend (pages, components) logic within the Next.js `app` directory structure.
- Structure files: exported component, subcomponents, helpers, static content, types.
- Place shared types in a `types` directory.
- Co-locate component props with their components.
- Write clear and concise comments, focusing on why rather than what.
- Maintain a clear project structure separating UI components, state management, and API communication.

## TypeScript Import/Export Best Practices
- Use path aliases (`@/components/...`) for clean, maintainable imports.
- Use explicit `type` imports for TypeScript types: `import type { MyType } from '@/types/index'`.
- Use explicit file paths for type imports: `../types/index` instead of `../types`.
- When encountering module resolution errors, check import syntax, file extensions, and `tsconfig.json` paths.
- Prefer explicit imports over barrel exports in complex projects to improve tree-shaking.

## Naming Conventions
- Use meaningful and descriptive names for variables, functions, and components.
- Use PascalCase for type names and interfaces.
- Use camelCase for variables and functions.
- Use UPPER_CASE for constants.
- Use lowercase with dashes for directories (e.g., `components/auth-wizard`).
- Use descriptive names with auxiliary verbs (e.g., `isLoading`, `hasError`).

## Front End Guidance
- **Favor React Server Components (RSC)**. Minimize the use of `'use client'`, `useEffect`, and `useState`.
- Use functional components and TypeScript interfaces.
- Use curly braces for all conditionals. Favor simplicity over cleverness.
- Avoid enums; use maps instead.
- Use `function`, not `const`, for components.
- Use a mobile-first approach for responsive design.
- Place static content and interfaces at the end of the file.
- Use content variables for static content outside render functions.
- Use Zod for form validation.
- Use `next/dynamic` for dynamic loading of non-critical components.
- Optimize images using `next/image`: WebP format, size data, lazy loading.
- Prefer async/await over Promises.

## React Component Development Best Practices
- **Variable Declaration Order**: Always declare all variables and computed values BEFORE `useEffect` hooks and other React hooks.
- **Hook Dependencies**: Ensure all variables used in `useEffect` are declared before the `useEffect` call.
- **Avoid TDZ Errors**: Be mindful of the Temporal Dead Zone - variables must be declared before use in any scope.
- **Component Structure Order**:
  1. `useState` declarations
  2. Computed values (`const isRunning = status === 'RUNNING'`)
  3. Function definitions
  4. `useEffect` hooks
  5. JSX return
- **Testing**: Always test component rendering after major refactors to catch declaration order issues early.

## UI and Styling
- Utilize Tailwind CSS utility classes for styling components.
- Follow Shadcn UI component guidelines and best practices.
- Ensure the UI is responsive and accessible.

## Tailwind CSS Guidelines
- ALWAYS use Tailwind CSS v3.4.x for stability: `npm install -D tailwindcss@^3.4.0`.
- Avoid Tailwind v4+ beta/alpha versions in production projects.
- Use traditional PostCSS configuration for compatibility:
  ```js
  // postcss.config.js
  export default {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  }
  ```
- Use traditional Tailwind directives in your global CSS file:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```
- When Tailwind styles aren't loading, restart the dev server completely.

## Performance Optimization
- Look for ways to make things faster:
  - Leverage Next.js caching strategies (Data Cache, Full Route Cache, Request Memoization).
  - Use immutable data structures.
  - Optimize data fetching by co-locating fetches with components in RSCs.
  - Use efficient algorithms and data structures.
  - Use efficient rendering strategies (RSCs, Streaming).
  - Use efficient state management.

## Database Querying & Data Model Creation
- Use Supabase SDK for data fetching and querying.
- For data model creation, use Supabase's schema builder.
- Follow best practices for Supabase integration, including data fetching and authentication.
- Use TypeScript for type safety when interacting with Supabase.