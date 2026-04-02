---
name: sdp30-figma-vite-react
description: >
  Figma 디자인을 Vite + TypeScript + React + TailwindCSS + shadcn/ui 프로젝트로 변환하는 전문 프론트엔드 개발 스킬.
  Orchestrator(총괄), Figma Reader(디자인 분석), Builder(코드 생성), Verifier(시각 검증), Architect(리팩토링)
  5개 에이전트가 협업하여 Figma 원본과 100% 일치하는 구현을 만든다.

  다음 상황에서 반드시 이 스킬을 사용할 것:
  - "Figma URL 줄게, 이걸 React로 만들어줘" 같은 요청
  - Figma 링크(figma.com/design/... 또는 figma.com/file/...)와 함께 화면/컴포넌트 구현 요청
  - "Vite + shadcn으로 프로젝트 만들어줘", "shadcn 세팅해줘"
  - "Figma 보고 프론트 개발해줘", "디자인 그대로 구현해줘"
  - TypeScript + React + Tailwind 스택으로 Figma 화면 구현 요청
  - 새 프론트엔드 프로젝트 스캐폴딩 후 Figma 기반 UI 개발
---

# Figma → Vite + React: 5-에이전트 협업 개발 스킬

이 스킬은 **5개 에이전트가 협업**하여 Figma 디자인을 프로덕션 코드로 변환한다.

| 에이전트 | 역할 | 상세 지시서 |
|---------|------|-----------|
| **Orchestrator** | 전체 흐름 제어, 사용자 커뮤니케이션, 에이전트 간 핸드오프 | 이 파일 (SKILL.md) |
| **Figma Reader** | Figma MCP로 디자인을 읽고 구조화된 분석 결과 출력 | `agents/figma-reader.md` |
| **Builder** | 분석 결과를 받아 React + TailwindCSS + shadcn/ui 코드 생성 | `agents/builder.md` |
| **Verifier** | Figma 스크린샷과 구현 스크린샷을 비교하여 100% 일치 검증 | `agents/verifier.md` |
| **Architect** | 검증 통과 후 코드 구조 리팩토링 수행 | `agents/architect.md` |

**합격 기준: Verifier 100점 (100% 일치)** — 1px 차이도 불합격.
**최대 반복: 10라운드** — 10라운드 내 100점 달성 실패 시 현재 상태로 종료.

---

## 오케스트레이션 흐름

```
사용자 → Figma URL 제공
  │
  ▼
[Step 0] 준비
  │  Figma URL 파싱, 기존 코드 정리, shadcn/ui 설치 확인, MCP 접근 확인
  │
  ▼
[Step 1] Figma Reader Agent 실행
  │  agents/figma-reader.md 참조
  │  MCP 도구로 디자인 분석 → 구조화된 분석 결과 출력
  │
  ▼
[Step 2] Builder Agent 실행                    ←── 반복 시작점
  │  agents/builder.md 참조
  │  (라운드 1) Figma Reader 분석 결과 → 코드 생성
  │  (라운드 2+) Verifier 피드백 → 코드 수정
  │  npm run dev로 개발 서버 실행
  │
  ▼
[Step 3] Verifier Agent 실행
  │  agents/verifier.md 참조
  │  Figma 스크린샷(MCP) + 사용자 캡처 스크린샷 비교
  │  8개 카테고리 × 100점 만점 채점
  │
  ├─ 100점 → [Step 4]로 진행
  └─ <100점 → [Step 2]로 복귀 (Verifier Diff 리포트 전달, 최대 10라운드)
  │
  ▼
[Step 4] Architect Agent 실행
  │  agents/architect.md 참조
  │  코드 구조 분석 및 리팩토링 수행
  │  (시각적 변경 없이 코드 품질만 개선)
  │
  ▼
[Step 5] 최종 결과 보고
```

---

## Step 0: 준비

### Figma URL 파싱

사용자가 제공한 Figma URL에서 `fileKey`와 `nodeId`를 추출한다:

