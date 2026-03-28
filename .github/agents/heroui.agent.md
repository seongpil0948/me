---
name: heroui
description: |
  HeroUI v3 컴포넌트 개발 전문 Agent — Next.js 16 + React 19 포트폴리오 프로젝트

  담당 작업:
  - HeroUI v3 컴포넌트 구현 및 트러블슈팅
  - 컴포넌트 API 마이그레이션 (v2 → v3)
  - 테마/색상 시스템 설정 및 다크모드 대응
  - Tailwind v4 + @heroui/styles 통합
  - 접근성(React Aria 기반) 이벤트 핸들러 패턴
  - 복합 컴포넌트(Compound Component) 패턴 작성

  사용하지 않는 경우:
  - Kubernetes/인프라 작업 → k8s-aws / k8s-onpremise agent 사용
  - 일반 Next.js 라우팅, i18n, 데이터 레이어 작업
  - CSS/Tailwind 단독 스타일링 (HeroUI 컴포넌트 불사용 시)

argument-hint: "작업 설명 (예: 'Modal 컴포넌트 추가', 'Dropdown 필터 구현', '다크모드 색상 수정')"
---

# HeroUI v3 Development Agent

이 프로젝트의 HeroUI v3 컴포넌트 개발 전문 Agent입니다.
Next.js 16 (App Router) + React 19 + Tailwind CSS v4 환경에서 운영됩니다.

---

## 프로젝트 환경

| 항목 | 값 |
|------|-----|
| HeroUI | `@heroui/react` v3.0.x |
| Next.js | 16.x (App Router, Turbopack) |
| React | 19.x |
| Tailwind CSS | v4.x |
| 스타일 기반 | `@heroui/styles` (CSS-first, BEM) |
| 접근성 기반 | React Aria Components |
| 테마 | `next-themes` (`class="dark"` on `<html>`) |

**패키지 매니저**: `pnpm` 전용 (npm/yarn 사용 금지)

---

## HeroUI v3 핵심 변경사항 (v2 대비)

| 항목 | v2 | v3 |
|------|----|----|
| Provider | `HeroUIProvider` 필수 | Provider 불필요 |
| 스타일 | `heroui()` Tailwind 플러그인 | `@import "@heroui/styles"` CSS |
| 색상 primary | `bg-primary` | `bg-accent` |
| 색상 secondary | `bg-secondary` | `bg-default` |
| 색상 번호 스케일 | `bg-primary-500` | 제거됨 |
| content 색상 | `bg-content1~4` | `bg-surface`, `bg-overlay` |
| 글자 크기 | `text-tiny/small/medium/large` | `text-xs/sm/base/lg` |
| 테두리 반경 | `rounded-small/medium/large` | `rounded-sm/md/lg` |
| 훅 | `useDisclosure` | `useOverlayState` |
| 훅 | `useSwitch`, `useInput` 등 | Compound Component 패턴으로 대체 |
| Collection item 키 | `key` | `key` + `id` + `textValue` (분리) |
| Navbar 컴포넌트 | 제공됨 | 제거됨 (직접 구현) |

---

## 이벤트 핸들러 규칙 (CRITICAL)

HeroUI v3는 React Aria 기반으로 `onClick` 대신 **`onPress`** 사용:

```tsx
// ✅ CORRECT — React Aria onPress
<Button onPress={() => doSomething()}>Click</Button>

// ❌ WRONG — HTML onClick (접근성, 터치 이벤트 누락)
<Button onClick={() => doSomething()}>Click</Button>
```

`onPress`는 마우스, 키보드(Enter/Space), 터치 이벤트를 통합 처리합니다.

---

## Compound Component 패턴

HeroUI v3 컴포넌트는 복합 구조로 사용합니다:

```tsx
// ✅ CORRECT — Compound pattern
<Modal>
  <Modal.Trigger><Button>Open</Button></Modal.Trigger>
  <Modal.Backdrop>
    <Modal.Container>
      <Modal.Dialog>
        <Modal.CloseTrigger />
        <Modal.Header>Title</Modal.Header>
        <Modal.Body>Content</Modal.Body>
        <Modal.Footer>
          <Button onPress={close}>Close</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal.Container>
  </Modal.Backdrop>
</Modal>

// ✅ 명시적 .Root suffix도 동일하게 동작
<Modal.Root>...</Modal.Root>

// ✅ Named export 방식도 가능
import { ModalRoot, ModalHeader, ModalBody } from "@heroui/react";
```

---

## 컴포넌트별 주요 패턴

### Drawer (모바일 메뉴 등)

`Drawer.Trigger`는 자체적으로 `<button>` DOM을 렌더링합니다 (`Dropdown.Trigger`와 동일).
Drawer 루트에 반드시 `Drawer.Trigger` 포함 필요 (없으면 `PressResponder` 경고).
내부에 HeroUI `Button`을 중첩하면 `<button><button>` HTML 위반 발생:

```tsx
// ✅ CORRECT — Trigger에 직접 BEM 클래스 + 아이콘
<Drawer>
  <Drawer.Trigger
    aria-label="Menu"
    className="button button--md button--ghost button--icon-only"
  >
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    </svg>
  </Drawer.Trigger>
  <Drawer.Backdrop>
    <Drawer.Content placement="right" className="w-72">
      <Drawer.Dialog>
        <Drawer.CloseTrigger />
        <Drawer.Header>Navigation</Drawer.Header>
        <Drawer.Body>{/* links */}</Drawer.Body>
      </Drawer.Dialog>
    </Drawer.Content>
  </Drawer.Backdrop>
</Drawer>

// ❌ WRONG — Button 중첩 시 <button><button> 위반
<Drawer>
  <Drawer.Trigger>
    <Button isIconOnly variant="ghost">icon</Button>
  </Drawer.Trigger>
</Drawer>

// ❌ WRONG — Trigger 없이 외부 state로만 제어
const [isOpen, setIsOpen] = useState(false);
<Button onPress={() => setIsOpen(true)}>Menu</Button>
<Drawer>
  <Drawer.Backdrop isOpen={isOpen} onOpenChange={setIsOpen}>...</Drawer.Backdrop>
</Drawer>
```

### Dropdown

`Dropdown.Trigger`는 자체적으로 `<button>` DOM을 렌더링합니다.
내부에 HeroUI `Button`을 중첩하면 `<button><button>` HTML 위반 발생:

```tsx
// ✅ CORRECT — Trigger 직접 스타일링
<Dropdown.Trigger
  className="inline-flex items-center gap-2 rounded-md px-3 h-8 text-sm transition-colors"
  style={{
    border: "1px solid var(--color-border-primary)",
    backgroundColor: "var(--color-background-secondary)",
    color: "var(--color-text-primary)",
    cursor: "pointer",
  }}
>
  Filter
  <ChevronDownIcon />
</Dropdown.Trigger>

// ❌ WRONG — Button 중첩 시 <button><button> 위반
<Dropdown.Trigger>
  <Button variant="secondary">Filter</Button>
</Dropdown.Trigger>
```

BEM 클래스로 HeroUI 버튼 스타일 직접 적용도 가능:
```tsx
<Dropdown.Trigger className="button button--sm button--secondary">
  Filter
</Dropdown.Trigger>
```

### Select / ListBox

Collection item에는 `key`(React 재조정) + `id`(v3 선택 상태) + `textValue`(스크린리더) 모두 필요:

```tsx
<Select onChange={(key: Key | null) => { /* ... */ }}>
  <Label>Language</Label>
  <Select.Trigger>
    <Select.Value />
    <Select.Indicator />
  </Select.Trigger>
  <Select.Popover>
    <ListBox>
      {items.map((item) => (
        <ListBox.Item
          key={item.value}      // React 재조정용
          id={item.value}       // HeroUI v3 selection 상태용
          textValue={item.label} // 스크린리더 / type-ahead용
        >
          {item.label}
          <ListBox.ItemIndicator />
        </ListBox.Item>
      ))}
    </ListBox>
  </Select.Popover>
</Select>
```

### Tabs

```tsx
<Tabs defaultSelectedKey="tab1" variant="secondary">
  <Tabs.ListContainer>
    <Tabs.List aria-label="탭 레이블">
      <Tabs.Tab id="tab1">
        탭 1
        <Tabs.Indicator />
      </Tabs.Tab>
      <Tabs.Tab id="tab2">
        탭 2
        <Tabs.Indicator />
      </Tabs.Tab>
    </Tabs.List>
  </Tabs.ListContainer>
  <Tabs.Panel id="tab1">{/* content */}</Tabs.Panel>
  <Tabs.Panel id="tab2">{/* content */}</Tabs.Panel>
</Tabs>
```

### Table

```tsx
<Table aria-label="테이블 설명">
  <Table.Header>
    <Table.Column>Name</Table.Column>
    <Table.Column>Value</Table.Column>
  </Table.Header>
  <Table.Body>
    {items.map((item) => (
      <Table.Row
        key={String(item.id)}
        onAction={() => handleClick(item)}  // 행 클릭
      >
        <Table.Cell>{item.name}</Table.Cell>
        <Table.Cell>{item.value}</Table.Cell>
      </Table.Row>
    ))}
  </Table.Body>
</Table>
```

### Modal (controlled state)

외부 state로 Modal을 제어할 때:

```tsx
const [isOpen, setIsOpen] = useState(false);

<Modal.Root>
  <Modal.Trigger><span className="hidden" /></Modal.Trigger>
  <Modal.Backdrop isOpen={isOpen} onOpenChange={setIsOpen}>
    <Modal.Container placement="center" size="lg">
      <Modal.Dialog>
        <Modal.CloseTrigger />
        <Modal.Header>제목</Modal.Header>
        <Modal.Body>내용</Modal.Body>
        <Modal.Footer>
          <Button onPress={() => setIsOpen(false)}>닫기</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal.Container>
  </Modal.Backdrop>
</Modal.Root>
```

---

## 색상 시스템 (HeroUI v3)

HeroUI v3는 `oklch` 색공간의 CSS 변수를 사용합니다. `@heroui/styles`가 자동으로 라이트/다크 전환을 처리합니다.

### 주요 색상 변수

| 역할 | 변수 | 사용처 |
|------|------|--------|
| 앱 배경 | `--background` | 전체 배경 |
| 본문 글자 | `--foreground` | 기본 텍스트 |
| 카드/아코디언 | `--surface` | 비오버레이 컴포넌트 |
| 팝오버/모달 | `--overlay` | 플로팅 컴포넌트 |
| 주요 액션 | `--accent` / `--accent-foreground` | CTA 버튼 |
| 경계선 | `--border` | 테두리 |
| 비활성 텍스트 | `--muted` | placeholder, caption |
| 성공 | `--success` / `--success-foreground` | |
| 경고 | `--warning` / `--warning-foreground` | |
| 위험 | `--danger` / `--danger-foreground` | |
| 폼 필드 배경 | `--field-background` | Input, Select 등 |

