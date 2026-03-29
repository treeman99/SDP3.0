import { ChevronDownIcon, TableOptionIcon, ColumnSettingIcon, RefreshIcon } from './icons'
import { cn } from '../lib/utils'

const FILTER_CHIPS = [
  { label: 'Functional',    color: '#5BA85B', active: false },
  { label: 'Not Functional', color: '#B0B6BC', active: false },
  { label: 'In Progress',   color: '#2D6BE4', active: false },
  { label: 'In Approval',   color: '#F5A623', active: false },
  { label: 'Done',          color: '#5BA85B', active: false },
  { label: 'None',          color: '#B0B6BC', active: false },
]

export function FilterToolbar() {
  return (
    <div
      className="flex items-center justify-between px-4 h-[46px]"
      style={{ borderBottom: '1px solid #E0E4E8', backgroundColor: '#FFFFFF' }}
    >
      {/* Left: filter chips */}
      <div className="flex items-center gap-1.5">
        {FILTER_CHIPS.map((chip) => (
          <button
            key={chip.label}
            className={cn(
              'flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] border transition-colors',
              'border-[#CCD1D6] text-[#56595F] bg-white hover:bg-[#F3F6F8]'
            )}
          >
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: chip.color }}
            />
            {chip.label}
          </button>
        ))}
        <div className="w-px h-4 bg-[#CCD1D6] mx-1" />
        <button className="flex items-center gap-1 px-2 py-0.5 rounded text-[11px] border border-[#CCD1D6] text-[#56595F] bg-white hover:bg-[#F3F6F8] transition-colors">
          Export
        </button>
      </div>

      {/* Right: table options */}
      <div className="flex items-center gap-1.5">
        {/* Table Option */}
        <button className="flex items-center gap-1.5 px-2 py-1 rounded text-[11px] border border-[#CCD1D6] text-[#56595F] bg-white hover:bg-[#F3F6F8] transition-colors">
          <TableOptionIcon />
          Table Option
        </button>

        <div className="w-px h-4 bg-[#CCD1D6]" />

        {/* Stats */}
        <div className="flex items-center gap-2 text-[11px] text-[#767D84]">
          <span>
            <span className="text-[#56595F]">진행율/완료율(Coverage):</span>{' '}
            <span className="font-medium text-[#384047]">42/420(10%)</span>
          </span>
          <span className="text-[#B0B6BC]">|</span>
          <span>
            <span className="text-[#56595F]">Filtered:</span>{' '}
            <span className="font-medium text-[#384047]">90</span>
          </span>
        </div>

        <div className="w-px h-4 bg-[#CCD1D6]" />

        {/* Column setting / rows per page */}
        <button className="flex items-center gap-1.5 px-2 py-1 rounded text-[11px] border border-[#CCD1D6] text-[#56595F] bg-white hover:bg-[#F3F6F8] transition-colors">
          <ColumnSettingIcon />
          21개씩보기
          <ChevronDownIcon />
        </button>

        <div className="w-px h-4 bg-[#CCD1D6]" />

        {/* Refresh */}
        <div className="flex items-center gap-1 text-[11px] text-[#767D84]">
          <span>Refresh</span>
          <button className="flex items-center gap-1 px-1.5 py-1 rounded border border-[#CCD1D6] text-[#56595F] bg-white hover:bg-[#F3F6F8] transition-colors">
            1min
            <ChevronDownIcon />
          </button>
          <button className="flex items-center justify-center w-[20px] h-[20px] rounded border border-[#CCD1D6] bg-white hover:bg-[#F3F6F8] transition-colors">
            <RefreshIcon />
          </button>
        </div>
      </div>
    </div>
  )
}
