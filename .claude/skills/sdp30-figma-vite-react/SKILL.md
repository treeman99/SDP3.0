---
name: sdp30-figma-vite-react
description: >
  Figma 디자인을 Vite + TypeScript + React + TailwindCSS + shadcn/ui 프로젝트로 변환하는 전문 프론트엔드 개발 스킬.
  Builder Agent(코드 생성), Comparator Agent(시각 비교), Architect Agent(코드 구조 최적화) 세 에이전트가
  반복 피드백을 주고받아 Figma 원본과 95% 이상 일치하는 구현을 만든다.

  다음 상황에서 반드시 이 스킬을 사용할 것:
  - "Figma URL 줄게, 이걸 React로 만들어줘" 같은 요청
  - Figma 링크(figma.com/design/... 또는 figma.com/file/...)와 함께 화면/컴포넌트 구현 요청
  - "Vite + shadcn으로 프로젝트 만들어줘", "shadcn 세팅해줘"
  - "Figma 보고 프론트 개발해줘", "디자인 그대로 구현해줘"
  - TypeScript + React + Tailwind 스택으로 Figma 화면 구현 요청
  - 새 프론트엔드 프로젝트 스캐폴딩 후 Figma 기반 UI 개발
---

# Figma → Vite + React: 3-에이전트 협업 개발 스킬

이 스킬은 **세 에이전트가 협업**하여 Figma 디자인을 프로덕션 코드로 변환한다.

| 에이전트 | 역할 | 상세 지시서 |
|---------|------|-----------|
| **Builder** | Figma를 읽고 코드를 생성·수정한다 | `agents/builder.md` |
| **Comparator** | 렌더링된 화면을 Figma 원본과 비교하고 수정 지시를 내린다 | `agents/comparator.md` |
| **Architect** | 코드 구조를 분석하고 리팩토링·통합 의견을 제시한다 | `agents/architect.md` |

합격 기준: **Comparator 일치도 95점 이상** 또는 **최대 5회 반복** 도달 시 종료.

---

## 오케스트레이션 흐름

```
[0. 준비] Figma URL에서 fileKey, nodeId 추출 → 프로젝트 셋업
     │
     ▼
[라운드 1]
     │
     ├─▶ Builder Agent
     │     Figma MCP로 디자인 읽기 → 코드 생성 → 개발 서버 실행
     │
     ├─▶ Comparator Agent  ←── (Builder 완료 후)
     │     Figma 스크린샷 + 브라우저 스크린샷 비교 → 시각 피드백
     │
     ├─▶ Architect Agent   ←── (Builder 완료 후)
     │     코드 구조 분석 → 중복 컴포넌트 통합 등 리팩토링 피드백
     │
     ▼
[라운드 2~5]
     │
     ├─▶ Builder Agent  ←── Comparator + Architect 피드백 수신
     │     피드백 반영하여 코드 수정 (시각 피드백 우선, 구조 피드백 병합)
     │
     ├─▶ Comparator Agent  ←── (Builder 수정 후)
     │     재비교 → 점수 갱신
     │
     ├─▶ Architect Agent   ←── (Builder 수정 후, 2라운드마다 실행)
     │     구조 재검토
     │
     ▼
  점수 ≥ 95 또는 5회 도달 → 완료
```

---

## 0단계: 준비

### Figma 접근 방법 확인 (필수 — 항상 가장 먼저 실행)

Figma 데이터에 접근하는 방법은 우선순위 순으로 두 가지다:

**방법 A — Figma MCP (우선):**
`get_design_context`, `get_screenshot` 등 MCP 도구를 바로 호출한다.
MCP가 정상 동작하면 토큰 없이 진행한다.

**방법 B — REST API (MCP 불가 시):**
MCP 호출이 실패하거나 MCP 서버가 없으면, Figma Personal Access Token이 필요하다.

```
토큰 확인 순서:
1. 환경 변수 FIGMA_TOKEN 에 값이 있는지 확인
   → 있으면 curl 헤더 X-Figma-Token: $FIGMA_TOKEN 사용
2. 없으면 → 사용자에게 직접 요청:

   "Figma Personal Access Token이 필요합니다.
    Figma → Settings → Security → Personal access tokens에서
    발급한 토큰(figd_... 형식)을 입력해주세요."

3. 사용자가 토큰을 입력하면 해당 세션에서만 사용한다.
   토큰을 어떤 파일에도 저장하지 않는다 (git 커밋 위험).
```

> **보안 주의:** 토큰을 `.claude/settings.local.json`, `.env`, 코드 파일 등
> 어디에도 기록하지 않는다. 세션 내 메모리에서만 사용한다.

