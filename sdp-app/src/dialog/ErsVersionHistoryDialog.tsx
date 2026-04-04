import { useState, useRef, useCallback, useMemo } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { diffWords } from 'diff'

interface ErsVersionHistoryDialogProps {
  open: boolean
  onClose: () => void
}

interface VersionData {
  version: string
  updatedDate: string
  updatedUser: string
  expectedValues: string[]
  coworker: string[]
  description: string
}

const versionList: VersionData[] = [
  {
    version: 'Version 1.0',
    updatedDate: '2025-05-12',
    updatedUser: '김삼성',
    expectedValues: ['Function A'],
    coworker: ['안삼성'],
    description: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackman.`,
  },
  {
    version: 'Version 0.9',
    updatedDate: '2025-04-01',
    updatedUser: '이삼성',
    expectedValues: ['Function A'],
    coworker: ['안삼성'],
    description: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia.
The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.`,
  },
]

const latestVersion: VersionData = {
  version: 'Latest Version',
  updatedDate: '2025-06-21',
  updatedUser: '김삼성',
  expectedValues: ['Function A', 'Function B', 'Function C', 'Function D', 'Function E', 'Function F', 'Function G'],
  coworker: ['안삼성', '이삼성', '박삼성', '최삼성', '정삼성', '홍삼성', '유삼성', '윤삼성'],
  description: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackman. Additional validation rules have been applied to ensure compliance with the latest specification requirements.`,
}

function DiffLegend() {
  return (
    <div className="flex items-center">
      <span className="text-[14px] leading-[20px] tracking-[0.8px] text-[#565E66]">
        Description
      </span>
      <div className="flex items-center justify-center w-[13px]">
        <div className="w-px h-[10px] bg-[#CCD1D6]" />
      </div>
      <div className="flex items-center gap-[8px]">
        <div className="flex items-center gap-[4px]">
          <div className="w-[10px] h-[10px] bg-[#D4F1D7] border border-[#BFEBC4]" />
          <span className="text-[11px] leading-[12px] tracking-[0.8px] text-[#565E66]">Add</span>
        </div>
        <div className="flex items-center gap-[4px]">
          <div className="w-[10px] h-[10px] bg-[#FFD9D7] border border-[#FFC7C3]" />
          <span className="text-[11px] leading-[12px] tracking-[0.8px] text-[#565E66]">Delete</span>
        </div>
      </div>
    </div>
  )
}

function DataTable({ rows }: { rows: { label: string; children: React.ReactNode }[] }) {
  return (
    <div className="border border-[#D9D9D9]">
      {rows.map((row, idx) => (
        <div
          key={row.label}
          className={`flex ${idx > 0 ? 'border-t border-[#D9D9D9]' : ''}`}
        >
          <div className="w-[120px] shrink-0 flex items-center bg-[#FAFBFC] px-[10px] border-r border-[#DADFE4]">
            <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#283037]">
              {row.label}
            </span>
          </div>
          <div className="flex-1 flex flex-wrap items-start content-start px-[10px] py-[4px] gap-[4px] bg-white h-[48px] overflow-y-auto">
            {row.children}
          </div>
        </div>
      ))}
    </div>
  )
}

function Badge({ text }: { text: string }) {
  return (
    <div className="bg-[#E4E9ED] border border-[#DADFE4] flex items-center justify-center min-w-[20px] px-[4px] py-[2px]">
      <span className="text-[11px] leading-[12px] tracking-[0.8px] text-[#565E66] text-center whitespace-nowrap">
        {text}
      </span>
    </div>
  )
}

/** 이전 버전(왼쪽) 패널: 삭제된 부분을 빨간색으로 표시, 추가된 부분은 숨김 */
function OldVersionContent({ oldText, latestText }: { oldText: string; latestText: string }) {
  const parts = useMemo(() => diffWords(oldText, latestText), [oldText, latestText])

  return (
    <span className="text-[14px] leading-[20px] tracking-[0.8px] text-[#565E66] whitespace-pre-wrap">
      {parts.map((part, i) => {
        if (part.added) return null
        if (part.removed) {
          return <span key={i} className="bg-[#FFD9D7] line-through">{part.value}</span>
        }
        return <span key={i}>{part.value}</span>
      })}
    </span>
  )
}

/** Latest(오른쪽) 패널: 추가된 부분을 녹색으로 표시, 삭제된 부분은 숨김 */
function LatestVersionContent({ oldText, latestText }: { oldText: string; latestText: string }) {
  const parts = useMemo(() => diffWords(oldText, latestText), [oldText, latestText])

  return (
    <span className="text-[14px] leading-[20px] tracking-[0.8px] text-[#565E66] whitespace-pre-wrap">
      {parts.map((part, i) => {
        if (part.removed) return null
        if (part.added) {
          return <span key={i} className="bg-[#D4F1D7]">{part.value}</span>
        }
        return <span key={i}>{part.value}</span>
      })}
    </span>
  )
}

export function ErsVersionHistoryDialog({ open, onClose }: ErsVersionHistoryDialogProps) {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const leftScrollRef = useRef<HTMLDivElement>(null)
  const rightScrollRef = useRef<HTMLDivElement>(null)
  const isSyncing = useRef(false)

  const handleScroll = useCallback((source: 'left' | 'right') => {
    if (isSyncing.current) return
    isSyncing.current = true

    const srcEl = source === 'left' ? leftScrollRef.current : rightScrollRef.current
    const tgtEl = source === 'left' ? rightScrollRef.current : leftScrollRef.current

    if (srcEl && tgtEl) {
      const ratio = srcEl.scrollTop / (srcEl.scrollHeight - srcEl.clientHeight || 1)
      tgtEl.scrollTop = ratio * (tgtEl.scrollHeight - tgtEl.clientHeight)
    }

    requestAnimationFrame(() => { isSyncing.current = false })
  }, [])

  if (!open) return null

  const selectedVersion = versionList[selectedIdx]
  const canPrev = selectedIdx < versionList.length - 1
  const canNext = selectedIdx > 0

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#283037]/50" onClick={onClose} />

      {/* Dialog */}
      <div className="relative flex flex-col w-[800px] min-h-[496px] max-h-[800px] h-[588px] bg-white rounded-[6px] shadow-[0px_0px_2px_0px_rgba(34,38,44,0.32),0px_6px_12px_0px_rgba(34,38,44,0.16)]">
        {/* Header */}
        <div className="flex items-center justify-between px-[20px] pt-[16px] pb-[16px] shrink-0">
          <span className="text-[16px] leading-[20px] text-[#283037]">
            SRS Version History
          </span>
          <button onClick={onClose} className="hover:bg-[#F3F6F8] rounded-[2px]">
            <X className="w-[16px] h-[16px] text-[#565E66]" strokeWidth={1.5} />
          </button>
        </div>
        <div className="h-px bg-[#E4E9ED] shrink-0" />

        {/* Body */}
        <div className="flex-1 flex px-[20px] py-[20px] overflow-hidden min-h-0">
          {/* Left Panel - 이전 버전 */}
          <div className="w-[380px] shrink-0 flex flex-col bg-[#F3F6F8] border border-[#DADFE4] rounded-tl-[2px] rounded-bl-[2px] border-r-0">
            {/* Version Nav */}
            <div className="flex items-center justify-center gap-[16px] h-[40px] shrink-0">
              <button
                onClick={() => canPrev && setSelectedIdx(selectedIdx + 1)}
                className={canPrev ? 'text-[#565E66] hover:text-[#384047]' : 'text-[#CCD1D6] cursor-default'}
                disabled={!canPrev}
              >
                <ChevronLeft className="w-[14px] h-[14px]" strokeWidth={1.5} />
              </button>
              <span className="text-[14px] font-bold leading-[20px] tracking-[0.8px] text-[#565E66]">
                {selectedVersion.version}
              </span>
              <button
                onClick={() => canNext && setSelectedIdx(selectedIdx - 1)}
                className={canNext ? 'text-[#565E66] hover:text-[#384047]' : 'text-[#CCD1D6] cursor-default'}
                disabled={!canNext}
              >
                <ChevronRight className="w-[14px] h-[14px]" strokeWidth={1.5} />
              </button>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-[12px] px-[12px] pb-[8px] text-[14px] leading-[20px] tracking-[0.8px]">
              <div className="flex items-center gap-[6px]">
                <span className="text-[#90969D]">Updated Date</span>
                <span className="text-[#565E66]">{selectedVersion.updatedDate}</span>
              </div>
              <div className="flex items-center gap-[6px]">
                <span className="text-[#90969D]">Updated User:</span>
                <span className="text-[#565E66]">{selectedVersion.updatedUser}</span>
              </div>
            </div>

            <div className="h-px bg-[#DADFE4] mx-[12px] shrink-0" />

            {/* Table Rows */}
            <div className="mx-[12px] mt-[8px] shrink-0">
              <DataTable rows={[
                {
                  label: 'Expected Value',
                  children: selectedVersion.expectedValues.map((v) => (
                    <Badge key={v} text={v} />
                  )),
                },
                {
                  label: 'Coworker',
                  children: selectedVersion.coworker.map((v) => (
                    <Badge key={v} text={v} />
                  )),
                },
              ]} />
            </div>

            {/* Legend */}
            <div className="px-[12px] py-[8px] shrink-0">
              <DiffLegend />
            </div>

            {/* Content */}
            <div className="flex-1 px-[12px] pb-[12px] min-h-0">
              <div
                ref={leftScrollRef}
                onScroll={() => handleScroll('left')}
                className="border border-[#DADFE4] rounded-[2px] bg-white h-full overflow-y-auto p-[10px]"
              >
                <OldVersionContent oldText={selectedVersion.description} latestText={latestVersion.description} />
              </div>
            </div>
          </div>

          {/* Right Panel - Latest */}
          <div className="w-[380px] shrink-0 flex flex-col bg-white border border-[#DADFE4] rounded-tr-[2px] rounded-br-[2px]">
            {/* Title */}
            <div className="flex items-center justify-center h-[40px] shrink-0">
              <span className="text-[14px] font-bold leading-[20px] tracking-[0.8px] text-[#565E66]">
                Latest Version
              </span>
            </div>

            {/* Meta */}
            <div className="flex items-center gap-[12px] px-[12px] pb-[8px] text-[14px] leading-[20px] tracking-[0.8px]">
              <div className="flex items-center gap-[6px]">
                <span className="text-[#90969D]">Updated Date</span>
                <span className="text-[#565E66]">{latestVersion.updatedDate}</span>
              </div>
              <div className="flex items-center gap-[6px]">
                <span className="text-[#90969D]">Updated User:</span>
                <span className="text-[#565E66]">{latestVersion.updatedUser}</span>
              </div>
            </div>

            <div className="h-px bg-[#DADFE4] mx-[12px] shrink-0" />

            {/* Table Rows */}
            <div className="mx-[12px] mt-[8px] shrink-0">
              <DataTable rows={[
                {
                  label: 'Expected Value',
                  children: latestVersion.expectedValues.map((v) => (
                    <Badge key={v} text={v} />
                  )),
                },
                {
                  label: 'Coworker',
                  children: latestVersion.coworker.map((v) => (
                    <Badge key={v} text={v} />
                  )),
                },
              ]} />
            </div>

            {/* Legend */}
            <div className="px-[12px] py-[8px] shrink-0">
              <DiffLegend />
            </div>

            {/* Content */}
            <div className="flex-1 px-[12px] pb-[12px] min-h-0">
              <div
                ref={rightScrollRef}
                onScroll={() => handleScroll('right')}
                className="border border-[#DADFE4] rounded-[2px] bg-white h-full overflow-y-auto p-[10px]"
              >
                <LatestVersionContent oldText={selectedVersion.description} latestText={latestVersion.description} />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0">
          <div className="h-px bg-[#EDF2F4]" />
          <div className="flex items-center justify-end px-[20px] py-[16px]">
            <button
              onClick={onClose}
              className="border border-[#DADFE4] bg-white rounded-[2px] px-[6px] py-[4px] w-[48px] flex items-center justify-center text-[14px] leading-[20px] tracking-[0.8px] text-[#384047] hover:bg-[#F3F6F8]"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
