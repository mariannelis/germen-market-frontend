import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'

function AdminLayout() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition duration-200 outline-none ring-0 ${isActive
      ? 'bg-[#F4D21F] !text-[#4A0D24] shadow-sm'
      : '!text-white hover:bg-white/10'
    }`

  return (
    <div className="min-h-screen bg-[#FFF8F2] lg:grid lg:grid-cols-[250px_1fr]">
      {/* Sidebar */}
      <aside className="flex min-h-screen flex-col bg-[#4A0D24] p-6 text-white">

        {/* Título */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#E889A8]">
            Administración
          </p>
        </div>

        {/* Navegación */}
        <nav className="space-y-2">
          <NavLink
            to="/admin"
            end
            className={linkClasses}
          >
            <span className="text-base">⌂</span>
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/productos"
            end
            className={linkClasses}
          >
            <span className="text-base">▦</span>
            Productos
          </NavLink>

          <NavLink
            to="/admin/productos/nuevo"
            className={linkClasses}
          >
            <span className="text-base">＋</span>
            Nuevo producto
          </NavLink>

          <NavLink
            to="/admin/pedidos"
            className={linkClasses}
          >
            <span className="text-base">▤</span>
            Pedidos
          </NavLink>
        </nav>
        <div className="mt-auto space-y-3 pt-10">
          <NavLink
            to="/"
            className="block w-full rounded-2xl border border-white/20 px-4 py-3 text-center text-sm font-semibold !text-white transition duration-200 hover:bg-[#F4D21F] hover:!text-[#4A0D24]"
          >
            Volver a Germen
          </NavLink>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-2xl border border-white/20 px-4 py-3 text-sm font-semibold !text-white transition duration-200 hover:bg-white hover:!text-[#4A0D24]"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Contenido */}
      <main className="p-6 md:p-8 lg:p-10">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout