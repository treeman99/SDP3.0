import { useState, useCallback, useRef, useEffect } from 'react'
import { SortIcon } from '@/components/common/SortIcon'
import { FilterIcon } from '@/components/common/FilterIcon'
import { InfoIcon } from '@/components/common/InfoIcon'
import { AddIndexDialog } from '@/dialog/AddIndexDialog'
import { ParseErsFileDialog } from '@/dialog/ParseErsFileDialog'
import { QnaViewDialog } from '@/dialog/QnaViewDialog'
import { ersTreeData, detailContent, type ErsItem } from './MockData'
import { ErsCompare } from './ErsCompare'

type TabKey = 'ersList' | 'ersCompare'

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
      <rect x="6" y="3" width="2" height="8" fill="#767D84" />
      <rect x="3" y="6" width="8" height="2" fill="#767D84" />
    </svg>
  )
}

export function ErsManagement() {
  const [activeTab, setActiveTab] = useState<TabKey>('ersList')
  const [addIndexOpen, setAddIndexOpen] = useState(false)
  const [parseErsOpen, setParseErsOpen] = useState(false)
  const [qnaViewOpen, setQnaViewOpen] = useState(false)
  const [ersData] = useState<ErsItem[]>(ersTreeData)
  const [compareEmpty] = useState(false)
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

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'ersList', label: 'ERS List' },
    { key: 'ersCompare', label: 'ERS Compare' },
  ]

  return (
    <div className="flex flex-col h-full bg-white">
      {/* ── Page Header ── */}
      <div className="shrink-0 bg-[#F3F6F8]">
        <div className="relative flex items-center h-[40px] pl-[12px]">
          {/* Title + Tabs */}
          <div className="flex items-center gap-[12px] h-full">
            {/* Title */}
            <div className="flex items-center gap-[4px] shrink-0">
              <h1 className="text-[20px] font-bold leading-[24px] tracking-[0.8px] text-[#384047] whitespace-nowrap">
                ERS Management
              </h1>
              <InfoIcon size={16} />
            </div>

            {/* Tabs */}
            <div className="flex items-center h-full">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-[12px] py-[6px] text-[12px] font-bold leading-[20px] tracking-[0.8px] border-b-[3px] ${
                    activeTab === tab.key
                      ? 'text-[#3392D3] border-[#3392D3]'
                      : 'text-[#767D84] border-transparent'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right buttons */}
          <div className="absolute right-[12px] top-[8px] flex items-center gap-[6px]">
            {activeTab === 'ersCompare' ? (
              compareEmpty ? (
                <>
                  <button className="bg-white border border-[#DADFE4] rounded-[2px] px-[8px] py-[2px]">
                    <span className="text-[14px] leading-[20px] tracking-[0.8px] text-[#384047] whitespace-nowrap">
                      Select New ERS
                    </span>
                  </button>
                  <button
                    className="bg-[#E4E9ED] border border-[#DADFE4] rounded-[2px] px-[8px] py-[2px] cursor-not-allowed"
                    disabled
                  >
                    <span className="text-[14px] leading-[20px] tracking-[0.8px] text-[#B2B6BB] whitespace-nowrap">
                      Replace ERS
                    </span>
                  </button>
                </>
              ) : (
                <>
                  <button className="bg-[#3392D3] rounded-[2px] px-[8px] py-[2px] hover:bg-[#2B7DB5]">
                    <span className="text-[14px] font-bold leading-[20px] tracking-[0.8px] text-white whitespace-nowrap">
                      Save
                    </span>
                  </button>
                  <button
                    className="bg-white border border-[#DADFE4] rounded-[2px]"
                    onClick={() => setParseErsOpen(true)}
                  >
                    <div className="flex items-center gap-[4px] px-[8px] py-[2px]">
                      <span className="text-[14px] leading-[20px] tracking-[0.8px] text-[#384047] whitespace-nowrap">
                        Parse ERS File
                      </span>
                    </div>
                  </button>
                </>
              )
            ) : (
              <button
                className="bg-white border border-[#DADFE4] rounded-[2px]"
                onClick={() => setParseErsOpen(true)}
              >
                <div className="flex items-center gap-[4px] px-[8px] py-[2px]">
                  <span className="text-[14px] leading-[20px] tracking-[0.8px] text-[#384047] whitespace-nowrap">
                    Parse ERS File
                  </span>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      {activeTab === 'ersCompare' ? (
        <ErsCompare isEmpty={compareEmpty} />
      ) : (
      <div ref={containerRef} className="flex flex-1 overflow-hidden">
        {/* ── Left Panel ── */}
        <div
          className="shrink-0 flex flex-col overflow-hidden"
          style={{ width: `${leftWidth}%` }}
        >
          {/* ERS List sub-header */}
          <div className="shrink-0 px-[12px] pt-[12px] pb-[12px]">
            <div className="flex items-center gap-[2px]">
              <span className="text-[14px] font-bold leading-[20px] tracking-[0.8px] text-[#384047]">
                ERS List
              </span>
              <div className="flex items-center justify-center rounded-[2px] size-[20px] p-px">
                <InfoIcon size={16} />
              </div>
            </div>
          </div>

          {/* Toolbar */}
          <div className="shrink-0 flex items-center justify-between px-[12px] pb-[8px]">
            {/* Buttons */}
            <div className="flex items-center shrink-0">
              <button
                className="bg-white border border-[#DADFE4] rounded-[2px]"
                onClick={() => setAddIndexOpen(true)}
              >
                <div className="flex items-center gap-[4px] px-[6px]">
                  <div className="flex items-center py-[3px]">
                    <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] whitespace-nowrap">
                      Add Index
                    </span>
                  </div>
                </div>
              </button>
              <div className="flex items-center justify-center w-[13px]">
                <div className="w-px h-[10px] bg-[#CCD1D6]" />
              </div>
              <button className="bg-white border border-[#DADFE4] rounded-[2px]">
                <div className="flex items-center gap-[4px] px-[6px]">
                  <div className="flex items-center py-[3px]">
                    <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] whitespace-nowrap">
                      Version History
                    </span>
                  </div>
                </div>
              </button>
            </div>

            {/* Status counts */}
            <div className="flex items-center whitespace-nowrap">
              <span className="flex items-center gap-[2px] text-[12px] leading-[14px] tracking-[0.8px] text-[#767D84]">
                <span>Total:</span>
                <span>{ersData.length > 0 ? '24' : '0'}</span>
              </span>
              <div className="flex items-center justify-center w-[13px]">
                <div className="w-px h-[10px] bg-[#CCD1D6]" />
              </div>
              <div className="flex items-center gap-[8px]">
                <span className="flex items-center gap-[2px] text-[12px] leading-[14px] tracking-[0.8px] text-[#767D84]">
                  <span>In Progress:</span>
                  <span>{ersData.length > 0 ? '12' : '0'}</span>
                </span>
                <span className="flex items-center gap-[2px] text-[12px] leading-[14px] tracking-[0.8px] text-[#767D84]">
                  <span>In Approval:</span>
                  <span>{ersData.length > 0 ? '1' : '0'}</span>
                </span>
                <span className="flex items-center gap-[2px] text-[12px] leading-[14px] tracking-[0.8px] text-[#767D84]">
                  <span>Done:</span>
                  <span>{ersData.length > 0 ? '11' : '0'}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-auto px-[12px]">
            <table className="w-full border-separate border-spacing-0">
              {/* Header */}
              <thead className="sticky top-0 z-10">
                <tr>
                  <th className="w-[125px] h-[28px] text-left bg-[#FAFBFC] border-t border-l border-b border-[#DADFE4]">
                    <div className="flex items-center gap-[4px] px-[6px]">
                      <div className="flex items-center gap-[4px] flex-1">
                        <span className="text-[11px] leading-[12px] tracking-[0.8px] text-[#283037] font-normal">
                          Index
                        </span>
                        <SortIcon />
                      </div>
                    </div>
                  </th>
                  <th className="h-[28px] text-left bg-[#FAFBFC] border-t border-l border-b border-[#DADFE4]">
                    <div className="flex items-center gap-[4px] px-[6px]">
                      <div className="flex items-center gap-[4px] flex-1">
                        <span className="text-[11px] leading-[12px] tracking-[0.8px] text-[#283037] font-normal">
                          ERS Title
                        </span>
                        <SortIcon />
                      </div>
                      <FilterIcon />
                    </div>
                  </th>
                  <th className="w-[80px] h-[28px] text-left bg-[#FAFBFC] border-t border-l border-b border-[#DADFE4]">
                    <div className="flex items-center gap-[4px] px-[6px]">
                      <span className="text-[11px] leading-[12px] tracking-[0.8px] text-[#283037] font-normal">
                        Q&A
                      </span>
                      <SortIcon />
                    </div>
                  </th>
                  <th className="w-[60px] h-[28px] text-left bg-[#FAFBFC] border-t border-l border-r border-b border-[#DADFE4]">
                    <div className="flex items-center px-[6px]">
                      <span className="text-[11px] leading-[12px] tracking-[0.8px] text-[#283037] font-normal">
                        Sub ERS
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {ersData.length === 0 && (
                  <tr>
                    <td colSpan={4}>
                      <div className="flex items-center justify-center h-[400px]">
                        <span className="text-[14px] leading-[20px] tracking-[0.8px] text-[#767D84]">
                          데이터가 없습니다.
                        </span>
                      </div>
                    </td>
                  </tr>
                )}
                {ersData.map((row, idx) => {
                  const isSelected = row.selected === true
                  const borderColor = isSelected
                    ? 'border-[#DADFE4]'
                    : 'border-[#E4E9ED]'
                  return (
                    <tr
                      key={idx}
                      className={
                        isSelected
                          ? 'bg-[#EBF5FB]'
                          : 'bg-white hover:bg-[#F7F9FA]'
                      }
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
                          style={
                            isSelected
                              ? { paddingLeft: '13px', paddingRight: '6px' }
                              : undefined
                          }
                        >
                          <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#202020] whitespace-nowrap">
                            {row.depth > 0 ? `└${row.index}` : row.index}
                          </span>
                        </div>
                      </td>

                      {/* ERS Title */}
                      <td
                        className={`h-[23px] border-l border-b ${borderColor}`}
                      >
                        <div className="px-[6px]">
                          <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#283037] whitespace-nowrap overflow-hidden text-ellipsis block">
                            {row.title}
                          </span>
                        </div>
                      </td>

                      {/* Q&A */}
                      <td
                        className={`h-[23px] border-l border-b ${borderColor}`}
                      >
                        <div className="px-[6px] flex items-center gap-[4px]">
                          <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#283037] whitespace-nowrap">
                            {row.qa}
                          </span>
                          {row.hasNew && (
                            <span className="inline-flex items-center justify-center bg-[#FF695F] border-[0.5px] border-[#FF4337] text-white text-[9px] leading-[12px] px-[3px] rounded-[1px] font-bold">
                              New
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Sub ERS */}
                      <td
                        className={`h-[23px] border-l border-r border-b ${borderColor}`}
                      >
                        <div className="flex items-center justify-center h-full">
                          <button className="bg-white border border-[#DADFE4] rounded-[2px] flex items-center h-[16px] px-[4px]">
                            <div className="flex items-center gap-[2px]">
                              <PlusIcon />
                              <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] whitespace-nowrap">
                                Add
                              </span>
                            </div>
                          </button>
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
          {ersData.length === 0 ? (
            /* Empty State */
            <div className="flex-1 flex items-center justify-center">
              <span className="text-[14px] leading-[20px] tracking-[0.8px] text-[#767D84]">
                데이터가 없습니다.
              </span>
            </div>
          ) : (
            <>
              {/* Detail Header */}
              <div className="shrink-0 flex items-center justify-between px-[16px] pt-[14px] pb-[8px]">
                <h2 className="text-[14px] font-bold leading-[20px] tracking-[0.8px] text-[#384047] truncate mr-[8px]">
                  {detailContent.title}
                </h2>
                <div className="flex items-center gap-[13px] shrink-0">
                  <button
                    className="bg-white border border-[#DADFE4] rounded-[2px]"
                    onClick={() => setQnaViewOpen(true)}
                  >
                    <div className="flex items-center gap-[4px] px-[6px]">
                      <div className="flex items-center py-[3px]">
                        <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] whitespace-nowrap">
                          Q&A View(2/3)
                        </span>
                      </div>
                    </div>
                  </button>
                  <button
                    className="bg-[#E4E9ED] border border-[#DADFE4] rounded-[2px] cursor-not-allowed"
                    disabled
                  >
                    <div className="flex items-center gap-[4px] px-[6px]">
                      <div className="flex items-center py-[3px]">
                        <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#B2B6BB] whitespace-nowrap">
                          Edit
                        </span>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Divider_A */}
              <div className="shrink-0 mx-[16px] flex flex-col gap-[3px]">
                <div className="h-px opacity-0" />
                <div className="h-px bg-[#DADFE4]" />
                <div className="h-px opacity-0" />
              </div>

              {/* Detail Body */}
              <div className="flex-1 overflow-auto px-[16px] pt-[8px] pb-[16px]">
                <div className="border border-[#E4E9ED] bg-white p-[6px]">
                  <div className="text-[14px] leading-[20px] tracking-[0.8px] text-[#384047] whitespace-pre-wrap break-words">
                    {detailContent.body}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      )}

      {/* Add Index Dialog */}
      <AddIndexDialog
        open={addIndexOpen}
        onClose={() => setAddIndexOpen(false)}
      />

      {/* Parse ERS File Dialog */}
      <ParseErsFileDialog
        open={parseErsOpen}
        onClose={() => setParseErsOpen(false)}
      />

      {/* QnA View Dialog */}
      <QnaViewDialog
        open={qnaViewOpen}
        onClose={() => setQnaViewOpen(false)}
      />
    </div>
  )
}
