import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InfoTooltip } from '@/components/common/InfoTooltip'
import { StatusBadge } from '@/components/common/StatusBadge'
import { TagBadge } from '@/components/common/TagBadge'
import { SortIcon } from '@/components/common/SortIcon'
import { FilterIcon } from '@/components/common/FilterIcon'
import { StatusLegend } from './StatusLegend'
import { SrsBadge } from './SrsBadge'
import { DetailPanel } from './DetailPanel'
import { columns, ersColumns, srsColumns, ersWidth, srsWidth } from './Columns'
import { matrixData, sampleDetail } from './MockData'
import type { SrsColumnKey } from '../Types'

export function MatrixCheck() {
  const navigate = useNavigate()
  const [selectedRow, setSelectedRow] = useState<string | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)

  const handleRowClick = (index: string) => {
    setSelectedRow(index)
    setDetailOpen(true)
  }

  return (
    <div className="flex h-full">
      {/* Left: Table Area */}
      <div className="flex-1 flex flex-col min-w-0 px-[12px] pt-[8px] pb-[4px]">
        {/* Row 1: Title */}
        <div className="flex items-center gap-[2px] shrink-0">
          <span className="text-[14px] font-bold leading-[20px] tracking-[0.8px] text-[#384047]">
            Matrix check
          </span>
          <InfoTooltip
            title="Matrix Check"
            description="Matrix Check 페이지에 대한 설명 텍스트 텍스트 텍스트 텍스트"
          />
        </div>

        {/* Row 2: Legend + Export (left) | Table Option + Coverage (right) */}
        <div className="flex items-center justify-between mt-[4px] mb-[6px] shrink-0">
          <div className="flex items-center gap-[8px]">
            <StatusLegend />
            <button className="border border-[#DADFE4] bg-white rounded-[2px] px-[6px] py-[3px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] hover:bg-[#F3F6F8]">
              Export
            </button>
          </div>
          <div className="flex items-center shrink-0">
            <button className="border border-[#DADFE4] bg-white rounded-[2px] px-[6px] py-[3px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] hover:bg-[#F3F6F8]">
              Table Option
            </button>
            <div className="flex items-center justify-center w-[13px]">
              <div className="w-px h-[10px] bg-[#CCD1D6]" />
            </div>
            <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#767D84] whitespace-nowrap">
              진행율/완료율(Coverage): 42/420(10%)
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 min-h-0 border border-[#DADFE4] rounded-[2px] overflow-auto">
          <table className="w-full border-collapse" style={{ minWidth: ersWidth + srsWidth }}>
            <thead className="sticky top-0 z-10">
              {/* Header Row 1: Group Headers (ERS / SRS) */}
              <tr>
                <th
                  colSpan={ersColumns.length}
                  className="bg-[#FAFBFC] border-b border-r border-[#DADFE4] h-[28px] px-[10px] text-center text-[11px] font-normal leading-[12px] tracking-[0.8px] text-[#384047]"
                  style={{ width: ersWidth }}
                >
                  ERS
                </th>
                <th
                  colSpan={srsColumns.length}
                  className="bg-[#FAFBFC] border-b border-r border-[#DADFE4] h-[28px] px-[10px] text-center text-[11px] font-normal leading-[12px] tracking-[0.8px] text-[#384047]"
                  style={{ width: srsWidth }}
                >
                  SRS
                </th>
              </tr>
              {/* Header Row 2: Column Names */}
              <tr>
                {columns.map((col) => (
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
              {matrixData.map((row) => (
                <tr
                  key={row.index}
                  className={`border-b border-[#E4E9ED] ${
                    selectedRow === row.index
                      ? 'bg-[#EBF5FB]'
                      : row.isParent
                        ? 'bg-[#F3F6F8]'
                        : 'hover:bg-[#F7F9FB]'
                  }`}
                >
                  {/* Index */}
                  <td className="px-[6px] h-[23px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] border-r border-[#E4E9ED]">
                    {row.index}
                  </td>
                  {/* ERS Title */}
                  <td
                    className="px-[6px] h-[23px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] border-r border-[#E4E9ED]"
                    style={{ maxWidth: 241 }}
                    onClick={() => !row.isParent && handleRowClick(row.index)}
                  >
                    <div className="flex items-center gap-[4px]">
                      <span className={`truncate ${!row.isParent ? 'underline text-[#515E94] cursor-pointer' : ''}`}>{row.ersTitle}</span>
                      {row.tag && <TagBadge label={row.tag} />}
                    </div>
                  </td>
                  {/* 진행률 */}
                  <td className="px-[6px] h-[23px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] border-r border-[#E4E9ED] text-right">
                    {row.progress !== null ? row.progress : ''}
                  </td>
                  {/* Updated */}
                  <td className="px-[6px] h-[23px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] border-r border-[#E4E9ED]">
                    {row.updated}
                  </td>
                  {/* Support */}
                  <td className="px-[6px] h-[23px] text-[12px] leading-[14px] tracking-[0.8px] border-r border-[#E4E9ED]">
                    {row.support ? <StatusBadge status={row.support} /> : !row.isParent ? <span className="text-[#B2B6BB]">-</span> : null}
                  </td>
                  {/* SRS Columns */}
                  {(['apsEletric', 'apsOptic', 'analog', 'digitalChip', 'fw', 'alpdp', 'pm'] as SrsColumnKey[]).map(
                    (srsKey) => (
                      <td
                        key={srsKey}
                        className={`px-[4px] h-[23px] text-[11px] leading-[14px] tracking-[0.8px] text-[#384047] border-r border-[#E4E9ED]${row.srs[srsKey] ? ' cursor-pointer' : ''}`}
                        onClick={() => row.srs[srsKey] && navigate('/my-task')}
                      >
                        {row.srs[srsKey] ? <SrsBadge entry={row.srs[srsKey]!} /> : !row.isParent ? <span className="text-[#B2B6BB]">-</span> : null}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right: Detail Panel */}
      {detailOpen && (
        <DetailPanel
          data={sampleDetail}
          onClose={() => {
            setDetailOpen(false)
            setSelectedRow(null)
          }}
        />
      )}
    </div>
  )
}
