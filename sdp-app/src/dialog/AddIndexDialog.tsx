import { useState } from 'react'
import { X } from 'lucide-react'

interface AddIndexDialogProps {
  open: boolean
  onClose: () => void
  onSave?: (data: { index: string; ersTitle: string; description: string }) => void
}

export function AddIndexDialog({ open, onClose, onSave }: AddIndexDialogProps) {
  const [index, setIndex] = useState('')
  const [ersTitle, setErsTitle] = useState('')
  const [description, setDescription] = useState('')

  if (!open) return null

  const handleClose = () => {
    setIndex('')
    setErsTitle('')
    setDescription('')
    onClose()
  }

  const handleSave = () => {
    onSave?.({ index, ersTitle, description })
    handleClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#283037] opacity-[0.52]" onClick={handleClose} />

      {/* Dialog */}
      <div
        className="relative bg-white rounded-[6px] w-[640px] h-[600px] min-h-[400px] max-h-[640px] flex flex-col"
        style={{ boxShadow: '0px 0px 2px 0px rgba(34,38,44,0.32), 0px 6px 12px 4px rgba(34,38,44,0.16)' }}
      >
        {/* Header */}
        <div className="relative h-[53px] shrink-0">
          <div className="flex items-center justify-between pl-[20px] pr-[18px] pt-[16px] pb-[36px] rounded-t-[6px]">
            <span className="text-[16px] leading-[20px] tracking-[0.8px] text-[#283037] truncate">
              Add Index
            </span>
            <button onClick={handleClose} className="rounded-[2px] hover:bg-[#EDF2F4] p-[2px]">
              <X className="w-[14px] h-[14px] text-[#565E66]" strokeWidth={1.5} />
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-[#E4E9ED]" />
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-[20px] pt-[16px] pb-[16px]">
          {/* Index */}
          <div className="flex flex-col gap-[8px]">
            <div className="flex items-center">
              <span className="text-[14px] font-bold leading-[20px] tracking-[0.8px] text-[#384047]">
                Index
              </span>
              <span className="text-[14px] font-bold text-[#FF4337]">*</span>
            </div>
            <input
              type="text"
              value={index}
              onChange={(e) => setIndex(e.target.value)}
              placeholder="내용을 입력해주세요."
              className="w-full h-[28px] border border-[#CCD1D6] rounded-[2px] pl-[8px] pr-[6px] py-[4px] text-[14px] leading-[20px] tracking-[0.8px] text-[#283037] placeholder:text-[#90969D] outline-none bg-white"
            />
          </div>

          {/* ERS Title */}
          <div className="flex flex-col gap-[8px] mt-[16px]">
            <div className="flex items-center">
              <span className="text-[14px] font-bold leading-[20px] tracking-[0.8px] text-[#384047]">
                ERS Title
              </span>
              <span className="text-[14px] font-bold text-[#FF4337]">*</span>
            </div>
            <input
              type="text"
              value={ersTitle}
              onChange={(e) => setErsTitle(e.target.value)}
              placeholder="내용을 입력해주세요."
              className="w-full h-[28px] border border-[#CCD1D6] rounded-[2px] pl-[8px] pr-[6px] py-[4px] text-[14px] leading-[20px] tracking-[0.8px] text-[#283037] placeholder:text-[#90969D] outline-none bg-white"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-[8px] mt-[16px]">
            <div className="flex items-center">
              <span className="text-[14px] font-bold leading-[20px] tracking-[0.8px] text-[#384047]">
                Description
              </span>
              <span className="text-[14px] font-bold text-[#FF4337]">*</span>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="내용을 입력해주세요."
              className="w-full h-[279px] border border-[#CCD1D6] rounded-[2px] px-[8px] py-[6px] text-[14px] leading-[20px] tracking-[0.8px] text-[#283037] placeholder:text-[#90969D] outline-none bg-white resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="relative h-[60px] shrink-0 rounded-b-[6px]">
          <div className="absolute top-0 left-0 right-0 h-px bg-[#EDF2F4]" />
          <div className="flex items-center justify-end gap-[6px] pr-[20px] pt-[16px]">
            <button
              onClick={handleSave}
              className="bg-[#3392D3] rounded-[2px] px-[8px] py-[4px] text-[14px] font-bold leading-[20px] tracking-[0.8px] text-white hover:bg-[#2B7DB5]"
            >
              Save
            </button>
            <button
              onClick={handleClose}
              className="border border-[#DADFE4] bg-white rounded-[2px] px-[8px] py-[4px] text-[14px] leading-[20px] tracking-[0.8px] text-[#384047] hover:bg-[#F3F6F8]"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