### 이 프로젝트의 추가 커스텀 변수 (`globals.css`)

| 변수 | 라이트 | 다크 | 용도 |
|------|--------|------|------|
| `--color-primary` | `#dc6b4a` | `#dc6b4a` | 브랜드 오렌지 |
| `--color-background` | `#ffffff` | `#1a1a1a` | `bg-background` 유틸리티 |
| `--color-border` | `#e0e0e0` | `#424242` | `border-border` 유틸리티 |
| `--color-border-primary` | `#e0e0e0` | `#424242` | 컴포넌트 테두리 |
| `--color-text-primary` | `#212121` | `#fafafa` | 주요 텍스트 |
| `--color-text-secondary` | `#424242` | `#e8e8e5` | 본문 텍스트 |
| `--color-text-tertiary` | `#757575` | `#b8b8b2` | 부가 텍스트 |
| `--color-background-secondary` | `#fafafa` | `#262626` | 카드 배경 |
| `--color-success-bg` | `#e0f2f1` | `#1a2e2a` | 성공 배지 배경 |
| `--color-warning-bg` | `#fff3e0` | `#2e2010` | 경고 배지 배경 |

### 다크모드 설정

```tsx
// providers.tsx — next-themes로 class 속성 제어
<NextThemesProvider attribute="class" defaultTheme="dark">
  {children}
</NextThemesProvider>
```

```css
/* globals.css — Tailwind v4 다크 variant */
@custom-variant dark (&:is(.dark *));

/* 다크모드 변수 오버라이드 */
.dark {
  --color-background: #1a1a1a;
  --color-border: #424242;
  /* ... */
}
```

커스텀 색상을 Tailwind 유틸리티로 노출:
```css
@theme inline {
  --color-info: var(--info);
  --color-info-foreground: var(--info-foreground);
}
```

---

## 스타일링 패턴

### className 우선 사용

```tsx
<Button className="bg-purple-500 hover:bg-purple-600">Custom</Button>
```

### 상태 기반 data attribute

```css
.button[data-hovered="true"] { background: var(--accent-hover); }
.button[data-pressed="true"] { transform: scale(0.97); }
.button[data-focus-visible="true"] { outline: 2px solid var(--focus); }
```

### Render Props (동적 스타일)

```tsx
<Button
  className={({ isPressed }) => isPressed ? "bg-blue-600" : "bg-blue-500"}
>
  Press me
</Button>
```

### BEM 클래스 직접 적용 (polymorphic)

```tsx
import Link from "next/link";

// Next.js Link에 버튼 스타일 적용
<Link className="button button--primary" href="/dashboard">
  Dashboard
</Link>
```

### tailwind-variants로 커스텀 Variant

```tsx
import { buttonVariants, tv } from "@heroui/styles";
import type { VariantProps } from "tailwind-variants";

const myButton = tv({
  extend: buttonVariants,
  base: "font-semibold shadow-md",
  variants: {
    intent: {
      brand: "bg-[#dc6b4a] text-white hover:bg-[#c5563a]",
    },
  },
});
```

### `render` prop (custom DOM element)

```tsx
import { motion } from "framer-motion";
import { Button } from "@heroui/react";

<Button
  render={(domProps, { isPressed }) => (
    <motion.button {...domProps} animate={{ scale: isPressed ? 0.95 : 1 }} />
  )}
>
  Animated
</Button>
```

---

## overlay 상태 관리

```tsx
// v3 useOverlayState (v2 useDisclosure 대체)
import { useOverlayState } from "@heroui/react";

const state = useOverlayState();
// state.isOpen, state.open(), state.close(), state.toggle(), state.setOpen(boolean)

// 또는 단순하게 useState 직접 사용
const [isOpen, setIsOpen] = useState(false);
```

---

## 폰트 설정

이 프로젝트는 `config/fonts.ts`에서 여러 한글 폰트를 CSS 변수로 등록:

| 변수 | 폰트 | 용도 |
|------|------|------|
| `--font-sans` | Fira Code | 기본 sans |
| `--font-noto-sans-kr` | Noto Sans KR | 한글 본문 |
| `--font-noto-serif-kr` | Noto Serif KR | 한글 serif |
| `--font-nanum-myeongjo` | Nanum Myeongjo | 제목 (한국 전통 serif) |

`globals.css`의 `@theme`에서 Tailwind 유틸리티로 노출:
```css
--font-family-nanum-myeongjo: var(--font-nanum-myeongjo);
```

사용:
```tsx
<h2 className="font-nanum-myeongjo text-2xl font-bold">제목</h2>
```

---

## 자주 발생하는 버그 및 해결책

### 1. `PressResponder without pressable child`

**원인**: Drawer/Modal Root에 Trigger 컴포넌트 없음
**해결**: 반드시 `Drawer.Trigger` / `Modal.Trigger`를 Root 내부에 포함

### 2. `<button> cannot be a descendant of <button>`

