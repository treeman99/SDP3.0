export function TagBadge({ label }: { label: 'NEW' | 'UPDATED' }) {
  const config = label === 'NEW'
    ? { bg: '#E82C1F', border: '#D2362C' }
    : { bg: '#FF695F', border: '#FF4337' }
  return (
    <span
      className="inline-flex items-center px-[4px] py-[1px] rounded-[1px] text-[9px] font-bold leading-[12px] tracking-[0.5px] text-white shrink-0 uppercase"
      style={{ backgroundColor: config.bg, border: `0.5px solid ${config.border}` }}
    >
      {label}
    </span>
  )
}
