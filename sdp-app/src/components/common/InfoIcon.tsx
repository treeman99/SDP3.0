interface InfoIconProps {
  size?: number
  className?: string
}

export function InfoIcon({ size = 16, className = '' }: InfoIconProps) {
  const rectInset = size * (1 / 16)
  const rectSize = size * (14 / 16)
  const rx = size * (2 / 16)
  const center = size / 2
  const dotTop = size * (5 / 16)
  const dotBottom = size * (4 / 16)
  const lineTop = size * (12 / 16)
  const lineBottom = size * (7 / 16)

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      className={`shrink-0 ${className}`}
    >
      <rect
        x={rectInset}
        y={rectInset}
        width={rectSize}
        height={rectSize}
        rx={rx}
        stroke="#90969D"
        strokeWidth="1"
        fill="none"
      />
      <path
        d={`M${center} ${dotTop}V${dotBottom}`}
        stroke="#90969D"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d={`M${center} ${lineTop}V${lineBottom}`}
        stroke="#90969D"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
