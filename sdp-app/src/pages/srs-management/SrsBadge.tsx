import type { SrsBadgeEntry } from './Types'

const srsColorThemes: Record<string, { bg: string; border: string; fg: string }> = {
  '#007492': { bg: '#CCF0F9', border: '#B3E8F6', fg: '#007492' },
  '#AB772A': { bg: '#FFE1B5', border: '#FFD390', fg: '#AB772A' },
}

export function SrsBadge({ entry }: { entry: SrsBadgeEntry }) {
  const theme = srsColorThemes[entry.color] || srsColorThemes['#007492']
  return (
    <div className="w-full h-[18px] rounded-[2px]">
      <div
        className="flex items-center justify-center gap-[4px] w-full h-full px-[6px] py-[3px] rounded-[2px] whitespace-nowrap"
        style={{ backgroundColor: theme.bg, border: `1px solid ${theme.border}` }}
      >
        <SrsChipIcon color={theme.fg} />
        <span className="text-[12px] leading-[14px] tracking-[0.8px]" style={{ color: theme.fg }}>
          {entry.label}
        </span>
      </div>
    </div>
  )
}

function SrsChipIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
      <rect x="3.5" y="3.5" width="9" height="9" stroke={color} fill="none" />
      <rect x="6.5" y="6.5" width="3" height="3" stroke={color} fill="none" />
      <rect x="6" y="1" width="1" height="2" fill={color} />
      <rect x="9" y="1" width="1" height="2" fill={color} />
      <rect x="6" y="13" width="1" height="2" fill={color} />
      <rect x="9" y="13" width="1" height="2" fill={color} />
      <rect x="1" y="6" width="2" height="1" fill={color} />
      <rect x="1" y="9" width="2" height="1" fill={color} />
      <rect x="13" y="6" width="2" height="1" fill={color} />
      <rect x="13" y="9" width="2" height="1" fill={color} />
    </svg>
  )
}
