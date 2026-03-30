import { ChevronRightIcon, InfoIcon, SortIcon, FilterIcon } from './icons'
import { cn } from '../lib/utils'
import { matrixData, type SupportStatus, type MatrixRow } from '../data/matrixData'

// ──────────────────────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────────────────────

function getDepth(index: string): number {
  return (index.match(/\./g) || []).length
}

const STATUS_DOT_COLORS: Record<SupportStatus, string> = {
  Accepted: '#2E7D32',
  Pending:  '#F57F17',
  Rejected: '#C62828',
  BM:       '#4527A0',
  Comp:     '#1565C0',
  '-':      '',
}

function StatusBadge({ status }: { status: SupportStatus }) {
  if (status === '-') return <span className="text-[#B0B6BC]">-</span>
  return (
    <span className="inline-flex items-center gap-1 text-[11px] text-[#384047]">
      <span
        className="flex-shrink-0 rounded-full"
        style={{ width: 6, height: 6, backgroundColor: STATUS_DOT_COLORS[status] }}
      />
      {status}
    </span>
  )
}

function PersonCell({ value }: { value: string }) {
  if (!value || value === '-') return <span className="text-[#B0B6BC]">-</span>
  if (value.endsWith('+')) {
    const base = value.slice(0, -1)
    return (
      <span className="text-[11px] text-[#384047]">
        {base}
        <span className="ml-0.5 text-[#2D6BE4] font-bold">+</span>
      </span>
    )
  }
  return (
    <span className="text-[11px] text-[#384047] truncate block">{value}</span>
  )
}

// ──────────────────────────────────────────────────────────────────────────────
// Column Header Cell
// ──────────────────────────────────────────────────────────────────────────────

function ColHeader({ label, width, showFilter = true }: { label: string; width: number; showFilter?: boolean }) {
  return (
    <th
      className="relative h-7 bg-[#F3F6F8] border-r border-b border-[#E0E4E8] text-left align-middle p-0"
      style={{ width, minWidth: width }}
    >
      <div className="flex items-center justify-between px-2 h-full gap-1">
        <div className="flex items-center gap-1 overflow-hidden">
          <span className="text-[11px] font-medium text-[#56595F] truncate">{label}</span>
          <InfoIcon className="flex-shrink-0 opacity-50" />
          <SortIcon className="flex-shrink-0" />
        </div>
        {showFilter && <FilterIcon className="flex-shrink-0 opacity-50 cursor-pointer hover:opacity-100" />}
      </div>
      <span className="absolute right-0 top-1 bottom-1 w-px bg-[#E0E4E8]" />
    </th>
  )
}

// ──────────────────────────────────────────────────────────────────────────────
// Main Matrix Table
// ──────────────────────────────────────────────────────────────────────────────

const ERS_COLS: Array<{ label: string; width: number; key: string }> = [
  { label: 'Index',   width: 54,  key: 'index' },
  { label: 'ERS Title', width: 241, key: 'title' },
  { label: '진행율',   width: 74,  key: 'progress' },
  { label: 'Updated', width: 100, key: 'updated' },
]

const SRS_COLS: Array<{ label: string; width: number; key: keyof typeof matrixData[0] }> = [
  { label: 'Support',         width: 90,  key: 'support' },
  { label: 'APS(Eletric)',    width: 120, key: 'apsElectric' },
  { label: 'APS(Optic)',      width: 120, key: 'apsOptic' },
  { label: 'Analog',          width: 120, key: 'analog' },
  { label: 'Digital(Chip설계)', width: 136, key: 'digitalChip' },
  { label: 'FW',              width: 120, key: 'fw' },
  { label: 'ALPDP',           width: 120, key: 'alpdp' },
  { label: 'PM',              width: 120, key: 'pm' },
]

const ERS_WIDTH = ERS_COLS.reduce((s, c) => s + c.width, 0)  // 469
const SRS_WIDTH = SRS_COLS.reduce((s, c) => s + c.width, 0)  // 946

interface MatrixTableProps {
  onRowClick?: (row: MatrixRow) => void
  selectedIndex?: string
}

