import type { ComplianceRow, ComplianceListResponse, ComplianceListParams } from './Types'

const mockData: ComplianceRow[] = [
  { complianceTrackerId: 'ABDD-MCKA-04', sortOrder: 1, ersRequirementId: 'ABDD-MCKA-04', siliconRevision: 'AA', category: '', description: 'The Sensor', vendorAcceptance: 'Accepted', complianceDetails: '[PM(과제PL) - Accepted]', srsIndex: '[SRS-63]', customerComment: '[PM(과제PL) - Accepted]' },
  { complianceTrackerId: 'ABDD-MCKA-04', sortOrder: 1, ersRequirementId: 'ABDD-MCKA-04', siliconRevision: 'AA', category: '', description: 'The Sensor', vendorAcceptance: 'Accepted', complianceDetails: '[PM(과제PL) - Accepted]', srsIndex: '[SRS-63]', customerComment: '[PM(과제PL) - Accepted]' },
  { complianceTrackerId: 'ABDD-MCKA-05', sortOrder: 2, ersRequirementId: 'ABDD-MCKA-05', siliconRevision: 'AA', category: '', description: 'The Sensor', vendorAcceptance: 'Accepted', complianceDetails: '[PM(과제PL) - Accepted]', srsIndex: '[SRS-63]', customerComment: '[PM(과제PL) - Accepted]' },
  { complianceTrackerId: 'ABDD-MCKA-06', sortOrder: 0, ersRequirementId: 'ABDD-MCKA-06', siliconRevision: 'AA', category: '', description: 'Lotte Mart', vendorAcceptance: 'Accepted', complianceDetails: '[PM(과제PL) - Accepted]', srsIndex: '[SRS-63]', customerComment: '[PM(과제PL) - Accepted]' },
  { complianceTrackerId: 'ABDD-MCKA-07', sortOrder: 0, ersRequirementId: 'ABDD-MCKA-07', siliconRevision: 'AA', category: '', description: 'Lotte Mart', vendorAcceptance: 'Accepted', complianceDetails: '[Analog - Accepted]', srsIndex: '[SRS-63]', customerComment: '[Analog - Accepted]' },
  { complianceTrackerId: 'ABDD-MCKA-08', sortOrder: 1, ersRequirementId: 'ABDD-MCKA-08', siliconRevision: 'AA', category: '', description: 'Lotte Mart', vendorAcceptance: 'Accepted', complianceDetails: '[Analog - Accepted]', srsIndex: '[SRS-63]', customerComment: '[Analog - Accepted]' },
  { complianceTrackerId: 'ABDD-MCKA-09', sortOrder: 3, ersRequirementId: 'ABDD-MCKA-09', siliconRevision: 'AA', category: '', description: 'eMart', vendorAcceptance: 'Accepted', complianceDetails: '[Analog - Accepted]', srsIndex: '[SRS-63]', customerComment: '[Analog - Accepted]' },
  { complianceTrackerId: 'ABDD-MCKA-10', sortOrder: 21, ersRequirementId: 'ABDD-MCKA-10', siliconRevision: 'AA', category: '', description: 'eMart', vendorAcceptance: 'Accepted', complianceDetails: '[Analog - Accepted]', srsIndex: '[SRS-63]', customerComment: '[Analog - Accepted]' },
  { complianceTrackerId: 'ABDD-MCKA-11', sortOrder: 15, ersRequirementId: 'ABDD-MCKA-11', siliconRevision: 'AA', category: '', description: 'eMart', vendorAcceptance: 'Accepted', complianceDetails: '[Analog - Accepted]', srsIndex: '[SRS-63]', customerComment: '[Analog - Accepted]' },
  { complianceTrackerId: 'ABDD-MCKA-12', sortOrder: 4, ersRequirementId: 'ABDD-MCKA-12', siliconRevision: 'AA', category: '', description: 'eMart', vendorAcceptance: 'Accepted', complianceDetails: '[Analog - Accepted]', srsIndex: '[SRS-63]', customerComment: '[Analog - Accepted]' },
  { complianceTrackerId: 'ABDD-MCKA-13', sortOrder: 5, ersRequirementId: 'ABDD-MCKA-13', siliconRevision: 'AA', category: '', description: 'eMart', vendorAcceptance: 'Accepted', complianceDetails: '[Analog - Accepted]', srsIndex: '[SRS-63]', customerComment: '[Analog - Accepted]' },
  { complianceTrackerId: 'ABDD-MCKA-14', sortOrder: 1, ersRequirementId: 'ABDD-MCKA-14', siliconRevision: 'AA', category: '', description: 'Homeplus', vendorAcceptance: 'Accepted', complianceDetails: '[APS(Electric) - Accepted]', srsIndex: '[SRS-63]', customerComment: '[APS(Electric) - Accepted]' },
  { complianceTrackerId: 'ABDD-MCKA-15', sortOrder: 1, ersRequirementId: 'ABDD-MCKA-15', siliconRevision: 'AA', category: '', description: 'Homeplus', vendorAcceptance: 'Accepted', complianceDetails: '[APS(Electric) - Accepted]', srsIndex: '[SRS-63]', customerComment: '[APS(Electric) - Accepted]' },
  { complianceTrackerId: 'ABDD-MCKA-16', sortOrder: 2, ersRequirementId: 'ABDD-MCKA-16', siliconRevision: 'AA', category: '', description: 'Homeplus', vendorAcceptance: 'Accepted', complianceDetails: '[APS(Electric) - Accepted]', srsIndex: '[SRS-63]', customerComment: '[APS(Electric) - Accepted]' },
  { complianceTrackerId: 'ABDD-MCKA-17', sortOrder: 0, ersRequirementId: 'ABDD-MCKA-17', siliconRevision: 'AA', category: '', description: 'Homeplus', vendorAcceptance: 'Accepted', complianceDetails: '[APS(Electric) - Accepted]', srsIndex: '[SRS-63]', customerComment: '[APS(Electric) - Accepted]' },
  { complianceTrackerId: 'ABDD-MCKA-18', sortOrder: 0, ersRequirementId: 'ABDD-MCKA-18', siliconRevision: 'AA', category: '', description: 'Homeplus', vendorAcceptance: 'Accepted', complianceDetails: '[APS(Electric) - Accepted]', srsIndex: '[SRS-63]', customerComment: '[APS(Electric) - Accepted]' },
  { complianceTrackerId: 'ABDD-MCKA-19', sortOrder: 1, ersRequirementId: 'ABDD-MCKA-19', siliconRevision: 'AA', category: '', description: 'Homeplus', vendorAcceptance: 'Accepted', complianceDetails: '[APS(Electric) - Accepted]', srsIndex: '[SRS-63]', customerComment: '[APS(Electric) - Accepted]' },
  { complianceTrackerId: 'ABDD-MCKA-20', sortOrder: 1, ersRequirementId: 'ABDD-MCKA-20', siliconRevision: 'AA', category: '', description: 'GSSupermart', vendorAcceptance: 'Accepted', complianceDetails: '[APS(Electric) - Accepted]', srsIndex: '[SRS-63]', customerComment: '[APS(Electric) - Accepted]' },
  { complianceTrackerId: 'ABDD-MCKA-21', sortOrder: 1, ersRequirementId: 'ABDD-MCKA-21', siliconRevision: 'AA', category: '', description: 'GSSupermart', vendorAcceptance: 'Accepted', complianceDetails: '[Analog - Accepted]', srsIndex: '[SRS-63]', customerComment: '[Analog - Accepted]' },
  { complianceTrackerId: 'ABDD-MCKA-22', sortOrder: 2, ersRequirementId: 'ABDD-MCKA-22', siliconRevision: 'AA', category: '', description: 'GSSupermart', vendorAcceptance: 'Accepted', complianceDetails: '[Analog - Accepted]', srsIndex: '[SRS-63]', customerComment: '[Analog - Accepted]' },
  { complianceTrackerId: 'ABDD-MCKA-23', sortOrder: 0, ersRequirementId: 'ABDD-MCKA-23', siliconRevision: 'AA', category: '', description: 'GSSupermart', vendorAcceptance: 'Accepted', complianceDetails: '[Analog - Accepted]', srsIndex: '[SRS-63]', customerComment: '[Analog - Accepted]' },
  { complianceTrackerId: 'ABDD-MCKA-24', sortOrder: 0, ersRequirementId: 'ABDD-MCKA-24', siliconRevision: 'AA', category: '', description: 'GSSupermart', vendorAcceptance: 'Accepted', complianceDetails: '[Analog - Accepted]', srsIndex: '[SRS-63]', customerComment: '[Analog - Accepted]' },
  { complianceTrackerId: 'ABDD-MCKA-25', sortOrder: 1, ersRequirementId: 'ABDD-MCKA-25', siliconRevision: 'AA', category: '', description: 'RidI', vendorAcceptance: 'Accepted', complianceDetails: '[PM(과제PL) - Accepted]', srsIndex: '[SRS-63]', customerComment: '[PM(과제PL) - Accepted]' },
  { complianceTrackerId: 'ABDD-MCKA-26', sortOrder: 1, ersRequirementId: 'ABDD-MCKA-26', siliconRevision: 'AA', category: '', description: 'RidI', vendorAcceptance: 'Accepted', complianceDetails: '[PM(과제PL) - Accepted]', srsIndex: '[SRS-63]', customerComment: '[PM(과제PL) - Accepted]' },
  { complianceTrackerId: 'ABDD-MCKA-27', sortOrder: 2, ersRequirementId: 'ABDD-MCKA-27', siliconRevision: 'AA', category: '', description: 'RidI', vendorAcceptance: 'Accepted', complianceDetails: '[PM(과제PL) - Accepted]', srsIndex: '[SRS-63]', customerComment: '[PM(과제PL) - Accepted]' },
  { complianceTrackerId: 'ABDD-MCKA-28', sortOrder: 0, ersRequirementId: 'ABDD-MCKA-28', siliconRevision: 'AA', category: '', description: 'RidI', vendorAcceptance: 'Accepted', complianceDetails: '[PM(과제PL) - Accepted]', srsIndex: '[SRS-63]', customerComment: '[PM(과제PL) - Accepted]' },
  { complianceTrackerId: 'ABDD-MCKA-29', sortOrder: 0, ersRequirementId: 'ABDD-MCKA-29', siliconRevision: 'AA', category: '', description: 'ALDI', vendorAcceptance: 'Accepted', complianceDetails: '[APS(Electric) - Accepted]', srsIndex: '[SRS-63]', customerComment: '[APS(Electric) - Accepted]' },
  { complianceTrackerId: 'ABDD-MCKA-30', sortOrder: 1, ersRequirementId: 'ABDD-MCKA-30', siliconRevision: 'AA', category: '', description: 'ALDI', vendorAcceptance: 'Accepted', complianceDetails: '[APS(Electric) - Accepted]', srsIndex: '[SRS-63]', customerComment: '[APS(Electric) - Accepted]' },
  { complianceTrackerId: 'ABDD-MCKA-31', sortOrder: 1, ersRequirementId: 'ABDD-MCKA-31', siliconRevision: 'AA', category: '', description: 'ALDI', vendorAcceptance: 'Accepted', complianceDetails: '[APS(Electric) - Accepted]', srsIndex: '[SRS-63]', customerComment: '[APS(Electric) - Accepted]' },
]

/**
 * Mock API: 서버 통신으로 교체 시 이 함수만 수정하면 됨.
 * 예) return fetch(`/api/compliance?page=${params.page}&size=${params.pageSize}`).then(r => r.json())
 */
export async function fetchComplianceList(params: ComplianceListParams): Promise<ComplianceListResponse> {
  // 실제 API 연동 시 아래를 교체:
  // const res = await fetch(`/api/compliance?page=${params.page}&size=${params.pageSize}`)
  // return res.json()

  await new Promise((r) => setTimeout(r, 100)) // 네트워크 지연 시뮬레이션

  const start = (params.page - 1) * params.pageSize
  const end = start + params.pageSize
  const pageData = mockData.slice(start, end)
  const totalCount = 589 // 전체 서버 데이터 수 (mock)

  return {
    data: pageData,
    totalCount,
    totalPages: Math.ceil(totalCount / params.pageSize),
    currentPage: params.page,
    pageSize: params.pageSize,
  }
}
