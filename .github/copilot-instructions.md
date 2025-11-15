# GitHub Copilot Instructions

## Project Overview

Personal portfolio website built with Next.js 16 (App Router), React 19, HeroUI v2 component library, and Tailwind CSS v4. Features multilingual support (Korean/English/Chinese) and a dark theme-focused design showcasing professional experience and certifications.

- 질의응답, QA 작성 가이드라인 문서: docs/company/common/QA작성가이드.md

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

**Interview Data**: Category-based interview Q&A system in `/data/interview` directory:

- **`data/interview/general.ts`**: 20 general interview questions (behavioral, career)
- **`data/interview/infrastructure.ts`**: 11 infrastructure/DevOps questions
- **`data/interview/backend.ts`**: 6 backend development questions
- **`data/interview/frontend.ts`**: 5 frontend development questions
- **`data/interview/toss-tech.ts`**: 13 Toss-specific technical questions (Korean, Istio/mTLS)
- **`data/interview/toss-company.ts`**: 5 Toss company/culture questions (Korean)
- **`data/interview/index.ts`**: Aggregator exporting `interviewQuestions` and `tossInterviewQuestions`

**Type Definitions**: Comprehensive TypeScript types in `/types` directory:

- **`types/i18n.ts`**: i18n-related types (LocaleParams, PageProps, LayoutProps)
- **`types/portfolio.ts`**: Portfolio data structures, dictionary types, and InterviewQuestion interface

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

### Core Configuration

- `i18nConfig.ts` - Locale configuration (ko/en/zh)
- `config/site.ts` - Site metadata (name, description, links)
- `config/env.ts` - Environment configuration
- `config/fonts.ts` - Font family configurations

### Routes & Pages

- `app/[locale]/layout.tsx` - Root layout with font loading and metadata
- `app/[locale]/page.tsx` - Main portfolio page with data definitions
- `app/[locale]/resume/page.tsx` - PDF-optimized resume page
- `app/[locale]/interview/page.tsx` - Main interview Q&A page
- `app/[locale]/interview/toss/page.tsx` - Toss-specific interview preparation page (Korean)

### Data Layer

- `data/portfolio.ts` - Professional data (skills, certifications, experiences)
- `data/personal.ts` - Personal information and summary statistics
- `data/interview/` - Interview questions organized by category:
  - `general.ts`, `backend.ts`, `frontend.ts`, `defensive-tactics.ts`
  - `infra/` - Infrastructure questions split into 6 category files (23 questions)
  - `toss/` - Toss-specific questions split into 9 category files (23 questions)

### Components

- `components/primitives.ts` - Tailwind variant utilities
- `components/interview/qa-table.tsx` - Interview Q&A table with filters and favorites
- `components/portfolio/*.tsx` - Portfolio-specific components

### Utilities & Hooks

- `lib/i18n/locale-utils.ts` - Locale management utilities
- `lib/error-handler.ts` - Error handling utilities
- `hooks/use-locale.ts` - Locale extraction hook
- `hooks/use-hero-animation.ts` - Hero animation hook

### Type Definitions

- `types/portfolio.ts` - Portfolio data structures and InterviewQuestion interface
- `types/i18n.ts` - i18n type definitions

### Constants

- `constants/languages.ts` - Language configurations
- `constants/images.ts` - Image constants
- `constants/styles.ts` - Inline style constants

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

## Interview Q&A System

**Category-Based Structure**: Interview questions are split into maintainable category files for better organization:

### General Questions (20 questions)

- `data/interview/general.ts` - Behavioral, career change, problem-solving

### Infrastructure Questions (23 questions) - Organized by subdirectory

**Location**: `data/interview/infra/`

- **Core** (`core.ts`): Kubernetes, AWS, IaC (3 questions)
- **Observability** (`observability.ts`): Monitoring, Distributed Tracing, Time-Series DB, SRE (7 questions)
- **Data & Messaging** (`data.ts`): Data Pipeline, Messaging, Stream Processing (5 questions)
- **Operations** (`operations.ts`): Redis, Cost Optimization, Security, Disaster Recovery (5 questions)
- **Networking** (`networking.ts`): Network Architecture, CI/CD (2 questions)
- **Soft Skills** (`soft-skills.ts`): Philosophy, Leadership (1 question)
- **Index** (`index.ts`): Aggregates all infra questions into `infraQuestions` export

### Backend Questions (6 questions)

- `data/interview/backend.ts` - Go, Python, Spring Boot, Django, databases

### Frontend Questions (5 questions)

- `data/interview/frontend.ts` - React, Next.js, Vue.js, Flutter

### Toss-Specific Questions (23 questions) - Organized by subdirectory

**Location**: `data/interview/toss/`

