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
