import { TableOptionIcon, InfoIcon } from './icons'

// Functional: table/grid icon (2×2 grid)
function FunctionalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="1" y="1" width="12" height="12" rx="1" stroke="#565E66" strokeWidth="1" />
      <line x1="7" y1="1" x2="7" y2="13" stroke="#565E66" strokeWidth="1" />
      <line x1="1" y1="7" x2="13" y2="7" stroke="#565E66" strokeWidth="1" />
    </svg>
  )
}

// Non Functional: document/page icon with folded corner
function NonFunctionalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 1H9L12 4V13H2V1Z" stroke="#565E66" strokeWidth="1" strokeLinejoin="round" />
      <path d="M9 1V4H12" stroke="#565E66" strokeWidth="1" strokeLinejoin="round" />
      <rect x="4" y="6" width="6" height="1" rx="0.5" fill="#565E66" />
      <rect x="4" y="8.5" width="4" height="1" rx="0.5" fill="#565E66" />
    </svg>
  )
}

const LEGEND_ITEMS = [
  { type: 'icon', icon: 'functional',    label: 'Functional' },
  { type: 'icon', icon: 'nonFunctional', label: 'Non Functional' },
  { type: 'sq',   color: '#CCF0F9',      label: 'In Progress' },
  { type: 'sq',   color: '#FFE1B5',      label: 'In Approval' },
  { type: 'sq',   color: '#E4E9ED',      label: 'Done' },
  { type: 'none',                         label: 'None' },
] as const

function LegendItem({ item }: { item: typeof LEGEND_ITEMS[number] }) {
  return (
    <div className="flex items-center gap-1.5">
      {item.type === 'icon' && item.icon === 'functional' && (
        <FunctionalIcon />
      )}
      {item.type === 'icon' && item.icon === 'nonFunctional' && (
        <NonFunctionalIcon />
      )}
      {item.type === 'sq' && (
        <span className="flex-shrink-0 w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: item.color }} />
      )}
      {item.type === 'none' && (
        <span
          className="flex-shrink-0 w-2.5 h-2.5 rounded-sm relative overflow-hidden"
          style={{ backgroundColor: '#F7F9FB', border: '1px solid #DAE0E6' }}
        >
          <span
            className="absolute"
            style={{ left: 1, top: '50%', width: 6, height: 1, backgroundColor: '#DAE0E6', transform: 'translateY(-50%)' }}
          />
        </span>
      )}
      <span className="text-[11px] text-[#565E66] whitespace-nowrap">{item.label}</span>
    </div>
  )
}

export function FilterToolbar() {
  return (
    <div
      className="flex flex-col w-full px-4 bg-white"
      style={{ borderBottom: '1px solid #E0E4E8' }}
    >
      {/* Row 1: Matrix check title */}
      <div className="flex items-center pt-3 pb-2.5">
        <span className="text-[13px] font-bold text-[#384047] leading-none mr-1">Matrix check</span>
        <InfoIcon className="opacity-50" />
      </div>

      {/* Row 2: Legend (left) + toolbar (right) */}
      <div className="flex items-center justify-between pb-2">
        {/* Legend items */}
        <div className="flex items-center gap-4">
          {LEGEND_ITEMS.map((item) => (
            <LegendItem key={item.label} item={item} />
          ))}
          <div className="w-px h-3 bg-[#CCD1D6]" />
          <button className="flex items-center gap-1 px-2 py-[3px] text-[11px] text-[#56595F] border border-[#CCD1D6] rounded-sm bg-white hover:bg-[#F3F6F8] transition-colors">
            Export
          </button>
        </div>

        {/* Right toolbar */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 px-2 py-[3px] text-[11px] border border-[#CCD1D6] text-[#56595F] bg-white hover:bg-[#F3F6F8] rounded-sm transition-colors">
            <TableOptionIcon />
            Table Option
          </button>
          <div className="w-px h-3.5 bg-[#CCD1D6]" />
          <span className="text-[11px] text-[#767D84]">
            진행율/완료율(Coverage): 42/420(10%)
          </span>
        </div>
      </div>
    </div>
  )
}
