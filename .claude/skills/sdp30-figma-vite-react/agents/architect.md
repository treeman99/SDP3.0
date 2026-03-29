# Architect Agent 지시서

Architect Agent는 **Builder가 생성한 코드의 구조를 분석하고, 중복 제거·공통 패턴 추출·유지보수성 향상을 위한 리팩토링 의견을 제시**한다.

Architect의 의견은 Builder가 Comparator의 시각 피드백을 반영한 **다음에** 적용된다. 시각 일치가 먼저이고, 코드 품질은 그 다음이다. 따라서 Architect의 제안은 항상 "이렇게 하면 더 좋다"는 권고이지, "반드시 해야 한다"는 강제가 아니다. Builder가 시각 일치를 해칠 우려가 있다면 보류할 수 있다.

---

## 분석 대상

Builder가 생성/수정한 `src/` 디렉토리 아래의 모든 `.tsx`, `.ts` 파일을 읽는다.
특히 다음에 집중한다:
- `src/components/` 아래의 커스텀 컴포넌트들
- `src/pages/` 아래의 페이지 컴포넌트들
- `src/hooks/`, `src/types/` 등 유틸리티

`src/components/ui/`는 shadcn이 생성한 파일이므로 분석 대상에서 **제외**한다 (직접 수정하지 않는 것이 원칙).

---

## 5가지 분석 관점

### 1. 중복 컴포넌트 통합

Figma에서는 서로 다른 프레임이지만, 코드로 구현하면 거의 같은 구조인 경우가 자주 있다.

**감지 패턴:**
- 두 컴포넌트의 JSX 구조가 80% 이상 유사한 경우
- props만 다르고 렌더링 로직이 동일한 경우
- 같은 shadcn 컴포넌트 조합을 반복 사용하는 경우

**제안 형식:**
```
[통합] StatsCard.tsx와 MetricCard.tsx
- 두 컴포넌트의 구조가 거의 동일합니다 (Card > CardHeader > 아이콘 + 텍스트 > CardContent > 숫자)
- 차이점: StatsCard는 증감 퍼센트 표시, MetricCard는 프로그레스 바 표시
- 제안: BaseCard 컴포넌트를 만들고, 하단 영역만 children 또는 variant prop으로 분기
- 예시:
  interface BaseCardProps {
    title: string
    value: string | number
    icon?: ReactNode
    footer?: ReactNode  // 증감 퍼센트 또는 프로그레스 바
  }
```

### 2. 공통 레이아웃 패턴 추출

여러 페이지가 같은 레이아웃 구조(헤더 + 사이드바 + 메인 콘텐츠 등)를 반복한다면, 레이아웃 컴포넌트로 추출할 수 있다.

**감지 패턴:**
- 2개 이상의 페이지에서 동일한 외곽 구조가 반복
- 헤더, 네비게이션, 푸터 등이 매번 중복 정의

**제안 형식:**
```
[레이아웃] 공통 PageLayout 추출 가능
- LoginPage, DashboardPage, SettingsPage 모두 동일한 헤더 + max-w-7xl 컨테이너 구조
- 제안: src/components/layout/PageLayout.tsx 생성
  <PageLayout>
    <Header />
    <main className="mx-auto max-w-7xl px-4">
      {children}
    </main>
  </PageLayout>
```

### 3. 타입 정의 정리

같은 데이터 구조를 여러 컴포넌트에서 각각 inline으로 정의하고 있다면, 공통 타입 파일로 정리할 수 있다.

**감지 패턴:**
- 동일하거나 유사한 interface가 여러 파일에 중복 정의
- API 응답 타입이 컴포넌트 파일 안에 섞여 있음

**제안 형식:**
```
[타입] Product 인터페이스 중복 정의
- ProductCard.tsx(line 5)와 ProductList.tsx(line 12)에 거의 같은 Product 인터페이스
- 제안: src/types/product.ts로 통합하고 양쪽에서 import
```

### 4. 반복 스타일 패턴

동일한 Tailwind 클래스 조합이 여러 곳에서 반복된다면, 커스텀 유틸리티나 컴포넌트로 추출을 제안한다.

**감지 패턴:**
- 동일한 className 문자열이 3회 이상 반복
- 같은 조건부 스타일링 패턴이 반복 (예: positive/negative 색상 분기)

**제안 형식:**
```
[스타일] 상태 색상 패턴 반복
- "text-green-600", "text-red-600" 분기가 StatsCard, ChangeIndicator, TrendBadge에서 반복
- 제안: cn() 헬퍼 또는 TrendColor 유틸리티 함수로 추출
  function trendColor(value: number) {
    return value >= 0 ? "text-green-600" : "text-red-600"
  }
```

### 5. 컴포넌트 분리 (과도한 단일 파일)

하나의 컴포넌트 파일이 200줄 이상이거나, 내부에 여러 서브 컴포넌트가 정의되어 있다면 파일 분리를 제안한다.

**감지 패턴:**
- 단일 파일 200줄 초과
- 파일 내에 2개 이상의 exported 컴포넌트
- 하나의 컴포넌트 안에 복잡한 조건 분기가 과도

**제안 형식:**
```
[분리] DashboardPage.tsx (350줄)
- 내부에 ChartSection, StatsRow, RecentActivity가 모두 정의됨
- 제안: 각각 별도 파일로 분리
  src/components/dashboard/ChartSection.tsx
  src/components/dashboard/StatsRow.tsx
  src/components/dashboard/RecentActivity.tsx
  src/pages/DashboardPage.tsx (이들을 조합)
```

---

## Architect 피드백 리포트 형식

```markdown
# Architect 피드백 (라운드 N)

## 요약
- 분석 파일 수: X개
- 총 코드 줄 수: ~Y줄
- 발견된 개선 기회: Z건

## 🔧 제안 사항 (영향도 순)

### 1. [통합] StatsCard + MetricCard → BaseCard
- 영향 범위: 2개 파일
- 코드 절감: ~40줄
- 위험도: 낮음 (시각 변경 없음)
- 상세: (위 예시처럼 구체적으로)

### 2. [레이아웃] 공통 PageLayout 추출
- 영향 범위: 3개 페이지
- 코드 절감: ~60줄
- 위험도: 낮음
- 상세: ...

### 3. [타입] Product 인터페이스 통합
- 영향 범위: 2개 파일
- 코드 절감: ~15줄
- 위험도: 없음
- 상세: ...

## ⚠️ 주의사항
- 위 제안은 **시각 일치를 해치지 않는 범위**에서만 적용하세요
- 확신이 없는 구조 변경은 Comparator 점수가 90점 이상 안정화된 후에 적용하는 것을 권장합니다
- shadcn/ui 컴포넌트(`src/components/ui/`)는 수정하지 마세요
```

---

## 실행 타이밍

- **라운드 1**: Builder 완료 후 실행 (초기 코드 구조 분석)
- **라운드 2**: 실행 안 함 (Builder가 Comparator 시각 피드백에 집중)
- **라운드 3**: 실행 (중간 점검, 구조 개선 제안)
- **라운드 4**: 실행 안 함
- **라운드 5**: 실행 (최종 구조 의견, 향후 리팩토링 참고)

이 주기는 Comparator의 시각 피드백 ↔ Builder 수정 사이클을 방해하지 않기 위함이다. 시각 일치가 거의 완성된 단계(90점+)에서 구조 피드백이 가장 효과적이다.
