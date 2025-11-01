# GitHub Copilot Instructions

## Project Overview

Personal portfolio website built with Next.js 16 (App Router), React 19, HeroUI v2 component library, and Tailwind CSS v4. Features multilingual support (Korean/English/Chinese) and a dark theme-focused design showcasing professional experience and certifications.

## Critical Development Workflow

```bash
# Always run after changes to verify quality
pnpm format     # Format with Prettier
pnpm lint       # ESLint with auto-fix
pnpm build      # TypeScript compilation check
pnpm tsc --noEmit  # Type checking without emit

# Development
pnpm dev        # Start with Turbopack
```

**Package Manager**: This project exclusively uses `pnpm`. Never suggest `npm` or `yarn`.

## Architecture Patterns

### Routing & Internationalization

- **App Router**: All routes in `app/[locale]/` directory (NOT Pages Router)
- **i18n Structure**: URL pattern is `/[locale]/...` where locale is `ko` (default), `en`, or `zh`
- **Configuration**: See `i18nConfig.ts` for locale settings with cookie persistence
- **Dictionary Pattern**: Server-only dictionaries loaded via `getDictionary(locale)` function
  - Import: `import "server-only"` at top of `dictionaries.ts`
  - Files: `app/[locale]/dictionaries/{ko,en,zh}.json`
  - Usage: Pass `dict` prop through component tree from page level

### Component Architecture

**UI Library**: HeroUI v2 components are the standard. Always prefer HeroUI over custom implementations:
```tsx
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
```

**Styling Pattern**: Use Tailwind Variants (tv) for component variants:
```tsx
// See components/primitives.ts for examples
import { tv } from "tailwind-variants";

export const title = tv({
  base: "tracking-tight inline font-semibold",
  variants: {
    color: { /* ... */ },
    size: { /* ... */ }
  }
});
```

**Font Configuration**: Multiple Korean/English fonts configured in `config/fonts.ts`:
- Default: `font-nanum-myeongjo` for titles (Korean traditional serif)
- Body fonts: `noto-sans-kr`, `noto-serif-kr`
- Apply via CSS variables in `layout.tsx`

### Data Flow Pattern

Portfolio data (skills, certifications, experiences) is defined directly in `app/[locale]/page.tsx` and passed as props to `<PortfolioSection>`. This component orchestrates tab-based content display:

```tsx
// Pattern: Page defines data → PortfolioSection → PortfolioTabs → Individual content components
<PortfolioSection
  skills={skills}
  certifications={certifications}
  experiences={experiences}
  portfolioLinks={portfolioLinks}
  dict={dict}
  description={dict.hero.description}
/>
```

### Type Definitions

TypeScript types for portfolio data structures are in `types/portfolio.ts`. Dictionary type is comprehensive with nested structure for all i18n keys.

## ESLint Rules (Enforced)

**Import Ordering**: Groups enforced with blank lines between:
1. Type imports
2. Built-in modules
3. External packages
4. Internal modules
5. Relative imports

**Component Rules**:
- Props must be alphabetically sorted
- Self-closing tags required when no children
- Blank line required before `return` statements
- Blank line between variable declarations and other code

**Code Quality**:
- `console` statements trigger warnings (not errors)
- Unused imports automatically removed
- React imports not required (React 19 JSX transform)

## Theme & Styling

**Theme System**: 
- Default theme: `dark` (set in `providers.tsx`)
- Theme switching: `next-themes` with `<ThemeSwitch>` component
- CSS variables: `--color-primary`, `--color-text-primary`, `--color-background`

**Tailwind Configuration**: Tailwind v4 with HeroUI theme integration. Component classes use `@apply` minimally; prefer utility classes.

## Path Resolution

Import alias `@/*` maps to project root:
```tsx
import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/navbar";
```

## Key Files Reference

- `i18nConfig.ts` - Locale configuration (ko/en/zh)
- `app/[locale]/layout.tsx` - Root layout with font loading and metadata
- `app/[locale]/page.tsx` - Main portfolio page with data definitions
- `components/primitives.ts` - Tailwind variant utilities
- `config/site.ts` - Site metadata (name, description, links)
- `types/portfolio.ts` - TypeScript interfaces for data structures

## Common Pitfalls

1. **Middleware Migration**: i18n routing logic lives in `proxy.ts` (not `middleware.ts`). Uses `@formatjs/intl-localematcher` and `negotiator` for locale detection
2. **Server Components**: Dictionary functions use `"server-only"` directive
3. **Async Params**: Next.js 16 requires `await params` in layouts/pages
4. **HeroUI Imports**: Always use scoped package imports (`@heroui/button` not `@heroui/react`)

## Content Synchronization (Critical)

**The web app content (`app/[locale]/page.tsx` and translation files) MUST always match the markdown documentation in `./docs/`:**

- `app/[locale]/page.tsx` experiences/certifications → `docs/경력기술서.md` & `docs/이력서.md`
- When updating portfolio data, update BOTH sources simultaneously
- Korean documentation files are the source of truth for career details
- Files in `./docs/`: `경력기술서.md` (career details), `이력서.md` (resume), `면접-질의응답.md` (interview Q&A)

**Workflow for portfolio updates**:
1. Edit markdown files in `./docs/` first (Korean source of truth)
2. Update `app/[locale]/page.tsx` data arrays to match
3. Update all three language dictionaries (`ko.json`, `en.json`, `zh.json`) for any new text
4. Verify consistency between markdown docs and live web app content
