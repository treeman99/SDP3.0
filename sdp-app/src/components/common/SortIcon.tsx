interface SortIconProps {
  active?: boolean
  direction?: 'asc' | 'desc' | null
}

export function SortIcon({ active = false, direction = null }: SortIconProps) {
  const upColor = active && direction === 'asc' ? '#283037' : '#999DA0'
  const downColor = active && direction === 'desc' ? '#283037' : '#999DA0'

  return (
    <svg width="7" height="14" viewBox="0 0 7 14" fill="none" className="shrink-0">
      <path d="M3.5 0L7 5H0L3.5 0Z" fill={upColor} />
      <path d="M3.5 14L0 9H7L3.5 14Z" fill={downColor} />
    </svg>
  )
}
