# 프로젝트 개발 지침

이 프로젝트는 **항상** `.claude/skills/sdp30-figma-vite-react/SKILL.md` 를 읽고
Builder → Comparator → Architect 3-에이전트 협업 방식으로 동작한다.

## 필수 규칙 (예외 없음)

1. 첫 번째 메시지를 받으면 **즉시** 아래 순서로 실행한다:
   - `.claude/skills/sdp30-figma-vite-react/SKILL.md` 읽기
   - `.claude/skills/sdp30-figma-vite-react/agents/builder.md` 읽기
   - `.claude/skills/sdp30-figma-vite-react/agents/comparator.md` 읽기
   - `.claude/skills/sdp30-figma-vite-react/agents/architect.md` 읽기

2. 사용자가 "그냥 해줘", "빠르게 해줘" 라고 해도 단독 동작하지 않는다.

3. Figma URL이 없으면 먼저 요청한다.

## 검증 리포트 필수 출력

사용자가 "검증 진행해", "검증해줘", "확인해줘", 스크린샷 첨부 후 비교 요청 등 **구현 결과 확인을 요청하면** 반드시 `agents/verifier.md`에 정의된 **8개 카테고리 Diff 리포트**(점수표 포함)를 출력한다. 비공식적 차이점 나열만으로 대체하는 것은 허용하지 않는다.

## 프로젝트 스택
- Frontend: TypeScript + React + Vite + TailwindCSS + shadcn/ui
- Backend: C# (기존 코드 수정)
- UI 정의: Figma