# Portfolio Website - Seongpil Choi

Personal portfolio website showcasing professional experience, skills, and certifications as a Platform Lead Engineer.

## 🚀 Technologies

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library**: [HeroUI v3](https://v3.heroui.com/react/llms.txt)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + [Tailwind Variants](https://tailwind-variants.org)
- **Language**: [TypeScript 5.9](https://www.typescriptlang.org/)
- **Theming**: [next-themes](https://github.com/pacocoursey/next-themes)
- **i18n**: Custom implementation with Next.js 16
- **Package Manager**: [pnpm](https://pnpm.io/)

## 📁 Project Structure

```
├── app/                      # Next.js App Router
│   ├── [locale]/            # Internationalized routes (ko/en/zh)
│   │   ├── dictionaries/    # Translation files
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Main portfolio page
│   │   └── resume/          # PDF-optimized resume page
│   └── global-error.tsx     # Global error boundary
├── components/              # React components
│   ├── portfolio/           # Portfolio-specific components
│   └── ui/                  # Reusable UI components
├── lib/                     # Utility functions
│   ├── i18n/               # i18n utilities
│   └── error-handler.ts    # Error handling
├── hooks/                   # Custom React hooks
│   ├── use-locale.ts       # Locale management
│   └── use-hero-animation.ts # Animation logic
├── constants/              # App-wide constants
│   ├── languages.ts        # Language configs
│   └── images.ts           # Image constants
├── config/                 # Configuration files
│   ├── env.ts             # Environment variables
│   ├── fonts.ts           # Font configurations
│   └── site.ts            # Site metadata
├── types/                  # TypeScript type definitions
│   ├── i18n.ts            # i18n types
│   └── portfolio.ts       # Portfolio data types
├── data/                   # Portfolio data
│   ├── personal.ts        # Personal information
│   ├── portfolio.ts       # Professional data
│   └── interview/         # Interview Q&A (category-based)
│       ├── index.ts       # Aggregator
│       ├── general.ts     # General questions (20)
│       ├── backend.ts     # Backend questions
│       ├── frontend.ts    # Frontend questions
│       ├── defensive-tactics.ts # Gap defense / company-specific
│       ├── wipro.ts       # Wipro executive interview set (501-530)
│       └── infra/         # Infrastructure by category (core/obs/data/...)
│           ├── core.ts
│           ├── observability.ts
│           ├── data.ts
│           ├── operations.ts
│           ├── networking.ts
│           └── soft-skills.ts
└── public/                 # Static assets
```

## 🛠️ Development

### Prerequisites

- Node.js 18+
- pnpm 8+

### Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Available Scripts

```bash
pnpm dev          # Start development server with Turbopack
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint with auto-fix
pnpm format       # Format code with Prettier
pnpm tsc --noEmit # TypeScript type checking
```

## 🌍 Internationalization

The project supports three languages:

- 🇰🇷 Korean (ko) - Default
- 🇺🇸 English (en)
- 🇨🇳 Chinese (zh)

**URL Structure**: `/[locale]/...` (e.g., `/ko`, `/en`, `/zh`)

**Routes**:

- `/[locale]` - Main portfolio page
- `/[locale]/resume` - PDF-optimized resume
- `/[locale]/interview` - General interview Q&A (60+ questions)
- `/[locale]/interview/wipro` - Wipro executive interview prep (Korean, 30 questions)

**How it works**:

- Locale detection via URL pathname
- Cookie persistence for user preference
- Server-only dictionary loading
- Type-safe translations
- Company-specific pages can be language-restricted

## 🏗️ Architecture Highlights

### Utility-First Approach

- **`lib/i18n/locale-utils.ts`**: Reusable i18n functions
- **`lib/error-handler.ts`**: Custom error classes
- **`hooks/use-locale.ts`**: Locale extraction hook
- **`hooks/use-hero-animation.ts`**: Animation logic hook

### Type Safety

- Comprehensive TypeScript types in `/types`
- Type-safe environment variables in `config/env.ts`
- Strict props validation

### Data Management

- Single source of truth in `/data`
- No hardcoded data in components
- Synchronized with documentation

### Code Quality

- ESLint with strict rules
- Prettier for consistent formatting
- Import ordering enforcement
- TypeScript strict mode

## 📄 Documentation

- **[Copilot Instructions](./.github/copilot-instructions.md)**: Development guidelines and architecture patterns
- **[Interview QA Rules](./.github/instructions/interview-qa.instructions.md)**: Interview answer writing rules (Korean)

## 🎨 Features

### Portfolio

- ✅ Responsive design (mobile/tablet/desktop)
- ✅ Dark theme by default
- ✅ Multilingual support (KO/EN/ZH)
- ✅ PDF resume generation
- ✅ Scroll-based animations
- ✅ Optimized performance
- ✅ SEO optimized

### Interview System

- ✅ Category-based Q&A (60+ questions)
- ✅ Company-specific preparation pages (Wipro)
- ✅ Interactive table with search & filters
- ✅ Favorites system (localStorage)
- ✅ Modal view for detailed answers
- ✅ STAR method examples
- ✅ Korean/English bilingual support

### Code Quality

- ✅ Type-safe throughout
- ✅ ESLint strict rules
- ✅ Prettier formatting
- ✅ Comprehensive test coverage

## 📦 Key Dependencies

| Package                        | Purpose              |
| ------------------------------ | -------------------- |
| `next`                         | React framework      |
| `@heroui/*`                    | UI component library |
| `framer-motion`                | Animation library    |
| `tailwindcss`                  | Utility-first CSS    |
| `next-themes`                  | Theme management     |
| `@formatjs/intl-localematcher` | Locale matching      |
| `swiper`                       | Image carousel       |

## 🚀 Deployment

Build the project for production:

```bash
pnpm build
pnpm start
```

The app is optimized for:

- Static site generation (SSG)
- Server-side rendering (SSR)
- Edge runtime compatibility

## 📝 License

Private portfolio project - All rights reserved

---

**Author**: Seongpil Choi  
**Contact**: [GitHub](https://github.com/seongpil0948)
