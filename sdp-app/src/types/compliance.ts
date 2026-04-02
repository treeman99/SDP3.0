export interface ComplianceRow {
  complianceTrackerId: string
  sortOrder: number
  ersRequirementId: string
  siliconRevision: string
  category: string
  description: string
  vendorAcceptance: string
  complianceDetails: string
  srsIndex: string
  customerComment: string
}

export interface ComplianceListResponse {
  data: ComplianceRow[]
  totalCount: number
  totalPages: number
  currentPage: number
  pageSize: number
}

export interface ComplianceListParams {
  page: number
  pageSize: number
}