---

### Figma URL 파싱

사용자가 제공한 Figma URL에서 `fileKey`와 `nodeId`를 추출한다. 이 값은 모든 Figma MCP 도구 호출에 필요하다.

```
URL 형식: https://www.figma.com/design/<fileKey>/<fileName>?node-id=<int1>-<int2>
→ fileKey: <fileKey>
→ nodeId:  <int1>:<int2>    (하이픈을 콜론으로 바꾼다)

브랜치 URL: https://figma.com/design/<fileKey>/branch/<branchKey>/<fileName>
→ fileKey로 <branchKey>를 사용한다
```

### 프로젝트 셋업

**신규 프로젝트:**
```bash
npm create vite@latest my-app -- --template react-ts
cd my-app && npm install
npm install -D tailwindcss @tailwindcss/vite
npx shadcn@latest init -y
npx shadcn@latest add button input card dialog sheet form label select textarea badge avatar dropdown-menu navigation-menu tabs separator scroll-area tooltip
npm install -D @types/node
```

자세한 설정(vite.config.ts, tsconfig.json, Tailwind 테마)은 `references/project-setup.md` 참고.

**기존 프로젝트:** `package.json`과 `src/components/ui/` 확인 후 부족한 부분만 보충.

---

## 라운드 실행 규칙

### 라운드 1

1. **Builder Agent 실행**: `agents/builder.md`를 읽고 따른다.
   - Figma MCP `get_design_context`와 `get_screenshot`으로 디자인 데이터를 가져온다.
   - 코드를 생성하고 `npm run dev`로 개발 서버를 시작한다.
   - Builder 완료 보고서를 작성한다.

2. **Comparator Agent 실행**: `agents/comparator.md`를 읽고 따른다.
   - Figma MCP `get_screenshot`로 원본 스크린샷을 다시 확보한다.
   - Chrome MCP로 `localhost:5173`에서 브라우저 스크린샷을 촬영한다.
   - 두 이미지를 6개 카테고리로 비교하고 점수와 수정 지시를 작성한다.

3. **Architect Agent 실행**: `agents/architect.md`를 읽고 따른다.
   - 생성된 코드 파일들을 분석한다.
   - 중복 컴포넌트, 공유 가능한 패턴, 구조 개선점을 보고한다.

### 라운드 2 이상

1. **Builder Agent**: Comparator의 시각 피드백(우선)과 Architect의 구조 피드백을 모두 받아 코드를 수정한다.
   - **시각 피드백이 항상 우선**: Figma 일치가 먼저이고, 코드 구조 개선은 일치도를 해치지 않는 범위에서 적용한다.
   - 수정 후 개발 서버 갱신(Vite HMR)을 확인한다.

2. **Comparator Agent**: 수정된 화면을 재비교하고 점수를 갱신한다.

3. **Architect Agent**: **2라운드마다** 실행한다 (라운드 2, 4에서). 매 라운드 구조 리뷰를 하면 Builder의 수정 사이클이 느려지기 때문이다.

### 종료 조건

| 조건 | 행동 |
|------|------|
| Comparator 점수 ≥ **95점** | 즉시 종료. 최종 코드 전달. |
| **5라운드** 완료 | 현재 상태로 종료. 잔여 이슈 목록 전달. |
| 2라운드 연속 점수 변화 **2점 이하** | 조기 종료. 더 이상 개선이 어렵다고 판단. |

### 종료 시 전달물

루프가 끝나면 사용자에게 다음을 전달한다:
- 최종 코드 파일 목록
- 라운드별 점수 변화 요약 (예: 1회차 62점 → 2회차 78점 → 3회차 91점 → 4회차 96점)
- 최종 Comparator 리포트 (잔여 불일치 있다면)
- Architect의 최종 구조 의견 (추후 리팩토링 참고용)

---

## 참고 파일

| 파일 | 내용 |
|------|------|
| `agents/builder.md` | Builder Agent 상세 지시 (Figma 읽기, 코드 생성, 피드백 반영) |
| `agents/comparator.md` | Comparator Agent 상세 지시 (스크린샷 비교, 95점 기준 채점, 피드백) |
| `agents/architect.md` | Architect Agent 상세 지시 (코드 구조 분석, 중복 통합, 리팩토링) |
| `references/project-setup.md` | 프로젝트 초기 설정 상세 (vite.config, tsconfig, Tailwind 테마) |
| `references/shadcn-patterns.md` | shadcn/ui 컴포넌트 매핑 표 및 고급 사용 패턴 |
