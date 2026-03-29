export function StarIcon({ filled = false, className = '' }: { filled?: boolean; className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <path
        d="M8 1.5L9.545 5.635L14 6.18L10.82 9.115L11.708 13.5L8 11.335L4.292 13.5L5.18 9.115L2 6.18L6.455 5.635L8 1.5Z"
        fill={filled ? '#F5A623' : 'none'}
        stroke={filled ? '#F5A623' : '#767D84'}
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ChevronDownIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={className}>
      <path d="M2.5 4L6 7.5L9.5 4" stroke="#56595F" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ChevronRightIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={className}>
      <path d="M5 3L9 7L5 11" stroke="#384047" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function InfoIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={className}>
      <circle cx="7" cy="7" r="6.5" stroke="#767D84" />
      <circle cx="7" cy="4.5" r="1" fill="#767D84" />
      <rect x="6.2" y="6.5" width="1.6" height="4" rx="0.5" fill="#767D84" />
    </svg>
  )
}

export function SortIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="5" height="10" viewBox="0 0 5 10" fill="none" className={className}>
      <path d="M2.5 1L4.5 4H0.5L2.5 1Z" fill="#B0B6BC" />
      <path d="M2.5 9L0.5 6H4.5L2.5 9Z" fill="#B0B6BC" />
    </svg>
  )
}

export function FilterIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className={className}>
      <rect x="1" y="1.5" width="8" height="1" fill="#767D84" />
      <rect x="2" y="4" width="6" height="1" fill="#767D84" />
      <rect x="3" y="6.5" width="4" height="1" fill="#767D84" />
    </svg>
  )
}

export function RefreshIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={className}>
      <path
        d="M12 7C12 9.76 9.76 12 7 12C4.24 12 2 9.76 2 7C2 4.24 4.24 2 7 2C8.38 2 9.63 2.56 10.54 3.46"
        stroke="#56595F"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path d="M10 1V4H13" stroke="#56595F" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ColumnSettingIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <rect x="2.5" y="1.5" width="11" height="12" rx="1" stroke="#56595F" strokeWidth="1" />
      <rect x="2.5" y="1.5" width="2" height="12" fill="#56595F" fillOpacity="0.2" />
      <circle cx="9" cy="7.5" r="2" stroke="#56595F" strokeWidth="1" />
      <rect x="11" y="7" width="2.5" height="1" fill="#56595F" />
      <rect x="4.5" y="4" width="4" height="1" fill="#56595F" />
      <rect x="4.5" y="6.5" width="2" height="1" fill="#56595F" />
    </svg>
  )
}

export function BellIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M8 2C5.79 2 4 3.79 4 6V9L2.5 11H13.5L12 9V6C12 3.79 10.21 2 8 2Z" stroke="#56595F" strokeWidth="1.2" />
      <path d="M6.5 11C6.5 11.83 7.17 12.5 8 12.5C8.83 12.5 9.5 11.83 9.5 11" stroke="#56595F" strokeWidth="1.2" />
    </svg>
  )
}

export function TableOptionIcon({ className = '' }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={className}>
      <rect x="2" y="3" width="12" height="1.2" fill="#56595F" />
      <rect x="2" y="7.4" width="12" height="1.2" fill="#56595F" />
      <rect x="2" y="11.8" width="12" height="1.2" fill="#56595F" />
      <circle cx="5.5" cy="3.6" r="1.8" fill="white" stroke="#56595F" strokeWidth="1.2" />
      <circle cx="10.5" cy="8" r="1.8" fill="white" stroke="#56595F" strokeWidth="1.2" />
      <circle cx="6" cy="12.4" r="1.8" fill="white" stroke="#56595F" strokeWidth="1.2" />
    </svg>
  )
}