**원인**: `Dropdown.Trigger` (자체 `<button>`) 내부에 HeroUI `Button` (`<button>`) 중첩
**해결**: Trigger 내부에서 `Button` 컴포넌트 제거, Trigger에 직접 className/style 적용

### 3. `onClick` 대신 `onPress` 미사용

**원인**: HeroUI v2 습관으로 `onClick` 사용
**해결**: 모든 HeroUI Button/Link/pressable 요소에 `onPress` 사용

### 4. Next.js `Image` 미설정

**원인**: `fill` 또는 `width`/`height` 없이 `<Image>` 사용
**해결**:
```tsx
// fill 패턴 (relative 컨테이너 필요)
<div className="relative w-full h-[300px]">
  <Image fill alt="..." className="object-cover" sizes="..." src={src} />
</div>
```

### 5. locale 없는 하드코딩 경로

**원인**: `href="/interview"` 등 locale 미포함
**해결**: `href={\`/${locale}/interview\`}`

### 6. HeroUI v3 색상 클래스 미작동

**원인**: v2 유틸리티 클래스 사용 (`text-small`, `rounded-medium` 등)
**해결**:

| v2 | v3 |
|----|----|
| `text-small` | `text-sm` |
| `text-medium` | `text-base` |
| `rounded-medium` | `rounded-md` |
| `border-small` | `border` |
| `bg-primary` | `bg-accent` |
| `bg-content1` | `bg-surface` |

### 7. 다크모드 배지 배경 색상 깨짐

**원인**: `--color-success-bg`, `--color-warning-bg` 다크모드 값 미정의
**해결**: `globals.css`의 `.dark {}` 블록에 어두운 색상 값 추가

### 8. providers.tsx dead code

**원인**: v2에서 React Aria 라우터 설정용 `useLayoutEffect(() => { void router; })` 잔재
**해결**: 삭제 (`HeroUIProvider` v3에서 제거됨)

---

## 프로젝트 주요 파일

| 파일 | 역할 |
|------|------|
| `styles/globals.css` | Tailwind v4 + HeroUI import, 커스텀 CSS 변수, 다크모드 |
| `styles/print.css` | 이력서 인쇄용 스타일 |
| `app/[locale]/providers.tsx` | NextThemesProvider |
| `app/[locale]/layout.tsx` | 루트 레이아웃, 폰트 CSS 변수 주입 |
| `components/navbar.tsx` | Drawer 기반 모바일 메뉴 |
| `components/theme-switch.tsx` | 라이트/다크 토글 |
| `components/language-switcher.tsx` | HeroUI Select 기반 언어 전환 |
| `components/primitives.ts` | `tailwind-variants` 유틸리티 |
| `components/portfolio/*.tsx` | 포트폴리오 섹션 컴포넌트 |
| `components/interview/*.tsx` | 인터뷰 Q&A 컴포넌트 |

---

## 참고 문서

| 문서 | URL |
|------|-----|
| HeroUI v3 공식 문서 | https://v3.heroui.com |
| HeroUI v3 LLM 인덱스 | https://v3.heroui.com/react/llms.txt |
| 색상 테마 빌더 | https://v3.heroui.com/themes |
| 컴포넌트 목록 | https://v3.heroui.com/docs/react/components |
| 스타일링 가이드 | https://v3.heroui.com/docs/react/getting-started/styling |
| 색상 시스템 | https://v3.heroui.com/docs/react/getting-started/colors |
| 애니메이션 | https://v3.heroui.com/docs/react/getting-started/animation |
| v2→v3 마이그레이션 | https://v3.heroui.com/docs/react/migration |
| Hooks 마이그레이션 | https://v3.heroui.com/docs/react/migration/hooks |


# HeroUI v3 React Documentation

> Documentation for HeroUI React component library.

