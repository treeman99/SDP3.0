import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'

export function Layout() {
  return (
    <div className="flex flex-col w-full min-h-screen" style={{ minWidth: 1440 }}>
      <Header />
      <main className="flex-1 bg-white">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
