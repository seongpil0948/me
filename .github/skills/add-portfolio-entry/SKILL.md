---
name: add-portfolio-entry
description: 'Add new project experience or work experience with images to the portfolio website. Use when: adding a project to the Projects tab, adding a new job/company to the Experience tab, updating achievements for an existing role, or adding project screenshots/images. Triggers: "add project", "add experience", "새 프로젝트 추가", "경력 추가", "포트폴리오 업데이트".'
argument-hint: 'Project name or company name to add (e.g. "Observability Platform" or "New Company")'
---

# Add Portfolio Entry

## When to Use

- Adding a new project card to the **Projects** tab
- Adding a new company/role to the **Experience** tab  
- Adding or replacing project screenshot images
- Updating achievements or technologies for an existing experience

## Key Files

| Purpose | File |
|---------|------|
| Skill & experience data | `data/portfolio.ts` |
| Project image paths | `data/portfolio.ts` → `projectImages` object |
| Project text (KO) | `app/[locale]/dictionaries/ko.json` → `projects.<key>` |
| Project text (EN) | `app/[locale]/dictionaries/en.json` → `projects.<key>` |
| Project text (ZH) | `app/[locale]/dictionaries/zh.json` → `projects.<key>` |
| Projects list component | `components/portfolio/projects-content.tsx` |
| Image assets | `public/projects/<project-key>/` |

---

## Procedure A — Add a New Project

### 1. Place image files
Copy screenshots to `public/projects/<project-key>/` (e.g., `public/projects/my-project/1.png`).  
Use lowercase-kebab-case for the folder name. Supported formats: `.png`, `.jpg`, `.jpeg`, `.webp`.

### 2. Register image paths in `data/portfolio.ts`
Add an entry to the `projectImages` object (keep `as const`):
```ts
projectImages = {
  // existing entries …
  myProject: [
    "/projects/my-project/1.png",
    "/projects/my-project/2.png",
  ],
} as const;
```

### 3. Add Korean text to `app/[locale]/dictionaries/ko.json`
Insert under the `"projects"` object. `content` is a string array — each item renders as one bullet point:
```json
"myProject": {
  "title": "프로젝트 제목",
  "subtitle": "한 줄 설명",
  "content": [
    "주요 성과 1",
    "주요 성과 2"
  ]
}
```

### 4. Add English text to `en.json` and Chinese to `zh.json`
Same structure. Keep the same key as step 3 (`myProject`).

### 5. Register project in `components/portfolio/projects-content.tsx`
Add an entry to the `projects` array inside `useMemo`:
```tsx
{
  title: dict.projects.myProject.title,
  subtitle: dict.projects.myProject.subtitle,
  content: dict.projects.myProject.content,
  images: projectImages.myProject,
},
```
Insert at the desired display position (top = first, newer projects first).

### 6. Verify TypeScript & lint
Run in order:
```bash
pnpm typecheck   # catch missing dict keys or projectImages keys
pnpm lint        # ESLint auto-fix
pnpm build       # full Next.js build check
```

---

## Procedure B — Add a New Work Experience

### 1. Add entry to `experiences` in `data/portfolio.ts`
The `Experience` interface requires `company`, `position`, `period`, `description`, `achievements`, and `technologies`. All text fields must have `ko`, `en`, `zh` locales:
```ts
{
  company: "회사명 (Company Name)",
  position: { ko: "직책", en: "Job Title", zh: "职位" },
  period: {
    ko: "YYYY년 MM월 – YYYY년 MM월 (N년 N개월)",
    en: "Mon YYYY – Mon YYYY (N years N months)",
    zh: "YYYY年M月 – YYYY年M月 (N年N个月)",
  },
  description: {
    ko: "한국어 회사/역할 설명 (2-3 문장)",
    en: "English company/role description (2-3 sentences)",
    zh: "中文公司/职位描述 (2-3句)",
  },
  achievements: {
    ko: ["성과 1", "성과 2"],
    en: ["Achievement 1", "Achievement 2"],
    zh: ["成就 1", "成就 2"],
  },
  technologies: ["Tech1", "Tech2", "Tech3"],
},
```
Insert at the **top** of the `experiences` array (most recent first).

### 2. Sync with dictionaries

Update all three language dictionaries for the new experience entry.

### 3. Verify
```bash
pnpm typecheck
pnpm lint
pnpm build
```

---

## Checklist

- [ ] Images placed under `public/projects/<key>/`
- [ ] `projectImages.<key>` added to `data/portfolio.ts`
- [ ] Dictionary entry added to all three locale JSON files (ko / en / zh)
- [ ] Project registered in `projects-content.tsx` `useMemo` array  
- [ ] (Experience only) `experiences` array updated in `data/portfolio.ts`
- [ ] `pnpm typecheck` passes
- [ ] `pnpm build` passes

## Common Pitfalls

- **Missing locale key**: Adding to `ko.json` but forgetting `en.json` or `zh.json` causes a TypeScript error in `getDictionary`.
- **Image path typo**: Paths are case-sensitive on Linux deployments. Match `public/` folder name exactly.
- **`as const` removal**: Removing `as const` from `projectImages` breaks `readonly string[]` types in `ProjectImageSwiper`.
- **Wrong array position**: Experience entries are displayed in declaration order; newest role should be first.
- **`onPress` vs `onClick`**: Any new HeroUI buttons in related components must use `onPress`, not `onClick`.
