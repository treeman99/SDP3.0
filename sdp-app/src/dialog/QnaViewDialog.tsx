import { useState } from 'react'
import { X, Pencil, Calendar } from 'lucide-react'
import { ConfirmDialog } from '@/components/common/ConfirmDialog'

interface QnaViewDialogProps {
  open: boolean
  onClose: () => void
}

interface QnaItem {
  status: 'Open' | 'Close'
  summary: string
  questioner: string
}

interface QnaThread {
  type: 'Q' | 'A'
  author: string
  date: string
  content: string
}

const initialQnaList: QnaItem[] = [
  { status: 'Open', summary: 'Ref.Saummary A', questioner: 'Samsung.An' },
  { status: 'Open', summary: 'Ref.Saummary B', questioner: 'Samsung.An' },
  { status: 'Close', summary: 'Ref.Saummary C', questioner: 'Samsung.An' },
  { status: 'Close', summary: 'Ref.Saummary D', questioner: 'Samsung.An' },
  { status: 'Close', summary: 'Ref.Saummary E', questioner: 'Samsung.An' },
  { status: 'Close', summary: 'Ref.Saummary F', questioner: 'Samsung.An' },
  { status: 'Close', summary: 'Ref.Saummary G', questioner: 'Samsung.An' },
]

// Thread data keyed by list index
const initialThreads: Record<number, QnaThread[]> = {
  1: [
    {
      type: 'Q',
      author: 'Samsung.Kim01',
      date: '2025-02-12',
      content:
        'Question is Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat?',
    },
    {
      type: 'A',
      author: 'Aqua.An.Mark',
      date: '2025-02-15',
      content:
        'Contrary to popular belief, Lorem Ipsum is not simply in a piece of classical Latin literature from 45 BC.',
    },
  ],
}

function XSmallIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M4 4L10 10" stroke="#767D84" strokeWidth="1.2" />
      <path d="M10 4L4 10" stroke="#767D84" strokeWidth="1.2" />
    </svg>
  )
}

function DividerVertical() {
  return (
    <div className="flex items-center justify-center w-[21px] h-[11px]">
      <div className="w-px h-[11px] bg-[#22262C] opacity-15" />
    </div>
  )
}

