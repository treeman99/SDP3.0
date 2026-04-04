import type { ColumnDef } from '../Types'

export const columns: ColumnDef[] = [
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

export const ersColumns = columns.filter((c) => c.group === 'ers')
export const srsColumns = columns.filter((c) => c.group === 'srs')
export const ersWidth = ersColumns.reduce((s, c) => s + c.width, 0)
export const srsWidth = srsColumns.reduce((s, c) => s + c.width, 0)
