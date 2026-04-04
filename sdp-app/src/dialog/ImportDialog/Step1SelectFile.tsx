import { X } from 'lucide-react'

interface Step1SelectFileProps {
  fileName: string | null
  onFileLoad: (name: string | null) => void
}

export function Step1SelectFile({ fileName, onFileLoad }: Step1SelectFileProps) {
  const handleImportClick = () => {
    onFileLoad('NEW_ERS_Ver.1.2.4.xlsx')
  }

  const handleRemoveFile = () => {
    onFileLoad(null)
  }

  return (
    <div className="flex flex-col items-center h-full">
      {/* Upload Area */}
      <div className="w-[600px] h-[345px] rounded-[4px] border border-dashed border-[#B0B8C1] bg-[#FAFBFC] flex flex-col items-center justify-center">
        <div className="mb-[16px]">
          {fileName ? <UploadIconColored /> : <UploadIconGray />}
        </div>
        <button
          onClick={handleImportClick}
          className="bg-[#3392D3] rounded-[2px] px-[8px] py-[4px] text-[14px] font-bold leading-[20px] tracking-[0.8px] text-white hover:bg-[#2B7DB5]"
        >
          Import ERS File
        </button>
      </div>

      {/* File Status */}
      <div className="mt-[8px] text-[12px] leading-[14px] tracking-[0.8px] text-[#90969D]">
        {fileName ? (
          <div className="flex items-center gap-[4px]">
            <FileDocIcon />
            <span className="text-[#384047]">{fileName}</span>
            <button onClick={handleRemoveFile} className="p-[2px] rounded-[2px] hover:bg-[#E4E9ED]">
              <X className="w-[12px] h-[12px] text-[#90969D]" />
            </button>
          </div>
        ) : (
          'No attached files.'
        )}
      </div>
    </div>
  )
}

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
