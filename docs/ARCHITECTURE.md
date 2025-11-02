# Project Architecture Overview

## 📊 Directory Structure

```
me/
│
├── 📱 app/                          # Next.js App Router
│   ├── [locale]/                   # i18n routes (ko/en/zh)
│   │   ├── dictionaries/           # Translation JSON files
│   │   ├── dictionaries.ts         # Dictionary loader
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Main portfolio page
│   │   ├── providers.tsx           # Theme & UI providers
│   │   └── resume/                 # PDF resume page
│   ├── global-error.tsx            # Global error boundary
│   └── manifest.ts                 # PWA manifest
│
├── 🎨 components/                   # React Components
│   ├── portfolio/                  # Portfolio-specific
│   │   ├── hero-section.tsx
│   │   ├── hero-canvas.tsx        ← Uses useHeroAnimation
│   │   ├── about-content.tsx
│   │   ├── skills-content.tsx
│   │   ├── experience-content.tsx
│   │   ├── projects-content.tsx
│   │   └── certifications-content.tsx
│   ├── language-switcher.tsx      ← Uses useLocale, locale-utils
│   ├── theme-switch.tsx
│   ├── navbar.tsx
│   └── primitives.ts               # Tailwind variants
│
├── 🔧 lib/                          # Utility Functions (NEW)
│   ├── i18n/
│   │   └── locale-utils.ts        # Locale management utilities
│   └── error-handler.ts            # Error classes & handlers
│
├── 🪝 hooks/                        # Custom React Hooks (NEW)
│   ├── use-locale.ts               # Extract locale from URL
│   └── use-hero-animation.ts       # Hero animation logic
│
├── 📦 constants/                    # App Constants (NEW)
│   ├── languages.ts                # LANGUAGES array
│   └── images.ts                   # HERO_IMAGE_URLS
│
├── ⚙️ config/                       # Configuration
│   ├── env.ts                      # Environment variables (NEW)
│   ├── fonts.ts                    # Font configurations
│   └── site.ts                     # Site metadata
│
├── 📝 types/                        # TypeScript Types
│   ├── i18n.ts                     # i18n types (NEW)
│   ├── portfolio.ts                # Portfolio data types
│   └── index.ts                    # Type exports
│
├── 💾 data/                         # Portfolio Data
│   ├── personal.ts                 # Personal information
│   └── portfolio.ts                # Professional data
│
├── 📚 docs/                         # Documentation
│   ├── 경력기술서.md               # Career details (Korean)
│   ├── 이력서.md                   # Resume (Korean)
│   ├── 면접-질의응답.md            # Interview Q&A (Korean)
│   ├── REFACTORING.md              # Refactoring guide (NEW)
│   └── REFACTORING_SUMMARY.md      # Summary (NEW)
│
└── 🎨 styles/                       # Global Styles
    ├── globals.css
    └── print.css
```

