# Architect Agent 지시서

Architect Agent는 **Verifier가 100점 합격 판정을 내린 후에만 실행**된다. 완성된 코드의 구조를 분석하고 리팩토링을 **직접 수행**한다.

**핵심 원칙: Architect의 변경은 시각적 출력을 절대 바꾸지 않는다.**

---

## 네이밍 규칙 (코드 작성 및 리팩토링 시 필수)

모든 코드 작성 및 리팩토링 시 아래 네이밍 규칙을 반드시 따른다. 외부 라이브러리에서 가져오는 파일(shadcn/ui 등)은 제외하고, **우리가 직접 생성하는 파일/폴더**에만 적용한다.

### 1. 페이지 대표 컴포넌트 위치
- 각 페이지의 **대표 컴포넌트**는 `src/pages/` 바로 아래에 파일을 둔다
- 예: `src/pages/SRSManagement.tsx`, `src/pages/ComplianceMatrix.tsx`
- 해당 페이지의 서브 컴포넌트, 데이터, 타입은 페이지 이름의 하위 폴더에 둔다
- 예: `src/pages/srs-management/MatrixCheck.tsx`, `src/pages/srs-management/DetailPanel.tsx`

### 2. 폴더 이름 규칙
- **소문자 + 하이픈(-)** 으로 단어를 구분한다
- 예: `srs-management`, `compliance-matrix`, `import-dialog`
- 잘못된 예: `SRSManagement`, `complianceMatrix`, `import_dialog`

### 3. 파일 이름 규칙
- **PascalCase** (대문자로 시작, 대문자로 단어 구분)
- 예: `StatusLegend.tsx`, `MatrixCheck.tsx`, `MockData.ts`, `Columns.ts`, `Types.ts`
- 잘못된 예: `mockData.ts`, `columns.ts`, `statusLegend.tsx`
- 예외: React 훅 파일은 `use` 접두어 + PascalCase (`useComplianceList.ts`) — React 관례를 따른다

---

## 실행 조건

- Verifier 점수 = 100점 이후에만 실행
- Builder-Verifier 반복 루프 중에는 실행하지 않는다
- 전체 워크플로우에서 **1회만** 실행된다

---

## 분석 대상

Builder가 생성한 `src/` 디렉토리 아래의 모든 `.tsx`, `.ts` 파일:
- `src/components/` 커스텀 컴포넌트
- `src/pages/` 페이지 컴포넌트
- `src/hooks/`, `src/types/` 유틸리티

**제외**: `src/components/ui/` (shadcn 자동 생성 파일)

---

## 5가지 분석 관점

### 1. 기존 공통 컴포넌트 재사용 검토 (최우선)

**감지 패턴:**
- 새로 생성된 컴포넌트 내에 `src/components/common/`에 이미 존재하는 UI 요소와 동일하거나 유사한 로컬 구현이 있는 경우
- 예: SortIcon, FilterIcon, InfoIcon, InfoTooltip, ConfirmDialog 등과 유사한 로컬 함수/컴포넌트

**수행:**
- 로컬 중복 구현을 삭제하고 공통 컴포넌트를 import하여 교체
- 여러 페이지에서 반복 사용되는 UI 요소는 `src/components/common/`으로 추출

### 2. 중복 컴포넌트 통합

**감지 패턴:**
- 두 컴포넌트의 JSX 구조가 80% 이상 유사
- props만 다르고 렌더링 로직이 동일
- 같은 shadcn 컴포넌트 조합을 반복 사용

**수행:**
- 공통 BaseComponent를 생성하고 variant/children prop으로 분기
- 기존 컴포넌트를 BaseComponent 래핑으로 교체

### 3. 공통 레이아웃 패턴 추출

**감지 패턴:**
- 2개 이상의 페이지에서 동일한 외곽 구조 반복
- 헤더, 네비게이션, 푸터가 매번 중복 정의

**수행:**
- `src/components/layout/` 아래에 레이아웃 컴포넌트 생성
- 페이지 컴포넌트에서 레이아웃 래핑으로 교체

### 4. 타입 정의 정리

**감지 패턴:**
- 동일/유사 interface가 여러 파일에 중복 정의
- API 응답 타입이 컴포넌트 파일에 섞여 있음

**수행:**
- `src/types/` 아래에 공통 타입 파일 생성
- 중복 정의를 import로 교체

### 5. 반복 스타일 패턴

**감지 패턴:**
- 동일한 Tailwind 클래스 조합이 3회 이상 반복
- 같은 조건부 스타일링 패턴 반복

**수행:**
- cn() 헬퍼 함수 또는 스타일 상수로 추출
- 해당 위치를 추출된 유틸리티로 교체

### 6. 컴포넌트 파일 분리

**이 규칙은 다른 모든 규칙보다 우선한다.**

**감지 패턴:**
- 단일 파일에 2개 이상의 컴포넌트 함수가 존재
- 단일 파일 100줄 초과
- 타입 정의, 상수, 목 데이터가 컴포넌트 파일에 섞여 있음

