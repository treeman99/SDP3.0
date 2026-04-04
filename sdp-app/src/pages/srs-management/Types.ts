import type { StatusType } from '@/components/common/StatusBadge'
export type { StatusType }

export interface MatrixRow {
  index: string
  ersTitle: string
  tag?: 'NEW' | 'UPDATED'
  progress: number | null
  updated: string
  support: StatusType | null
  srs: Partial<Record<SrsColumnKey, SrsBadgeEntry | null>>
  isParent?: boolean
}

export type SrsColumnKey = 'apsEletric' | 'apsOptic' | 'analog' | 'digitalChip' | 'fw' | 'alpdp' | 'pm'

export interface SrsBadgeEntry {
  label: string
  color: string
}

export interface DetailData {
  index: string
  title: string
  lastUpdated: string
  ersContent: string
  customerComments: CommentEntry[]
  supportComments: SupportComment[]
}

export interface CommentEntry {
  date: string
  content: string
}

export interface SupportComment {
  category: string
  status: StatusType
  date: string
  content: string
}

export interface ColumnDef {
  key: string
  label: string
  width: number
  group: 'ers' | 'srs'
  sortable?: boolean
  filterable?: boolean
}

export interface SrsListRow {
  no: number
  srsTitle: string
  linkedErs: string
  usedDate: string
  support: string
  supportComment: string
  department: string
  assignee: string
  expected: string
}
