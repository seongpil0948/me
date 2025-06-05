# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
pnpm dev        # Start development server with Turbopack
pnpm build      # Build for production
pnpm start      # Start production server
pnpm lint       # Run ESLint with auto-fix
```

### Package Management
- This project uses **pnpm** as the package manager
- Install dependencies: `pnpm install`
- Add new dependencies: `pnpm add <package>`

## Architecture

This is a **Next.js 15** application using:
- **App Router** (not Pages Router) - all routes are in the `app/` directory
- **HeroUI v2** component library - comprehensive UI components pre-installed
- **TypeScript** with strict mode enabled
- **Tailwind CSS v4** with HeroUI theme integration
- **React 19** with modern features

### Key Directories
- `app/` - Next.js App Router pages and layouts
- `components/` - Reusable React components
- `config/` - Configuration files (fonts, site metadata)
- `styles/globals.css` - Global styles with Tailwind directives

### Important Patterns
- Theme switching is implemented via `next-themes` and `ThemeSwitch` component
- UI components should use HeroUI components when possible
- Component styling uses Tailwind Variants (see `components/primitives.ts`)
- Path alias `@/*` is configured for imports from root

### Linting Rules
The project enforces:
- Import sorting and grouping
- Props alphabetical ordering
- Padding lines between statements
- No unused imports
- Warning on console statements