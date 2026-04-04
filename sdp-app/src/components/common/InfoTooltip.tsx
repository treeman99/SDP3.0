import { useState, useRef } from 'react'

export function InfoTooltip({ title, description }: { title: string; description: string }) {
  const [show, setShow] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setShow(true)
  }
  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setShow(false), 150)
  }

  return (
    <div className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <IconInfoSmall />
      {show && (
        <div className="absolute left-0 top-full mt-[2px] z-50">
          {/* Triangle */}
          <div className="ml-[13px] w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-l-transparent border-r-transparent border-b-[#283037]" />
          {/* Body */}
          <div className="bg-[#283037] rounded-[6px] px-[16px] pt-[14px] pb-[16px] shadow-[0px_0px_2px_0px_rgba(40,48,55,0.12),0px_4px_8px_0px_rgba(40,48,55,0.12)]">
            <div className="flex flex-col gap-[4px] w-[240px]">
              <span className="text-[12px] font-bold leading-[20px] tracking-[0.8px] text-[#FAFBFC]">
                {title}
              </span>
              <span className="text-[12px] font-normal leading-[14px] tracking-[0.8px] text-[#FAFBFC]">
                {description}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function IconInfoSmall() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="cursor-pointer">
      <rect x="1" y="1" width="14" height="14" rx="2" stroke="#90969D" strokeWidth="1" fill="none" />
      <path d="M8 5V4" stroke="#90969D" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 12V7" stroke="#90969D" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
