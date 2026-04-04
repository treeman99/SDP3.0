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
      <div className="relative flex flex-col bg-white rounded-[6px] w-[400px] min-h-[248px] shadow-[0px_0px_2px_0px_rgba(34,38,44,0.32),0px_6px_12px_0px_rgba(34,38,44,0.16)]">
        {/* Header */}
        <div className="flex items-center justify-between px-[20px] py-[16px] shrink-0">
          <span className="text-[16px] leading-[20px] text-[#283037]">
            {title}
          </span>
          <button onClick={onClose} className="rounded-[2px] hover:bg-[#EDF2F4]">
            <X className="w-[16px] h-[16px] text-[#565E66]" strokeWidth={1.5} />
          </button>
        </div>
        <div className="h-px bg-[#E4E9ED] shrink-0" />

        {/* Body */}
        <div className="flex-1 px-[20px] py-[20px]">
          <p className="text-[14px] leading-[20px] tracking-[0.8px] text-[#283037]">
            {message}
          </p>
          {note && (
            <p className="mt-[8px] text-[12px] leading-[18px] tracking-[0.8px] text-[#767D84]">
              • {note}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0">
          <div className="h-px bg-[#EDF2F4]" />
          <div className="flex items-center justify-end gap-[6px] px-[20px] py-[16px]">
            <button
              onClick={() => {
                onConfirm()
                onClose()
              }}
              className="bg-[#3392D3] rounded-[2px] w-[48px] flex items-center justify-center py-[4px] text-[14px] font-bold leading-[20px] tracking-[0.8px] text-white hover:bg-[#2B7DB5]"
            >
              {confirmLabel}
            </button>
            <button
              onClick={onClose}
              className="border border-[#DADFE4] bg-white rounded-[2px] w-[48px] flex items-center justify-center py-[4px] text-[14px] leading-[20px] tracking-[0.8px] text-[#384047] hover:bg-[#F3F6F8]"
            >
              {cancelLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
