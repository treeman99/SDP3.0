import type { StatusType } from '@/components/common/StatusBadge'
export type { StatusType }

export type ProgressType = 'In Progress' | 'In Approval' | 'Done'

export interface AssignedErsRow {
  index: string
  ersTitle: string
  tag?: 'NEW' | 'UPDATED'
  progress: ProgressType
  srsTitle: string
  support: StatusType
  assignDate: string
  lastUpdated: string
  coWorker: string
}

export interface ColumnDef {
  key: string
  label: string
  width: number
  sortable?: boolean
  filterable?: boolean
  hasInfo?: boolean
  infoTitle?: string
  infoDesc?: string
}

export const ersColumns: ColumnDef[] = [
  { key: 'index', label: 'Index', width: 60, sortable: true },
  { key: 'ersTitle', label: 'ERS Title', width: 180, sortable: true, filterable: true },
  { key: 'progress', label: 'Progress', width: 100, sortable: true, filterable: true },
  { key: 'srsTitle', label: 'SRS Title', width: 250, sortable: true, filterable: true },
  { key: 'support', label: 'Support', width: 90, sortable: true, filterable: true },
  { key: 'assignDate', label: 'Assign Date', width: 100, sortable: true },
  { key: 'lastUpdated', label: 'Last Updated', width: 100, sortable: true },
  { key: 'coWorker', label: 'Co-Worker', width: 160, sortable: true, filterable: true },
]

export const funcColumns: ColumnDef[] = [
  { key: 'functionTitle', label: 'Function Title', width: 180, sortable: true, filterable: true },
  { key: 'progress', label: 'Progress', width: 100, sortable: true, filterable: true },
  { key: 'linkedErs', label: 'Linked ERS', width: 100, sortable: true, hasInfo: true, infoTitle: 'Linked ERS', infoDesc: 'Linked ERS 설명' },
  { key: 'relatedErs', label: 'Related ERS', width: 100, sortable: true, hasInfo: true, infoTitle: 'Related ERS', infoDesc: 'Related ERS 설명' },
  { key: 'features', label: 'Features', width: 100, sortable: true, hasInfo: true, infoTitle: 'Features', infoDesc: 'Features 설명' },
  { key: 'assignDate', label: 'Assign Date', width: 100, sortable: true },
  { key: 'lastUpdated', label: 'Last Updated', width: 100, sortable: true },
  { key: 'coWorker', label: 'Co-Worker', width: 160, sortable: true, filterable: true },
]

export interface AssignedFunctionRow {
  functionTitle: string
  progress: ProgressType
  linkedErs: number
  relatedErs: number
  features: number
  assignDate: string
  lastUpdated: string
  coWorker: string
}
