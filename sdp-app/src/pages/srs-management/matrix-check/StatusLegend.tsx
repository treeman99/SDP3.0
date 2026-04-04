export function StatusLegend() {
  return (
    <div className="flex items-center gap-[8px]">
      <LegendItem icon={<IconFunctional />} label="Functional" />
      <LegendItem icon={<IconNonFunctional />} label="Non Functional" />
      <LegendItem icon={<ColorDot color="#CCF0F9" border="#B3E8F6" />} label="In Progress" />
      <LegendItem icon={<ColorDot color="#FFE1B5" border="#FFD390" />} label="In Approval" />
      <LegendItem icon={<ColorDot color="#E4E9ED" border="#DADFE4" />} label="Done" />
      <LegendItem icon={<ColorDot color="#F7F9FB" border="#E4E9ED" dash />} label="None" />
    </div>
  )
}

function LegendItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-[4px]">
      {icon}
      <span className="text-[11px] leading-[12px] tracking-[0.8px] text-[#565E66]">{label}</span>
    </div>
  )
}

function ColorDot({ color, border, dash }: { color: string; border?: string; dash?: boolean }) {
  return (
    <div
      className="w-[10px] h-[10px] rounded-[2px]"
      style={{
        backgroundColor: color,
        border: `1px ${dash ? 'dashed' : 'solid'} ${border || 'transparent'}`,
      }}
    />
  )
}

function IconFunctional() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="3.5" y="3.5" width="9" height="9" stroke="#565E66" fill="none" />
      <rect x="6.5" y="6.5" width="3" height="3" stroke="#565E66" fill="none" />
      <rect x="6" y="1" width="1" height="2" fill="#565E66" />
      <rect x="9" y="1" width="1" height="2" fill="#565E66" />
      <rect x="6" y="13" width="1" height="2" fill="#565E66" />
      <rect x="9" y="13" width="1" height="2" fill="#565E66" />
      <rect x="1" y="6" width="2" height="1" fill="#565E66" />
      <rect x="1" y="9" width="2" height="1" fill="#565E66" />
      <rect x="13" y="6" width="2" height="1" fill="#565E66" />
      <rect x="13" y="9" width="2" height="1" fill="#565E66" />
    </svg>
  )
}

function IconNonFunctional() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 2h7l3 3v9H3V2z" stroke="#565E66" fill="none" />
      <path d="M10 2v3h3" stroke="#565E66" fill="none" />
      <line x1="5" y1="8" x2="11" y2="8" stroke="#565E66" strokeWidth="0.8" />
      <line x1="5" y1="10.5" x2="11" y2="10.5" stroke="#565E66" strokeWidth="0.8" />
    </svg>
  )
}
