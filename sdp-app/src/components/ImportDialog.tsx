import { useState } from 'react'
import { X, ChevronRight } from 'lucide-react'

interface ImportDialogProps {
  open: boolean
  onClose: () => void
}

export function ImportDialog({ open, onClose }: ImportDialogProps) {
  const [fileName, setFileName] = useState<string | null>(null)

  if (!open) return null

  const handleImportClick = () => {
    setFileName('NEW_ERS_Ver.1.2.4.xlsx')
  }

  const handleRemoveFile = () => {
    setFileName(null)
  }

  const handleClose = () => {
    setFileName(null)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-[#283037] opacity-[0.52]"
        onClick={handleClose}
      />

      {/* Dialog */}
      <div
        className="relative bg-white rounded-[6px] w-[1000px] h-[620px] flex flex-col"
        style={{
          boxShadow: '0px 0px 2px 0px rgba(34,38,44,0.32), 0px 6px 12px 0px rgba(34,38,44,0.16)',
        }}
      >
        {/* Header */}
        <div className="relative h-[53px] shrink-0">
          <div className="flex items-start justify-between pl-[20px] pr-[18px] pt-[16px] pb-[36px]">
            <p className="text-[16px] font-normal leading-[20px] tracking-[0.8px] text-[#283037] truncate">
              Import
            </p>
            <button
              onClick={handleClose}
              className="rounded-[2px] hover:bg-[#EDF2F4] p-[1px]"
            >
              <X className="w-[14px] h-[14px] text-[#565E66]" strokeWidth={1.5} />
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-[#E4E9ED]" />
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col items-center relative">
          {/* Step Title */}
          <p className="mt-[20px] text-[16px] font-bold leading-[20px] tracking-[0.8px] text-[#283037]">
            STEP1. Select Target File
          </p>

          {/* Description */}
          <p className="mt-[12px] text-[12px] font-normal leading-[14px] tracking-[0.8px] text-[#565E66]">
            Import the latest version of ERS file for Compliance Matrix.
          </p>

          {/* Step Indicators */}
          <div className="flex items-center gap-[6px] mt-[16px]">
            <div className="w-[8px] h-[8px] rounded-full bg-[#3392D3]" />
            <div className="w-[8px] h-[8px] rounded-full bg-[#DADFE4]" />
            <div className="w-[8px] h-[8px] rounded-full bg-[#DADFE4]" />
          </div>

          {/* Upload Area */}
          <div className="mt-[16px] w-[600px] h-[345px] rounded-[4px] border border-dashed border-[#B0B8C1] bg-[#FAFBFC] flex flex-col items-center justify-center">
            {/* File Icon */}
            <div className="mb-[16px]">
              {fileName ? <UploadIconColored /> : <UploadIconGray />}
            </div>

            {/* Import Button */}
            <button
              onClick={handleImportClick}
              className="bg-[#3392D3] rounded-[2px] px-[8px] py-[4px] text-[14px] font-bold leading-[20px] tracking-[0.8px] text-white hover:bg-[#2B7DB5]"
            >
              Import ERS File
            </button>
          </div>

          {/* File Status - outside upload area */}
          <div className="mt-[8px] text-[12px] leading-[14px] tracking-[0.8px] text-[#90969D]">
            {fileName ? (
              <div className="flex items-center gap-[4px]">
                <FileDocIcon />
                <span className="text-[#384047]">{fileName}</span>
                <button
                  onClick={handleRemoveFile}
                  className="p-[2px] rounded-[2px] hover:bg-[#E4E9ED]"
                >
                  <X className="w-[12px] h-[12px] text-[#90969D]" />
                </button>
              </div>
            ) : (
              'No attached files.'
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="relative h-[60px] shrink-0 flex items-center justify-end px-[20px]">
          <div className="absolute top-0 left-0 right-0 h-px bg-[#EDF2F4]" />
          <button className="flex items-center gap-[4px] border border-[#DADFE4] bg-white rounded-[2px] px-[8px] py-[4px] text-[14px] font-normal leading-[20px] tracking-[0.8px] text-[#384047] hover:bg-[#F3F6F8]">
            Next
            <ChevronRight className="w-[14px] h-[14px] text-[#384047]" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  )
}

/** 파일 미첨부 상태: 회색 아웃라인 아이콘 */
function UploadIconGray() {
  return (
    <svg width="106" height="90" viewBox="0 0 106 90" fill="none">
      <path d="M4 20C4 17.7909 5.79086 16 8 16H36L44 24H82C84.2091 24 86 25.7909 86 28V76C86 78.2091 84.2091 80 82 80H8C5.79086 80 4 78.2091 4 76V20Z" fill="#E4E9ED" />
      <path d="M0 32C0 29.7909 1.79086 28 4 28H78C80.2091 28 82 29.7909 82 32V80C82 82.2091 80.2091 84 78 84H4C1.79086 84 0 82.2091 0 80V32Z" fill="#EDF2F4" />
      <rect x="52" y="0" width="50" height="62" rx="3" fill="white" stroke="#DADFE4" strokeWidth="1" />
      <line x1="62" y1="14" x2="92" y2="14" stroke="#E4E9ED" strokeWidth="2" />
      <line x1="62" y1="22" x2="92" y2="22" stroke="#E4E9ED" strokeWidth="2" />
      <line x1="62" y1="30" x2="82" y2="30" stroke="#E4E9ED" strokeWidth="2" />
      <circle cx="78" cy="64" r="11" fill="white" stroke="#DADFE4" strokeWidth="1" />
      <path d="M78 59L78 69" stroke="#90969D" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M74 63L78 59L82 63" stroke="#90969D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** 파일 첨부 완료 상태: 컬러 아이콘 */
function UploadIconColored() {
  return (
    <svg width="106" height="90" viewBox="0 0 106 90" fill="none">
      <path d="M4 20C4 17.7909 5.79086 16 8 16H36L44 24H82C84.2091 24 86 25.7909 86 28V76C86 78.2091 84.2091 80 82 80H8C5.79086 80 4 78.2091 4 76V20Z" fill="#FFE0B2" />
      <path d="M0 32C0 29.7909 1.79086 28 4 28H78C80.2091 28 82 29.7909 82 32V80C82 82.2091 80.2091 84 78 84H4C1.79086 84 0 82.2091 0 80V32Z" fill="#FFECD2" />
      <rect x="52" y="0" width="50" height="62" rx="3" fill="white" stroke="#DADFE4" strokeWidth="1" />
      <line x1="62" y1="14" x2="92" y2="14" stroke="#E4E9ED" strokeWidth="2" />
      <line x1="62" y1="22" x2="92" y2="22" stroke="#E4E9ED" strokeWidth="2" />
      <line x1="62" y1="30" x2="82" y2="30" stroke="#E4E9ED" strokeWidth="2" />
      <circle cx="78" cy="64" r="11" fill="#3392D3" />
      <path d="M78 59L78 69" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M74 63L78 59L82 63" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function FileDocIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="2" y="1" width="10" height="12" rx="1.5" stroke="#90969D" strokeWidth="1" />
      <line x1="4.5" y1="4.5" x2="9.5" y2="4.5" stroke="#90969D" strokeWidth="0.8" />
      <line x1="4.5" y1="7" x2="9.5" y2="7" stroke="#90969D" strokeWidth="0.8" />
      <line x1="4.5" y1="9.5" x2="7.5" y2="9.5" stroke="#90969D" strokeWidth="0.8" />
    </svg>
  )
}
