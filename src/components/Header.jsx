import { useEffect, useRef, useState } from 'react'
import {
  Link,
  NavLink,
  useNavigate,
} from 'react-router-dom'

import { NAVIGATION_ITEMS } from '@/data/navigation'
import useCart from '@/hooks/useCart'
import useAuth from '@/hooks/useAuth'

function Header() {
  const { cartCount } = useCart()

  const {
    user,
    isAuthenticated,
    logout,
  } = useAuth()

  const navigate = useNavigate()

  const [isUserMenuOpen, setIsUserMenuOpen] =
    useState(false)

  const [isCategoryMenuOpen, setIsCategoryMenuOpen] =
    useState(false)

  const userMenuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target)
      ) {
        setIsUserMenuOpen(false)
      }
    }

    document.addEventListener(
      'mousedown',
      handleClickOutside
    )

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      )
    }
  }, [])

  const linkClasses = ({ isActive }) =>
    `transition ${isActive
      ? 'text-[#F4D21F]'
      : 'text-white hover:text-[#F4D21F]'
    }`

  const handleLogout = () => {
    setIsUserMenuOpen(false)
    logout()
    navigate('/')
  }

  return (
    <>
      {/* Franja promocional */}
<div className="promo-bar">
  <div className="promo-track">
    <span>
      ✨ Sabores de Latinoamérica · Sabores de África · Envíos desde España ·
      Productos originales para tu hogar y toda tu familia · Stock disponible ·
      Envíos a Turquía y Europa ✨
    </span>

    <span>
      ✨ Sabores de Latinoamérica · Sabores de África · Envíos desde España ·
      Productos originales para tu hogar y toda tu familia · Stock disponible ·
      Envíos a Turquía y Europa ✨
    </span>
  </div>
</div>

      {/* Header principal */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#4A0D24] text-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">

          {/* Menú + Marca */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                setIsCategoryMenuOpen(true)
              }
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-xl transition hover:border-[#F4D21F] hover:text-[#F4D21F]"
              aria-label="Abrir categorías"
            >
              ☰
            </button>

            <Link
              to="/"
              className="shrink-0 whitespace-nowrap text-xl font-bold lg:text-2xl"
            >
              Germen Latin Market
            </Link>
          </div>

          {/* Navegación */}
          <nav className="hidden flex-1 justify-center md:flex">
            <ul className="flex items-center gap-8 text-sm font-medium">
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.id}>
                  <NavLink
                    to={item.path}
                    className={linkClasses}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Acciones */}
          <div className="flex shrink-0 items-center gap-3">

            {/* Carrito */}
            <Link
              to="/carrito"
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition hover:border-[#F4D21F] hover:text-[#F4D21F]"
              aria-label="Ver carrito"
            >
              <span className="text-lg">
                🛒
              </span>

              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#F4D21F] px-1 text-xs font-bold text-[#4A0D24]">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Usuario */}
            {isAuthenticated ? (
              <div
                ref={userMenuRef}
                className="relative"
              >
                <button
                  type="button"
                  onClick={() =>
                    setIsUserMenuOpen(
                      (current) => !current
                    )
                  }
                  className="flex items-center gap-2 rounded-full px-3 py-2 transition hover:bg-white/10"
                >
                  <div className="hidden items-center gap-1 sm:flex">
                    <span className="text-sm text-white/70">
                      Hola,
                    </span>

                    <span className="max-w-[130px] truncate text-sm font-bold text-white">
                      {user?.name
                        ? user.name.charAt(0).toUpperCase() +
                        user.name.slice(1)
                        : 'Usuario'}
                    </span>
                  </div>

                  <span
                    className={`text-xs transition-transform ${isUserMenuOpen
                      ? 'rotate-180'
                      : ''
                      }`}
                  >
                    ▼
                  </span>
                </button>

                {/* Menú usuario */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 top-[calc(100%+12px)] z-[100] w-72 overflow-hidden rounded-2xl border border-gray-100 bg-white text-[#2B1B16] shadow-xl">
                    <div className="px-5 py-5">
                      <p className="text-lg font-bold text-[#4A0D24]">
                        {user?.name}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        {user?.role === 'admin'
                          ? 'Administrador'
                          : 'Cliente Germen'}
                      </p>
                    </div>

                    <div className="border-t border-gray-100" />

                    <Link
                      to="/productos"
                      onClick={() =>
                        setIsUserMenuOpen(false)
                      }
                      className="flex items-center gap-3 px-5 py-3.5 text-sm font-medium transition hover:bg-[#FFF8F2]"
                    >
                      <span>🛍️</span>
                      Productos
                    </Link>

                    <Link
                      to="/carrito"
                      onClick={() =>
                        setIsUserMenuOpen(false)
                      }
                      className="flex items-center gap-3 px-5 py-3.5 text-sm font-medium transition hover:bg-[#FFF8F2]"
                    >
                      <span>🛒</span>

                      <span className="flex-1">
                        Mi carrito
                      </span>

                      {cartCount > 0 && (
                        <span className="rounded-full bg-[#F4D21F] px-2 py-0.5 text-xs font-bold text-[#4A0D24]">
                          {cartCount}
                        </span>
                      )}
                    </Link>

                    {user?.role === 'admin' && (
                      <Link
                        to="/admin"
                        onClick={() =>
                          setIsUserMenuOpen(false)
                        }
                        className="flex items-center gap-3 px-5 py-3.5 text-sm font-medium transition hover:bg-[#FFF8F2]"
                      >
                        <span>⚙️</span>
                        Panel administrador
                      </Link>
                    )}

                    <div className="border-t border-gray-100" />

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 px-5 py-4 text-left text-sm font-semibold text-[#4A0D24] transition hover:bg-red-50"
                    >
                      <span>↪️</span>
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="rounded-full border border-[#F4D21F] px-4 py-2 text-sm font-semibold text-[#F4D21F] transition hover:bg-[#F4D21F] hover:text-[#4A0D24]"
              >
                Iniciar sesión
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Menú lateral de categorías */}
      {isCategoryMenuOpen && (
        <>
          {/* Fondo */}
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={() =>
              setIsCategoryMenuOpen(false)
            }
            className="fixed inset-0 z-[90] bg-black/40"
          />

          <aside className="fixed left-0 top-0 z-[100] h-full w-[300px] bg-white shadow-2xl">
            {/* Cabecera menú */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
              <div>
                <h2 className="mt-1 text-xl font-bold text-[#4A0D24]">
                  Categorías
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setIsCategoryMenuOpen(false)
                }
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF8F2] text-lg font-bold text-[#4A0D24] transition hover:bg-[#F4D21F]"
              >
                ✕
              </button>
            </div>

            {/* Categorías */}
            <nav className="p-4">
              <Link
                to="/productos"
                onClick={() =>
                  setIsCategoryMenuOpen(false)
                }
                className="block rounded-xl px-4 py-3 font-semibold text-[#4A0D24] transition hover:bg-[#FFF8F2]"
              >
                Todos los productos
              </Link>

              <Link
                to="/productos?categoria=Despensa"
                onClick={() =>
                  setIsCategoryMenuOpen(false)
                }
                className="block rounded-xl px-4 py-3 font-semibold text-[#4A0D24] transition hover:bg-[#FFF8F2]"
              >
                Despensa
              </Link>

              <Link
                to="/productos?categoria=Dulces%20y%20snacks"
                onClick={() =>
                  setIsCategoryMenuOpen(false)
                }
                className="block rounded-xl px-4 py-3 font-semibold text-[#4A0D24] transition hover:bg-[#FFF8F2]"
              >
                Dulces y snacks
              </Link>

              <Link
                to="/productos?categoria=Salsas%20y%20condimentos"
                onClick={() =>
                  setIsCategoryMenuOpen(false)
                }
                className="block rounded-xl px-4 py-3 font-semibold text-[#4A0D24] transition hover:bg-[#FFF8F2]"
              >
                Salsas y condimentos
              </Link>

              <Link
                to="/productos?categoria=Carnes%20y%20embutidos"
                onClick={() =>
                  setIsCategoryMenuOpen(false)
                }
                className="block rounded-xl px-4 py-3 font-semibold text-[#4A0D24] transition hover:bg-[#FFF8F2]"
              >
                Carnes y embutidos
              </Link>
            </nav>

            {/* Pie menú */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-gray-100 bg-[#FFF8F2] p-5">
              <p className="text-sm font-semibold text-[#4A0D24]">
                Conectamos sabores y recuerdos
              </p>

              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Productos latinoamericanos y africanos, listos para enviar desde España a Turquía
              </p>
            </div>
          </aside>
        </>
      )}
    </>
  )
}

export default Header