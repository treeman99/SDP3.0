import { useState } from 'react'
import { X } from 'lucide-react'

/* ─── Types ─── */

interface MatrixRow {
  index: string
  ersTitle: string
  tag?: 'NEW' | 'UPDATED'
  progress: number | null
  updated: string
  support: StatusType | null
  srs: Partial<Record<SrsColumnKey, SrsBadgeEntry | null>>
  isParent?: boolean
}

type StatusType = 'Pending' | 'Accepted' | 'Rejected'

type SrsColumnKey = 'apsEletric' | 'apsOptic' | 'analog' | 'digitalChip' | 'fw' | 'alpdp' | 'pm'

interface SrsBadgeEntry {
  label: string
  color: string
}

interface DetailData {
  index: string
  title: string
  lastUpdated: string
  ersContent: string
  customerComments: CommentEntry[]
  supportComments: SupportComment[]
}

interface CommentEntry {
  date: string
  content: string
}

interface SupportComment {
  category: string
  status: StatusType
  date: string
  content: string
}

/* ─── Column Definitions ─── */

interface ColumnDef {
  key: string
  label: string
  width: number
  group: 'ers' | 'srs'
  sortable?: boolean
  filterable?: boolean
}

const columns: ColumnDef[] = [
  { key: 'index', label: 'Index', width: 54, group: 'ers', sortable: true },
  { key: 'ersTitle', label: 'ERS Title', width: 241, group: 'ers', sortable: true, filterable: true },
  { key: 'progress', label: '진행률', width: 74, group: 'ers', sortable: true },
  { key: 'updated', label: 'Updated', width: 100, group: 'ers', sortable: true },
  { key: 'support', label: 'Support', width: 90, group: 'srs', sortable: true, filterable: true },
  { key: 'apsEletric', label: 'APS(Eletric)', width: 120, group: 'srs', sortable: true, filterable: true },
  { key: 'apsOptic', label: 'APS(Optic)', width: 120, group: 'srs', sortable: true, filterable: true },
  { key: 'analog', label: 'Analog', width: 120, group: 'srs', sortable: true, filterable: true },
  { key: 'digitalChip', label: 'Digital(Chip설계)', width: 136, group: 'srs', sortable: true, filterable: true },
  { key: 'fw', label: 'FW', width: 120, group: 'srs', sortable: true },
  { key: 'alpdp', label: 'ALPDP', width: 120, group: 'srs', sortable: true },
  { key: 'pm', label: 'PM', width: 120, group: 'srs', sortable: true },
]

const ersColumns = columns.filter((c) => c.group === 'ers')
const srsColumns = columns.filter((c) => c.group === 'srs')
const ersWidth = ersColumns.reduce((s, c) => s + c.width, 0)
const srsWidth = srsColumns.reduce((s, c) => s + c.width, 0)

/* ─── Mock Data ─── */

const B = (label: string, color = '#007492'): SrsBadgeEntry => ({ label, color })

