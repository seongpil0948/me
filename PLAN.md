Ready for review
Select text to add comments on the plan
Interview Q&A 다국어 관리 구조 전환
Context

https://nextjs.org/docs/app/guides/internationalization

현재 data/interview/\*.ts의 Q&A 약 3,500줄은 question: string, answer: string 으로 한국어 하드코딩 상태다. 반면 types/portfolio.ts의 Experience, PersonalInfo 는 이미 { ko, en, zh } 패턴으로 다국어를 관리 중이고, next-i18n-router 기반으로 /ko /en /zh 라우트가 이미 존재한다.

결과적으로 /en/interview, /zh/interview 에 접속해도 Q&A는 한국어로 표시되고, 페이지 껍데기(dict.interview.title 등) 만 번역된다.

이번 작업의 목표는 데이터 스키마를 프로젝트의 기존 다국어 패턴에 일치시키고, 점진적 번역을 가능하게 하는 것. 실제 en/zh 번역본 채우기는 후속 작업(사용자가 "타입 + 헬퍼 + 변환만" 선택).

핵심 선택:

저장 구조: Inline Localized 객체 (Experience 패턴과 동일)
번역 미달 처리: Fallback to ko
이번 PR 범위: 타입 + 헬퍼 + ko 래핑 변환 + Next.js 16 관용구 정렬. 실제 en/zh 번역은 후속.
참고: Next.js 16 공식 i18n 가이드와의 정렬
공식 Internationalization 가이드(v16.2.4, 2026-04-15) 대비 현재 프로젝트 상태:

공식 권장 현재 프로젝트 조치
app/[lang]/dictionaries.ts 에 "server-only" + dynamic import app/[locale]/dictionaries.ts 동일 패턴 적용 ✅ 유지 (locale 은 프로젝트 컨벤션)
export const hasLocale = (l: string): l is Locale => l in dictionaries 타입 가드 미구현. i18nConfig.locales.includes(locale) 만 사용 → 타입 narrowing 실패 추가 — dictionaries.ts 에 hasLocale export
if (!hasLocale(lang)) notFound() in 페이지/레이아웃 layout.tsx 에 includes 기반 체크. interview 페이지는 가드 없음 layout.tsx 와 interview 페이지에 hasLocale 가드 적용
generateStaticParams layout.tsx:20 존재 ✅ 유지
Server Component 로 dictionary 로드 (bundle size 영향 없음) 이미 server component 에서만 호출 ✅ 유지. localizeQuestions 도 server 에서 실행
PageProps<'/[lang]'> 글로벌 타입 helper (Next.js 16) 프로젝트 자체 types/i18n.ts:PageProps 와 이름 충돌 이번 PR 에선 교체 안 함 (별도 PR 로 분리). 신규 코드는 프로젝트 helper 유지
이 정렬 작업은 interview 라우트뿐 아니라 모든 /[locale]/\* 라우트에 잘못된 locale 이 올 때 TypeError 대신 404 를 반환하게 만들어, 데이터 변환과 무관하게 안전성을 올린다.

설계 개요
두 개의 타입 레이어
레이어 타입 위치 비고
저장 형식 (data) LocalizedInterviewQuestion types/portfolio.ts question/answer: Localized<string>
UI 소비 형식 (컴포넌트) InterviewQuestion (기존) types/portfolio.ts question/answer: string — 변경 없음
→ UI 컴포넌트(qa-table.tsx, quiz-mode.tsx, interview-tabs.tsx)는 수정 불필요. 서버 페이지에서 localize한 값을 그대로 내려준다.

Localized 유틸 타입
// types/i18n.ts 에 추가
export type Localized<T> = { ko: T; en?: T; zh?: T };
ko만 필수, en/zh는 optional. 미번역 항목은 ko로 fallback된다. 기존 Experience 타입( { ko; en; zh } 모두 required)은 완전 번역 완료 상태라 그대로 둔다.

Localize 헬퍼
// lib/i18n/locale-utils.ts 에 추가
import type { Locale } from "@/app/[locale]/dictionaries";
import type { Localized } from "@/types/i18n";
import type {
InterviewQuestion,
LocalizedInterviewQuestion,
} from "@/types/portfolio";

export function localize<T>(value: Localized<T>, locale: Locale): T {
return value[locale] ?? value.ko;
}

export function localizeQuestion(
q: LocalizedInterviewQuestion,
locale: Locale,
): InterviewQuestion {
return {
...q,
question: localize(q.question, locale),
answer: localize(q.answer, locale),
};
}