```
URL: https://www.figma.com/design/<fileKey>/<fileName>?node-id=<int1>-<int2>
→ fileKey: <fileKey>
→ nodeId:  <int1>:<int2>    (하이픈을 콜론으로 바꾼다)

브랜치 URL: https://figma.com/design/<fileKey>/branch/<branchKey>/<fileName>
→ fileKey로 <branchKey>를 사용한다
```

### Figma 접근 방법 확인

**방법 A — Figma MCP (우선):**
`get_design_context`를 호출한다. 성공하면 MCP 방식으로 진행.

**방법 B — REST API (MCP 불가 시):**
MCP 실패 시 Figma Personal Access Token이 필요하다.
```
1. 환경 변수 FIGMA_TOKEN 확인
2. 없으면 사용자에게 직접 요청
3. 토큰을 어떤 파일에도 저장하지 않는다 (세션 내 메모리에서만 사용)
```

### shadcn/ui 설치 확인

프로젝트 루트(`sdp-app/`)에 `components.json`이 있는지 확인:
- 없으면: `npx shadcn@latest init -y` 실행 후 기본 컴포넌트 설치
- 있으면: 기존 설정 사용
- 상세 설정은 `references/project-setup.md` 참조

### 기존 코드 정리

이전 라운드에서 생성된 코드가 있으면:
- `src/components/` (ui/ 제외) 삭제
- `src/pages/` 삭제
- `src/data/` 삭제
- `App.tsx` 초기화

---

## 에이전트 간 데이터 핸드오프

### Orchestrator → Figma Reader
```
{ fileKey, nodeId, figmaUrl }
```

### Figma Reader → Builder (Orchestrator 경유)
```
구조화된 디자인 분석 결과 (Markdown 형식)
- 전체 구조, 섹션별 상세 분석, 디자인 토큰, 컴포넌트 매핑, 에셋 목록
```

### Builder → Verifier (Orchestrator 경유)
```
{ fileKey, nodeId, generatedFiles[], devServerUrl }
```

### Verifier → Builder (불합격 시, Orchestrator 경유)
```
Diff 리포트 (카테고리별 점수, 불일치 항목, 구체적 수정 방법)
```

### Verifier → Architect (합격 시, Orchestrator 경유)
```
{ generatedFiles[] }
```

---

## 반복 규칙

| 조건 | 행동 |
|------|------|
| Verifier 점수 = **100점** | 즉시 합격. Architect 단계로 진행. |
| **10라운드** 도달 | 현재 상태로 종료. 잔여 불일치 목록 전달. |
| 3라운드 연속 점수 변화 **2점 이하** | 사용자에게 수동 가이드 요청. |

### 사용자 커뮤니케이션

매 라운드마다 사용자에게 진행 상황을 보고한다:
```
## 라운드 N 결과
- Verifier 점수: XX/100
- 수정된 항목: N건
- 남은 불일치: N건
- 다음 단계: Builder에게 피드백 전달 → 코드 수정
```

---

## 최종 결과 보고 (Step 5)

루프 완료 후 사용자에게 전달:

```markdown
# 구현 완료 보고

## 결과 요약
- 최종 Verifier 점수: 100/100 ✅
- 총 반복 라운드: N회
- 라운드별 점수: 1회차 XX → 2회차 XX → ... → N회차 100

## 생성/수정된 파일 목록
- src/components/...
- src/pages/...

## Architect 리팩토링 결과
- 수행된 변경: N건
- 보류된 제안: N건

## 프로젝트 실행 방법
cd sdp-app && npm run dev
→ http://localhost:5173
```

---

## 참고 파일

| 파일 | 내용 |
|------|------|
| `agents/figma-reader.md` | Figma Reader Agent 상세 지시 (MCP 도구 사용, 디자인 분석) |
| `agents/builder.md` | Builder Agent 상세 지시 (코드 생성, 피드백 반영) |
| `agents/verifier.md` | Verifier Agent 상세 지시 (스크린샷 비교, 100점 기준 채점) |
| `agents/architect.md` | Architect Agent 상세 지시 (코드 구조 리팩토링) |
| `references/project-setup.md` | 프로젝트 초기 설정 상세 (vite.config, tsconfig, Tailwind 테마) |
| `references/shadcn-patterns.md` | shadcn/ui 컴포넌트 매핑 표 및 고급 사용 패턴 |
