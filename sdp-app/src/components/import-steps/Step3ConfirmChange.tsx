/**
 * STEP3. Confirm Change
 *
 * 변경 사항 확인 테이블.
 * - changeRows 배열에 데이터를 추가/수정하면 테이블에 반영됩니다.
 * - status: 'add' (초록 하이라이트), 'delete' (분홍 하이라이트), 'none' (기본)
 * - 각 셀에도 개별 status를 지정할 수 있습니다.
 */

interface CellData {
  value: string
  status?: 'add' | 'delete' | 'none'
}

interface ChangeRow {
  ersRequirement: CellData
  verificationVerdict: CellData
  coverageLevel: CellData
  verificationComment: CellData
}

const columns = [
  { key: 'ersRequirement' as const, label: 'ERS Requirement', width: 240 },
  { key: 'verificationVerdict' as const, label: 'Vender Verification Verdict', width: 240 },
  { key: 'coverageLevel' as const, label: 'Vender Verification Coverage Level', width: 240 },
  { key: 'verificationComment' as const, label: 'Vender Verification Verdict', width: 240 },
]

const changeRows: ChangeRow[] = [
  { ersRequirement: { value: 'ABCD-BBVC-45' }, verificationVerdict: { value: 'Expectation', status: 'add' }, coverageLevel: { value: '-' }, verificationComment: { value: 'Comment01', status: 'delete' } },
  { ersRequirement: { value: 'ABCD-BBVC-46' }, verificationVerdict: { value: 'Function', status: 'add' }, coverageLevel: { value: '-' }, verificationComment: { value: 'Comment02', status: 'delete' } },
  { ersRequirement: { value: 'ABCD-BBVC-47' }, verificationVerdict: { value: 'Production', status: 'add' }, coverageLevel: { value: '-' }, verificationComment: { value: 'Production Comment01', status: 'delete' } },
  { ersRequirement: { value: 'ABCD-BBVC-48' }, verificationVerdict: { value: 'Project', status: 'add' }, coverageLevel: { value: '-' }, verificationComment: { value: 'Project Comment01', status: 'delete' } },
  { ersRequirement: { value: 'ABCD-BBVC-49' }, verificationVerdict: { value: 'Purpose', status: 'add' }, coverageLevel: { value: '-' }, verificationComment: { value: 'Purpose Comment01', status: 'delete' } },
  { ersRequirement: { value: 'ABCD-BBVC-50' }, verificationVerdict: { value: 'Scope', status: 'add' }, coverageLevel: { value: '-' }, verificationComment: { value: 'Scope Comment01', status: 'delete' } },
  { ersRequirement: { value: 'ABCD-BBVC-51' }, verificationVerdict: { value: 'Scope', status: 'add' }, coverageLevel: { value: '-' }, verificationComment: { value: 'Scope Comment01', status: 'delete' } },
  { ersRequirement: { value: 'ABCD-BBVC-52' }, verificationVerdict: { value: 'Expectation', status: 'add' }, coverageLevel: { value: '-' }, verificationComment: { value: 'Expectation Comment01' } },
  { ersRequirement: { value: 'ABCD-BBVC-53' }, verificationVerdict: { value: 'Expectation', status: 'add' }, coverageLevel: { value: '-' }, verificationComment: { value: 'Expectation Comment02' } },
  { ersRequirement: { value: 'ABCD-BBVC-54' }, verificationVerdict: { value: 'Expectation', status: 'add' }, coverageLevel: { value: '-' }, verificationComment: { value: 'Expectation Comment03' } },
  { ersRequirement: { value: 'ABCD-BBVC-55' }, verificationVerdict: { value: 'Expectation', status: 'add' }, coverageLevel: { value: '-' }, verificationComment: { value: 'Expectation Comment04' } },
  { ersRequirement: { value: 'ABCD-BBVC-67' }, verificationVerdict: { value: 'Function' }, coverageLevel: { value: '-' }, verificationComment: { value: 'Function Comment01' } },
  { ersRequirement: { value: 'ABCD-BBVC-68' }, verificationVerdict: { value: 'Function', status: 'add' }, coverageLevel: { value: '-' }, verificationComment: { value: 'Function Comment02' } },
  { ersRequirement: { value: 'ABCD-BBVC-69' }, verificationVerdict: { value: 'Production', status: 'add' }, coverageLevel: { value: '-' }, verificationComment: { value: 'Production Comment01' } },
]

export function Step3ConfirmChange() {
  return (
    <div className="flex flex-col h-full">
      {/* Legend */}
      <div className="flex items-center gap-[8px] mb-[4px]">
        <div className="flex items-center gap-[4px]">
          <div className="w-[10px] h-[10px] rounded-[1px] bg-[#D4EDDA]" />
          <span className="text-[11px] leading-[12px] tracking-[0.8px] text-[#565E66]">Add</span>
        </div>
        <div className="flex items-center gap-[4px]">
          <div className="w-[10px] h-[10px] rounded-[1px] bg-[#F8D7DA]" />
          <span className="text-[11px] leading-[12px] tracking-[0.8px] text-[#565E66]">Delete</span>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 border border-[#DADFE4] overflow-auto">
        <table className="w-full border-collapse" style={{ minWidth: columns.reduce((s, c) => s + c.width, 0) }}>
          <thead className="sticky top-0 z-10">
            <tr>
              {columns.map(col => (
                <th
                  key={col.key}
                  className="bg-[#FAFBFC] border-b border-r border-[#DADFE4] text-left px-[6px] py-0 h-[28px] text-[11px] font-normal leading-[12px] tracking-[0.8px] text-[#283037] whitespace-nowrap"
                  style={{ width: col.width, minWidth: col.width }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {changeRows.map((row, i) => (
              <tr key={i} className="border-b border-[#E4E9ED]">
                {columns.map(col => {
                  const cell = row[col.key]
                  return (
                    <td
                      key={col.key}
                      className={`px-[6px] h-[23px] text-[12px] leading-[14px] tracking-[0.8px] border-r border-[#E4E9ED] truncate ${getCellStyle(cell.status)}`}
                      style={{ width: col.width, minWidth: col.width, maxWidth: col.width }}
                    >
                      {cell.value}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function getCellStyle(status?: 'add' | 'delete' | 'none'): string {
  switch (status) {
    case 'add':
      return 'bg-[#D4EDDA] text-[#155724]'
    case 'delete':
      return 'bg-[#F8D7DA] text-[#721C24]'
    default:
      return 'text-[#384047]'
  }
}