export function localizeQuestions(
questions: LocalizedInterviewQuestion[],
locale: Locale,
): InterviewQuestion[] {
return questions.map((q) => localizeQuestion(q, locale));
}
변환 지점 (서버 페이지)
// app/[locale]/interview/page.tsx
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../dictionaries";

const { locale } = await params;
if (!hasLocale(locale)) notFound(); // 공식 가이드 패턴

const dict = await getDictionary(locale);
const questions = localizeQuestions(interviewQuestions, locale);
return <InterviewTabsClient dict={dict} questions={questions} />;
wipro/page.tsx 도 동일 패턴 적용. params 타입은 Promise<{ locale: string }> 로 느슨하게 받고, hasLocale 통과 후 Locale 로 narrow 된다. (현재는 Promise<{ locale: Locale }> 로 단언만 하고 있음 → 검증 없이 신뢰.)

hasLocale 타입 가드 추가
// app/[locale]/dictionaries.ts
import "server-only";

const dictionaries = {
ko: () => import("./dictionaries/ko.json").then((m) => m.default),
en: () => import("./dictionaries/en.json").then((m) => m.default),
zh: () => import("./dictionaries/zh.json").then((m) => m.default),
};

export type Locale = keyof typeof dictionaries;

// 신규 export — 공식 가이드 패턴
export const hasLocale = (locale: string): locale is Locale =>
locale in dictionaries;

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
layout.tsx:82 의 i18nConfig.locales.includes(locale) 도 hasLocale(locale) 로 교체하여 locale 파라미터 타입을 string → Locale 로 narrow. lang={locale} 속성에 타입 안전성 확보.

데이터 변환 패턴
기존:

{
id: 2,
question: "간단히 자기소개를 해주세요.",
answer: "**7년간**..." + "..." + "...",
}
변환 후 (최소 침습):

{
id: 2,
question: { ko: "간단히 자기소개를 해주세요." },
answer: { ko: "**7년간**..." + "..." + "..." },
}
→ template literal concatenation 구조는 그대로 유지하고 { ko: <기존값> } 래핑만 한다.

번역이 채워지면:

question: {
ko: "간단히 자기소개를 해주세요.",
en: "Please introduce yourself briefly.",
zh: "请简单介绍一下自己。",
}
수정할 파일
타입/헬퍼 (추가)
types/i18n.ts — Localized<T> 유틸 타입 추가
types/portfolio.ts — LocalizedInterviewQuestion 추가. 기존 InterviewQuestion (string 필드) 그대로 유지
lib/i18n/locale-utils.ts — localize, localizeQuestion, localizeQuestions 헬퍼 추가
app/[locale]/dictionaries.ts — hasLocale 타입 가드 export 추가 (Next.js 16 공식 패턴)
app/[locale]/layout.tsx — i18nConfig.locales.includes(locale) → hasLocale(locale) 교체로 타입 narrow
데이터 파일 (question/answer { ko: ... } 래핑)
타입을 LocalizedInterviewQuestion[] 로 바꾸고 각 질문의 question, answer 를 { ko: ... } 로 래핑:

data/interview/general.ts — 342줄
data/interview/backend.ts — 97줄
data/interview/frontend.ts — 44줄
data/interview/defensive-tactics.ts — 553줄
data/interview/wipro.ts — 435줄
data/interview/infra/core.ts — 193줄
data/interview/infra/data.ts — 276줄
data/interview/infra/networking.ts — 167줄
data/interview/infra/observability.ts — 940줄 (최대)
data/interview/infra/operations.ts — 314줄
data/interview/infra/soft-skills.ts — 71줄
data/interview/infra/index.ts — 37줄 (export 타입만 조정)
data/interview/index.ts — 32줄 (export 타입만 조정)
페이지 (변환 호출 + hasLocale 가드)
app/[locale]/interview/page.tsx — hasLocale 가드 + localizeQuestions(interviewQuestions, locale) 호출. params 타입을 Promise<{ locale: string }> 로 완화
app/[locale]/interview/wipro/page.tsx — 동일 패턴
테스트
tests/data/interview-qa.test.ts — q.question.ko, q.answer.ko 로 assertion 수정. localize 헬퍼 라운드트립 테스트 추가 (ko → string, fallback 동작)
변경 불필요 (확인 완료)
components/interview/qa-table.tsx — InterviewQuestion (string 필드) 소비, 수정 불필요. 검색 필터 q.question.toLowerCase() 도 서버에서 localize 된 문자열이므로 정상 동작
components/interview/quiz-mode.tsx — currentQuestion.question/answer 를 string 으로 렌더, 수정 불필요
components/interview/interview-tabs-client.tsx, interview-tabs.tsx — 동일
app/[locale]/dictionaries/_.json — UI 껍데기 번역용, interview Q&A 이관 없음
types/i18n.ts:PageProps/LayoutProps — Next.js 16 글로벌 PageProps<'/[locale]'> 와 이름 충돌이지만, 이번 PR 범위 밖. 신규 페이지도 프로젝트 helper 사용 유지.
generateStaticParams — layout.tsx:20 에 이미 존재, 모든 하위 라우트가 ko/en/zh 로 정적 생성됨. interview 라우트에는 별도 추가 불필요.
재사용할 기존 자산
types/portfolio.ts:15-37 — Experience 의 { ko, en, zh } 패턴. 이름/용법을 일관되게 가져간다.
lib/i18n/locale-utils.ts — 이미 getLocaleFromPathname, buildLocalePath 등 locale 유틸이 모여 있는 위치. 새 localize_ 헬퍼도 여기에 추가.
app/[locale]/dictionaries — locale-aware 동적 import 패턴. 변경 없음.
작업 순서 (구현 단계)
Phase A — 인프라 (Next.js 16 관용구 정렬)

