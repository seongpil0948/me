# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development

- 작업 후 pnpm format, pnpm lint, pnpm build 를 통해 문제 없음을 검증하도 록해줘

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

### Internationalization (i18n)

This project supports multiple languages using `next-i18n-router`:

- **Supported Languages**: Korean (ko), English (en), Chinese (zh)
- **Default Language**: Korean (ko)
- **Language Detection**: Automatic based on browser settings
- **Language Switching**: Available in navbar
- **URL Structure**: `/[locale]/...` (e.g., `/en`, `/zh`)

#### Key i18n Files

- `i18nConfig.ts` - i18n configuration
- `middleware.ts` - Language detection and routing
- `app/[locale]/dictionaries/` - Translation files
- `components/language-switcher.tsx` - Language switcher component

#### Adding New Translations

1. Update dictionary files in `app/[locale]/dictionaries/`
2. Add new keys to all language files (ko.json, en.json, zh.json)
3. Use translations in components via the `dict` prop

### Reference

- https://blog.cmiscm.com/?page_id=3023
-