## 🔄 Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Browser Request                          │
│                     (e.g., /ko, /en, /zh)                      │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      proxy.ts (Middleware)                      │
│  • Detects locale from URL/Cookie                               │
│  • Redirects if needed                                          │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                   app/[locale]/layout.tsx                       │
│  • Validates locale                                             │
│  • Loads fonts                                                  │
│  • Sets up providers (Theme, HeroUI)                            │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    app/[locale]/page.tsx                        │
│  • Loads dictionary: getDictionary(locale)                      │
│  • Imports data: portfolio.ts, personal.ts                      │
│  • Renders: <PortfolioSection />                                │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│               components/portfolio/*.tsx                         │
│  • Receives dict & data as props                                │
│  • Uses hooks: useLocale(), useHeroAnimation()                  │
│  • Uses utilities: locale-utils.ts                              │
└─────────────────────────────────────────────────────────────────┘
```

## 🧩 Component Dependencies

```
language-switcher.tsx
    │
    ├─→ hooks/use-locale.ts
    │       └─→ lib/i18n/locale-utils.ts → getLocaleFromPathname()
    │
    ├─→ lib/i18n/locale-utils.ts
    │       ├─→ setLocaleCookie()
    │       └─→ buildLocalePath()
    │
    └─→ constants/languages.ts → LANGUAGES

hero-canvas.tsx
    │
    ├─→ hooks/use-hero-animation.ts
    │       ├─→ Framer Motion hooks
    │       └─→ Image preloading logic
    │
    ├─→ constants/images.ts → HERO_IMAGE_URLS
    │
    └─→ hooks/use-hero-animation.ts → drawImageOnCanvas()
```

## 🎯 Utility Functions Map

```
lib/i18n/locale-utils.ts
    ├─→ getLocaleFromPathname()     [Extract locale from URL]
    ├─→ setLocaleCookie()            [Persist locale preference]
    ├─→ buildLocalePath()            [Build new URL with locale]
    └─→ removeLocaleFromPathname()   [Strip locale from URL]

lib/error-handler.ts
    ├─→ AppError                     [Base error class]
    ├─→ ValidationError              [Validation errors]
    ├─→ NotFoundError                [404 errors]
    ├─→ logError()                   [Log with context]
    ├─→ handleError()                [Safe error handling]
    └─→ withErrorHandling()          [Async wrapper]
```

## 🪝 Custom Hooks Map

```
hooks/use-locale.ts
    Purpose: Extract current locale from URL pathname
    Dependencies: next/navigation, i18nConfig, locale-utils
    Returns: string (locale code)

hooks/use-hero-animation.ts
    Purpose: Manage hero canvas animation
    Dependencies: framer-motion, react
    Returns: {
        images: HTMLImageElement[]
        currentFrame: number
        rotate: MotionValue
        isLoading: boolean
    }
```

## 📦 Constants Map

```
constants/languages.ts
    LANGUAGES = [
        { value: "ko", label: "한국어", nativeName: "Korean", flag: "🇰🇷" },
        { value: "en", label: "English", nativeName: "English", flag: "🇺🇸" },
        { value: "zh", label: "中文", nativeName: "Chinese", flag: "🇨🇳" }
    ]

    Types:
        - LanguageCode: "ko" | "en" | "zh"
        - Language: typeof LANGUAGES[number]

constants/images.ts
    HERO_FRAME_COUNT = 15
    HERO_IMAGE_URLS = ["/me/moong-me/1.png", ..., "/me/moong-me/15.png"]
    IMAGE_QUALITY = { HIGH: 90, MEDIUM: 75, LOW: 60 }
    IMAGE_SIZES = { THUMBNAIL: 150, SMALL: 300, ... }
```

## 🎨 Styling Architecture

```
Tailwind CSS v4
    │
    ├─→ @tailwind base, components, utilities
    │
    ├─→ tailwind-variants (tv)
    │       └─→ components/primitives.ts
    │
    ├─→ HeroUI Theme
    │       └─→ Dark mode default
    │
    └─→ Custom CSS Variables
            ├─→ --color-*
            ├─→ --font-*
            └─→ --font-size-*
```

## 🔐 Type Safety Flow

```
types/i18n.ts
    ├─→ LocaleParams          { locale: Locale }
    ├─→ PageProps<T>          Page component props
    └─→ LayoutProps<T>        Layout component props

types/portfolio.ts
    ├─→ Skill                 Skill data structure
    ├─→ Certification         Certification data
    ├─→ Experience            Work experience
    ├─→ PortfolioLink         External links
    └─→ Dictionary            Translation type (200+ keys)
```

## 📊 Build Process

```
Source Code
    │
    ├─→ TypeScript Compilation
    │       └─→ Type checking (tsc --noEmit)
    │
    ├─→ ESLint
    │       └─→ Code quality & import ordering
    │
    ├─→ Prettier
    │       └─→ Code formatting
    │
    ├─→ Next.js Build
    │       ├─→ Static page generation (9 pages)
    │       ├─→ Turbopack compilation
    │       └─→ Output: .next/
    │
    └─→ Production Ready
            ├─→ /ko, /en, /zh
            └─→ /ko/resume, /en/resume, /zh/resume
```

## 🚀 Performance Optimizations

```
Image Loading
    └─→ Promise.all() for parallel loading
    └─→ Proper error handling
    └─→ Loading states

Animation
    └─→ useSpring() for smooth transitions
    └─→ useMemo() for expensive calculations
    └─→ Scroll velocity optimization

Locale Management
    └─→ Cookie persistence
    └─→ Memoized locale extraction
    └─→ Single source of truth

Code Organization
    └─→ Tree-shaking friendly exports
    └─→ Minimal re-renders
    └─→ Optimized bundle size
```

## 🔗 Integration Points

```
External Services
    ├─→ GitHub (links)
    ├─→ Discord (links)
    └─→ Browser APIs
            ├─→ Navigator (locale detection)
            ├─→ Document (cookie management)
            └─→ Canvas (hero animation)

Third-party Libraries
    ├─→ HeroUI (UI components)
    ├─→ Framer Motion (animations)
    ├─→ next-themes (theme management)
    ├─→ Swiper (image carousel)
    └─→ React To Print (PDF generation)
```

This architecture provides:
✅ Clear separation of concerns
✅ High reusability
✅ Type safety throughout
✅ Easy maintenance and testing
✅ Scalable structure for future features
