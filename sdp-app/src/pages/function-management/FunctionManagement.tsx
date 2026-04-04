import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SortIcon } from '@/components/common/SortIcon'
import { FilterIcon } from '@/components/common/FilterIcon'
import { InfoIcon } from '@/components/common/InfoIcon'
import { functionMockData, type FunctionItem } from './MockData'

type SortKey = keyof FunctionItem
type SortDir = 'asc' | 'desc' | null

function PdfIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
      <rect x="0.5" y="0.5" width="15" height="15" rx="1" fill="#D2362C" />
      <text x="8" y="11" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold" fontFamily="sans-serif">PDF</text>
    </svg>
  )
}

export function FunctionManagement() {
  const navigate = useNavigate()
  const [sortKey, setSortKey] = useState<SortKey | null>(null)
  const [sortDir, setSortDir] = useState<SortDir>(null)

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      if (sortDir === 'asc') setSortDir('desc')
      else if (sortDir === 'desc') { setSortKey(null); setSortDir(null) }
      else setSortDir('asc')
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const sortedData = [...functionMockData].sort((a, b) => {
    if (!sortKey || !sortDir) return 0
    const aVal = a[sortKey]
    const bVal = b[sortKey]
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortDir === 'asc' ? aVal - bVal : bVal - aVal
    }
    return sortDir === 'asc'
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal))
  })

  const columns: {
    key: SortKey
    label: string
    width: string
    hasFilter?: boolean
    hasInfo?: boolean
    isLink?: boolean
    isFeature?: boolean
  }[] = [
    { key: 'title', label: 'Title', width: 'min-w-[260px] flex-1', hasFilter: true },
    { key: 'assignee', label: 'Assignee', width: 'w-[158px]', hasFilter: true },
    { key: 'coWorker', label: 'co-Worker', width: 'w-[158px]', hasFilter: true },
    { key: 'linkedErs', label: 'Linked ERS', width: 'w-[140px]', hasInfo: true },
    { key: 'relatedErs', label: 'Related ERS', width: 'w-[140px]', hasInfo: true },
    { key: 'features', label: 'Features', width: 'w-[140px]', isFeature: true },
    { key: 'sor', label: 'SOR', width: 'w-[81px]', isLink: true },
    { key: 'uArch', label: 'μARCH', width: 'w-[98px]', isLink: true },
    { key: 'import', label: 'Import', width: 'w-[122px]', isLink: true },
  ]

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Page Title Bar */}
      <div className="shrink-0 px-[12px] py-[8px] bg-[#F3F6F8]">
        <div className="flex items-center gap-[4px]">
          <h1 className="text-[18px] font-bold leading-[24px] tracking-[0.8px] text-[#283037]">
            Function Management
          </h1>
          <InfoIcon size={14} />
        </div>
      </div>

      {/* Toolbar */}
      <div className="shrink-0 px-[12px]">
        <div className="flex items-center justify-end py-[8px]">
          <div className="flex items-center">
            {/* PDF Download */}
            <button className="flex items-center gap-[4px] border border-[#DADFE4] rounded-[2px] px-[6px] h-[20px] bg-white hover:bg-[#F3F6F8]">
              <PdfIcon />
              <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#384047]">
                다운로드
              </span>
            </button>

            {/* Divider */}
            <div className="flex items-center justify-center w-[13px]">
              <div className="w-px h-[10px] bg-[#CCD1D6]" />
            </div>

            {/* Total count */}
            <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#767D84]">
              Total: <span>340</span>
            </span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto mx-[12px] mb-[12px] border-t border-[#DADFE4]">
        <table className="w-full border-collapse" style={{ minWidth: '1396px' }}>
          {/* Header */}
          <thead className="sticky top-0 z-10">
            <tr className="bg-[#FAFBFC]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`${col.width} h-[29px] text-left border-l border-b border-[#DADFE4] shrink-0`}
                >
                  <div className="flex items-center gap-[4px] px-[6px]">
                    <div
                      className="flex items-center gap-[4px] flex-1 min-w-0 cursor-pointer"
                      onClick={() => handleSort(col.key)}
                    >
                      <div className="flex items-center gap-[2px]">
                        <span className="text-[11px] leading-[12px] tracking-[0.8px] text-[#283037] whitespace-nowrap overflow-hidden text-ellipsis font-normal">
                          {col.label}
                        </span>
                        {col.hasInfo && (
                          <InfoIcon size={14} />
                        )}
                      </div>
                      {!col.isLink && (
                        <SortIcon active={sortKey === col.key} direction={sortKey === col.key ? sortDir : null} />
                      )}
                    </div>
                    {col.hasFilter && <FilterIcon />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {sortedData.map((row) => (
              <tr key={row.id} className="bg-white hover:bg-[#F7F9FA]">
                {columns.map((col) => {
                  const value = row[col.key]
                  return (
                    <td
                      key={col.key}
                      className={`${col.width} h-[23px] border-l border-b border-l-[#E4E9ED] border-b-[#E4E9ED] first:border-l-[#DADFE4]`}
                    >
                      <div className="px-[6px] overflow-hidden">
                        {col.isLink ? (
                          <button
                            onClick={() => {
                              if (col.key === 'sor') navigate('/function-detail?tab=sor')
                              else if (col.key === 'uArch') navigate('/function-detail?tab=uarch')
                            }}
                            className="border border-[#DADFE4] rounded-[2px] px-[6px] h-[16px] flex items-center bg-white hover:bg-[#F3F6F8]"
                          >
                            <span className="text-[11px] leading-[12px] tracking-[0.8px] text-[#384047] whitespace-nowrap">
                              {value}
                            </span>
                          </button>
                        ) : col.isFeature ? (
                          <button className={`text-[12px] leading-[14px] tracking-[0.8px] whitespace-nowrap underline ${Number(value) > 0 ? 'text-[#515E94] cursor-pointer' : 'text-[#283037] cursor-pointer'}`}>
                            {value}
                          </button>
                        ) : (
                          <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#283037] whitespace-nowrap overflow-hidden text-ellipsis block">
                            {value}
                          </span>
                        )}
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