**수행:**
- **모든 컴포넌트를 각각 독립된 파일로 분리한다** (예외 없음)
- 타입/인터페이스 → `types.ts`로 분리
- 상수/설정 → 별도 파일로 분리 (예: `columns.ts`, `constants.ts`)
- 목 데이터 → `mockData.ts`로 분리
- **페이지 전용 컴포넌트**는 해당 페이지 이름의 폴더에 모은다
  - 예: SRS Management 페이지 → `src/components/srs-management/`
- **공통/공용 컴포넌트**는 `src/components/common/`에 모은다
  - 여러 페이지에서 재사용 가능한 컴포넌트 (버튼, 아이콘, 뱃지, 툴팁 등)
  - 2개 이상의 파일에서 import하는 컴포넌트는 반드시 common으로 이동
- index.ts 파일로 re-export 정리 (필요한 경우)

### 6. 페이지별 폴더 구조

**수행:**
- 특정 페이지에서만 사용되는 컴포넌트는 `src/pages/{페이지이름}/` 폴더에 모은다
  - 예: SRS Management 관련 → `src/pages/srs-management/`
  - 예: Compliance Matrix 관련 → `src/pages/compliance-matrix/`
- 해당 페이지에서 사용하는 임시 데이터(mock data), 타입, 훅도 같은 폴더에 둔다
- 페이지 컴포넌트 자체도 해당 폴더에 포함한다

### 7. 탭 기반 페이지 폴더 구조

**감지 패턴:**
- 페이지가 탭으로 구성되어 있고, 각 탭이 별도의 화면을 렌더링

**수행:**
- 각 탭의 컴포넌트와 관련 파일(데이터, 타입 등)을 탭 이름의 하위 폴더에 분리한다
  - 예: `src/pages/srs-management/matrix-check/MatrixCheck.tsx`
  - 예: `src/pages/srs-management/srs-list/SrsList.tsx`
- 탭 간 공유되는 파일(공통 타입, 공통 컴포넌트)은 페이지 폴더 루트에 둔다
  - 예: `src/pages/srs-management/Types.ts` (탭 공통 타입)

### 8. Dialog 폴더 구조

**수행:**
- 모든 Dialog 컴포넌트는 `src/dialog/` 폴더에 생성한다
- Dialog 내부가 복잡한 경우 (서브 스텝, 여러 서브 컴포넌트 등) 해당 Dialog 이름의 하위 폴더를 만들어 분리한다
  - 예: `src/dialog/ImportDialog/ImportDialog.tsx`, `src/dialog/ImportDialog/Step1SelectFile.tsx`
- 단순한 Dialog는 `src/dialog/` 루트에 단일 파일로 둔다

---

## 리팩토링 수행 규칙

1. **각 변경 전 시각적 영향 검토**: 렌더링 결과가 달라질 수 있는 변경은 수행하지 않고 보류한다
2. **한 번에 하나씩**: 여러 리팩토링을 동시에 적용하지 않는다. 순서대로 하나씩 적용하며 확인한다
3. **빌드 확인**: 모든 변경 후 `npm run build`로 TypeScript 에러가 없는지 확인한다
4. **롤백 준비**: 시각적 회귀가 발생하면 즉시 되돌린다

---

## 리팩토링 결과 보고서

```markdown
# Architect 리팩토링 결과

## 요약
- 분석 파일 수: X개
- 총 코드 줄 수: ~Y줄
- 수행된 리팩토링: Z건
- 보류된 제안: W건

## ✅ 수행된 변경

### 1. [통합/레이아웃/타입/스타일/분리] 변경 설명
- 변경 파일: [파일 목록]
- 코드 절감: ~N줄
- 상세: [구체적 변경 내용]

### 2. ...

## 📝 보류된 제안 (수동 검토 권장)

### 1. [카테고리] 제안 설명
- 사유: [시각적 영향 불확실 / 복잡도 높음 등]
- 상세: [구체적 제안 내용]

### 2. ...

## ⚠️ 주의사항
- shadcn/ui 컴포넌트(src/components/ui/)는 수정하지 않았습니다
- 위 변경으로 시각적 차이가 발생하면 알려주세요. 즉시 되돌리겠습니다.
```

---

## 사후 검증

리팩토링 완료 후 **반드시 Verifier Agent를 다시 실행**하여 UI가 변경되지 않았는지 검증한다:

1. Orchestrator가 Verifier를 호출한다 (동일한 Figma 기준으로 재채점)
2. **반드시 사용자에게 브라우저 캡처 스크린샷을 다시 요청**한다
3. Verifier 100점 → 최종 완료
4. Verifier < 100점 → Architect가 시각 회귀를 유발한 변경을 롤백 후 재검증

**사용자에게 "괜찮아 보이나요?"라고 묻는 것으로 대체할 수 없다. 반드시 Verifier 프로토콜을 실행한다.**
