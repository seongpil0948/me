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
    color: {
      /* ... */
    },
    size: {
      /* ... */
    },
  },
});
```

**Font Configuration**: Multiple Korean/English fonts configured in `config/fonts.ts`:

- Default: `font-nanum-myeongjo` for titles (Korean traditional serif)
- Body fonts: `noto-sans-kr`, `noto-serif-kr`
- Apply via CSS variables in `layout.tsx`

### Data Management (Single Source of Truth)

**Centralized Data Constants**: All portfolio data is extracted into TypeScript constants for consistency and reusability:

- **`data/portfolio.ts`**: Skills, certifications, experiences, portfolioLinks arrays
- **`data/personal.ts`**: Personal info (name, contact, education) and summary statistics
- **Benefits**: Single source of truth, eliminates duplication between main page and resume, type-safe data

**Data Flow Pattern**:

```tsx
// Pattern: Import from data/ → Page uses constants → Pass to components
import {
  skills,
  certifications,
  experiences,
  portfolioLinks,
} from "@/data/portfolio";
import { personalInfo, summaryStats } from "@/data/personal";

<PortfolioSection
  skills={skills}
  certifications={certifications}
  experiences={experiences}
  portfolioLinks={portfolioLinks}
  dict={dict}
  description={dict.hero.description}
/>;
```

**Never hardcode portfolio data directly in components**. Always import from `data/*` constants.

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

## Code Organization & Utilities

**Centralized Utilities**: Reusable functions are organized in `/lib` directory:

- **`lib/i18n/locale-utils.ts`**: Locale extraction, cookie management, path building
- **`lib/error-handler.ts`**: Custom error classes and error handling utilities

**Custom Hooks**: Reusable React hooks in `/hooks` directory:

- **`hooks/use-locale.ts`**: Extract current locale from URL pathname
- **`hooks/use-hero-animation.ts`**: Hero canvas animation logic with scroll-based frame updates

**Constants**: Application-wide constants in `/constants` directory:

- **`constants/languages.ts`**: Supported languages configuration (ko/en/zh)
- **`constants/images.ts`**: Image URLs and optimization defaults

**Configuration**: Centralized configuration in `/config` directory:

- **`config/env.ts`**: Type-safe environment variables and validation
- **`config/fonts.ts`**: Font family configurations
- **`config/site.ts`**: Site metadata and navigation

**Type Definitions**: Comprehensive TypeScript types in `/types` directory:

- **`types/i18n.ts`**: i18n-related types (LocaleParams, PageProps, LayoutProps)
- **`types/portfolio.ts`**: Portfolio data structures and dictionary types

**Usage Examples**:

```tsx
// Using locale utilities
import { useLocale } from "@/hooks/use-locale";
import { setLocaleCookie, buildLocalePath } from "@/lib/i18n/locale-utils";

const locale = useLocale();
setLocaleCookie("en");
const newPath = buildLocalePath(pathname, "en", locales);

// Using constants
import { LANGUAGES } from "@/constants/languages";
import { HERO_IMAGE_URLS } from "@/constants/images";

// Using error handling
import { AppError, logError, handleError } from "@/lib/error-handler";

throw new AppError("Something went wrong", "CUSTOM_ERROR", 400);
```

## Key Files Reference

- `i18nConfig.ts` - Locale configuration (ko/en/zh)
- `app/[locale]/layout.tsx` - Root layout with font loading and metadata
- `app/[locale]/page.tsx` - Main portfolio page with data definitions
- `components/primitives.ts` - Tailwind variant utilities
- `config/site.ts` - Site metadata (name, description, links)
- `config/env.ts` - Environment configuration
- `types/portfolio.ts` - TypeScript interfaces for data structures
- `types/i18n.ts` - i18n type definitions
- `lib/i18n/locale-utils.ts` - Locale management utilities
- `lib/error-handler.ts` - Error handling utilities
- `hooks/use-locale.ts` - Locale hook
- `hooks/use-hero-animation.ts` - Hero animation hook
- `constants/languages.ts` - Language configurations
- `constants/images.ts` - Image constants

## Common Pitfalls

1. **Middleware Migration**: i18n routing logic lives in `proxy.ts` (not `middleware.ts`). Uses `@formatjs/intl-localematcher` and `negotiator` for locale detection
2. **Server Components**: Dictionary functions use `"server-only"` directive
3. **Async Params**: Next.js 16 requires `await params` in layouts/pages
4. **HeroUI Imports**: Always use scoped package imports (`@heroui/button` not `@heroui/react`)

## Resume PDF Generation

**Print-Optimized Resume Route**: Language-specific resume pages at `/[locale]/resume` for PDF export:

- **Route**: `app/[locale]/resume/page.tsx` - Server component with A4-optimized layout
- **Styling**: `styles/print.css` with `@media print` rules for PDF output
- **Access**: `<ResumePrintButton>` on main page navigates to resume route
- **Print Method**: Browser's native print dialog (Cmd/Ctrl+P) → "Save as PDF"

**A4 Layout Features**:

- Multi-page detailed format (210mm × 297mm)
- White background, black text (print-optimized)
- Professional typography with proper page breaks
- All sections: header, summary stats, skills, experience, certifications, education, portfolio links

**User Workflow**:

1. Click "이력서 PDF 다운로드" button on main page
2. Navigate to `/ko/resume` (or `/en/resume`, `/zh/resume`)
3. Use browser's print function (Cmd/Ctrl+P)
4. Select "Save as PDF" as destination
5. Download generated PDF resume

## Content Synchronization (Critical)

**The centralized data constants in `data/` MUST always match the markdown documentation in `./docs/`:**

- `data/portfolio.ts` + `data/personal.ts` ↔ `docs/경력기술서.md` & `docs/이력서.md`
- When updating portfolio data, update BOTH sources simultaneously
- Korean documentation files are the source of truth for career details
- Files in `./docs/`: `경력기술서.md` (career details), `이력서.md` (resume), `면접-질의응답.md` (interview Q&A)

**Workflow for portfolio updates**:

1. Edit markdown files in `./docs/` first (Korean source of truth)
2. Update `data/portfolio.ts` and `data/personal.ts` to match
3. Update all three language dictionaries (`ko.json`, `en.json`, `zh.json`) for any new text
4. Verify consistency between markdown docs, data constants, and live web app content
5. Test PDF generation on `/[locale]/resume` route