const matrixData: MatrixRow[] = [
  { index: '1', ersTitle: 'Project Overview', progress: null, updated: '', support: null, srs: {}, isParent: true },
  { index: '1.1', ersTitle: 'Purpose Overview', progress: 40, updated: '2025-05-23', support: 'Pending', srs: {} },
  { index: '1.1.1', ersTitle: 'Scope 51', progress: 40, updated: '2025-05-23', support: 'Accepted', srs: { apsEletric: B('이삼성외 1명'), apsOptic: B('이삼성외 1명'), analog: B('이삼성외 1명') } },
  { index: '1.1.2', ersTitle: 'Expectation ABCD', tag: 'NEW', progress: 40, updated: '2025-06-08', support: 'Pending', srs: {} },
  { index: '1.1.2.1', ersTitle: 'Expectation BCDEF', tag: 'UPDATED', progress: 40, updated: '2025-06-08', support: 'Accepted', srs: { apsOptic: B('이삼성외 1명'), alpdp: B('이삼성외 1명', '#AB772A') } },
  { index: '1.1.2.2', ersTitle: 'Expectation BCDF', progress: 40, updated: '2025-05-23', support: 'Accepted', srs: { analog: B('이삼성외 1명', '#AB772A') } },
  { index: '1.1.3', ersTitle: 'Expectation ABCEFG', progress: null, updated: '2025-05-23', support: 'Accepted', srs: { apsOptic: B('이삼성외 1명') } },
  { index: '1.2', ersTitle: 'Function Overview', progress: 40, updated: '2025-05-23', support: 'Rejected', srs: { apsOptic: B('이삼성외 1명') } },
  { index: '1.2.1', ersTitle: 'Production W123', progress: 40, updated: '2025-05-23', support: 'Accepted', srs: { apsEletric: B('이삼성외 1명'), apsOptic: B('이삼성외 1명') } },
  { index: '1.2.2', ersTitle: 'Expectation ABCD', tag: 'NEW', progress: 0, updated: '2025-05-23', support: null, srs: {} },
  { index: '2', ersTitle: 'Purpose', progress: null, updated: '', support: null, srs: {}, isParent: true },
  { index: '2.1', ersTitle: 'Scope 51', progress: 40, updated: '2025-05-23', support: 'Rejected', srs: { apsOptic: B('이삼성외 1명'), analog: B('이삼성외 1명', '#AB772A'), alpdp: B('이삼성외 1명') } },
  { index: '2.2', ersTitle: 'Expectation ABCD', tag: 'NEW', progress: null, updated: '2025-05-23', support: 'Accepted', srs: { apsOptic: B('이삼성외 1명'), analog: B('이삼성외 1명', '#AB772A') } },
  { index: '2.2.1', ersTitle: 'Expectation BCDEF', tag: 'UPDATED', progress: 40, updated: '2025-06-08', support: 'Accepted', srs: { apsEletric: B('이삼성외 1명'), apsOptic: B('이삼성외 1명'), digitalChip: B('이삼성외 1명') } },
  { index: '2.2.1.1', ersTitle: 'Expectation BCDF', progress: null, updated: '2025-05-23', support: 'Accepted', srs: { apsOptic: B('이삼성외 1명'), digitalChip: B('이삼성외 1명') } },
  { index: '2.2.2', ersTitle: 'Production W123', progress: 40, updated: '2025-05-23', support: 'Pending', srs: {} },
  { index: '2.3', ersTitle: 'Expectation ABCEFG Expect...', tag: 'UPDATED', progress: 40, updated: '2025-06-08', support: 'Accepted', srs: { alpdp: B('이삼성외 1명') } },
  { index: '2.4', ersTitle: 'Function Overview', progress: null, updated: '2025-05-23', support: 'Accepted', srs: { analog: B('이삼성외 1명', '#AB772A'), fw: B('이삼성외 1명') } },
  { index: '2.5', ersTitle: 'Production W123', progress: 40, updated: '2025-05-23', support: 'Accepted', srs: { apsEletric: B('이삼성외 1명'), analog: B('이삼성외 1명') } },
  { index: '3', ersTitle: 'Purpose', progress: null, updated: '', support: null, srs: {}, isParent: true },
  { index: '3.1', ersTitle: 'Expectation ABCEF, Production...', tag: 'NEW', progress: 30, updated: '2025-06-08', support: 'Accepted', srs: { apsOptic: B('이삼성외 1명'), fw: B('이삼성외 1명') } },
  { index: '3.1.1', ersTitle: 'Expectation BCDEF', progress: 30, updated: '2025-05-23', support: 'Rejected', srs: { apsEletric: B('이삼성외 1명'), apsOptic: B('이삼성외 1명', '#AB772A') } },
  { index: '3.2', ersTitle: 'Production W123', progress: 30, updated: '2025-05-23', support: 'Accepted', srs: { apsEletric: B('이삼성외 1명') } },
  { index: '3.2.1', ersTitle: 'Production W1244', progress: 0, updated: '2025-05-23', support: null, srs: {} },
  { index: '3.2.2', ersTitle: 'Production W1245', progress: 30, updated: '2025-05-23', support: 'Pending', srs: {} },
  { index: '3.3', ersTitle: 'Title Inputplace', progress: 30, updated: '2025-05-23', support: 'Accepted', srs: { apsEletric: B('이삼성외 1명'), analog: B('이삼성외 1명'), alpdp: B('이삼성외 1명') } },
  { index: '3.4', ersTitle: 'Title Inputplace', progress: 30, updated: '2025-05-23', support: 'Accepted', srs: { apsEletric: B('이삼성외 1명') } },
  { index: '3.4.1', ersTitle: 'Title Inputplace', progress: 30, updated: '2025-05-23', support: 'Accepted', srs: { apsEletric: B('이삼성외 1명'), analog: B('이삼성외 1명') } },
  { index: '3.4.2', ersTitle: 'Title Inputplace', progress: 30, updated: '2025-05-23', support: 'Accepted', srs: { analog: B('이삼성외 1명') } },
]

