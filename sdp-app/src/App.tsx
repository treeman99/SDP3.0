import { useState } from 'react'
import './index.css'
import { PageHeader } from './components/PageHeader'
import { FilterToolbar } from './components/FilterToolbar'
import { MatrixTable } from './components/MatrixTable'
import { ERSDetailPanel } from './components/ERSDetailPanel'
import { Footer } from './components/Footer'
import type { MatrixRow } from './data/matrixData'

export default function App() {
  const [selectedRow, setSelectedRow] = useState<MatrixRow | null>(null)

  function handleRowClick(row: MatrixRow) {
    setSelectedRow(prev =>
      prev && prev.index === row.index && prev.title === row.title ? null : row
    )
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-white" style={{ minWidth: 1440 }}>
      <PageHeader />
      <FilterToolbar />
      <MatrixTable
        onRowClick={handleRowClick}
        selectedIndex={selectedRow ? selectedRow.index + selectedRow.title : undefined}
      />
      {selectedRow && (
        <ERSDetailPanel
          row={selectedRow}
          onClose={() => setSelectedRow(null)}
        />
      )}
      <Footer />
    </div>
  )
}
