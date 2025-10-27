# Live Code Editor Application

## Overview

This is a web-based live code editor application inspired by CodePen, allowing users to write HTML, CSS, and JavaScript in separate panels with real-time preview capabilities. The application features a modern, responsive interface built with React and TypeScript, offering a distraction-free coding experience with instant visual feedback.

The editor provides a four-panel layout for editing HTML, CSS, and JavaScript with live preview, along with functionality to save, reset, and potentially share code snippets. The application emphasizes code visibility, real-time updates, and a clean developer-focused interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server, providing fast hot module replacement
- **Wouter** for lightweight client-side routing
- Component-based architecture with functional components and React hooks

**UI Component System**
- **Shadcn UI** (New York variant) with Radix UI primitives for accessible, customizable components
- **Tailwind CSS** for utility-first styling with custom design tokens
- Component library includes resizable panels, tabs, dialogs, toasts, and form elements
- CSS variables for theming with light/dark mode support

**State Management**
- **TanStack Query (React Query)** for server state management and API caching
- Local state with React hooks (useState, useEffect)
- LocalStorage for persisting code snippets across sessions
- Debounced state updates for preview rendering (500ms delay)

**Code Editor**
- **Monaco Editor** (via @monaco-editor/react) for syntax highlighting and editing
- Three separate editor instances for HTML, CSS, and JavaScript
- Editor configuration includes minimap disabled, auto-formatting, bracket colorization, and IntelliSense

**Layout System**
- Resizable panel groups for flexible workspace customization
- CSS Grid-based four-panel layout (HTML, CSS, JS, Preview)
- Responsive design with tab-based navigation on mobile devices
- Full viewport layout (100vh) with no main container scrolling

### Backend Architecture

**Server Framework**
- **Express.js** on Node.js for RESTful API endpoints
- TypeScript with ES modules for type safety
- Custom middleware for request logging and JSON body parsing

**API Design**
- RESTful endpoints for code snippet CRUD operations:
  - `GET /api/snippets` - List all snippets
  - `GET /api/snippets/:id` - Get specific snippet
  - `POST /api/snippets` - Create new snippet
  - `PUT /api/snippets/:id` - Update snippet
  - `DELETE /api/snippets/:id` - Delete snippet
- Zod schema validation for request/response data
- Error handling with appropriate HTTP status codes

**Development Server**
- Vite middleware integration for HMR in development
- Separate build process for production (client bundled with Vite, server with esbuild)
- Custom logging middleware tracking API response times and payloads

### Data Storage Solutions

**Current Implementation**
- **In-memory storage** (MemStorage class) for development/testing
- Map-based data structure for code snippets
- UUID generation for snippet IDs

**Database Configuration**
- **Drizzle ORM** configured for PostgreSQL integration
- Schema defined in `shared/schema.ts` for code snippets
- Migration support via drizzle-kit
- **Neon Database** serverless PostgreSQL driver available
- Database URL configuration via environment variables

**Data Schema**
The CodeSnippet type includes:
- `id`: Unique identifier (UUID)
- `html`: HTML code content
- `css`: CSS code content
- `javascript`: JavaScript code content
- `title`: Snippet title (default: "Untitled")
- `createdAt`: Timestamp
- `updatedAt`: Timestamp

### Authentication and Authorization

Currently not implemented. The application is designed for public use without user accounts or authentication mechanisms.

### Design System

**Typography**
- Code: JetBrains Mono, Fira Code, Monaco (monospace fonts via Google Fonts)
- UI Text: Inter, system-ui (sans-serif fonts via Google Fonts)
- Type scale ranges from 12px (helper text) to 18px (headers)

**Spacing System**
- Tailwind-based spacing primitives: 2, 3, 4, 6, 8 units
- Tight (2), standard (4), and generous (6-8) spacing patterns

**Color System**
- HSL-based color tokens with alpha channel support
- Semantic color naming (primary, secondary, destructive, muted, accent)
- Support for light and dark themes via CSS variables
- Custom border colors for different component states

**Component Specifications**
- Header: 56px height with flexible layout
- Editor panels: Flexible height with 200px minimum
- Panel headers: 40px height with uppercase labels
- Resizer handles: 1px width with 8px hover target
- Border radius: 9px (large), 6px (medium), 3px (small)

## External Dependencies

### Third-Party UI Libraries
- **@radix-ui/* components** - Accessible UI primitives for complex components (dialogs, dropdowns, tabs, etc.)
- **@monaco-editor/react** - VS Code's editor for web with syntax highlighting
- **shadcn/ui** - Pre-built components following Radix patterns
- **cmdk** - Command palette component
- **lucide-react** - Icon library
- **class-variance-authority** - Variant-based component styling
- **tailwind-merge & clsx** - CSS class utilities

### Database & ORM
- **Drizzle ORM** - Type-safe SQL query builder
- **drizzle-zod** - Zod schema integration
- **@neondatabase/serverless** - Serverless PostgreSQL driver
- **pg** - PostgreSQL client (via connect-pg-simple)

### Development Tools
- **Vite** - Build tool and dev server
- **TypeScript** - Type checking
- **PostCSS & Autoprefixer** - CSS processing
- **esbuild** - Production server bundling
- **@replit/vite-plugin-*** - Replit-specific development plugins

### Utility Libraries
- **date-fns** - Date manipulation
- **nanoid** - ID generation
- **react-hook-form & @hookform/resolvers** - Form state management
- **zod** - Runtime type validation
- **wouter** - Lightweight routing

### Preview Rendering
- **Sandboxed iframe** for code execution
- Isolated document construction with HTML, CSS, and JavaScript injection
- Try-catch error handling for JavaScript execution
- Error display in preview panel for debugging