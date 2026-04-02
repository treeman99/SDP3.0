import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { Layout } from '@/components/layout/Layout'
import { ComplianceMatrix } from '@/pages/ComplianceMatrix'
import './index.css'

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<ComplianceMatrix />} />
            <Route path="/compliance-matrix" element={<ComplianceMatrix />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}
