import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { Layout } from '@/components/layout/Layout'
import { ComplianceMatrix } from '@/pages/ComplianceMatrix'
import { SRSManagement } from '@/pages/SRSManagement'
import { MyTask } from '@/pages/MyTask'
import { SrsDetail } from '@/pages/srs-management/srs-detail/SrsDetail'
import { FunctionManagement } from '@/pages/function-management/FunctionManagement'
import { FunctionDetail } from '@/pages/function-management/function-detail/FunctionDetail'
import './index.css'

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<div />} />
            <Route path="/compliance-matrix" element={<ComplianceMatrix />} />
            <Route path="/srs-management" element={<SRSManagement />} />
            <Route path="/my-task" element={<MyTask />} />
            <Route path="/srs-detail" element={<SrsDetail />} />
            <Route path="/function-management" element={<FunctionManagement />} />
            <Route path="/function-detail" element={<FunctionDetail />} />
            <Route path="*" element={<div />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}