app/[locale]/dictionaries.ts 에 hasLocale 타입 가드 export 추가
app/[locale]/layout.tsx 의 i18nConfig.locales.includes(locale) → hasLocale(locale) 교체
Phase B — 타입 & 헬퍼 3. types/i18n.ts 에 Localized<T> 추가 4. types/portfolio.ts 에 LocalizedInterviewQuestion 추가 (기존 InterviewQuestion 유지) 5. lib/i18n/locale-utils.ts 에 localize, localizeQuestion, localizeQuestions 추가

Phase C — 데이터 변환 6. data/interview/index.ts, data/interview/infra/index.ts 의 array 타입을 LocalizedInterviewQuestion[] 로 변경 7. 각 카테고리 파일(11개)의 배열 타입 교체 + question/answer 값을 { ko: <기존값> } 로 래핑

파일별 순차 편집 (observability.ts 가 940줄로 최대)
template literal concat 구조는 그대로 유지
Edit tool 의 정규식 기반 replace_all 활용 시 주의: 질문 포맷이 파일마다 균일하므로 question: "..." 패턴은 안전하지만, multi-line answer: 는 파일별로 수동 확인
Phase D — 페이지 변환 호출 8. app/[locale]/interview/page.tsx, wipro/page.tsx 에 hasLocale 가드 + localizeQuestions(..., locale) 호출

Phase E — 테스트/검증 9. **tests**/data/interview-qa.test.ts 를 새 타입(q.question.ko) 에 맞게 수정 + localize 헬퍼 라운드트립 테스트 10. pnpm tsc --noEmit / pnpm test / pnpm lint 통과 확인

Phase 독립성: A 와 B+C+D 는 독립적으로 머지 가능. A 만 먼저 머지해도 기존 라우팅 안전성이 올라간다.

검증 (end-to-end)

# 1. 타입 체크

pnpm tsc --noEmit

# 2. 단위 테스트

pnpm test -- interview-qa

# 3. Lint

pnpm lint

# 4. 개발 서버 기동

pnpm dev
수동 확인:

/ko/interview — 한국어 질문/답변 표시 (기존과 동일)
/en/interview — fallback으로 한국어 표시 (UI 껍데기는 영어)
/zh/interview — fallback으로 한국어 표시 (UI 껍데기는 중국어)
/ko/interview/wipro — 한국어 표시
/xx/interview (지원하지 않는 locale) — 404 반환 (hasLocale 가드 동작 확인)
검색 필터 (q.question.toLowerCase()) 동작 확인 — localize 후에도 string 이므로 문제 없어야 함
모달 열기/마크다운 렌더 정상 동작
빌드 시 generateStaticParams 가 ko/en/zh 3개 경로 모두 정적 생성하는지 (pnpm build 로그)
후속 (이번 PR 범위 외):

주요 질문 en/zh 번역 채우기 (점진적)
types/i18n.ts:PageProps/LayoutProps → Next.js 16 글로벌 helper PageProps<'/[locale]'> 로 마이그레이션
(선택) CI 에서 번역 미달 항목 감지 스크립트 — 각 질문의 en/zh 채움률 리포트
(선택) AI 기반 초벌 번역 스크립트 — Claude API 로 ko → en/zh 초벌 생성 후 사람 검수
(선택) next-intl 등 성숙한 i18n 라이브러리로 이관 검토 — ICU MessageFormat, plural/gender 지원 필요 시

마무리
.github/copilot-instructions.md 등 md 파일 최신화
