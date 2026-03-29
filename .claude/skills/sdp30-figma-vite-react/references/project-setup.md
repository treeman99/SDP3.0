# 프로젝트 초기 설정 상세 가이드

## 완성된 vite.config.ts 예시

```ts
import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

`path`를 사용하려면 타입 패키지를 설치한다:
```bash
npm install -D @types/node
```

## 완성된 tsconfig.json 예시

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

`tsconfig.app.json` (중요 부분):
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}
```

## shadcn 테마 커스터마이징

shadcn init 후 `src/index.css`에 CSS 변수가 생성된다. Figma의 색상 토큰이 있으면 이 변수를 수정한다:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;       /* Figma primary 색상으로 교체 */
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    /* 다크 모드 변수 */
  }
}
```

### Figma 색상을 CSS 변수로 변환하는 방법
Figma 색상 `#3B82F6` (파란색)를 HSL로 변환하려면:
- CSS에서: `hsl(217, 91%, 60%)` → shadcn 형식: `217 91% 60%`
- 온라인 변환기: https://www.rapidtables.com/convert/color/hex-to-hsl.html

## Tailwind 테마 확장 예시

Figma에 커스텀 색상/스페이싱이 있다면 `tailwind.config.js`를 확장한다:

```js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Figma 변수에서 가져온 브랜드 색상
        brand: {
          50: "hsl(var(--brand-50))",
          500: "hsl(var(--brand-500))",
          900: "hsl(var(--brand-900))",
        },
      },
      fontFamily: {
        // Figma에서 사용한 폰트
        sans: ["Inter", "sans-serif"],
        display: ["Pretendard", "sans-serif"],
      },
      spacing: {
        // Figma 커스텀 스페이싱 토큰
        18: "4.5rem",
        22: "5.5rem",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
}
```

## 폰트 설정

Figma에서 특정 폰트를 사용하면 `index.html`에 Google Fonts 링크를 추가한다:

```html
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
```

한국어 폰트가 필요하면 Pretendard를 추천한다:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
```

## 유용한 추가 패키지

```bash
# 아이콘 (필요한 경우만)
npm install lucide-react

# 폼 상태 관리
npm install react-hook-form @hookform/resolvers zod

# 라우팅
npm install react-router-dom

# 날짜 유틸리티
npm install date-fns

# 클래스 유틸리티 (shadcn에 이미 포함)
npm install clsx tailwind-merge
```
