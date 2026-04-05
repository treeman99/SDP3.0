import { useState, useCallback, useRef, useEffect } from 'react'
import { SortIcon } from '@/components/common/SortIcon'
import { FilterIcon } from '@/components/common/FilterIcon'
import { InfoIcon } from '@/components/common/InfoIcon'
import { TagBadge } from '@/components/common/TagBadge'
import { ersCompareData, compareDetailContent, type ErsCompareItem } from './MockData'

type StatusFilter = 'Unknown' | 'Link' | 'Pass'

export function ErsCompare() {
  const [data] = useState<ErsCompareItem[]>(ersCompareData)
  const [selectedIdx, setSelectedIdx] = useState(5)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('Unknown')
  const [showOnlyDiff, setShowOnlyDiff] = useState(false)
  const [showOnlyUnknown, setShowOnlyUnknown] = useState(false)
  const [leftWidth, setLeftWidth] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const handleMouseDown = useCallback(() => {
    isDragging.current = true
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const pct = ((e.clientX - rect.left) / rect.width) * 100
      setLeftWidth(Math.min(70, Math.max(30, pct)))
    }
    const handleMouseUp = () => {
      isDragging.current = false
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  const selectedItem = data[selectedIdx]
  const detail = compareDetailContent

  return (
    <div ref={containerRef} className="flex flex-1 overflow-hidden">
      {/* ── Left Panel ── */}
      <div
        className="shrink-0 flex flex-col overflow-hidden"
        style={{ width: `${leftWidth}%` }}
      >
        {/* Sub-header */}
        <div className="shrink-0 px-[12px] pt-[12px] pb-[12px]">
          <div className="flex items-center gap-[2px]">
            <span className="text-[14px] font-bold leading-[20px] tracking-[0.8px] text-[#384047]">
              Compare Workspace
            </span>
            <InfoIcon size={16} />
          </div>
        </div>

        {/* Toolbar */}
        <div className="shrink-0 flex items-center justify-between px-[12px] pb-[8px]">
          {/* Left: Import + Checkboxes */}
          <div className="flex items-center">
            <button className="bg-white border border-[#DADFE4] rounded-[2px] px-[6px] py-[3px]">
              <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] whitespace-nowrap">
                Import New ERS
              </span>
            </button>
            <div className="flex items-center justify-center w-[13px]">
              <div className="w-px h-[10px] bg-[#CCD1D6]" />
            </div>
            <div className="flex items-center gap-[4px]">
              <label className="flex items-center gap-[2px] cursor-pointer border border-[#DADFE4] rounded-[2px] px-[4px] py-[3px] bg-white">
                <input
                  type="checkbox"
                  checked={showOnlyDiff}
                  onChange={(e) => setShowOnlyDiff(e.target.checked)}
                  className="w-[12px] h-[12px] accent-[#3392D3]"
                />
                <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] whitespace-nowrap">
                  Show Only Different
                </span>
              </label>
              <label className="flex items-center gap-[2px] cursor-pointer border border-[#DADFE4] rounded-[2px] px-[4px] py-[3px] bg-white">
                <input
                  type="checkbox"
                  checked={showOnlyUnknown}
                  onChange={(e) => setShowOnlyUnknown(e.target.checked)}
                  className="w-[12px] h-[12px] accent-[#3392D3]"
                />
                <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] whitespace-nowrap">
                  Show Only Unknown
                </span>
              </label>
            </div>
          </div>

          {/* Right: Compare label */}
          <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#767D84] whitespace-nowrap">
            Compare: New ERS Name Ver.1.2
          </span>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto px-[12px]">
          <table className="w-full border-separate border-spacing-0">
            <thead className="sticky top-0 z-10">
              <tr>
                <th className="w-[102px] h-[28px] text-left bg-[#FAFBFC] border-t border-l border-b border-[#DADFE4]">
                  <div className="flex items-center gap-[4px] px-[6px]">
                    <span className="text-[11px] leading-[12px] tracking-[0.8px] text-[#283037] font-normal">
                      Index
                    </span>
                    <SortIcon />
                  </div>
                </th>
                <th className="h-[28px] text-left bg-[#FAFBFC] border-t border-l border-b border-[#DADFE4]">
                  <div className="flex items-center gap-[4px] px-[6px]">
                    <div className="flex items-center gap-[4px] flex-1">
                      <span className="text-[11px] leading-[12px] tracking-[0.8px] text-[#283037] font-normal">
                        New ERS
                      </span>
                      <SortIcon />
                    </div>
                    <FilterIcon />
                  </div>
                </th>
                <th className="h-[28px] text-left bg-[#FAFBFC] border-t border-l border-b border-[#DADFE4]">
                  <div className="flex items-center gap-[4px] px-[6px]">
                    <div className="flex items-center gap-[4px] flex-1">
                      <span className="text-[11px] leading-[12px] tracking-[0.8px] text-[#283037] font-normal">
                        Old ERS
                      </span>
                      <SortIcon />
                    </div>
                  </div>
                </th>
                <th className="w-[70px] h-[28px] text-left bg-[#FAFBFC] border-t border-l border-b border-[#DADFE4]">
                  <div className="flex items-center gap-[4px] px-[6px]">
                    <span className="text-[11px] leading-[12px] tracking-[0.8px] text-[#283037] font-normal">
                      Compare
                    </span>
                    <SortIcon />
                  </div>
                </th>
                <th className="w-[70px] h-[28px] text-left bg-[#FAFBFC] border-t border-l border-r border-b border-[#DADFE4]">
                  <div className="flex items-center gap-[4px] px-[6px]">
                    <span className="text-[11px] leading-[12px] tracking-[0.8px] text-[#283037] font-normal">
                      Status
                    </span>
                    <SortIcon />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => {
                const isSelected = idx === selectedIdx
                const borderColor = isSelected ? 'border-[#DADFE4]' : 'border-[#E4E9ED]'
                return (
                  <tr
                    key={idx}
                    className={`cursor-pointer ${
                      isSelected ? 'bg-[#EBF5FB]' : 'bg-white hover:bg-[#F7F9FA]'
                    }`}
                    onClick={() => setSelectedIdx(idx)}
                  >
                    {/* Index */}
                    <td
                      className={`h-[23px] border-b ${borderColor} ${
                        isSelected
                          ? 'border-l-[3px] border-l-[#3392D3]'
                          : 'border-l'
                      }`}
                    >
                      <div
                        className="flex items-center px-[6px]"
                        style={isSelected ? { paddingLeft: '13px' } : undefined}
                      >
                        <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#202020] whitespace-nowrap">
                          {row.depth > 0 ? `└${row.index}` : row.index}
                        </span>
                      </div>
                    </td>

                    {/* New ERS */}
                    <td className={`h-[23px] border-l border-b ${borderColor}`}>
                      <div className="flex items-center gap-[4px] px-[6px]">
                        <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#283037] whitespace-nowrap overflow-hidden text-ellipsis">
                          {row.newErs}
                        </span>
                        {row.tag && (row.tag === 'NEW' || row.tag === 'UPDATED') && (
                          <TagBadge label={row.tag} />
                        )}
                        {row.tag === 'ADD DELETE' && (
                          <span className="inline-flex items-center px-[4px] py-[1px] rounded-[1px] text-[9px] font-bold leading-[12px] tracking-[0.5px] text-white shrink-0 uppercase bg-[#FF695F] border-[0.5px] border-[#FF4337]">
                            ADD DELETE
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Old ERS */}
                    <td className={`h-[23px] border-l border-b ${borderColor}`}>
                      <div className="px-[6px]">
                        <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#283037] whitespace-nowrap overflow-hidden text-ellipsis block">
                          {row.oldErs}
                        </span>
                      </div>
                    </td>

                    {/* Compare */}
                    <td className={`h-[23px] border-l border-b ${borderColor}`}>
                      <div className="px-[6px]">
                        <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#283037] whitespace-nowrap">
                          {row.compare}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className={`h-[23px] border-l border-r border-b ${borderColor}`}>
                      <div className="px-[6px]">
                        <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#283037] whitespace-nowrap">
                          {row.status}
                        </span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Draggable Divider ── */}
      <div
        className="w-[6px] shrink-0 bg-[#DADFE4] cursor-col-resize hover:bg-[#B2B6BB] active:bg-[#3392D3] transition-colors"
        onMouseDown={handleMouseDown}
      />

      {/* ── Right Panel ── */}
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        {/* Detail Header */}
        <div className="shrink-0 px-[16px] pt-[14px] pb-[8px]">
          <h2 className="text-[14px] font-bold leading-[20px] tracking-[0.8px] text-[#384047]">
            {selectedItem ? `${selectedItem.index} ${selectedItem.newErs}` : detail.title}
          </h2>
        </div>

        {/* ERS 연결 상태 */}
        <div className="shrink-0 flex items-center justify-between px-[16px] pb-[8px]">
          <div className="flex items-center gap-[4px]">
            <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#384047]">
              ERS 연결 상태
            </span>
            <div className="flex items-center">
              {(['Unknown', 'Link', 'Pass'] as StatusFilter[]).map((s, i) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-[6px] py-[3px] text-[12px] leading-[14px] tracking-[0.8px] whitespace-nowrap border ${
                    i === 0 ? 'rounded-l-[2px]' : ''
                  } ${i === 2 ? 'rounded-r-[2px]' : ''} ${
                    i > 0 ? 'border-l-0' : ''
                  } ${
                    statusFilter === s
                      ? 'bg-[#E6F1FA] border-[#CCD1D6] text-[#0077C8]'
                      : 'bg-white border-[#DADFE4] text-[#384047]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-center w-[13px]">
              <div className="w-px h-[10px] bg-[#CCD1D6]" />
            </div>
            <button className="bg-[#3392D3] rounded-[2px] px-[6px] text-[12px] font-bold leading-[20px] tracking-[0.8px] text-white hover:bg-[#2B7DB5]">
              Apply
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="shrink-0 flex items-center gap-[8px] px-[16px] pb-[8px]">
          <div className="flex items-center gap-[4px]">
            <div className="w-[10px] h-[10px] bg-[#D4F1D7] border border-[#BFEBC4]" />
            <span className="text-[11px] leading-[12px] tracking-[0.8px] text-[#565E66]">Add</span>
          </div>
          <div className="flex items-center gap-[4px]">
            <div className="w-[10px] h-[10px] bg-[#FFD9D7] border border-[#FFC7C3]" />
            <span className="text-[11px] leading-[12px] tracking-[0.8px] text-[#565E66]">Delete</span>
          </div>
        </div>

        {/* Divider */}
        <div className="shrink-0 mx-[16px] h-px bg-[#DADFE4]" />

        {/* Detail Body: New vs Old */}
        <div className="flex-1 overflow-auto">
          <div className="flex h-full">
            {/* New column */}
            <div className="flex-1 flex flex-col min-w-0 border-r border-[#DADFE4]">
              <div className="shrink-0 px-[16px] pt-[8px] pb-[4px]">
                <span className="text-[12px] font-bold leading-[14px] tracking-[0.8px] text-[#384047]">
                  New
                </span>
              </div>
              <div className="flex-1 overflow-auto px-[16px] pb-[16px]">
                <div className="text-[14px] leading-[20px] tracking-[0.8px] text-[#384047]">
                  {detail.newText}{' '}
                  <span className="bg-[#D4F1D7]">{detail.newHighlight}</span>{' '}
                  {detail.newTextAfter}{' '}
                  <span className="bg-[#D4F1D7]">{detail.newHighlight2}</span>{' '}
                  {detail.newTextAfter2}
                  <div className="mt-[16px]">
                    {detail.newText2}
                  </div>
                </div>
              </div>
            </div>

            {/* Old column */}
            <div className="flex-1 flex flex-col min-w-0">
              <div className="shrink-0 px-[16px] pt-[8px] pb-[4px]">
                <span className="text-[12px] font-bold leading-[14px] tracking-[0.8px] text-[#384047]">
                  OLD
                </span>
              </div>
              <div className="flex-1 overflow-auto px-[16px] pb-[16px]">
                <div className="text-[14px] leading-[20px] tracking-[0.8px] text-[#384047]">
                  {detail.oldText}{' '}
                  <span className="bg-[#FFD9D7] line-through">{detail.oldStrike}</span>{' '}
                  {detail.oldTextAfter}{' '}
                  <span className="bg-[#FFD9D7] line-through">{detail.oldStrike2}</span>{' '}
                  {detail.oldTextAfter2}{' '}
                  <span className="bg-[#FFD9D7] line-through">{detail.oldStrike3}</span>
                  <div className="mt-[16px]">
                    {detail.oldText2}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
