import { useState } from 'react'
import { InfoTooltip } from '@/components/common/InfoTooltip'
import { SortIcon } from '@/components/common/SortIcon'
import { FilterIcon } from '@/components/common/FilterIcon'
import { StatusBadge } from '@/components/common/StatusBadge'
import { srsListMockData } from './SrsListData'
import type { StatusType } from '../Types'

const columns = [
  { key: 'no', label: 'No', width: 40, sortable: true },
  { key: 'srsTitle', label: 'SRS Title', width: 160, sortable: true, filterable: true },
  { key: 'linkedErs', label: 'Linked ERS', width: 220, sortable: true, filterable: true },
  { key: 'usedDate', label: 'Used Date', width: 100, sortable: true },
  { key: 'support', label: 'Support', width: 90, sortable: true, filterable: true },
  { key: 'supportComment', label: 'Support Comment', width: 220, sortable: true },
  { key: 'department', label: 'Department', width: 130, sortable: true, filterable: true },
  { key: 'assignee', label: 'Assignee', width: 130, sortable: true },
  { key: 'expected', label: 'Expected', width: 100, sortable: true },
] as const

const totalCount = 340

export function SrsList() {
  const [includeHistory, setIncludeHistory] = useState(false)

  return (
    <div className="flex flex-col h-full px-[12px] pt-[8px] pb-[4px]">
      {/* Title */}
      <div className="flex items-center gap-[2px] shrink-0">
        <span className="text-[14px] font-bold leading-[20px] tracking-[0.8px] text-[#384047]">
          SRS List
        </span>
        <InfoTooltip
          title="SRS List"
          description="SRS List 페이지에 대한 설명 텍스트"
        />
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between mt-[4px] mb-[6px] shrink-0">
        {/* Left: Toggle buttons */}
        <div className="flex items-center">
          <button
            onClick={() => setIncludeHistory(!includeHistory)}
            className={`flex items-center gap-[4px] border rounded-[2px] px-[6px] py-[3px] text-[12px] leading-[14px] tracking-[0.8px] ${
              includeHistory
                ? 'border-[#3392D3] bg-[#EBF5FB] text-[#3392D3]'
                : 'border-[#DADFE4] bg-white text-[#384047] hover:bg-[#F3F6F8]'
            }`}
          >
            <CheckboxIcon checked={includeHistory} />
            과거 이력 포함 보기
          </button>
        </div>

        {/* Right: Table Option, Export, Total */}
        <div className="flex items-center shrink-0">
          <button className="border border-[#DADFE4] bg-white rounded-[2px] px-[6px] py-[3px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] hover:bg-[#F3F6F8]">
            Table Option
          </button>
          <div className="flex items-center justify-center w-[13px]">
            <div className="w-px h-[10px] bg-[#CCD1D6]" />
          </div>
          <button className="border border-[#DADFE4] bg-white rounded-[2px] px-[6px] py-[3px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] hover:bg-[#F3F6F8]">
            Export
          </button>
          <div className="flex items-center justify-center w-[13px]">
            <div className="w-px h-[10px] bg-[#CCD1D6]" />
          </div>
          <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#767D84] whitespace-nowrap">
            Total: {totalCount}
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 min-h-0 border border-[#DADFE4] rounded-[2px] overflow-auto">
        <table className="w-full border-collapse" style={{ minWidth: columns.reduce((sum, col) => sum + col.width, 0) }}>
          <thead className="sticky top-0 z-10">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="bg-[#FAFBFC] border-b border-r border-[#DADFE4] text-left px-[6px] py-0 h-[28px] text-[11px] font-normal leading-[12px] tracking-[0.8px] text-[#283037] whitespace-nowrap"
                  style={{ width: col.width, minWidth: col.width }}
                >
                  <div className="flex items-center justify-between gap-[2px]">
                    <span className="flex-1 truncate">{col.label}</span>
                    <div className="flex items-center gap-0 shrink-0">
                      {col.sortable && <SortIcon />}
                      {col.filterable && <FilterIcon />}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {srsListMockData.map((row) => (
              <tr key={row.no} className="hover:bg-[#F7F9FB] border-b border-[#E4E9ED]">
                <td className="px-[8px] h-[23px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] border-r border-[#E4E9ED]" style={{ width: 40 }}>
                  {row.no}
                </td>
                <td className="px-[8px] h-[23px] text-[12px] leading-[14px] tracking-[0.8px] text-[#3392D3] border-r border-[#E4E9ED] truncate cursor-pointer hover:underline" style={{ width: 160, maxWidth: 160 }}>
                  {row.srsTitle}
                </td>
                <td className="px-[8px] h-[23px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] border-r border-[#E4E9ED] truncate" style={{ width: 220, maxWidth: 220 }}>
                  {row.linkedErs}
                </td>
                <td className="px-[8px] h-[23px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] border-r border-[#E4E9ED]" style={{ width: 100 }}>
                  {row.usedDate}
                </td>
                <td className="px-[8px] h-[23px] text-[12px] leading-[14px] tracking-[0.8px] border-r border-[#E4E9ED]" style={{ width: 90 }}>
                  {row.support ? <StatusBadge status={row.support as StatusType} /> : <span className="text-[#90969D]">-</span>}
                </td>
                <td className="px-[8px] h-[23px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] border-r border-[#E4E9ED] truncate" style={{ width: 220, maxWidth: 220 }}>
                  {row.supportComment || '-'}
                </td>
                <td className="px-[8px] h-[23px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] border-r border-[#E4E9ED] truncate" style={{ width: 130, maxWidth: 130 }}>
                  {row.department}
                </td>
                <td className="px-[8px] h-[23px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] border-r border-[#E4E9ED] truncate" style={{ width: 130, maxWidth: 130 }}>
                  {row.assignee}
                </td>
                <td className="px-[8px] h-[23px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] truncate" style={{ width: 100, maxWidth: 100 }}>
                  {row.expected}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function CheckboxIcon({ checked }: { checked: boolean }) {
  if (checked) {
    return (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="0.5" y="0.5" width="13" height="13" rx="1.5" fill="#3392D3" stroke="#3392D3" />
        <path d="M3.5 7L6 9.5L10.5 4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="0.5" y="0.5" width="13" height="13" rx="1.5" stroke="#DADFE4" />
    </svg>
  )
}
