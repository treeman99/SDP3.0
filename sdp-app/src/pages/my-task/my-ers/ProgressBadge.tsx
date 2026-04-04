import type { ProgressType } from '../Types'

const progressStyles: Record<ProgressType, { bg: string; text: string }> = {
  'In Progress': { bg: 'bg-[#EBF5FB]', text: 'text-[#3392D3]' },
  'In Approval': { bg: 'bg-[#FFF4E5]', text: 'text-[#E89806]' },
  'Done': { bg: 'bg-[#F3F6F8]', text: 'text-[#90969D]' },
}

export function ProgressBadge({ progress }: { progress: ProgressType }) {
  const style = progressStyles[progress]
  return (
    <span className={`flex items-center justify-center w-full py-[2px] rounded-[2px] text-[11px] leading-[14px] tracking-[0.8px] font-bold whitespace-nowrap ${style.bg} ${style.text}`}>
      {progress}
    </span>
  )
}
