export interface FunctionItem {
  id: number
  title: string
  assignee: string
  coWorker: string
  linkedErs: number
  relatedErs: number
  features: number
  sor: string
  uArch: string
  import: string
}

export const functionMockData: FunctionItem[] = [
  { id: 1, title: 'AFC Champions League01', assignee: '이삼성, 김섬성, 천삼성', coWorker: 'Mohamed Salah', linkedErs: 1, relatedErs: 1, features: 3, sor: 'View SOR', uArch: 'View μARCH', import: 'Import Function' },
  { id: 2, title: 'AFC Champions League02', assignee: '이삼성, 김섬성 외 2명', coWorker: '천삼성', linkedErs: 1, relatedErs: 1, features: 4, sor: 'View SOR', uArch: 'View μARCH', import: 'Import Function' },
  { id: 3, title: 'UEFA Champions League02', assignee: '이삼성, 김섬성', coWorker: 'Heung-min Son', linkedErs: 2, relatedErs: 2, features: 6, sor: 'View SOR', uArch: 'View μARCH', import: 'Import Function' },
  { id: 4, title: 'UEFA Champions League03', assignee: '이삼성, 김섬성', coWorker: 'Heung-min Son', linkedErs: 0, relatedErs: 0, features: 7, sor: 'View SOR', uArch: 'View μARCH', import: 'Import Function' },
  { id: 5, title: 'UEFA Champions League04', assignee: 'Mohamed Salah', coWorker: 'Heung-min Son', linkedErs: 0, relatedErs: 0, features: 0, sor: 'View SOR', uArch: 'View μARCH', import: 'Import Function' },
  { id: 6, title: 'UEFA Champions League04', assignee: '이삼성, 김섬성 외 3명', coWorker: '천삼성', linkedErs: 1, relatedErs: 1, features: 9, sor: 'View SOR', uArch: 'View μARCH', import: 'Import Function' },
  { id: 7, title: 'AFC Champions League06', assignee: '김삼성', coWorker: '김삼성', linkedErs: 3, relatedErs: 3, features: 0, sor: 'View SOR', uArch: 'View μARCH', import: 'Import Function' },
  { id: 8, title: 'AFC Champions League07', assignee: '이삼성, 김섬성, 천삼성', coWorker: '박삼성', linkedErs: 21, relatedErs: 21, features: 8, sor: 'View SOR', uArch: 'View μARCH', import: 'Import Function' },
  { id: 9, title: 'AFC Champions League08', assignee: '천삼성', coWorker: '천삼성', linkedErs: 15, relatedErs: 15, features: 4, sor: 'View SOR', uArch: 'View μARCH', import: 'Import Function' },
  { id: 10, title: 'AFC Champions League09', assignee: '천삼성', coWorker: '천삼성', linkedErs: 4, relatedErs: 4, features: 7, sor: 'View SOR', uArch: 'View μARCH', import: 'Import Function' },
  { id: 11, title: 'AFC Champions League10', assignee: '이삼성, 김섬성, 천삼성', coWorker: '김삼성', linkedErs: 5, relatedErs: 5, features: 15, sor: 'View SOR', uArch: 'View μARCH', import: 'Import Function' },
  { id: 12, title: 'AFC Champions League01', assignee: '이삼성, 김섬성 외 2명', coWorker: '천삼성', linkedErs: 1, relatedErs: 1, features: 10, sor: 'View SOR', uArch: 'View μARCH', import: 'Import Function' },
  { id: 13, title: 'FIFA CLUB WORLD CUP 2025', assignee: '이삼성, 김섬성', coWorker: '김삼성', linkedErs: 1, relatedErs: 1, features: 10, sor: 'View SOR', uArch: 'View μARCH', import: 'Import Function' },
  { id: 14, title: 'FIFA CLUB WORLD CUP 2025', assignee: '이삼성, 김섬성', coWorker: '김삼성', linkedErs: 2, relatedErs: 2, features: 22, sor: 'View SOR', uArch: 'View μARCH', import: 'Import Function' },
  { id: 15, title: 'FIFA CLUB WORLD CUP 2025', assignee: 'Mohamed Salah', coWorker: '천삼성', linkedErs: 0, relatedErs: 0, features: 7, sor: 'View SOR', uArch: 'View μARCH', import: 'Import Function' },
  { id: 16, title: 'AFC Champions League01', assignee: '이삼성, 김섬성 외 3명', coWorker: '김삼성', linkedErs: 0, relatedErs: 0, features: 1, sor: 'View SOR', uArch: 'View μARCH', import: 'Import Function' },
  { id: 17, title: 'AFC Champions League01', assignee: '김삼성', coWorker: '박삼성', linkedErs: 0, relatedErs: 1, features: 1, sor: 'View SOR', uArch: 'View μARCH', import: 'Import Function' },
  { id: 18, title: 'AFC Champions League01', assignee: '이삼성, 김섬성, 천삼성', coWorker: '천삼성', linkedErs: 1, relatedErs: 1, features: 1, sor: 'View SOR', uArch: 'View μARCH', import: 'Import Function' },
  { id: 19, title: 'AFC Champions League01', assignee: '천삼성', coWorker: '천삼성', linkedErs: 1, relatedErs: 1, features: 1, sor: 'View SOR', uArch: 'View μARCH', import: 'Import Function' },
  { id: 20, title: 'ABC ADC', assignee: '천삼성', coWorker: '김삼성', linkedErs: 2, relatedErs: 2, features: 2, sor: 'View SOR', uArch: 'View μARCH', import: 'Import Function' },
  { id: 21, title: 'ABC ADC', assignee: '이삼성, 김섬성, 천삼성', coWorker: '박삼성', linkedErs: 0, relatedErs: 0, features: 0, sor: 'View SOR', uArch: 'View μARCH', import: 'Import Function' },
  { id: 22, title: 'ABC ADC', assignee: '이삼성, 김섬성 외 2명', coWorker: '천삼성', linkedErs: 0, relatedErs: 0, features: 0, sor: 'View SOR', uArch: 'View μARCH', import: 'Import Function' },
  { id: 23, title: 'ABC ADC', assignee: '이삼성, 김섬성', coWorker: '천삼성', linkedErs: 1, relatedErs: 1, features: 1, sor: 'View SOR', uArch: 'View μARCH', import: 'Import Function' },
  { id: 24, title: 'AFC Champions League01', assignee: '이삼성, 김섬성', coWorker: '박삼성', linkedErs: 1, relatedErs: 1, features: 1, sor: 'View SOR', uArch: 'View μARCH', import: 'Import Function' },
  { id: 25, title: 'AFC Champions League01', assignee: 'Mohamed Salah', coWorker: '천삼성', linkedErs: 2, relatedErs: 2, features: 2, sor: 'View SOR', uArch: 'View μARCH', import: 'Import Function' },
  { id: 26, title: 'UEFA Champions League04 UEFA Champions League04 AFC Champions League01', assignee: '이삼성, 김섬성 외 3명', coWorker: '이삼성, 김섬성', linkedErs: 0, relatedErs: 0, features: 0, sor: 'View SOR', uArch: 'View μARCH', import: 'Import Function' },
  { id: 27, title: 'UEFA Champions League04 UEFA Champions League04 AFC Champions League01', assignee: '김삼성', coWorker: '이삼성, 김섬성', linkedErs: 0, relatedErs: 0, features: 0, sor: 'View SOR', uArch: 'View μARCH', import: 'Import Function' },
  { id: 28, title: 'UEFA Champions League04 UEFA Champions League04 AFC Champions League01', assignee: '이삼성, 김섬성, 천삼성', coWorker: 'Mohamed Salah', linkedErs: 1, relatedErs: 1, features: 1, sor: 'View SOR', uArch: 'View μARCH', import: 'Import Function' },
  { id: 29, title: 'UEFA Champions League04 UEFA Champions League04 AFC Champions League01', assignee: '이삼성, 김섬성, 천삼성', coWorker: '이삼성, 김섬성 외 3명', linkedErs: 1, relatedErs: 1, features: 1, sor: 'View SOR', uArch: 'View μARCH', import: 'Import Function' },
  { id: 30, title: 'AFC Champions League01', assignee: '이삼성, 김섬성, 천삼성', coWorker: '이삼성, 김섬성, 천삼성', linkedErs: 2, relatedErs: 2, features: 2, sor: 'View SOR', uArch: 'View μARCH', import: 'Import Function' },
  { id: 31, title: 'AFC Champions League01', assignee: '이삼성, 김섬성, 천삼성', coWorker: '이삼성, 김섬성, 천삼성', linkedErs: 0, relatedErs: 0, features: 0, sor: 'View SOR', uArch: 'View μARCH', import: 'Import Function' },
  { id: 32, title: 'AFC Champions League01', assignee: '이삼성, 김섬성, 천삼성', coWorker: '김삼성', linkedErs: 0, relatedErs: 0, features: 0, sor: 'View SOR', uArch: 'View μARCH', import: 'Import Function' },
  { id: 33, title: 'AFC Champions League01', assignee: '천삼성', coWorker: '천삼성', linkedErs: 1, relatedErs: 1, features: 0, sor: 'View SOR', uArch: 'View μARCH', import: 'Import Function' },
  { id: 34, title: 'AFC Champions League01', assignee: '천삼성', coWorker: '천삼성', linkedErs: 0, relatedErs: 0, features: 0, sor: 'View SOR', uArch: 'View μARCH', import: 'Import Function' },
]
