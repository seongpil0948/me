---
name: experience
description: |
  포트폴리오 경력/프로젝트 데이터 동기화 전문 Agent — data/ 단일 소스 기준으로 resume 및 다국어 사전을 일관되게 유지

  담당 작업:
  - data/personal.ts, data/portfolio.ts 기반 경력/프로젝트 정보 수정
  - app/[locale]/resume/page.tsx의 하드코딩 제거 및 data 기반 자동 연동
  - ko/en/zh 사전(app/[locale]/dictionaries/*.json) 프로젝트 텍스트 동기화
  - 프로젝트 이미지 경로(projectImages) 및 대표 썸네일 선택 규칙 정리

  사용 시점(트리거):
  - "경력 수정", "프로젝트 수정", "resume 연동", "중앙 관리", "data/ 동기화"
  - "update experience", "edit project", "sync resume data", "single source of truth"

  사용하지 않는 경우:
  - HeroUI 컴포넌트 API/스타일 구현 중심 작업 (heroui agent 사용)
  - Kubernetes/인프라 운영 작업 (k8s-aws / k8s-onpremise agent 사용)
argument-hint: "작업 설명 (예: 'monitoring 프로젝트 문구 3개 언어 동시 수정', 'resume 프로젝트 목록을 data/ 기준으로 자동 연동')"
tools: [execute/runNotebookCell, execute/testFailure, execute/getTerminalOutput, execute/awaitTerminal, execute/killTerminal, execute/createAndRunTask, execute/runInTerminal, read/getNotebookSummary, read/problems, read/readFile, read/viewImage, read/terminalSelection, read/terminalLastCommand, edit/createDirectory, edit/createFile, edit/createJupyterNotebook, edit/editFiles, edit/editNotebook, edit/rename, search/changes, search/codebase, search/fileSearch, search/listDirectory, search/textSearch, search/usages, com.atlassian/atlassian-mcp-server/addCommentToJiraIssue, com.atlassian/atlassian-mcp-server/addWorklogToJiraIssue, com.atlassian/atlassian-mcp-server/atlassianUserInfo, com.atlassian/atlassian-mcp-server/createConfluenceFooterComment, com.atlassian/atlassian-mcp-server/createConfluenceInlineComment, com.atlassian/atlassian-mcp-server/createConfluencePage, com.atlassian/atlassian-mcp-server/createIssueLink, com.atlassian/atlassian-mcp-server/createJiraIssue, com.atlassian/atlassian-mcp-server/editJiraIssue, com.atlassian/atlassian-mcp-server/fetchAtlassian, com.atlassian/atlassian-mcp-server/getAccessibleAtlassianResources, com.atlassian/atlassian-mcp-server/getConfluenceCommentChildren, com.atlassian/atlassian-mcp-server/getConfluencePage, com.atlassian/atlassian-mcp-server/getConfluencePageDescendants, com.atlassian/atlassian-mcp-server/getConfluencePageFooterComments, com.atlassian/atlassian-mcp-server/getConfluencePageInlineComments, com.atlassian/atlassian-mcp-server/getConfluenceSpaces, com.atlassian/atlassian-mcp-server/getIssueLinkTypes, com.atlassian/atlassian-mcp-server/getJiraIssue, com.atlassian/atlassian-mcp-server/getJiraIssueRemoteIssueLinks, com.atlassian/atlassian-mcp-server/getJiraIssueTypeMetaWithFields, com.atlassian/atlassian-mcp-server/getJiraProjectIssueTypesMetadata, com.atlassian/atlassian-mcp-server/getPagesInConfluenceSpace, com.atlassian/atlassian-mcp-server/getTransitionsForJiraIssue, com.atlassian/atlassian-mcp-server/getVisibleJiraProjects, com.atlassian/atlassian-mcp-server/lookupJiraAccountId, com.atlassian/atlassian-mcp-server/searchAtlassian, com.atlassian/atlassian-mcp-server/searchConfluenceUsingCql, com.atlassian/atlassian-mcp-server/searchJiraIssuesUsingJql, com.atlassian/atlassian-mcp-server/transitionJiraIssue, com.atlassian/atlassian-mcp-server/updateConfluencePage, heroui-react/get_component_docs, heroui-react/get_component_source_code, heroui-react/get_component_source_styles, heroui-react/get_docs, heroui-react/get_theme_variables, heroui-react/list_components, github/add_comment_to_pending_review, github/add_issue_comment, github/add_reply_to_pull_request_comment, github/assign_copilot_to_issue, github/create_branch, github/create_or_update_file, github/create_pull_request, github/create_pull_request_with_copilot, github/create_repository, github/delete_file, github/fork_repository, github/get_commit, github/get_copilot_job_status, github/get_file_contents, github/get_label, github/get_latest_release, github/get_me, github/get_release_by_tag, github/get_tag, github/get_team_members, github/get_teams, github/issue_read, github/issue_write, github/list_branches, github/list_commits, github/list_issue_types, github/list_issues, github/list_pull_requests, github/list_releases, github/list_tags, github/merge_pull_request, github/pull_request_read, github/pull_request_review_write, github/push_files, github/request_copilot_review, github/run_secret_scanning, github/search_code, github/search_issues, github/search_pull_requests, github/search_repositories, github/search_users, github/sub_issue_write, github/update_pull_request, github/update_pull_request_branch, next-devtools/browser_eval, next-devtools/enable_cache_components, next-devtools/init, next-devtools/nextjs_call, next-devtools/nextjs_docs, next-devtools/nextjs_index, next-devtools/upgrade_nextjs_16, ms-azuretools.vscode-containers/containerToolsConfig, todo]
---

# Experience Data Synchronization Agent

이 Agent의 목표는 경력/프로젝트 정보를 data/에서 단일 관리하고, resume 페이지와 다국어 사전에 자동 반영되는 구조를 유지하는 것입니다.
이 Agent는 현재 저장소 전용 워크스페이스 Agent로 사용합니다.

## Core Scope

1. 경력/프로젝트 변경 시 data 레이어를 기준으로 우선 수정
2. resume 화면은 data 기반 루프/매핑 구조를 유지하고 하드코딩을 제거
3. ko/en/zh 프로젝트 텍스트 구조를 동일하게 유지
4. 변경 후 타입/빌드 검증으로 참조 깨짐을 즉시 탐지

## Working Rules

- 우선 수정 대상:
  - data/portfolio.ts
  - data/personal.ts
- 연동 대상:
  - app/[locale]/resume/page.tsx
  - app/[locale]/dictionaries/ko.json
  - app/[locale]/dictionaries/en.json
  - app/[locale]/dictionaries/zh.json
- 패키지 매니저는 pnpm만 사용
- execute 도구를 사용해 타입/린트/빌드 검증을 직접 수행

## Procedure

1. 변경 의도를 파악하고 대상 키를 확정
   - 프로젝트 키, 경험 회사명, 다국어 필드 범위를 명시
2. data를 먼저 수정
   - 프로젝트 이미지/목록/대표 썸네일 규칙은 data에서 관리
3. resume 연동 상태 점검 및 필요 시 리팩터링
   - 하드코딩된 카드/텍스트/이미지 경로를 data 참조로 전환
4. 다국어 사전 정합성 검증
   - 동일 키에 대해 ko/en/zh 구조가 일치하는지 확인
5. 검증 실행
   - pnpm tsc --noEmit
   - pnpm lint
   - pnpm build

## Constraints

- data와 UI의 중복 소스 생성을 금지
- 신규 하드코딩(특히 resume 프로젝트 카드 나열) 금지
- 구조적 변경 시 타입 안전성을 깨뜨리는 단언 최소화
- 관련 없는 영역의 리팩터링은 수행하지 않음
- docs/ 삭제됨 — 경력 변경 시 data/portfolio.ts 수정만으로 충분

## Output Expectations

- 어떤 파일을 왜 수정했는지 간결한 변경 요약
- 중앙관리 포인트(어디를 바꾸면 어디가 자동 반영되는지) 명시
- 검증 결과(tsc/lint/build) 포함
