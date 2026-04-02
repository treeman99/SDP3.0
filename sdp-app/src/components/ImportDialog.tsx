import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Step1SelectFile } from './import-steps/Step1SelectFile'
import { Step2SelectColumn } from './import-steps/Step2SelectColumn'

interface ImportDialogProps {
  open: boolean
  onClose: () => void
}

const TOTAL_STEPS = 3

export function ImportDialog({ open, onClose }: ImportDialogProps) {
  const [step, setStep] = useState(1)
  const [fileName, setFileName] = useState<string | null>(null)

  if (!open) return null

  const handleClose = () => {
    setStep(1)
    setFileName(null)
    onClose()
  }

  const handleNext = () => {
    if (step < TOTAL_STEPS) setStep(step + 1)
  }

  const handlePrev = () => {
    if (step > 1) setStep(step - 1)
  }

  const stepTitles: Record<number, { title: string; description: string }> = {
    1: { title: 'STEP1. Select Target File', description: 'Import the latest version of ERS file for Compliance Matrix.' },
    2: { title: 'STEP2. Select Target Column', description: 'Please select your desired column.' },
    3: { title: 'STEP3. Confirm', description: 'Please confirm your import settings.' },
  }

  const current = stepTitles[step]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#283037] opacity-[0.52]" onClick={handleClose} />

      {/* Dialog */}
      <div
        className="relative bg-white rounded-[6px] w-[1000px] h-[620px] flex flex-col"
        style={{ boxShadow: '0px 0px 2px 0px rgba(34,38,44,0.32), 0px 6px 12px 0px rgba(34,38,44,0.16)' }}
      >
        {/* Header */}
        <div className="relative h-[53px] shrink-0">
          <div className="flex items-start justify-between pl-[20px] pr-[18px] pt-[16px] pb-[36px]">
            <p className="text-[16px] font-normal leading-[20px] tracking-[0.8px] text-[#283037] truncate">Import</p>
            <button onClick={handleClose} className="rounded-[2px] hover:bg-[#EDF2F4] p-[1px]">
              <X className="w-[14px] h-[14px] text-[#565E66]" strokeWidth={1.5} />
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-[#E4E9ED]" />
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col items-center relative overflow-hidden">
          {/* Step Title */}
          <p className="mt-[20px] text-[16px] font-bold leading-[20px] tracking-[0.8px] text-[#283037]">
            {current.title}
          </p>

          {/* Description */}
          <p className="mt-[12px] text-[12px] font-normal leading-[14px] tracking-[0.8px] text-[#565E66]">
            {current.description}
          </p>

          {/* Step Indicators */}
          <div className="flex items-center gap-[6px] mt-[16px]">
            {Array.from({ length: TOTAL_STEPS }, (_, i) => (
              <div
                key={i}
                className={`w-[8px] h-[8px] rounded-full ${i + 1 === step ? 'bg-[#3392D3]' : 'bg-[#DADFE4]'}`}
              />
            ))}
          </div>

          {/* Step Content */}
          <div className="mt-[16px] flex-1 w-full px-[20px] overflow-auto">
            {step === 1 && (
              <Step1SelectFile fileName={fileName} onFileLoad={setFileName} />
            )}
            {step === 2 && (
              <Step2SelectColumn />
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="relative h-[60px] shrink-0 flex items-center justify-end gap-[4px] px-[20px]">
          <div className="absolute top-0 left-0 right-0 h-px bg-[#EDF2F4]" />
          {step > 1 && (
            <button
              onClick={handlePrev}
              className="flex items-center gap-[4px] border border-[#DADFE4] bg-white rounded-[2px] px-[8px] py-[4px] text-[14px] font-normal leading-[20px] tracking-[0.8px] text-[#384047] hover:bg-[#F3F6F8]"
            >
              <ChevronLeft className="w-[14px] h-[14px] text-[#384047]" strokeWidth={1.5} />
              Prev
            </button>
          )}
          <button
            onClick={handleNext}
            className="flex items-center gap-[4px] border border-[#DADFE4] bg-white rounded-[2px] px-[8px] py-[4px] text-[14px] font-normal leading-[20px] tracking-[0.8px] text-[#384047] hover:bg-[#F3F6F8]"
          >
            Next
            <ChevronRight className="w-[14px] h-[14px] text-[#384047]" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  )
}