const sampleDetail: DetailData = {
  index: '1.1.3',
  title: 'Expectation ABCEFG',
  lastUpdated: '2025-05-23',
  ersContent:
    'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.\nContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of cl...',
  customerComments: [
    { date: '2025-02-21', content: 'It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.' },
    { date: '2025-02-19', content: 'It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.' },
    { date: '2025-02-15', content: 'It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.' },
  ],
  supportComments: [
    { category: 'Analog', status: 'Accepted', date: '2025-02-21', content: 'Contrary to popular belief, Lorem Ipsum is not simply random text.' },
    { category: 'Digital', status: 'Rejected', date: '2025-02-21', content: 'Sorry Sorry Contrary to popular belief, Lorem Ipsum is not simply random text.' },
  ],
}

/* ─── Component ─── */

export function MatrixCheck() {
  const [selectedRow, setSelectedRow] = useState<string | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)

  const handleRowClick = (index: string) => {
    setSelectedRow(index)
    setDetailOpen(true)
  }

  return (
    <div className="flex h-full">
      {/* Left: Table Area */}
      <div className="flex-1 flex flex-col min-w-0 px-[12px] pt-[8px] pb-[4px]">
        {/* Row 1: Title */}
        <div className="flex items-center gap-[2px] shrink-0">
          <span className="text-[14px] font-bold leading-[20px] tracking-[0.8px] text-[#384047]">
            Matrix check
          </span>
          <IconInfoSmall />
        </div>

        {/* Row 2: Legend + Export (left) | Table Option + Coverage (right) */}
        <div className="flex items-center justify-between mt-[4px] mb-[6px] shrink-0">
          <div className="flex items-center gap-[8px]">
            <StatusLegend />
            <button className="border border-[#DADFE4] bg-white rounded-[2px] px-[6px] py-[3px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] hover:bg-[#F3F6F8]">
              Export
            </button>
          </div>
          <div className="flex items-center shrink-0">
            <button className="border border-[#DADFE4] bg-white rounded-[2px] px-[6px] py-[3px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] hover:bg-[#F3F6F8]">
              Table Option
            </button>
            <div className="flex items-center justify-center w-[13px]">
              <div className="w-px h-[10px] bg-[#CCD1D6]" />
            </div>
            <span className="text-[12px] leading-[14px] tracking-[0.8px] text-[#767D84] whitespace-nowrap">
              진행율/완료율(Coverage): 42/420(10%)
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 min-h-0 border border-[#DADFE4] rounded-[2px] overflow-auto">
          <table className="w-full border-collapse" style={{ minWidth: ersWidth + srsWidth }}>
            <thead className="sticky top-0 z-10">
              {/* Header Row 1: Group Headers (ERS / SRS) */}
              <tr>
                <th
                  colSpan={ersColumns.length}
                  className="bg-[#FAFBFC] border-b border-r border-[#DADFE4] h-[28px] px-[10px] text-center text-[11px] font-normal leading-[12px] tracking-[0.8px] text-[#384047]"
                  style={{ width: ersWidth }}
                >
                  ERS
                </th>
                <th
                  colSpan={srsColumns.length}
                  className="bg-[#FAFBFC] border-b border-r border-[#DADFE4] h-[28px] px-[10px] text-center text-[11px] font-normal leading-[12px] tracking-[0.8px] text-[#384047]"
                  style={{ width: srsWidth }}
                >
                  SRS
                </th>
              </tr>
              {/* Header Row 2: Column Names */}
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className="bg-[#FAFBFC] border-b border-r border-[#DADFE4] text-left h-[28px] text-[11px] font-normal leading-[12px] tracking-[0.8px] text-[#283037] whitespace-nowrap"
                    style={{ width: col.width, minWidth: col.width }}
                  >
                    <div className="flex items-center gap-[4px] px-[6px]">
                      <div className="flex items-center gap-[4px] flex-1 min-w-0">
                        <span className="truncate">{col.label}</span>
                        {col.sortable && <SortIcon />}
                      </div>
                      {col.filterable && <FilterIcon />}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrixData.map((row) => (
                <tr
                  key={row.index}
                  onClick={() => handleRowClick(row.index)}
                  className={`border-b border-[#E4E9ED] cursor-pointer ${
                    selectedRow === row.index
                      ? 'bg-[#EBF5FB]'
                      : row.isParent
                        ? 'bg-[#F3F6F8]'
                        : 'hover:bg-[#F7F9FB]'
                  }`}
                >
                  {/* Index */}
                  <td className="px-[6px] h-[23px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] border-r border-[#E4E9ED]">
                    {row.index}
                  </td>
                  {/* ERS Title */}
                  <td className="px-[6px] h-[23px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] border-r border-[#E4E9ED]" style={{ maxWidth: 241 }}>
                    <div className="flex items-center gap-[4px]">
                      {row.tag && <TagBadge label={row.tag} />}
                      <span className={`truncate ${!row.isParent ? 'underline text-[#515E94]' : ''}`}>{row.ersTitle}</span>
                    </div>
                  </td>
                  {/* 진행률 */}
                  <td className="px-[6px] h-[23px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] border-r border-[#E4E9ED] text-right">
                    {row.progress !== null ? row.progress : ''}
                  </td>
                  {/* Updated */}
                  <td className="px-[6px] h-[23px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] border-r border-[#E4E9ED]">
                    {row.updated}
                  </td>
                  {/* Support */}
                  <td className="px-[6px] h-[23px] text-[12px] leading-[14px] tracking-[0.8px] border-r border-[#E4E9ED]">
                    {row.support ? <StatusBadge status={row.support} /> : !row.isParent ? <span className="text-[#B2B6BB]">-</span> : null}
                  </td>
                  {/* SRS Columns */}
                  {(['apsEletric', 'apsOptic', 'analog', 'digitalChip', 'fw', 'alpdp', 'pm'] as SrsColumnKey[]).map(
                    (srsKey) => (
                      <td
                        key={srsKey}
                        className="px-[4px] h-[23px] text-[11px] leading-[14px] tracking-[0.8px] text-[#384047] border-r border-[#E4E9ED]"
                      >
                        {row.srs[srsKey] ? <SrsBadge entry={row.srs[srsKey]!} /> : !row.isParent ? <span className="text-[#B2B6BB]">-</span> : null}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right: Detail Panel */}
      {detailOpen && (
        <DetailPanel
          data={sampleDetail}
          onClose={() => {
            setDetailOpen(false)
            setSelectedRow(null)
          }}
        />
      )}
    </div>
  )
}

/* ─── Detail Panel ─── */

function DetailPanel({ data, onClose }: { data: DetailData; onClose: () => void }) {
  return (
    <div className="w-[720px] shrink-0 bg-white flex flex-col overflow-hidden rounded-[4px] shadow-[0px_0px_2px_0px_rgba(40,48,55,0.12),0px_4px_8px_1px_rgba(40,48,55,0.12)]">
      {/* Header */}
      <div className="shrink-0">
        <div className="flex items-center gap-[12px] pl-[20px] pr-[18px] pt-[16px] pb-[14px]">
          <h3 className="text-[16px] font-normal leading-[22px] tracking-[0.8px] text-[#283037] truncate flex-1 min-w-0">
            {data.index} {data.title}
          </h3>
          <button onClick={onClose} className="rounded-[2px] hover:bg-[#EDF2F4] shrink-0">
            <X className="w-[16px] h-[16px] text-[#565E66]" strokeWidth={1.5} />
          </button>
        </div>
        <div className="h-px bg-[#E4E9ED]" />
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto">
        {/* ERS Detail Section */}
        <div className="px-[20px] pt-[12px]">
          <div className="flex items-center justify-between mb-[8px]">
            <div className="flex items-center gap-[4px]">
              <span className="text-[14px] font-bold leading-[20px] tracking-[0.8px] text-[#384047]">
                ERS Detil
              </span>
              <div className="flex items-center justify-center w-[13px]">
                <div className="w-px h-[10px] bg-[#CCD1D6]" />
              </div>
              <span className="text-[12px] leading-[20px] tracking-[0.8px] text-[#767D84]">
                Last Updated: {data.lastUpdated}
              </span>
            </div>
            <div className="flex items-center gap-[4px]">
              <button className="border border-[#DADFE4] bg-white rounded-[2px] px-[6px] py-[3px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] hover:bg-[#F3F6F8]">
                관심 ERS 등록
              </button>
              <button className="border border-[#DADFE4] bg-white rounded-[2px] px-[6px] py-[3px] text-[12px] leading-[14px] tracking-[0.8px] text-[#384047] hover:bg-[#F3F6F8]">
                내 부서 해당없음
              </button>
            </div>
          </div>
          <div className="bg-[#FBFBFB] border border-[#F5F5F6] rounded-[2px] p-[12px] max-h-[300px] overflow-y-auto">
            <p className="text-[14px] leading-[20px] tracking-[0.8px] text-[#565E66] whitespace-pre-line">
              {data.ersContent}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="px-[20px] py-[12px]">
          <div className="h-px bg-[#E4E9ED]" />
        </div>

        {/* Comments Section */}
        <div className="flex gap-[20px] px-[20px] pb-[20px]">
          {/* Customer Comment */}
          <div className="flex-1 min-w-0">
            <h4 className="text-[14px] font-bold leading-[20px] tracking-[0.8px] text-[#384047] mb-[8px]">
              Customer Comment
            </h4>
            <div className="bg-[#FBFBFB] border border-[#F5F5F6] rounded-[2px] p-[12px] max-h-[322px] overflow-y-auto space-y-[16px]">
              {data.customerComments.map((comment, i) => (
                <div key={i} className="flex flex-col gap-[6px]">
                  <span className="text-[12px] leading-[20px] tracking-[0.8px] text-[#767D84]">
                    {comment.date}
                  </span>
                  <p className="text-[14px] leading-[20px] tracking-[0.8px] text-[#565E66]">
                    {comment.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Support Comment */}
          <div className="flex-1 min-w-0">
            <h4 className="text-[14px] font-bold leading-[20px] tracking-[0.8px] text-[#384047] mb-[8px]">
              Support Comment
            </h4>
            <div className="bg-[#FBFBFB] border border-[#F5F5F6] rounded-[2px] p-[12px] max-h-[322px] overflow-y-auto space-y-[16px]">
              {data.supportComments.map((comment, i) => (
                <div key={i} className="flex flex-col gap-[6px]">
                  <div className="flex items-center gap-[4px]">
                    <span className="text-[14px] font-bold leading-[20px] tracking-[0.8px] text-[#565E66]">
                      {comment.category}
                    </span>
                    <div className="flex items-center justify-center w-[13px]">
                      <div className="w-px h-[10px] bg-[#CCD1D6]" />
                    </div>
                    <StatusBadge status={comment.status} />
                    <div className="flex items-center justify-center w-[13px]">
                      <div className="w-px h-[10px] bg-[#CCD1D6]" />
                    </div>
                    <span className="text-[12px] leading-[20px] tracking-[0.8px] text-[#767D84]">
                      {comment.date}
                    </span>
                  </div>
                  <p className="text-[14px] leading-[20px] tracking-[0.8px] text-[#565E66]">
                    {comment.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Footer spacer */}
      <div className="h-[20px] shrink-0 bg-white rounded-b-[6px]" />
    </div>
  )
}

/* ─── Sub-components ─── */

function StatusLegend() {
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
      {/* Outer square 10x10 at (3,3) */}
      <rect x="3.5" y="3.5" width="9" height="9" stroke="#565E66" fill="none" />
      {/* Inner square 4x4 at (6,6) */}
      <rect x="6.5" y="6.5" width="3" height="3" stroke="#565E66" fill="none" />
      {/* Pins - top */}
      <rect x="6" y="1" width="1" height="2" fill="#565E66" />
      <rect x="9" y="1" width="1" height="2" fill="#565E66" />
      {/* Pins - bottom */}
      <rect x="6" y="13" width="1" height="2" fill="#565E66" />
      <rect x="9" y="13" width="1" height="2" fill="#565E66" />
      {/* Pins - left */}
      <rect x="1" y="6" width="2" height="1" fill="#565E66" />
      <rect x="1" y="9" width="2" height="1" fill="#565E66" />
      {/* Pins - right */}
      <rect x="13" y="6" width="2" height="1" fill="#565E66" />
      <rect x="13" y="9" width="2" height="1" fill="#565E66" />
    </svg>
  )
}

function IconNonFunctional() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      {/* Document body */}
      <path d="M3 2h7l3 3v9H3V2z" stroke="#565E66" fill="none" />
      {/* Folded corner */}
      <path d="M10 2v3h3" stroke="#565E66" fill="none" />
      {/* Text lines */}
      <line x1="5" y1="8" x2="11" y2="8" stroke="#565E66" strokeWidth="0.8" />
      <line x1="5" y1="10.5" x2="11" y2="10.5" stroke="#565E66" strokeWidth="0.8" />
    </svg>
  )
}

const statusConfig: Record<StatusType, { dotColor: string; textColor: string }> = {
  Pending: { dotColor: '#FFB800', textColor: '#FFB800' },
  Accepted: { dotColor: '#0077C8', textColor: '#0064A7' },
  Rejected: { dotColor: '#D2362C', textColor: '#D2362C' },
}

function StatusBadge({ status }: { status: StatusType }) {
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

const srsColorThemes: Record<string, { bg: string; border: string; fg: string }> = {
  '#007492': { bg: '#CCF0F9', border: '#B3E8F6', fg: '#007492' },
  '#AB772A': { bg: '#FFE1B5', border: '#FFD390', fg: '#AB772A' },
}

function SrsBadge({ entry }: { entry: SrsBadgeEntry }) {
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

function TagBadge({ label }: { label: 'NEW' | 'UPDATED' }) {
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

function SortIcon() {
  return (
    <svg width="5" height="10" viewBox="0 0 5 10" fill="none" className="shrink-0">
      <path d="M2.5 0L5 4H0L2.5 0Z" fill="#999DA0" />
      <path d="M2.5 10L0 6H5L2.5 10Z" fill="#999DA0" />
    </svg>
  )
}

function FilterIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="shrink-0">
      <path d="M0.5 1.5H9.5L6 5V8.5L4 9.5V5L0.5 1.5Z" fill="#999DA0" />
    </svg>
  )
}

function IconInfoSmall() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="1" width="14" height="14" rx="2" stroke="#90969D" strokeWidth="1" fill="none" />
      <path d="M8 5V4" stroke="#90969D" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 12V7" stroke="#90969D" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