- **Istio** (`istio.ts`): Service Mesh, mTLS, Ambient Mode (6 questions)
- **Gateway** (`gateway.ts`): APISIX, API Gateway patterns (3 questions)
- **Migration** (`migration.ts`): Legacy system modernization (1 question)
- **Observability** (`observability.ts`): OpenTelemetry, monitoring (3 questions)
- **Open Source** (`opensource.ts`): Contribution experience (2 questions)
- **Automation** (`automation.ts`): CI/CD, GitOps (2 questions)
- **Multi-Cluster** (`multi-cluster.ts`): Multi-cluster management (2 questions)
- **Compliance** (`compliance.ts`): Security compliance (2 questions)
- **Company** (`company.ts`): Company culture, strengths, gaps (5 questions)
- **Index** (`index.ts`): Aggregates toss questions into `tossInterviewQuestions` export

### Defensive Tactics Questions

- `data/interview/defensive-tactics.ts` - Reverse questions for interviewers

**ID Ranges**:

- General questions: 1-100
- Infrastructure technical: 9-76 (organized in infra/ subdirectory)
- Toss technical: 101-200 (organized in toss/ subdirectory)
- Toss company: 201-300 (organized in toss/ subdirectory)
- Future companies: 301+ (reserved)

**Component Usage**:

```tsx
import { interviewQuestions, tossInterviewQuestions } from "@/data/interview";
import { QATable } from "@/components/interview/qa-table";

// General questions (includes general + infrastructure + backend + frontend)
<QATable questions={interviewQuestions} />

// Company-specific with filter
<QATable questions={tossInterviewQuestions} companyFilter="toss" title="토스 면접" />

// Individual category imports (if needed)
import { infraCoreQuestions, infraObservabilityQuestions } from "@/data/interview/infra";
import { tossIstioQuestions, tossGatewayQuestions } from "@/data/interview/toss";
```

**Company-Specific Pages**:

- `/ko/interview/toss` - Toss DevOps Engineer interview prep (Korean only)
- Features: Self-intro, strengths mapping, gap analysis, 23 Q&A (technical + company)
- Future: `/ko/interview/kakaobank`, `/ko/interview/naver`, etc.

**File Organization Benefits**:

- **Maintainability**: Large files (4500+ lines) split into focused category files (50-300 lines each)
- **Natural Format**: All answers follow QA writing guidelines (natural Korean, no code blocks/headers)
- **Type Safety**: All questions use `InterviewQuestion` interface with proper ID ranges
- **Aggregation**: Index files combine categories while preserving individual imports

## User Background & Key Experiences

**Professional Context**: Portfolio owner is Platform Lead Engineer with 3+ years experience operating ₩500B e-commerce platform processing 20-50M daily Kafka messages.

**Legacy System Modernization Experience**:

- **System**: 10+ year old production system with Tomcat, Spring, React, Vue.js, Kafka
- **Challenges**: Zero monitoring/observability → 18-hour manual log investigation during incidents
- **Service Discovery**: Implemented Netflix Eureka for service discovery, Spring Cloud for service mesh patterns
- **Traffic Management & Security**: Built centralized traffic management with authentication/authorization policies
  - Gateway-level security controls for microservices
  - Policy-driven access control and rate limiting
  - Service-to-service authentication mechanisms

**SRE & Observability Platform**:

- **Full-Stack Distributed Tracing**: Single Trace ID tracking across entire service mesh
  - End-to-end flow: Client → Nginx/Gateway → Frontend → Backend → Batch → Kafka → Backend2
  - Unified observability across FE/BE/Infrastructure boundaries
  - OpenTelemetry auto-instrumentation (Java, JavaScript, Go) + custom Span design
  - Trace ID propagation via HTTP headers (W3C Trace Context) and Kafka message headers
  - Log-trace correlation: Automatic trace_id injection into logs via Logrus → OTEL bridge

- **Custom Infrastructure Metrics**: Built company-specific metrics infrastructure
  - Per-API request counts and latency distribution (P50/P90/P95/P99 percentiles)
  - Redis Cache Hit/Miss rates with custom Signal SDK (not just server-level, but per-API business metrics)
    - Backend API team requested silo/module-specific caching hit rates for performance optimization
    - Evaluated Redis Exporter, OTEL Redis Receiver, OTEL/JMX Java Agent (only provided compute metrics)
    - Built custom Signal SDK for FE/BE to measure per-route caching attempts, hits, and misses
    - Achieved granular metrics: Product List API 85%, Cart API 92%, Order Lookup API 78% hit rates
    - Combined with Prometheus exporter for real-time monitoring on 4 cluster nodes
  - Custom Span design integrating business + infrastructure context
  - HTTP instrumentation: Client duration, request/response sizes, error rates

