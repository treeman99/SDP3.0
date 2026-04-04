import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'

export function Layout() {
  return (
    <div className="flex flex-col w-full h-screen overflow-hidden">
      <Header />
      <main className="flex-1 min-h-0 bg-white overflow-hidden">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
