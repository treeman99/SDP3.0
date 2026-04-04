import { useState } from 'react'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { PaginationButton, getVisiblePages } from '@/components/common/Pagination'
import { useComplianceList } from './compliance-matrix/useComplianceList'
import { ImportDialog } from '@/dialog/ImportDialog/ImportDialog'
import type { ComplianceRow } from './compliance-matrix/Types'

const columns: { key: keyof ComplianceRow; label: string; width: number }[] = [
  { key: 'complianceTrackerId', label: 'Compliance\nTracker ID', width: 160 },
  { key: 'sortOrder', label: 'Sort\nOrder', width: 70 },
  { key: 'ersRequirementId', label: 'ERS Requirement ID', width: 160 },
  { key: 'siliconRevision', label: 'Silicon\nRevision', width: 90 },
  { key: 'category', label: 'Category', width: 90 },
  { key: 'description', label: 'Description', width: 160 },
  { key: 'vendorAcceptance', label: 'Vendor\nAcceptance', width: 110 },
  { key: 'complianceDetails', label: 'Compliance Details', width: 180 },
  { key: 'srsIndex', label: 'SRS Index', width: 120 },
  { key: 'customerComment', label: 'Compliance Details(Customer Comment)', width: 281 },
]

export function ComplianceMatrix() {
  const [importOpen, setImportOpen] = useState(false)
  const {
    data,
    totalCount,
    totalPages,
    currentPage,
    setPage,
  } = useComplianceList(30)

  return (
    <div className="flex flex-col h-full">
      <ImportDialog open={importOpen} onClose={() => setImportOpen(false)} />
      {/* Page Sub-Header */}
      <div className="h-[40px] bg-[#F3F6F8] flex items-center px-[12px] gap-[4px] border-b border-[#E4E9ED]">
        <h1 className="text-[20px] font-bold leading-[24px] tracking-[0.8px] text-[#384047]">
          Compliance Matrix
        </h1>
        <button className="p-[4px] rounded-[2px] hover:bg-[#EDF2F4]">
          <IconInfo />
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between px-[12px] py-[6px]">
        {/* Left buttons */}
        <div className="flex items-center gap-0">
          <ToolbarButton label="Import" onClick={() => setImportOpen(true)} />
          <ToolbarButton label="Export" />
          <ToolbarDivider />
          <ToolbarButton label="History" />
        </div>

        {/* Right buttons */}
        <div className="flex items-center gap-0">
          <ToolbarButton label="Table Option" />
          <ToolbarDivider />
          <ToolbarButton label="30개씩 보기" hasDropdown />
          <ToolbarDivider />
          <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#565E66] pl-[6px]">
            Total: {totalCount}
          </span>
        </div>
      </div>

      {/* Data Table */}
      <div className="flex-1 mx-[12px] border border-[#DADFE4] overflow-auto relative">
        <table className="w-full border-collapse" style={{ minWidth: columns.reduce((sum, col) => sum + col.width, 0) }}>
          <thead className="sticky top-0 z-10">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="bg-[#FAFBFC] border-b border-r border-[#DADFE4] text-left px-[6px] py-0 h-[41px] text-[11px] font-normal leading-[12px] tracking-[0.8px] text-[#283037] whitespace-pre-line"
                  style={{ width: col.width, minWidth: col.width }}
                >
                  <div className="flex items-center justify-between gap-[2px]">
                    <span className="flex-1 truncate">{col.label}</span>
                    <div className="flex items-center gap-0 shrink-0">
                      <button className="p-[2px] rounded-[2px] hover:bg-[#E4E9ED]">
                        <IconSort />
                      </button>
                      <button className="p-[2px] rounded-[2px] hover:bg-[#E4E9ED]">
                        <IconFilter />
                      </button>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr
                key={i}
                className="hover:bg-[#F7F9FB] border-b border-[#E4E9ED]"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-[8px] h-[23px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] border-r border-[#E4E9ED] truncate"
                    style={{ width: col.width, minWidth: col.width, maxWidth: col.width }}
                  >
                    {String(row[col.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center py-[8px] gap-[8px]">
        <div className="flex items-center">
          <PaginationButton disabled={currentPage === 1} onClick={() => setPage(1)}>
            <ChevronsLeft className="w-[14px] h-[14px]" />
          </PaginationButton>
          <PaginationButton disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>
            <ChevronLeft className="w-[14px] h-[14px]" />
          </PaginationButton>
        </div>
        <div className="flex items-center gap-[2px]">
          {getVisiblePages(currentPage, totalPages).map((page) => (
            <button
              key={page}
              onClick={() => setPage(page)}
              className={`
                w-[24px] h-[24px] flex items-center justify-center rounded-[2px]
                text-[14px] font-bold leading-[20px] tracking-[0.8px]
                ${page === currentPage
                  ? 'bg-[#E4E9ED] text-[#3392D3]'
                  : 'bg-transparent text-[#565E66] hover:bg-[#EDF2F4]'
                }
              `}
            >
              {page}
            </button>
          ))}
        </div>
        <div className="flex items-center">
          <PaginationButton disabled={currentPage === totalPages} onClick={() => setPage(currentPage + 1)}>
            <ChevronRight className="w-[14px] h-[14px]" />
          </PaginationButton>
          <PaginationButton disabled={currentPage === totalPages} onClick={() => setPage(totalPages)}>
            <ChevronsRight className="w-[14px] h-[14px]" />
          </PaginationButton>
        </div>
      </div>
    </div>
  )
}

function ToolbarButton({ label, hasDropdown, onClick }: { label: string; hasDropdown?: boolean; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center gap-[4px] h-[20px] px-[8px] py-[3px] rounded-[2px] border border-[#DADFE4] bg-white text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] hover:bg-[#F3F6F8] whitespace-nowrap">
      {label}
      {hasDropdown && (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2.5 4L5 6.5L7.5 4" stroke="#565E66" strokeWidth="1" />
        </svg>
      )}
    </button>
  )
}

function ToolbarDivider() {
  return (
    <div className="px-[6px] flex items-center">
      <div className="w-px h-[10px] bg-[#DADFE4]" />
    </div>
  )
}

function IconInfo() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="0.5" y="0.5" width="15" height="15" rx="2" stroke="#767D84" />
      <path d="M8 4.5V5.5" stroke="#767D84" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M8 7.5V11.5" stroke="#767D84" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function IconSort() {
  return (
    <svg width="5" height="10" viewBox="0 0 5 10" fill="none">
      <path d="M2.5 0.5L4.5 4H0.5L2.5 0.5Z" fill="#90969D" />
      <path d="M2.5 9.5L0.5 6H4.5L2.5 9.5Z" fill="#90969D" />
    </svg>
  )
}

function IconFilter() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M0.5 1H9.5L6 4.5V8.5L4 9.5V4.5L0.5 1Z" stroke="#90969D" strokeWidth="0.8" strokeLinejoin="round" />
    </svg>
  )
}
