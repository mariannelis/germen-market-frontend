import { Outlet } from 'react-router-dom'
import Header from '../components/header'
import Footer from '../components/Footer'
import FonsoChat from '../components/FonsoChat'


function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-[#FFF8F2] text-[#4A0D24]">
      <Header />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
      <FonsoChat />
    </div>
  )
}

export default PublicLayout