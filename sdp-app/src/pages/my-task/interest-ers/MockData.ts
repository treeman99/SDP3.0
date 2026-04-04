import type { AssignedErsRow, AssignedFunctionRow } from '../Types'

export interface ErsSubscription {
  id: string
  title: string
}

export const ersSubscriptionList: ErsSubscription[] = [
  { id: '1', title: 'ERS List Title' },
  { id: '2', title: 'ERS List Title' },
  { id: '3', title: 'ERS List Title' },
  { id: '4', title: 'ERS List Title' },
  { id: '5', title: 'ERS List Title' },
  { id: '6', title: 'ERS List Title' },
]

export const interestErsData: AssignedErsRow[] = [
  { index: '1.1.2', ersTitle: 'Project Overview', progress: 'In Progress', srsTitle: 'SRS Concept Test EltrProject Overview', support: 'Pending', assignDate: '2025-05-23', lastUpdated: '2025-05-23', coWorker: '이삼성, 김삼성, 천삼성' },
  { index: '1.1.3', ersTitle: 'Purpose Overview', progress: 'In Progress', srsTitle: 'Purpose Overview', support: 'Accepted', assignDate: '2025-05-23', lastUpdated: '2025-05-23', coWorker: '이삼성, 김삼성 외 2명' },
  { index: '1.3.1', ersTitle: 'Scope 51', progress: 'In Progress', srsTitle: 'Scope 51', support: 'Pending', assignDate: '2025-05-25', lastUpdated: '2025-05-25', coWorker: '이삼성, 김삼성' },
  { index: '1.3.2', ersTitle: 'Expectation ABCD', tag: 'NEW', progress: 'Done', srsTitle: 'Expectation ABCD', support: 'Accepted', assignDate: '2025-05-25', lastUpdated: '2025-05-25', coWorker: '' },
  { index: '1.3.2.1', ersTitle: 'Expectation BCDEF', tag: 'UPDATED', progress: 'In Progress', srsTitle: 'Expectation BCDEF', support: 'Accepted', assignDate: '2025-05-23', lastUpdated: '2025-05-23', coWorker: 'Mohamed Salah' },
  { index: '1.4.2.2', ersTitle: 'Expectation BCDF', progress: 'In Approval', srsTitle: 'Expectation BCDF', support: 'Accepted', assignDate: '2025-05-23', lastUpdated: '2025-05-23', coWorker: '이삼성, 김삼성 외 3명' },
  { index: '1.5.3', ersTitle: 'Expectation ABCEFG', progress: 'Done', srsTitle: 'Expectation ABCEFG', support: 'Accepted', assignDate: '2025-05-23', lastUpdated: '2025-05-23', coWorker: '김삼성' },
  { index: '1.6', ersTitle: 'Function Overview', progress: 'Done', srsTitle: 'Function Overview', support: 'Accepted', assignDate: '2025-05-23', lastUpdated: '2025-05-23', coWorker: '이삼성, 김삼성, 천삼성' },
  { index: '1.6.1', ersTitle: 'Production W123', progress: 'In Progress', srsTitle: 'Production W123', support: 'Rejected', assignDate: '2025-05-23', lastUpdated: '2025-05-23', coWorker: '' },
  { index: '1.6.2', ersTitle: 'Expectation ABCD', progress: 'In Progress', srsTitle: 'Expectation ABCD', support: 'Accepted', assignDate: '2025-05-23', lastUpdated: '2025-05-23', coWorker: '천삼성' },
  { index: '2', ersTitle: 'Purpose', progress: 'Done', srsTitle: 'Purpose', support: 'Accepted', assignDate: '2025-05-23', lastUpdated: '2025-05-23', coWorker: '-' },
]

export const interestFunctionData: AssignedFunctionRow[] = [
  { functionTitle: 'Project Overview', progress: 'In Progress', linkedErs: 40, relatedErs: 40, features: 40, assignDate: '2025-05-23', lastUpdated: '2025-05-23', coWorker: '이삼성, 김삼성, 천삼성' },
  { functionTitle: 'Purpose Overview', progress: 'In Progress', linkedErs: 40, relatedErs: 40, features: 40, assignDate: '2025-05-23', lastUpdated: '2025-05-23', coWorker: '이삼성, 김삼성 외 2명' },
  { functionTitle: 'Scope 51', progress: 'In Progress', linkedErs: 40, relatedErs: 40, features: 40, assignDate: '2025-05-25', lastUpdated: '2025-05-25', coWorker: '이삼성, 김삼성' },
  { functionTitle: 'Expectation ABCD', progress: 'Done', linkedErs: 0, relatedErs: 0, features: 0, assignDate: '2025-05-25', lastUpdated: '2025-05-25', coWorker: '이삼성, 김삼성' },
  { functionTitle: 'Expectation BCDEF', progress: 'In Progress', linkedErs: 30, relatedErs: 30, features: 30, assignDate: '2025-05-23', lastUpdated: '2025-05-23', coWorker: 'Mohamed Salah' },
  { functionTitle: 'Expectation BCDF', progress: 'In Approval', linkedErs: 30, relatedErs: 30, features: 30, assignDate: '2025-05-23', lastUpdated: '2025-05-23', coWorker: '이삼성, 김삼성 외 3명' },
  { functionTitle: 'Expectation ABCEFG', progress: 'Done', linkedErs: 30, relatedErs: 30, features: 30, assignDate: '2025-05-23', lastUpdated: '2025-05-23', coWorker: '김삼성' },
  { functionTitle: 'Function Overview', progress: 'Done', linkedErs: 30, relatedErs: 30, features: 30, assignDate: '2025-05-23', lastUpdated: '2025-05-23', coWorker: '이삼성, 김삼성, 천삼성' },
  { functionTitle: 'Production W123', progress: 'In Progress', linkedErs: 30, relatedErs: 30, features: 30, assignDate: '2025-05-23', lastUpdated: '2025-05-23', coWorker: '천삼성' },
  { functionTitle: 'Expectation ABCD', progress: 'In Progress', linkedErs: 30, relatedErs: 30, features: 30, assignDate: '2025-05-23', lastUpdated: '2025-05-23', coWorker: '천삼성' },
  { functionTitle: 'Purpose', progress: 'Done', linkedErs: 30, relatedErs: 30, features: 30, assignDate: '2025-05-23', lastUpdated: '2025-05-23', coWorker: '-' },
]

export const interestErsSummary = { total: 24, inProgress: 12, inApproval: 1, done: 11 }
