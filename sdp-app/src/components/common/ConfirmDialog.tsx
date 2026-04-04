import { X } from 'lucide-react'

interface ConfirmDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  note?: string
  confirmLabel: string
  cancelLabel?: string
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  note,
  confirmLabel,
  cancelLabel = '취소',
}: ConfirmDialogProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#283037] opacity-[0.52]" onClick={onClose} />

      {/* Dialog */}
      <div className="relative bg-white rounded-[4px] w-[400px] shadow-[0px_0px_2px_0px_rgba(40,48,55,0.12),0px_4px_8px_1px_rgba(40,48,55,0.12)]">
        {/* Header */}
        <div className="flex items-center justify-between px-[20px] pt-[16px] pb-[12px]">
          <h3 className="text-[16px] font-bold leading-[22px] tracking-[0.8px] text-[#283037]">
            {title}
          </h3>
          <button onClick={onClose} className="rounded-[2px] hover:bg-[#EDF2F4]">
            <X className="w-[16px] h-[16px] text-[#565E66]" strokeWidth={1.5} />
          </button>
        </div>

        {/* Body */}
        <div className="px-[20px] pb-[20px]">
          <p className="text-[14px] leading-[20px] tracking-[0.8px] text-[#384047]">
            {message}
          </p>
          {note && (
            <p className="mt-[8px] text-[12px] leading-[18px] tracking-[0.8px] text-[#767D84]">
              • {note}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-[8px] px-[20px] pb-[16px]">
          <button
            onClick={() => {
              onConfirm()
              onClose()
            }}
            className="bg-[#3392D3] rounded-[2px] px-[12px] py-[5px] text-[14px] font-bold leading-[20px] tracking-[0.8px] text-white hover:bg-[#2B7DB5]"
          >
            {confirmLabel}
          </button>
          <button
            onClick={onClose}
            className="border border-[#DADFE4] bg-white rounded-[2px] px-[12px] py-[5px] text-[14px] leading-[20px] tracking-[0.8px] text-[#384047] hover:bg-[#F3F6F8]"
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
