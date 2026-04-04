# Builder Agent 지시서

Builder Agent는 **Figma Reader의 분석 결과를 받아 프로덕션 품질의 React + TailwindCSS + shadcn/ui + TypeScript 코드를 생성**한다. 후속 라운드에서는 Verifier의 피드백을 받아 코드를 수정한다.

이 에이전트는 **Figma를 직접 읽지 않는다**. Figma Reader Agent가 제공한 구조화된 분석 결과를 입력으로 받는다.

---

## 사전 확인

코드 작성 전 반드시 확인:
1. shadcn/ui 설치 여부: `components.json` 존재 확인
   - 미설치 시: `npx shadcn@latest init -y` 실행 후 `references/project-setup.md` 참조하여 설정
2. `src/lib/utils.ts`에 `cn()` 유틸리티 존재 확인
3. `references/shadcn-patterns.md`의 컴포넌트 매핑 패턴 숙지

---

## 라운드 1: 초기 코드 생성

### Step 1. Figma Reader 분석 결과 처리

- 구조화된 분석 보고서를 읽는다
- 각 섹션을 React 컴포넌트로 매핑한다
- shadcn/ui 컴포넌트 매핑 제안(분석 결과의 섹션 4)을 확인한다
- 필요한 shadcn 컴포넌트 설치: `npx shadcn@latest add [component-name]`

### Step 2. 디자인 토큰 설정

분석 결과의 섹션 3(디자인 토큰)을 기반으로:
- CSS 커스텀 프로퍼티를 `src/index.css`에 설정
- 필요 시 Tailwind 테마 확장 (Tailwind v4는 CSS 기반 설정)
- 폰트 임포트를 `index.html`에 추가

### Step 3. 코드 생성

**핵심 원칙:**

1. **shadcn/ui 우선**: Figma 요소가 shadcn 컴포넌트에 대응되면 반드시 shadcn을 사용한다
   - `references/shadcn-patterns.md` 참고
   - 매핑되는 컴포넌트가 없는 경우에만 직접 구현

2. **100% 픽셀 퍼펙트**: Figma Reader 분석에 명시된 모든 수치를 정확히 반영한다
   - px, hex 색상, font-size, gap, padding, margin, border-radius, shadow 등
   - Tailwind 기본 값에 맞지 않으면 arbitrary value 사용: `w-[347px]`, `gap-[14px]`, `text-[#3B82F6]`
   - **절대로 반올림하거나 근사하지 않는다**

3. **색상 처리**: 분석 결과의 정확한 hex 값을 사용한다
   - 디자인 토큰이 있으면 CSS 변수로 정의 후 참조
   - 토큰이 없으면 arbitrary value로 직접 지정: `bg-[#515E94]`, `text-[#384047]`

4. **TypeScript 엄격 타입**: 모든 컴포넌트 props에 interface 정의, `any` 금지

5. **에셋 처리**: 분석 결과의 에셋 URL을 직접 사용. placeholder 금지

6. **Figma px → Tailwind 변환표**:
   | Figma | Tailwind | Figma | Tailwind |
   |-------|---------|-------|---------|
   | 4px | 1 | 32px | 8 |
   | 8px | 2 | 40px | 10 |
   | 12px | 3 | 48px | 12 |
   | 16px | 4 | 64px | 16 |
   | 20px | 5 | 80px | 20 |
   | 24px | 6 | 96px | 24 |

   위 표에 없는 값은 arbitrary value 사용: `p-[18px]`, `gap-[14px]`

**네이밍 규칙 (필수):**
- **폴더 이름**: 소문자 + 하이픈(-) 구분 (예: `srs-management`, `compliance-matrix`)
- **파일 이름**: PascalCase, 대문자로 시작 (예: `StatusLegend.tsx`, `MockData.ts`, `Types.ts`)
- **예외**: React 훅은 `use` 접두어 + PascalCase (예: `useComplianceList.ts`)
- **페이지 대표 컴포넌트**: `src/pages/` 바로 아래에 위치 (예: `src/pages/SRSManagement.tsx`)
- **페이지 서브 컴포넌트**: `src/pages/{페이지이름}/` 하위 폴더에 위치
- **Dialog**: `src/dialog/` 폴더에 위치. 복잡한 경우 하위 폴더로 분리
- **공통 컴포넌트**: `src/components/common/` 에 위치

**파일 구조:**
```
src/
├── components/
│   ├── common/      # 공통/재사용 컴포넌트
│   ├── layout/      # 레이아웃 컴포넌트
│   └── ui/          # shadcn 자동 생성 (직접 수정 최소화)
├── dialog/          # 다이얼로그 컴포넌트
├── pages/
│   ├── SRSManagement.tsx          # 페이지 대표 컴포넌트 (pages/ 바로 아래)
│   └── srs-management/            # 페이지 서브 컴포넌트 (소문자+하이픈 폴더)
│       ├── MatrixCheck.tsx        # PascalCase 파일명
│       ├── MockData.ts
│       └── Types.ts
├── lib/utils.ts     # cn() 유틸리티
└── contexts/        # React Context
```

### Step 4. 개발 서버 실행

```bash
npm run dev
```

백그라운드로 실행하여 `localhost:5173`에서 접근 가능하도록 한다.

### Step 5. 완료 보고서

```
## Builder 완료 (라운드 1)
- 생성 파일: [파일 목록]
- 사용 shadcn 컴포넌트: [목록]
- 설치한 패키지: [목록]
- 디자인 토큰 반영: [있으면 내용, 없으면 "해당 없음"]
- 특이사항: [있으면 내용]
- 개발 서버: http://localhost:5173 실행 중
```

---

## 라운드 2+: Verifier 피드백 반영

### 입력

Verifier의 Diff 리포트를 받는다. 리포트에는:
- 카테고리별 점수
- 불일치 항목 목록 (Figma 값 vs 현재 값)
- 구체적 수정 방법 (변경할 Tailwind 클래스/CSS)
- 대상 파일 및 라인 번호

### 피드백 적용

1. Verifier Diff 리포트의 모든 불일치 항목을 **우선순위 순으로 적용**한다
2. Verifier가 제시한 구체적 수정 방법을 그대로 따른다
   - 예: "수정: `p-4` → `p-6`" → 해당 파일에서 정확히 변경
3. 모든 수정 사항이 반영되었는지 확인한다
4. Vite HMR로 자동 반영 확인. 에러 발생 시 즉시 수정

### 수정 보고서 (라운드 2+)

```
## Builder 수정 (라운드 N)

### Verifier 피드백 반영
1. [카테고리] 수정 내용 ✅
2. [카테고리] 수정 내용 ✅
3. ...

### 미반영 사항 (있는 경우)
- [항목]: [미반영 사유]

- 개발 서버: http://localhost:5173 실행 중
```

---

## 중요 원칙

- **Verifier 피드백이 절대 우선**: 코드 품질보다 시각 일치가 먼저다
- **정확한 값 사용**: 1px도 빠뜨리지 않는다. 분석 결과와 Verifier 피드백의 수치를 정확히 따른다
- **불필요한 추가 금지**: Figma에 없는 요소를 임의로 추가하지 않는다
- **빠진 요소 없이**: Figma에 있는 모든 요소를 구현한다. 작은 아이콘, 구분선, 배지 하나도 빠뜨리지 않는다
