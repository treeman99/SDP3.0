export type StatusType = 'Pending' | 'Accepted' | 'Rejected'

const statusConfig: Record<StatusType, { dotColor: string; textColor: string }> = {
  Pending: { dotColor: '#FFB800', textColor: '#FFB800' },
  Accepted: { dotColor: '#0077C8', textColor: '#0064A7' },
  Rejected: { dotColor: '#D2362C', textColor: '#D2362C' },
}

export function StatusBadge({ status }: { status: StatusType }) {
  const config = statusConfig[status]
  return (
    <div className="flex items-center gap-[4px]">
      <div className="w-[4px] h-[4px] shrink-0" style={{ backgroundColor: config.dotColor }} />
      <span className="text-[12px] leading-[14px] tracking-[0.8px] whitespace-nowrap" style={{ color: config.textColor }}>
        {status}
      </span>
    </div>
  )
}