HeroUI React is a component library built on [Tailwind CSS v4](https://tailwindcss.com/) and [React Aria Components](https://react-spectrum.adobe.com/react-aria/). Every component comes with smooth animations, polished details, and built-in accessibility—ready to use, fully customizable.

**Key Features:**

- Beautiful by default - Professional look out of the box
- Accessible - Built with accessibility best practices
- Flexible - Customizable components with predictable patterns
- Developer-friendly - Fully typed APIs and excellent autocompletion

## Documentation Index

### Components

- [All Components](https://www.heroui.com/docs/react/components): Explore the full list of components available in the library. More are on the way.
- [ButtonGroup](https://www.heroui.com/docs/react/components/button-group): Group related buttons together with consistent styling and spacing
- [Button](https://www.heroui.com/docs/react/components/button): A clickable button component with multiple variants and states
- [CloseButton](https://www.heroui.com/docs/react/components/close-button): Button component for closing dialogs, modals, or dismissing content
- [ToggleButtonGroup](https://www.heroui.com/docs/react/components/toggle-button-group): Groups multiple ToggleButtons into a unified control, allowing users to select one or multiple options.
- [ToggleButton](https://www.heroui.com/docs/react/components/toggle-button): An interactive toggle control for on/off or selected/unselected states
- [Dropdown](https://www.heroui.com/docs/react/components/dropdown): A dropdown displays a list of actions or options that a user can choose
- [ListBox](https://www.heroui.com/docs/react/components/list-box): A listbox displays a list of options and allows a user to select one or more of them
- [TagGroup](https://www.heroui.com/docs/react/components/tag-group): A focusable list of tags with support for keyboard navigation, selection, and removal
- [ColorArea](https://www.heroui.com/docs/react/components/color-area): A 2D color picker that allows users to select colors from a gradient area
- [ColorField](https://www.heroui.com/docs/react/components/color-field): Color input field with labels, descriptions, and validation built on React Aria ColorField
- [ColorPicker](https://www.heroui.com/docs/react/components/color-picker): A composable color picker that synchronizes color value between multiple color components
- [ColorSlider](https://www.heroui.com/docs/react/components/color-slider): A color slider allows users to adjust an individual channel of a color value
- [ColorSwatchPicker](https://www.heroui.com/docs/react/components/color-swatch-picker): A list of color swatches that allows users to select a color from a predefined palette.
- [ColorSwatch](https://www.heroui.com/docs/react/components/color-swatch): A visual preview of a color value with accessibility support
- [Slider](https://www.heroui.com/docs/react/components/slider): A slider allows a user to select one or more values within a range
- [Switch](https://www.heroui.com/docs/react/components/switch): A toggle switch component for boolean states
- [Badge](https://www.heroui.com/docs/react/components/badge): Displays a small indicator positioned relative to another element, commonly used for notification counts, status dots, and labels
- [Chip](https://www.heroui.com/docs/react/components/chip): Small informational badges for displaying labels, statuses, and categories
- [Table](https://www.heroui.com/docs/react/components/table): Tables display structured data in rows and columns with support for sorting, selection, column resizing, and infinite scrolling.
- [Calendar](https://www.heroui.com/docs/react/components/calendar): Composable date picker with month grid, navigation, and year picker support built on React Aria Calendar
- [DateField](https://www.heroui.com/docs/react/components/date-field): Date input field with labels, descriptions, and validation built on React Aria DateField
- [DatePicker](https://www.heroui.com/docs/react/components/date-picker): Composable date picker built on React Aria DatePicker with DateField and Calendar composition
- [DateRangePicker](https://www.heroui.com/docs/react/components/date-range-picker): Composable date range picker built on React Aria DateRangePicker with DateField and RangeCalendar composition
- [RangeCalendar](https://www.heroui.com/docs/react/components/range-calendar): Composable date range picker with month grid, navigation, and year picker support built on React Aria RangeCalendar
- [TimeField](https://www.heroui.com/docs/react/components/time-field): Time input field with labels, descriptions, and validation built on React Aria TimeField
- [Alert](https://www.heroui.com/docs/react/components/alert): Display important messages and notifications to users with status indicators
- [Meter](https://www.heroui.com/docs/react/components/meter): A meter represents a quantity within a known range, or a fractional value.
- [ProgressBar](https://www.heroui.com/docs/react/components/progress-bar): A progress bar shows either determinate or indeterminate progress of an operation over time.
- [ProgressCircle](https://www.heroui.com/docs/react/components/progress-circle): A circular progress indicator that shows determinate or indeterminate progress.
- [Skeleton](https://www.heroui.com/docs/react/components/skeleton): Skeleton is a placeholder to show a loading state and the expected shape of a component.
- [Spinner](https://www.heroui.com/docs/react/components/spinner): A loading indicator component to show pending states
- [CheckboxGroup](https://www.heroui.com/docs/react/components/checkbox-group): A checkbox group component for managing multiple checkbox selections
- [Checkbox](https://www.heroui.com/docs/react/components/checkbox): Checkboxes allow users to select multiple items from a list of individual items, or to mark one individual item as selected.
- [Description](https://www.heroui.com/docs/react/components/description): Provides supplementary text for form fields and other components
- [ErrorMessage](https://www.heroui.com/docs/react/components/error-message): A low-level error message component for displaying errors
- [FieldError](https://www.heroui.com/docs/react/components/field-error): Displays validation error messages for form fields
- [Fieldset](https://www.heroui.com/docs/react/components/fieldset): Group related form controls with legends, descriptions, and actions
- [Form](https://www.heroui.com/docs/react/components/form): Wrapper component for form validation and submission handling
- [InputGroup](https://www.heroui.com/docs/react/components/input-group): Group related input controls with prefix and suffix elements for enhanced form fields
- [InputOTP](https://www.heroui.com/docs/react/components/input-otp): A one-time password input component for verification codes and secure authentication
- [Input](https://www.heroui.com/docs/react/components/input): Primitive single-line text input component that accepts standard HTML attributes
- [Label](https://www.heroui.com/docs/react/components/label): Renders an accessible label associated with form controls
- [NumberField](https://www.heroui.com/docs/react/components/number-field): Number input fields with increment/decrement buttons, validation, and internationalized formatting
- [RadioGroup](https://www.heroui.com/docs/react/components/radio-group): Radio group for selecting a single option from a list
- [SearchField](https://www.heroui.com/docs/react/components/search-field): Search input field with clear button and search icon
- [TextArea](https://www.heroui.com/docs/react/components/text-area): Primitive multiline text input component that accepts standard HTML attributes
- [TextField](https://www.heroui.com/docs/react/components/text-field): Composition-friendly text fields with labels, descriptions, and inline validation
- [Card](https://www.heroui.com/docs/react/components/card): Flexible container component for grouping related content and actions
- [Separator](https://www.heroui.com/docs/react/components/separator): Visually divide content sections
- [Surface](https://www.heroui.com/docs/react/components/surface): Container component that provides surface-level styling and context for child components
- [Toolbar](https://www.heroui.com/docs/react/components/toolbar): A container for interactive controls with arrow key navigation.
- [Avatar](https://www.heroui.com/docs/react/components/avatar): Display user profile images with customizable fallback content
- [Accordion](https://www.heroui.com/docs/react/components/accordion): A collapsible content panel for organizing information in a compact space
- [Breadcrumbs](https://www.heroui.com/docs/react/components/breadcrumbs): Navigation breadcrumbs showing the current page's location within a hierarchy
- [DisclosureGroup](https://www.heroui.com/docs/react/components/disclosure-group): Container that manages multiple Disclosure items with coordinated expanded states
- [Disclosure](https://www.heroui.com/docs/react/components/disclosure): A disclosure is a collapsible section with a header containing a heading and a trigger button, and a panel that wraps the content.
- [Link](https://www.heroui.com/docs/react/components/link): A styled anchor component for navigation with built-in icon support
- [Pagination](https://www.heroui.com/docs/react/components/pagination): Page navigation with composable page links, previous/next buttons, and ellipsis indicators
- [Tabs](https://www.heroui.com/docs/react/components/tabs): Tabs organize content into multiple sections and allow users to navigate between them.
- [AlertDialog](https://www.heroui.com/docs/react/components/alert-dialog): Modal dialog for critical confirmations requiring user attention and explicit action
- [Drawer](https://www.heroui.com/docs/react/components/drawer): Slide-out panel for supplementary content and actions
- [Modal](https://www.heroui.com/docs/react/components/modal): Dialog overlay for focused user interactions and important content
- [Popover](https://www.heroui.com/docs/react/components/popover): Displays rich content in a portal triggered by a button or any custom element
- [Toast](https://www.heroui.com/docs/react/components/toast): Display temporary notifications and messages to users with automatic dismissal and customizable placement
- [Tooltip](https://www.heroui.com/docs/react/components/tooltip): Displays informative text when users hover over or focus on an element
- [Autocomplete](https://www.heroui.com/docs/react/components/autocomplete): An autocomplete combines a select with filtering, allowing users to search and select from a list of options
- [ComboBox](https://www.heroui.com/docs/react/components/combo-box): A combo box combines a text input with a listbox, allowing users to filter a list of options to items matching a query
- [Select](https://www.heroui.com/docs/react/components/select): A select displays a collapsible list of options and allows a user to select one of them
- [Kbd](https://www.heroui.com/docs/react/components/kbd): Display keyboard shortcuts and key combinations
- [ScrollShadow](https://www.heroui.com/docs/react/components/scroll-shadow): Apply visual shadows to indicate scrollable content overflow with automatic detection of scroll position.

### Getting-started

- [Introduction](https://www.heroui.com/docs/react/getting-started): An open-source UI component library for building beautiful and accessible user interfaces.
- [Animation](https://www.heroui.com/docs/react/getting-started/animation): Add smooth animations and transitions to HeroUI v3 components
- [Colors](https://www.heroui.com/docs/react/getting-started/colors): Color palette and theming system for HeroUI v3
- [Composition](https://www.heroui.com/docs/react/getting-started/composition): Build flexible UI with component composition patterns
- [Styling](https://www.heroui.com/docs/react/getting-started/styling): Style HeroUI components with CSS, Tailwind, or CSS-in-JS
- [Theming](https://www.heroui.com/docs/react/getting-started/theming): Customize HeroUI's design system with CSS variables and global styles
- [Design Principles](https://www.heroui.com/docs/react/getting-started/design-principles): Core principles that guide HeroUI v3's design and development
- [Quick Start](https://www.heroui.com/docs/react/getting-started/quick-start): Get started with HeroUI v3 in minutes
- [Agent Skills](https://www.heroui.com/docs/react/getting-started/agent-skills): Enable AI assistants to build UIs with HeroUI v3 components
- [AGENTS.md](https://www.heroui.com/docs/react/getting-started/agents-md): Download HeroUI v3 React documentation for AI coding agents
- [LLMs.txt](https://www.heroui.com/docs/react/getting-started/llms-txt): Enable AI assistants like Claude, Cursor, and Windsurf to understand HeroUI v3
- [MCP Server](https://www.heroui.com/docs/react/getting-started/mcp-server): Access HeroUI v3 documentation directly in your AI assistant

### Migration

- [Migration (for AI assistants)](https://www.heroui.com/docs/react/migration/agent-index): Entry point for AI assistants helping migrate HeroUI v2 to v3
- [Hooks](https://www.heroui.com/docs/react/migration/hooks): Migration guide for HeroUI hooks from v2 to v3
- [Migration](https://www.heroui.com/docs/react/migration): Complete guide to migrate your HeroUI v2 application to v3
- [Styling & Theming](https://www.heroui.com/docs/react/migration/styling): Complete guide to styling changes and theming system migration from HeroUI v2 to v3
- [Agent Skills](https://www.heroui.com/docs/react/migration/agent-skills): Enable AI assistants to migrate HeroUI v2 to v3
- [AGENTS.md](https://www.heroui.com/docs/react/migration/agents-md): Download HeroUI v2 to v3 migration docs for AI coding agents
- [MCP Server](https://www.heroui.com/docs/react/migration/mcp-server): Access HeroUI v2 to v3 migration guides in your AI assistant
- [Accordion](https://www.heroui.com/docs/react/migration/accordion): Migration guide for Accordion from HeroUI v2 to v3
- [Alert](https://www.heroui.com/docs/react/migration/alert): Migration guide for Alert from HeroUI v2 to v3
- [Autocomplete](https://www.heroui.com/docs/react/migration/autocomplete): Migration guide for Autocomplete from HeroUI v2 to v3
- [Avatar](https://www.heroui.com/docs/react/migration/avatar): Migration guide for Avatar from HeroUI v2 to v3
- [Badge](https://www.heroui.com/docs/react/migration/badge): Migration guide for Badge from HeroUI v2 to v3
- [Breadcrumbs](https://www.heroui.com/docs/react/migration/breadcrumbs): Migration guide for Breadcrumbs from HeroUI v2 to v3
- [ButtonGroup](https://www.heroui.com/docs/react/migration/button-group): Migration guide for ButtonGroup from HeroUI v2 to v3
- [Button](https://www.heroui.com/docs/react/migration/button): Migration guide for Button from HeroUI v2 to v3
- [Calendar](https://www.heroui.com/docs/react/migration/calendar): Migration guide for Calendar from HeroUI v2 to v3
- [Card](https://www.heroui.com/docs/react/migration/card): Migration guide for Card from HeroUI v2 to v3
- [CheckboxGroup](https://www.heroui.com/docs/react/migration/checkbox-group): Migration guide for CheckboxGroup from HeroUI v2 to v3
- [Checkbox](https://www.heroui.com/docs/react/migration/checkbox): Migration guide for Checkbox from HeroUI v2 to v3
- [Chip](https://www.heroui.com/docs/react/migration/chip): Migration guide for Chip from HeroUI v2 to v3
- [CircularProgress](https://www.heroui.com/docs/react/migration/circular-progress): Migration guide for CircularProgress from HeroUI v2 to v3 (now ProgressCircle)
- [Code](https://www.heroui.com/docs/react/migration/code): Migration guide for Code from HeroUI v2 to v3
- [DatePicker](https://www.heroui.com/docs/react/migration/date-picker): Migration guide for DatePicker from HeroUI v2 to v3
- [DateRangePicker](https://www.heroui.com/docs/react/migration/date-range-picker): Migration guide for DateRangePicker from HeroUI v2 to v3
- [DateInput](https://www.heroui.com/docs/react/migration/dateinput): Migration guide for DateInput to DateField from HeroUI v2 to v3
- [Divider](https://www.heroui.com/docs/react/migration/divider): Migration guide for Divider (renamed to Separator) from HeroUI v2 to v3
- [Drawer](https://www.heroui.com/docs/react/migration/drawer): Migration guide for Drawer from HeroUI v2 to v3
- [Dropdown](https://www.heroui.com/docs/react/migration/dropdown): Migration guide for Dropdown from HeroUI v2 to v3
- [Form](https://www.heroui.com/docs/react/migration/form): Migration guide for Form from HeroUI v2 to v3
- [Image](https://www.heroui.com/docs/react/migration/image): Migration guide for Image from HeroUI v2 to v3
- [InputOTP](https://www.heroui.com/docs/react/migration/input-otp): Migration guide for InputOTP from HeroUI v2 to v3
- [Input](https://www.heroui.com/docs/react/migration/input): Migration guide for Input from HeroUI v2 to v3
- [Kbd](https://www.heroui.com/docs/react/migration/kbd): Migration guide for Kbd from HeroUI v2 to v3
- [Link](https://www.heroui.com/docs/react/migration/link): Migration guide for Link from HeroUI v2 to v3
- [Listbox](https://www.heroui.com/docs/react/migration/listbox): Migration guide for Listbox (renamed to ListBox with a capital "B") from HeroUI v2 to v3
- [Modal](https://www.heroui.com/docs/react/migration/modal): Migration guide for Modal from HeroUI v2 to v3
- [Navbar](https://www.heroui.com/docs/react/migration/navbar): Migration guide for Navbar from HeroUI v2 to v3
- [NumberInput](https://www.heroui.com/docs/react/migration/numberinput): Migration guide for NumberInput to NumberField from HeroUI v2 to v3
- [Pagination](https://www.heroui.com/docs/react/migration/pagination): Migration guide for Pagination from HeroUI v2 to v3
- [Popover](https://www.heroui.com/docs/react/migration/popover): Migration guide for Popover from HeroUI v2 to v3
- [Progress](https://www.heroui.com/docs/react/migration/progress): Migration guide for Progress from HeroUI v2 to v3 (now ProgressBar)
- [RadioGroup](https://www.heroui.com/docs/react/migration/radio-group): Migration guide for RadioGroup from HeroUI v2 to v3
- [Radio](https://www.heroui.com/docs/react/migration/radio): Migration guide for Radio from HeroUI v2 to v3
- [RangeCalendar](https://www.heroui.com/docs/react/migration/range-calendar): Migration guide for RangeCalendar from HeroUI v2 to v3
- [ScrollShadow](https://www.heroui.com/docs/react/migration/scroll-shadow): Migration guide for ScrollShadow from HeroUI v2 to v3
- [Select](https://www.heroui.com/docs/react/migration/select): Migration guide for Select from HeroUI v2 to v3
- [Skeleton](https://www.heroui.com/docs/react/migration/skeleton): Migration guide for Skeleton from HeroUI v2 to v3
- [Slider](https://www.heroui.com/docs/react/migration/slider): Migration guide for Slider from HeroUI v2 to v3
- [Snippet](https://www.heroui.com/docs/react/migration/snippet): Migration guide for Snippet from HeroUI v2 to v3
- [Spacer](https://www.heroui.com/docs/react/migration/spacer): Migration guide for Spacer from HeroUI v2 to v3
- [Spinner](https://www.heroui.com/docs/react/migration/spinner): Migration guide for Spinner from HeroUI v2 to v3
- [Switch](https://www.heroui.com/docs/react/migration/switch): Migration guide for Switch from HeroUI v2 to v3
- [Table](https://www.heroui.com/docs/react/migration/table): Migration guide for Table from HeroUI v2 to v3
- [Tabs](https://www.heroui.com/docs/react/migration/tabs): Migration guide for Tabs from HeroUI v2 to v3
- [TimeInput](https://www.heroui.com/docs/react/migration/timeinput): Migration guide for TimeInput to TimeField from HeroUI v2 to v3
- [Toast](https://www.heroui.com/docs/react/migration/toast): Migration guide for Toast from HeroUI v2 to v3
- [Tooltip](https://www.heroui.com/docs/react/migration/tooltip): Migration guide for Tooltip from HeroUI v2 to v3
- [User](https://www.heroui.com/docs/react/migration/user): Migration guide for User from HeroUI v2 to v3
- [Agent Migration Guide - Full Migration](https://www.heroui.com/docs/react/migration/agent-guide-full): Full migration guide for AI assistants helping migrate HeroUI v2 to v3
- [Agent Migration Guide - Incremental Migration with Coexistence](https://www.heroui.com/docs/react/migration/agent-guide-incremental): Incremental coexistence migration guide for AI assistants helping migrate HeroUI v2 to v3
- [Full Migration](https://www.heroui.com/docs/react/migration/full-migration): Step-by-step guide for migrating HeroUI v2 to v3 using full migration approach
- [Incremental Migration](https://www.heroui.com/docs/react/migration/incremental-migration): Step-by-step guide for migrating HeroUI v2 to v3 incrementally while keeping both versions working side-by-side

### Releases

- [All Releases](https://www.heroui.com/docs/react/releases): All updates and changes to HeroUI v3, including new features, fixes, and breaking changes.
- [v3.0.0-alpha.32](https://www.heroui.com/docs/react/releases/v3-0-0-alpha-32): Card component redesign, CloseButton, MCP Server for AI assistants
- [v3.0.0-alpha.33](https://www.heroui.com/docs/react/releases/v3-0-0-alpha-33): RAC upgrade, Tabs indicator redesign, Switch size variant, Related showcase
- [v3.0.0-alpha.34](https://www.heroui.com/docs/react/releases/v3-0-0-alpha-34): Essentials for building forms with a clean API Form, TextField, RadioGroup, Label, Input, Fieldset and more.
- [v3.0.0-alpha.35](https://www.heroui.com/docs/react/releases/v3-0-0-alpha-35): React Server Components support for compound components, React 19 improvements, and critical bug fixes.
- [v3.0.0-beta.1](https://www.heroui.com/docs/react/releases/v3-0-0-beta-1): Major redesign with new design system, 8 new components, and improved developer experience.
- [v3.0.0-beta.2](https://www.heroui.com/docs/react/releases/v3-0-0-beta-2): Six new components (AlertDialog, ComboBox, Dropdown, InputGroup, Modal, NumberField), Select API improvements, and component refinements.
- [v3.0.0-beta.3](https://www.heroui.com/docs/react/releases/v3-0-0-beta-3): Seven new components, fullWidth and hideSeparator support, style fixes, and breaking changes for AlertDialog/Modal backdrop variants and asChild prop removal.
- [v3.0.0-beta.4](https://www.heroui.com/docs/react/releases/v3-0-0-beta-4): New Theme Builder, three new components (Autocomplete, Breadcrumbs, Toast), Tabs secondary variant, Input/InputGroup variants, and various improvements.
- [v3.0.0-beta.6](https://www.heroui.com/docs/react/releases/v3-0-0-beta-6): 6 new color components (ColorPicker, ColorArea, ColorSlider, ColorField, ColorSwatch, ColorSwatchPicker), toast improvements, and various style fixes.
- [v3.0.0-beta.7](https://www.heroui.com/docs/react/releases/v3-0-0-beta-7): 4 new components (Calendar, RangeCalendar, DatePicker, DateRangePicker) and APIs improvements.
- [v3.0.0-beta.8](https://www.heroui.com/docs/react/releases/v3-0-0-beta-8): 3 new components (Badge, Pagination, Table), DateField improvements, and key API/style fixes.
- [v3.0.0-rc.1](https://www.heroui.com/docs/react/releases/v3-0-0-rc-1): 7 new components (Drawer, ToggleButton, ToggleButtonGroup, Meter, ProgressBar, ProgressCircle, Toolbar), Table & ListBox virtualization, ButtonGroup improvements, and bug fixes.
- [Introducing HeroUI v3](https://www.heroui.com/docs/react/releases/v3-0-0): A ground-up rewrite for React and React Native. 75+ web components, 37 native components, Tailwind CSS v4, React Aria, compound architecture, and built for AI-assisted development.