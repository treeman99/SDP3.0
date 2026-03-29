import './index.css'
import { PageHeader } from './components/PageHeader'
import { FilterToolbar } from './components/FilterToolbar'
import { MatrixTable } from './components/MatrixTable'

export default function App() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-white" style={{ minWidth: 1440 }}>
      <PageHeader />
      <FilterToolbar />
      <MatrixTable />
    </div>
  )
}