export function MatrixTable({ onRowClick, selectedIndex }: MatrixTableProps) {
  return (
    <div className="flex-1 overflow-hidden flex flex-col" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="flex-1 overflow-auto">
        <table
          className="border-collapse"
          style={{ tableLayout: 'fixed', width: ERS_WIDTH + SRS_WIDTH }}
        >
          <thead className="sticky top-0 z-20">
            {/* Group header row */}
            <tr>
              {/* ERS group */}
              <th
                colSpan={ERS_COLS.length}
                className="h-7 bg-[#E8ECF0] border-r border-b border-[#E0E4E8] text-center align-middle"
                style={{ width: ERS_WIDTH }}
              >
                <span className="text-[11px] font-semibold text-[#384047]">ERS</span>
              </th>

              {/* SRS group */}
              <th
                colSpan={SRS_COLS.length}
                className="h-7 bg-[#E4EDF9] border-b border-[#E0E4E8] text-center align-middle"
                style={{ width: SRS_WIDTH }}
              >
                <span className="text-[11px] font-semibold text-[#2D6BE4]">SRS</span>
              </th>
            </tr>

            {/* Column header row */}
            <tr>
              {ERS_COLS.map((col) => (
                <ColHeader key={col.key} label={col.label} width={col.width} />
              ))}
              {SRS_COLS.map((col) => (
                <ColHeader key={col.key} label={col.label} width={col.width} />
              ))}
            </tr>
          </thead>

          <tbody>
            {matrixData.map((row, i) => {
              const depth = getDepth(row.index)
              const isGroup = row.isGroupHeader
              const isEven = i % 2 === 0
              const rowBg = isGroup ? '#F5F7F9' : isEven ? '#FFFFFF' : '#FAFBFC'

              return (
                <tr
                  key={i}
                  className="group hover:bg-[#EEF3FB] transition-colors"
                  style={{ height: 23 }}
                >
                  {/* Index cell */}
                  <td
                    className="border-r border-b border-[#E0E4E8] p-0 align-middle"
                    style={{ backgroundColor: rowBg, width: 54, minWidth: 54 }}
                  >
                    <div
                      className="flex items-center gap-0.5 px-1.5"
                      style={{ paddingLeft: 6 + depth * 8 }}
                    >
                      <ChevronRightIcon className="flex-shrink-0 opacity-40" />
                      <span
                        className={cn(
                          'text-[11px] leading-none',
                          isGroup ? 'font-semibold text-[#384047]' : 'text-[#56595F]'
                        )}
                      >
                        {row.index}
                      </span>
                    </div>
                  </td>

                  {/* ERS Title cell */}
                  <td
                    className="border-r border-b border-[#E0E4E8] p-0 align-middle"
                    style={{
                      backgroundColor: selectedIndex === row.index + row.title ? '#E8F0FC' : rowBg,
                      width: 241,
                      minWidth: 241,
                    }}
                  >
                    <div
                      className="flex items-center gap-1.5 px-2 overflow-hidden cursor-pointer"
                      onClick={() => onRowClick?.(row)}
                    >
                      {row.badge === 'New' && (
                        <span className="flex-shrink-0 inline-flex items-center px-1 py-px rounded text-[9px] font-semibold leading-none bg-[#FFEBEE] text-[#C62828] border border-[#EF9A9A]">
                          New
                        </span>
                      )}
                      {row.badge === 'Updated' && (
                        <span className="flex-shrink-0 inline-flex items-center px-1 py-px rounded text-[9px] font-semibold leading-none bg-[#FFF8E1] text-[#E65100] border border-[#FFCC80]">
                          Updated
                        </span>
                      )}
                      <span
                        className={cn(
                          'text-[11px] truncate hover:text-[#2D6BE4] hover:underline transition-colors',
                          isGroup ? 'font-semibold text-[#384047]' : 'text-[#384047]'
                        )}
                      >
                        {row.title}
                      </span>
                    </div>
                  </td>

                  {/* 진행율 */}
                  <td
                    className="border-r border-b border-[#E0E4E8] px-2 align-middle text-center"
                    style={{ backgroundColor: rowBg, width: 74, minWidth: 74 }}
                  >
                    {row.progress && row.progress !== '-' ? (
                      <span className="text-[11px] text-[#384047]">{row.progress}</span>
                    ) : (
                      <span className="text-[11px] text-[#B0B6BC]">-</span>
                    )}
                  </td>

                  {/* Updated */}
                  <td
                    className="border-r border-b border-[#E0E4E8] px-2 align-middle"
                    style={{ backgroundColor: rowBg, width: 100, minWidth: 100 }}
                  >
                    <span className="text-[11px] text-[#56595F]">{row.updated || '-'}</span>
                  </td>

                  {/* Support (status) */}
                  <td
                    className="border-r border-b border-[#E0E4E8] px-2 align-middle text-center"
                    style={{ backgroundColor: rowBg, width: 90, minWidth: 90 }}
                  >
                    <StatusBadge status={row.support} />
                  </td>

                  {/* SRS person cells */}
                  {(
                    ['apsElectric', 'apsOptic', 'analog', 'digitalChip', 'fw', 'alpdp', 'pm'] as const
                  ).map((key, ci) => {
                    const colWidth = SRS_COLS[ci + 1]?.width ?? 120
                    const val = row[key] as string
                    const hasPerson = val && val !== '-'
                    return (
                      <td
                        key={key}
                        className="border-r border-b border-[#E0E4E8] px-2 align-middle overflow-hidden"
                        style={{
                          backgroundColor: hasPerson ? '#EEF3FB' : rowBg,
                          width: colWidth,
                          minWidth: colWidth,
                        }}
                      >
                        <PersonCell value={val} />
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