- **Business Analytics Platform**: Self-service dashboards for non-technical stakeholders
  - **Planning team metrics**: MAU (Monthly Active Users), DAU (Daily Active Users), Retention (D+1/D+7/D+30 cohort analysis)
  - **Commerce team metrics**: CTR (Click-Through Rate), Conversion funnels (Session → View → Cart → Purchase), Cart source tracking
  - **E-commerce analytics**: Product rankings (top 100 by revenue), search effectiveness (200 top terms), category performance
  - Weekly/Monthly/Quarterly/Annual service performance reports
  - 15+ self-service Grafana dashboards with 5-minute auto-refresh

- **Data Pipeline Architecture**: AWS Step Functions orchestrating batch analytics
  - Processing 20-50M daily Kafka messages via Athena queries
  - Parquet-formatted OTEL logs in S3 (partitioned by year/month/day)
  - 7 user behavior query types + 8 commerce analytics query types
  - Lambda (Python 3.11, athena-query-builder) generating dynamic CTAS queries
  - Execution time: 12-18 minutes per service, 2-4 hour data latency

- **InfluxDB Time-Series Integration**: High-velocity metrics storage
  - Configuration: 1GB cache for hot data, query concurrency 1,024, 7-day retention
  - LZ4 compression achieving 10x reduction (10GB → 1GB)
  - Use cases: API performance metrics, Redis cache analytics, system monitoring
  - Query performance: 95% queries <1 second, handling 400 events/second peak load

- **S3 Throttling Solution**: Optimized parallel processing for large-scale data
  - Challenge: 4+ parallel Athena queries caused S3 429 throttling errors
  - Solution: Batch strategy with max 2 concurrent queries, 8 sequential batches
  - S3 path optimization: Separated output prefixes by query type
  - Monitoring: CloudWatch alarms, automatic retry with exponential backoff
  - Result: Zero throttling errors, consistent 12-18 minute execution times

- **Visualization & Monitoring**: Grafana dashboard design for real-time and historical analysis
  - OpenTelemetry Collector (v0.132.2): Multi-protocol ingestion (OTLP gRPC/HTTP, Loki, Prometheus)
  - Grafana Stack: Loki (8GB mem, log aggregation), Tempo (distributed tracing), Prometheus (v3.5.0, native histograms)
  - ClickHouse integration: Long-term storage with LZ4 compression, 7-day TTL, async inserts

- **Results**: Enterprise-grade observability platform
  - MTTI reduced from 18 hours → 10 minutes (99% improvement)
  - Engineering time saved: 2-3 days/week on manual reports → fully automated
  - Cost optimization: ~$40/month Athena + S3 vs $500/month real-time streaming alternative
  - Data volumes: 2-5TB monthly Athena scans, 100+ GB daily raw logs (10 GB after Parquet compression)

**Technical Expertise**:

- **Certifications**: CKA (Certified Kubernetes Administrator), AWS Advanced Networking Specialty, AWS DevOps Professional
- **Cloud & Infrastructure**: AWS EKS, Kubernetes, Istio evaluation (Ambient Mode), APISIX Gateway production experience
- **Observability**: OpenTelemetry contributor, Prometheus, Grafana, distributed tracing architecture
- **Service Mesh**: Evaluated Istio Ambient Mode for EKS migration, expertise in mTLS and zero-trust networking
- **DevOps**: CI/CD pipeline design, IaC (Terraform), GitOps workflows

**Interview Preparation Context**: These experiences form the foundation for interview answers, particularly for DevOps/Platform/SRE positions requiring:

- Legacy system modernization expertise
- Service mesh and microservices architecture knowledge
- Observability and root cause analysis capabilities
- Production-grade security and traffic management implementation

## Content Synchronization (Critical)

**The centralized data constants in `data/` MUST always match the markdown documentation in `./docs/`:**

- `data/portfolio.ts` + `data/personal.ts` ↔ `docs/경력기술서.md` & `docs/이력서.md`
- `data/interview/*.ts` ↔ `docs/면접-질의응답.md` (archived, TypeScript is now source of truth)
- When updating portfolio data, update BOTH sources simultaneously
- Korean documentation files are the reference for career details

**Workflow for portfolio updates**:

1. Edit markdown files in `./docs/` first (Korean source of truth)
2. Update `data/portfolio.ts` and `data/personal.ts` to match
3. Update all three language dictionaries (`ko.json`, `en.json`, `zh.json`) for any new text
4. Verify consistency between markdown docs, data constants, and live web app content
5. Test PDF generation on `/[locale]/resume` route

**Workflow for interview question updates**:

1. Edit appropriate category file in `data/interview/` (or subdirectory like `infra/` or `toss/`)
2. Use proper ID range (general: 1-100, infra: 9-76, toss: 101-300, future: 301+)
3. Maintain TypeScript type safety with `InterviewQuestion` interface
4. Follow QA writing guidelines: natural conversational Korean, no code blocks (```), no \*\* headers
5. Update index.ts if adding new category files
6. Test on `/[locale]/interview` or company-specific page
7. No markdown sync needed (TypeScript is source of truth)
