---
name: modify-portfolio-entry
description: 'Edit existing project or work experience entries in the portfolio website. Use when: updating project descriptions, fixing typos in any language, replacing or removing project images, changing achievement bullets, updating dates/period, editing technologies list, reordering entries, or removing a project/experience. Triggers: "update project", "edit experience", "프로젝트 수정", "경력 수정", "내용 변경", "이미지 교체", "순서 변경", "삭제".'
argument-hint: 'Target entry to modify (e.g. "Observability Platform description" or "Current job dates")'
---

# Modify Portfolio Entry

## When to Use

- Editing text (title, subtitle, or content bullets) for **existing** projects
- Replacing or removing project screenshot images
- Updating achievements, technologies, or dates in an existing experience
- Reordering projects or experience entries
- Removing a project card or experience entry entirely

> For **adding new** entries use the `add-portfolio-entry` skill instead.

## Key Files

| Purpose                 | File                                                   |
| ----------------------- | ------------------------------------------------------ |
| Skill & experience data | `data/portfolio.ts`                                    |
| Project image paths     | `data/portfolio.ts` → `projectImages` object           |
| Project text (KO)       | `app/[locale]/dictionaries/ko.json` → `projects.<key>` |
| Project text (EN)       | `app/[locale]/dictionaries/en.json` → `projects.<key>` |
| Project text (ZH)       | `app/[locale]/dictionaries/zh.json` → `projects.<key>` |
| Projects list component | `components/portfolio/projects-content.tsx`            |
| Image assets            | `public/projects/<project-key>/`                       |

---

## Procedure A — Edit Project Text

Targets: title, subtitle, or `content` bullet points.

### 1. Identify the project key

Open `data/portfolio.ts` and locate the key in `projectImages` (e.g., `observabilityPlatform`).  
The same key is used in all three locale JSON files.

### 2. Edit the Korean dictionary (`ko.json`)

Open `app/[locale]/dictionaries/ko.json` and find `"projects"."<key>"`.  
Edit `title`, `subtitle`, or `content` array items as needed.

### 3. Mirror the change in `en.json` and `zh.json`

Open each file and make the equivalent update for the same key.  
All three locales **must remain structurally identical** (same number of `content` items).

### 4. Verify

```bash
pnpm typecheck   # catch any key drift
pnpm build
```

---

## Procedure B — Replace or Remove Project Images

### Replace images

1. Copy new files into `public/projects/<project-key>/` (overwrite or use new filenames).
2. If filenames changed, update the path array in `data/portfolio.ts` → `projectImages.<key>`:
   ```ts
   myProject: [
     "/projects/my-project/new-1.png",
     "/projects/my-project/new-2.webp",
   ],
   ```
3. Delete old image files from `public/projects/<project-key>/` if no longer needed.

### Remove all images from a project

Set the array to empty in `projectImages`:

```ts
myProject: [],
```

The `ProjectImageSwiper` component handles empty arrays gracefully (hides the swiper).

### Remove a single image

Delete the path string from the array; delete the physical file from `public/`.

### Verify

```bash
pnpm typecheck   # readonly array types validated
pnpm build
```

---

## Procedure C — Edit Work Experience Entry

### Update achievements, description, or technologies

Open `data/portfolio.ts`, find the target object in the `experiences` array (ordered newest-first).

- `description`: Multilingual object `{ ko, en, zh }` — update all three.
- `achievements`: Multilingual `{ ko: string[], en: string[], zh: string[] }` — keep arrays equal length across locales.
- `technologies`: Plain `string[]` — technology names are not localised.

### Update period / dates

Locate the `period` field and update all three locales:

```ts
period: {
  ko: "2024년 3월 – 현재 (1년 1개월)",
  en: "Mar 2024 – Present (1 year 1 month)",
  zh: "2024年3月 – 至今 (1年1个月)",
},
```

### Verify

```bash
pnpm typecheck
pnpm lint
pnpm build
```

---

## Procedure D — Reorder Entries

### Reorder projects

`components/portfolio/projects-content.tsx` contains a `useMemo` array.  
Cut and paste the target object to the desired position. Display order matches array order.

### Reorder experiences

`data/portfolio.ts` → `experiences` array. **Newest entry must stay first** — this is a convention enforced visually.

### Verify

```bash
pnpm build
```

---

## Procedure E — Remove an Entry

### Remove a project

1. Delete the object from the `useMemo` array in `components/portfolio/projects-content.tsx`.
2. Delete the `projectImages.<key>` entry from `data/portfolio.ts`.
3. Delete the `"<key>"` block from **all three** locale JSON files (`ko.json`, `en.json`, `zh.json`).
4. Optionally delete image files from `public/projects/<key>/`.

### Remove a work experience

1. Delete the object from the `experiences` array in `data/portfolio.ts`.

### Verify

```bash
pnpm typecheck   # confirms no dangling references
pnpm build
```

---

## Checklist

- [ ] Target entry located by key before any edits
- [ ] Text changed in **all three** locale files (ko / en / zh) with equal structure
- [ ] Image paths in `data/portfolio.ts` match actual files in `public/`
- [ ] `pnpm typecheck` passes
- [ ] `pnpm build` passes

## Common Pitfalls

- **Locale asymmetry**: Editing `ko.json` without updating `en.json` / `zh.json` causes a TypeScript error in `getDictionary` (structural type mismatch).
- **Dangling image paths**: Updating `projectImages` but leaving old files (or vice versa) — harmless at runtime but creates dead assets.
- **`as const` removal**: Removing `as const` from `projectImages` breaks `readonly string[]` types consumed by `ProjectImageSwiper`.
- **Experience order**: Swapping experiences so an older role is first breaks the visual newest-first convention shown in the UI.
- **Markdown/data drift**: Updating `data/portfolio.ts` without syncing `docs/` leaves the two sources out of sync — future reads of the docs give stale information.
