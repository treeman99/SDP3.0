import { useState } from 'react'
import { InfoTooltip } from '@/components/common/InfoTooltip'
import { SortIcon } from '@/components/common/SortIcon'
import { FilterIcon } from '@/components/common/FilterIcon'
import { StatusBadge } from '@/components/common/StatusBadge'
import { TagBadge } from '@/components/common/TagBadge'
import { TablePagination } from '@/components/common/Pagination'
import { ProgressBadge } from './ProgressBadge'
import { assignedErsData, assignedFunctionData, ersSummary } from './MockData'
import { ersColumns, funcColumns } from '../Types'

export function MyErs() {
  const [ersPage, setErsPage] = useState(1)
  const [funcPage, setFuncPage] = useState(1)
  const totalErsPages = assignedErsData.length === 0 ? 1 : 10
  const totalFuncPages = assignedFunctionData.length === 0 ? 1 : 10

  return (
    <div className="flex flex-col h-full overflow-y-auto px-[12px] pt-[8px] pb-[12px]">
      {/* Section 1: Assigned ERS-SRS */}
      <div className="flex flex-col">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[2px]">
            <span className="text-[14px] font-bold leading-[20px] tracking-[0.8px] text-[#384047]">
              Assigned ERS-SRS
            </span>
            <InfoTooltip title="Assigned ERS-SRS" description="배정된 ERS-SRS 목록" />
          </div>
          <div className="flex items-center gap-[8px] text-[12px] leading-[14px] tracking-[0.8px] text-[#767D84]">
            <span>Total: {ersSummary.total}</span>
            <div className="w-px h-[10px] bg-[#CCD1D6]" />
            <span>In Progress: {ersSummary.inProgress}</span>
            <span>In Approval: {ersSummary.inApproval}</span>
            <span>Done: {ersSummary.done}</span>
          </div>
        </div>
        <div className="mt-[4px] mb-[4px]">
          <button className="border border-[#DADFE4] bg-white rounded-[2px] px-[6px] py-[3px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] hover:bg-[#F3F6F8]">
            Matrix Check 바로가기
          </button>
        </div>

        {/* ERS Table */}
        <div className="border border-[#DADFE4] rounded-[2px] overflow-auto">
          <table className="w-full border-collapse" style={{ minWidth: ersColumns.reduce((s, c) => s + c.width, 0) }}>
            <thead className="sticky top-0 z-10">
              <tr>
                {ersColumns.map((col) => (
                  <th
                    key={col.key}
                    className="bg-[#FAFBFC] border-b border-r border-[#DADFE4] text-left h-[28px] text-[11px] font-normal leading-[12px] tracking-[0.8px] text-[#283037] whitespace-nowrap"
                    style={{ width: col.width, minWidth: col.width }}
                  >
                    <div className="flex items-center gap-[4px] px-[6px]">
                      <div className="flex items-center gap-[4px] flex-1 min-w-0">
                        <span className="truncate">{col.label}</span>
                        {col.sortable && <SortIcon />}
                      </div>
                      {col.filterable && <FilterIcon />}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {assignedErsData.length === 0 ? (
                <tr>
                  <td colSpan={ersColumns.length} className="h-[200px] text-center text-[13px] leading-[14px] tracking-[0.8px] text-[#90969D]">
                    데이터가 없습니다.
                  </td>
                </tr>
              ) : (
                assignedErsData.map((row, i) => (
                  <tr key={i} className="hover:bg-[#F7F9FB] border-b border-[#E4E9ED]">
                    <td className="px-[8px] h-[23px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] border-r border-[#E4E9ED]" style={{ width: 60 }}>
                      {row.index}
                    </td>
                    <td className="px-[8px] h-[23px] text-[12px] leading-[14px] tracking-[0.8px] border-r border-[#E4E9ED]" style={{ width: 180, maxWidth: 180 }}>
                      <div className="flex items-center gap-[4px] truncate">
                        <span className="text-[#3392D3] cursor-pointer underline truncate">{row.ersTitle}</span>
                        {row.tag && <TagBadge label={row.tag} />}
                      </div>
                    </td>
                    <td className="px-[8px] h-[23px] border-r border-[#E4E9ED]" style={{ width: 100 }}>
                      <ProgressBadge progress={row.progress} />
                    </td>
                    <td className="px-[8px] h-[23px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] border-r border-[#E4E9ED] truncate" style={{ width: 250, maxWidth: 250 }}>
                      {row.srsTitle}
                    </td>
                    <td className="px-[8px] h-[23px] border-r border-[#E4E9ED]" style={{ width: 90 }}>
                      <StatusBadge status={row.support} />
                    </td>
                    <td className="px-[8px] h-[23px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] border-r border-[#E4E9ED]" style={{ width: 100 }}>
                      {row.assignDate}
                    </td>
                    <td className="px-[8px] h-[23px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] border-r border-[#E4E9ED]" style={{ width: 100 }}>
                      {row.lastUpdated}
                    </td>
                    <td className="px-[8px] h-[23px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] truncate" style={{ width: 160, maxWidth: 160 }}>
                      {row.coWorker}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ERS Pagination */}
        <TablePagination currentPage={ersPage} totalPages={totalErsPages} onPageChange={setErsPage} />
      </div>

      {/* Divider */}
      <div className="border-b border-[#DADFE4] my-[20px]" />

      {/* Section 2: Assigned Function */}
      <div className="flex flex-col">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[2px]">
            <span className="text-[14px] font-bold leading-[20px] tracking-[0.8px] text-[#384047]">
              Assigned Function
            </span>
            <InfoTooltip title="Assigned Function" description="배정된 Function 목록" />
          </div>
          <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#767D84]">
            Total: n개
          </span>
        </div>
        <div className="mt-[4px] mb-[4px]">
          <button className="border border-[#DADFE4] bg-white rounded-[2px] px-[6px] py-[3px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] hover:bg-[#F3F6F8]">
            Function Management 바로가기
          </button>
        </div>

        {/* Function Table */}
        <div className="border border-[#DADFE4] rounded-[2px] overflow-auto">
          <table className="w-full border-collapse" style={{ minWidth: funcColumns.reduce((s, c) => s + c.width, 0) }}>
            <thead className="sticky top-0 z-10">
              <tr>
                {funcColumns.map((col) => (
                  <th
                    key={col.key}
                    className="bg-[#FAFBFC] border-b border-r border-[#DADFE4] text-left h-[28px] text-[11px] font-normal leading-[12px] tracking-[0.8px] text-[#283037] whitespace-nowrap"
                    style={{ width: col.width, minWidth: col.width }}
                  >
                    <div className="flex items-center gap-[4px] px-[6px]">
                      <div className="flex items-center gap-[4px] flex-1 min-w-0">
                        <span className="truncate">{col.label}</span>
                        {col.hasInfo && col.infoTitle && col.infoDesc && (
                          <InfoTooltip title={col.infoTitle} description={col.infoDesc} />
                        )}
                        {col.sortable && <SortIcon />}
                      </div>
                      {col.filterable && <FilterIcon />}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {assignedFunctionData.length === 0 ? (
                <tr>
                  <td colSpan={funcColumns.length} className="h-[200px] text-center text-[13px] leading-[14px] tracking-[0.8px] text-[#90969D]">
                    데이터가 없습니다.
                  </td>
                </tr>
              ) : (
                assignedFunctionData.map((row, i) => (
                  <tr key={i} className="hover:bg-[#F7F9FB] border-b border-[#E4E9ED]">
                    <td className="px-[8px] h-[23px] text-[12px] leading-[14px] tracking-[0.8px] text-[#3392D3] border-r border-[#E4E9ED] truncate cursor-pointer underline" style={{ width: 180, maxWidth: 180 }}>
                      {row.functionTitle}
                    </td>
                    <td className="px-[8px] h-[23px] border-r border-[#E4E9ED]" style={{ width: 100 }}>
                      <ProgressBadge progress={row.progress} />
                    </td>
                    <td className="px-[8px] h-[23px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] border-r border-[#E4E9ED]" style={{ width: 100 }}>
                      {row.linkedErs}
                    </td>
                    <td className="px-[8px] h-[23px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] border-r border-[#E4E9ED]" style={{ width: 100 }}>
                      {row.relatedErs}
                    </td>
                    <td className="px-[8px] h-[23px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] border-r border-[#E4E9ED]" style={{ width: 100 }}>
                      {row.features}
                    </td>
                    <td className="px-[8px] h-[23px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] border-r border-[#E4E9ED]" style={{ width: 100 }}>
                      {row.assignDate}
                    </td>
                    <td className="px-[8px] h-[23px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] border-r border-[#E4E9ED]" style={{ width: 100 }}>
                      {row.lastUpdated}
                    </td>
                    <td className="px-[8px] h-[23px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] truncate" style={{ width: 160, maxWidth: 160 }}>
                      {row.coWorker}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Function Pagination */}
        <TablePagination currentPage={funcPage} totalPages={totalFuncPages} onPageChange={setFuncPage} />
      </div>
    </div>
  )
}