export function QnaViewDialog({ open, onClose }: QnaViewDialogProps) {
  const [qnaList, setQnaList] = useState<QnaItem[]>(initialQnaList)
  const [threads, setThreads] = useState<Record<number, QnaThread[]>>(initialThreads)
  const [selectedIdx, setSelectedIdx] = useState(1)
  const [activeToggle, setActiveToggle] = useState<'Question' | 'Answer'>('Answer')
  const [dateValue, setDateValue] = useState('2024-01-31')
  const [textValue, setTextValue] = useState('')
  const [saveConfirmOpen, setSaveConfirmOpen] = useState(false)
  const [cancelConfirmOpen, setCancelConfirmOpen] = useState(false)

  if (!open) return null

  const selectedItem = qnaList[selectedIdx]
  const selectedThreads = threads[selectedIdx] || []
  const isNewItem = selectedThreads.length === 0
  const isOpen = selectedItem?.status === 'Open'

  const handleAddQna = () => {
    const newItem: QnaItem = {
      status: 'Open',
      summary: 'My Question is my...',
      questioner: 'Samsung.An',
    }
    const newList = [...qnaList, newItem]
    setQnaList(newList)
    setSelectedIdx(newList.length - 1)
    setActiveToggle('Question')
    setTextValue('')
  }

  const handleAddThread = () => {
    if (!textValue.trim()) return
    const newThread: QnaThread = {
      type: activeToggle === 'Question' ? 'Q' : 'A',
      author: 'Samsung.An',
      date: dateValue,
      content: textValue,
    }
    setThreads((prev) => ({
      ...prev,
      [selectedIdx]: [...(prev[selectedIdx] || []), newThread],
    }))
    setTextValue('')
  }

  const handleCancelThread = () => {
    setTextValue('')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#283037] opacity-[0.52]" onClick={onClose} />

      {/* Dialog */}
      <div
        className="relative bg-white rounded-[6px] w-[800px] h-[688px] flex flex-col"
        style={{
          boxShadow:
            '0px 0px 2px 0px rgba(34,38,44,0.32), 0px 6px 12px 4px rgba(34,38,44,0.16)',
        }}
      >
        {/* Header */}
        <div className="relative h-[53px] shrink-0">
          <div className="flex items-center justify-between pl-[20px] pr-[18px] pt-[16px] pb-[36px] rounded-t-[6px]">
            <span className="text-[16px] leading-[20px] tracking-[0.8px] text-[#283037] truncate">
              QnA View
            </span>
            <button onClick={onClose} className="rounded-[2px] hover:bg-[#EDF2F4] p-[2px]">
              <X className="w-[14px] h-[14px] text-[#565E66]" strokeWidth={1.5} />
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-[#E4E9ED]" />
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col overflow-hidden px-[20px] pt-[16px]">
          {/* Sub-header: Title + Buttons */}
          <div className="shrink-0 flex items-center justify-between pb-[12px]">
            <span className="text-[14px] font-bold leading-[20px] tracking-[0.8px] text-[#384047]">
              QnA Other Reference 291
            </span>
            <div className="flex items-center gap-[6px]">
              <button className="bg-white border border-[#DADFE4] rounded-[2px] px-[6px] py-[2px]">
                <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] whitespace-nowrap">
                  QnA to File
                </span>
              </button>
              <div className="w-px h-[10px] bg-[#CCD1D6]" />
              <button
                className="bg-white border border-[#DADFE4] rounded-[2px] px-[6px] py-[2px]"
                onClick={handleAddQna}
              >
                <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] whitespace-nowrap">
                  Add
                </span>
              </button>
            </div>
          </div>

          {/* Content: Left Table + Right Detail */}
          <div className="flex-1 flex overflow-hidden">
            {/* Left: QnA Table */}
            <div className="shrink-0 w-[313px] border border-[#DADFE4] overflow-auto">
              <table className="w-full border-separate border-spacing-0">
                <thead className="sticky top-0 z-10">
                  <tr>
                    <th className="w-[70px] h-[28px] text-left bg-[#FAFBFC] border-b border-[#DADFE4]">
                      <div className="flex items-center px-[6px]">
                        <span className="text-[11px] leading-[12px] tracking-[0.8px] text-[#283037] font-normal">
                          Status
                        </span>
                      </div>
                    </th>
                    <th className="h-[28px] text-left bg-[#FAFBFC] border-l border-b border-[#DADFE4]">
                      <div className="flex items-center px-[6px]">
                        <span className="text-[11px] leading-[12px] tracking-[0.8px] text-[#283037] font-normal">
                          Summary
                        </span>
                      </div>
                    </th>
                    <th className="w-[112px] h-[28px] text-left bg-[#FAFBFC] border-l border-b border-[#DADFE4]">
                      <div className="flex items-center px-[6px]">
                        <span className="text-[11px] leading-[12px] tracking-[0.8px] text-[#283037] font-normal">
                          Questioner
                        </span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {qnaList.map((row, idx) => {
                    const isSelected = idx === selectedIdx
                    const rowIsOpen = row.status === 'Open'
                    return (
                      <tr
                        key={idx}
                        className={`cursor-pointer ${
                          isSelected ? 'bg-[#E4E9ED]' : 'bg-white hover:bg-[#F7F9FA]'
                        }`}
                        onClick={() => setSelectedIdx(idx)}
                      >
                        {/* Status */}
                        <td
                          className={`h-[23px] border-b ${
                            isSelected ? 'border-[#DADFE4]' : 'border-[#E4E9ED]'
                          }`}
                        >
                          <div className="flex items-center gap-[4px] px-[6px]">
                            <div
                              className={`w-[4px] h-[4px] rounded-none ${
                                rowIsOpen ? 'bg-[#0077C8]' : 'bg-[#90969D]'
                              }`}
                            />
                            <span
                              className={`text-[12px] leading-[14px] tracking-[0.8px] whitespace-nowrap ${
                                rowIsOpen ? 'text-[#005087]' : 'text-[#565E66]'
                              }`}
                            >
                              {row.status}
                            </span>
                          </div>
                        </td>
                        {/* Summary */}
                        <td
                          className={`h-[23px] border-l border-b ${
                            isSelected ? 'border-[#DADFE4]' : 'border-[#E4E9ED]'
                          }`}
                        >
                          <div className="px-[6px]">
                            <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#283037] whitespace-nowrap overflow-hidden text-ellipsis block">
                              {row.summary}
                            </span>
                          </div>
                        </td>
                        {/* Questioner */}
                        <td
                          className={`h-[23px] border-l border-b ${
                            isSelected ? 'border-[#DADFE4]' : 'border-[#E4E9ED]'
                          }`}
                        >
                          <div className="px-[6px]">
                            <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#283037] whitespace-nowrap overflow-hidden text-ellipsis block">
                              {row.questioner}
                            </span>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Right: Detail Panel */}
            <div className="flex-1 min-w-0 flex flex-col border-t border-r border-b border-[#DADFE4]">
              {/* Detail Header */}
              <div className="shrink-0 flex items-center justify-between px-[12px] pt-[12px] pb-[8px]">
                {!isNewItem && (
                  <span className="text-[14px] font-bold leading-[20px] tracking-[0.8px] text-[#384047] truncate">
                    {selectedItem?.summary}
                  </span>
                )}
                {isNewItem && <span />}
                <div className="flex items-center gap-[4px] shrink-0">
                  <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#384047]">
                    {isOpen ? 'Open' : 'Close'}
                  </span>
                  <button
                    onClick={() => {
                      const newList = [...qnaList]
                      newList[selectedIdx] = {
                        ...newList[selectedIdx],
                        status: isOpen ? 'Close' : 'Open',
                      }
                      setQnaList(newList)
                    }}
                    className={`relative w-[28px] h-[16px] rounded-full transition-colors ${
                      isOpen ? 'bg-[#3392D3]' : 'bg-[#CCD1D6]'
                    }`}
                  >
                    <div
                      className={`absolute top-[2px] w-[12px] h-[12px] rounded-full bg-white transition-transform ${
                        isOpen ? 'left-[14px]' : 'left-[2px]'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Separator */}
              <div className="shrink-0 mx-[12px] h-px bg-[#E4E9ED]" />

              {/* Thread Cards */}
              <div className="flex-1 overflow-auto px-[12px] pt-[12px]">
                {/* Existing threads */}
                {selectedThreads.length > 0 && (
                  <div className="flex flex-col gap-[12px]">
                    {selectedThreads.map((thread, idx) => (
                      <div
                        key={idx}
                        className={`rounded-[4px] border border-[#DADFE4] p-[12px] ${
                          thread.type === 'Q' ? 'bg-[#F3F6F8]' : 'bg-white'
                        }`}
                      >
                        {/* Card Header */}
                        <div className="flex items-center mb-[6px]">
                          {/* Tag */}
                          <div className="flex items-center justify-center border border-[#DADFE4] rounded-[2px] bg-[#F3F6F8] px-[6px] py-[3px]">
                            <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#565E66]">
                              {thread.type}
                            </span>
                          </div>
                          <DividerVertical />
                          <span className="text-[12px] font-bold leading-[20px] tracking-[0.8px] text-[#565E66] whitespace-nowrap">
                            {thread.author}
                          </span>
                          <DividerVertical />
                          <span className="text-[12px] leading-[20px] tracking-[0.8px] text-[#565E66] whitespace-nowrap">
                            {thread.date}
                          </span>
                          <DividerVertical />
                          <div className="flex items-center gap-[8px]">
                            <Pencil className="w-[14px] h-[14px] text-[#767D84]" strokeWidth={1.5} />
                            <XSmallIcon />
                          </div>
                        </div>
                        {/* Card Body */}
                        <p className="text-[14px] leading-[20px] tracking-[0.8px] text-[#565E66]">
                          {thread.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Separator */}
                <div className={`h-px bg-[#E4E9ED] ${selectedThreads.length > 0 ? 'my-[12px]' : 'mb-[12px]'}`} />

                {/* Toggle + Calendar */}
                <div className="flex items-center gap-[8px]">
                  {/* Toggle Buttons */}
                  <div className="flex items-center">
                    <button
                      onClick={() => setActiveToggle('Question')}
                      className={`border rounded-l-[2px] px-[6px] py-[3px] text-[12px] leading-[14px] tracking-[0.8px] whitespace-nowrap ${
                        activeToggle === 'Question'
                          ? 'bg-[#E6F1FA] border-[#CCD1D6] text-[#0077C8]'
                          : 'bg-white border-[#DADFE4] text-[#384047]'
                      }`}
                    >
                      Question
                    </button>
                    <button
                      onClick={() => setActiveToggle('Answer')}
                      className={`border border-l-0 rounded-r-[2px] px-[6px] py-[3px] text-[12px] leading-[14px] tracking-[0.8px] whitespace-nowrap ${
                        activeToggle === 'Answer'
                          ? 'bg-[#E6F1FA] border-[#CCD1D6] text-[#0077C8]'
                          : 'bg-white border-[#DADFE4] text-[#384047]'
                      }`}
                    >
                      Answer
                    </button>
                  </div>

                  {/* Calendar Input - only shown when threads exist */}
                  {!isNewItem && (
                    <div className="relative flex items-center border border-[#CCD1D6] rounded-[2px] px-[6px] py-[2px] bg-white">
                      <input
                        type="date"
                        value={dateValue}
                        onChange={(e) => setDateValue(e.target.value)}
                        className="text-[12px] leading-[14px] tracking-[0.8px] text-[#90969D] w-[90px] outline-none bg-transparent [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                      />
                      <Calendar className="w-[14px] h-[14px] text-[#565E66] shrink-0 pointer-events-none" strokeWidth={1.5} />
                    </div>
                  )}
                </div>

                {/* Textarea */}
                <textarea
                  value={textValue}
                  onChange={(e) => setTextValue(e.target.value)}
                  placeholder="text-inputplace"
                  className="w-full h-[72px] border border-[#CCD1D6] rounded-[2px] px-[8px] py-[6px] text-[14px] leading-[20px] tracking-[0.8px] text-[#283037] placeholder:text-[#90969D] outline-none bg-white resize-none mt-[8px]"
                />

                {/* Add / Cancel inline buttons */}
                <div className="flex items-center justify-end gap-[4px] mt-[8px] pb-[12px]">
                  <button
                    onClick={handleAddThread}
                    className="bg-[#3392D3] rounded-[2px] px-[6px] py-[3px] text-[12px] font-bold leading-[14px] tracking-[0.8px] text-white hover:bg-[#2B7DB5]"
                  >
                    Add
                  </button>
                  <button
                    onClick={handleCancelThread}
                    className="bg-white border border-[#DADFE4] rounded-[2px] px-[6px] py-[3px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] hover:bg-[#F3F6F8]"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative h-[60px] shrink-0 rounded-b-[6px]">
          <div className="absolute top-0 left-0 right-0 h-px bg-[#EDF2F4]" />
          <div className="flex items-center justify-end gap-[6px] pr-[20px] pt-[16px]">
            <button
              onClick={() => setSaveConfirmOpen(true)}
              className="bg-[#3392D3] rounded-[2px] px-[8px] py-[4px] text-[14px] font-bold leading-[20px] tracking-[0.8px] text-white hover:bg-[#2B7DB5]"
            >
              Save
            </button>
            <button
              onClick={() => setCancelConfirmOpen(true)}
              className="border border-[#DADFE4] bg-white rounded-[2px] px-[8px] py-[4px] text-[14px] leading-[20px] tracking-[0.8px] text-[#384047] hover:bg-[#F3F6F8]"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Save Confirm Dialog */}
      <ConfirmDialog
        open={saveConfirmOpen}
        onClose={() => setSaveConfirmOpen(false)}
        onConfirm={() => {
          setSaveConfirmOpen(false)
          onClose()
        }}
        title="Q&A"
        message="작성 된 Q&A 내용을 저장하시겠습니까?"
        confirmLabel="저장"
        cancelLabel="취소"
      />

      {/* Cancel Confirm Dialog */}
      <ConfirmDialog
        open={cancelConfirmOpen}
        onClose={() => setCancelConfirmOpen(false)}
        onConfirm={() => {
          setCancelConfirmOpen(false)
          onClose()
        }}
        title="Q&A"
        message="작성 된 Q&A 내용을 취소하시겠습니까?"
        confirmLabel="취소"
        cancelLabel="되돌아가기"
      />
    </div>
  )
}
