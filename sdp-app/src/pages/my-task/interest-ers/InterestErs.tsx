import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { InfoTooltip } from '@/components/common/InfoTooltip'
import { SortIcon } from '@/components/common/SortIcon'
import { FilterIcon } from '@/components/common/FilterIcon'
import { StatusBadge } from '@/components/common/StatusBadge'
import { TagBadge } from '@/components/common/TagBadge'
import { TablePagination } from '@/components/common/Pagination'
import { ProgressBadge } from '../my-ers/ProgressBadge'
import { ersSubscriptionList, interestErsData, interestFunctionData, interestErsSummary } from './MockData'
import { ersColumns, funcColumns } from '../Types'

export function InterestErs() {
  const [selectedId, setSelectedId] = useState(ersSubscriptionList[2]?.id ?? '')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [ersPage, setErsPage] = useState(1)
  const [funcPage, setFuncPage] = useState(1)
  const totalErsPages = interestErsData.length === 0 ? 1 : 10
  const totalFuncPages = interestFunctionData.length === 0 ? 1 : 10

  return (
    <div className="flex h-full">
      {/* Left Sidebar */}
      {sidebarOpen && (
        <div className="relative flex flex-col w-[200px] shrink-0 bg-[#EDF2F4]">
          {/* Right border line */}
          <div className="absolute right-0 top-0 bottom-0 w-px bg-[#DADFE4]" />
          {/* Sidebar Header */}
          <div className="flex items-center h-[40px] border-b border-[#DADFE4]">
            <span className="flex-1 px-[12px] text-[12px] font-bold leading-[20px] tracking-[0.8px] text-[#384047]">
              ERS 구독 List
            </span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="flex items-center justify-center w-[20px] h-[40px] border-l border-[#DADFE4] text-[#90969D] hover:text-[#384047] hover:bg-[#F3F6F8]"
            >
              <ChevronLeft className="w-[10px] h-[10px]" />
            </button>
          </div>
          {/* Sidebar List */}
          <div className="flex-1 overflow-y-auto pt-[4px]">
            {ersSubscriptionList.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`relative w-full text-left h-[26px] flex items-center px-[12px] text-[11px] leading-[14px] tracking-[0.8px] ${
                  selectedId === item.id
                    ? 'text-[#3392D3] font-bold bg-white'
                    : 'text-[#565E66] hover:bg-[#F7F9FB]'
                }`}
              >
                {selectedId === item.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#3392D3]" />
                )}
                <span className="text-[#90969D] mr-[4px]">·</span>{item.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sidebar collapsed toggle */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex items-center justify-center w-[20px] shrink-0 border-r border-[#DADFE4] bg-[#FAFBFC] hover:bg-[#F3F6F8] text-[#90969D] hover:text-[#384047]"
        >
          <ChevronRight className="w-[10px] h-[10px]" />
        </button>
      )}

      {/* Right Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <div className="flex flex-col px-[12px] pt-[8px] pb-[12px]">
          {/* Section 1: Assigned ERS-SRS */}
          <div className="flex flex-col">
            <div className="flex items-center gap-[2px] mb-[4px]">
              <span className="text-[14px] font-bold leading-[20px] tracking-[0.8px] text-[#384047]">
                Assigned ERS-SRS
              </span>
              <InfoTooltip title="Assigned ERS-SRS" description="배정된 ERS-SRS 목록" />
            </div>
            <div className="flex items-center justify-between mb-[6px]">
              <button className="border border-[#DADFE4] bg-white rounded-[2px] px-[6px] py-[3px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] hover:bg-[#F3F6F8]">
                Matrix Check 바로가기
              </button>
              <div className="flex items-center gap-[8px] text-[12px] leading-[14px] tracking-[0.8px] text-[#767D84]">
                <span>Total: {interestErsSummary.total}</span>
                <div className="w-px h-[10px] bg-[#CCD1D6]" />
                <span>In Progress: {interestErsSummary.inProgress}</span>
                <span>In Approval: {interestErsSummary.inApproval}</span>
                <span>Done: {interestErsSummary.done}</span>
              </div>
            </div>

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
                  {interestErsData.length === 0 ? (
                    <tr>
                      <td colSpan={ersColumns.length} className="h-[200px] text-center text-[13px] leading-[14px] tracking-[0.8px] text-[#90969D]">
                        데이터가 없습니다.
                      </td>
                    </tr>
                  ) : (
                    interestErsData.map((row, i) => (
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

            <TablePagination currentPage={ersPage} totalPages={totalErsPages} onPageChange={setErsPage} />
          </div>

          {/* Divider */}
          <div className="border-b border-[#DADFE4] my-[20px]" />

          {/* Section 2: Assigned Function */}
          <div className="flex flex-col">
            <div className="flex items-center gap-[2px] mb-[4px]">
              <span className="text-[14px] font-bold leading-[20px] tracking-[0.8px] text-[#384047]">
                Assigned Function
              </span>
              <InfoTooltip title="Assigned Function" description="배정된 Function 목록" />
            </div>
            <div className="flex items-center justify-between mb-[6px]">
              <button className="border border-[#DADFE4] bg-white rounded-[2px] px-[6px] py-[3px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] hover:bg-[#F3F6F8]">
                Function Management 바로가기
              </button>
              <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#767D84]">
                Total: n개
              </span>
            </div>

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
                  {interestFunctionData.length === 0 ? (
                    <tr>
                      <td colSpan={funcColumns.length} className="h-[200px] text-center text-[13px] leading-[14px] tracking-[0.8px] text-[#90969D]">
                        데이터가 없습니다.
                      </td>
                    </tr>
                  ) : (
                    interestFunctionData.map((row, i) => (
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

            <TablePagination currentPage={funcPage} totalPages={totalFuncPages} onPageChange={setFuncPage} />
          </div>
        </div>
      </div>
    </div>
  )
}
