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
