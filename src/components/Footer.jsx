import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="mt-20 bg-[#4A0D24] px-6 pb-8 text-[#FFF8F2]">
      <div className="mx-auto max-w-7xl">
        {/* Tarjeta superior flotante */}
        <div className="relative -top-16 overflow-hidden rounded-[32px] bg-[#F4D21F] shadow-xl">
          <div className="grid items-center gap-8 px-8 py-10 md:grid-cols-[1.2fr_0.8fr] md:px-12">
            <div>
              <h2 className="mt-3 max-w-2xl text-3xl font-bold leading-tight text-[#4A0D24] md:text-4xl">
                Sabores de Latinoamérica y África enviados desde España.
              </h2>

              <p className="mt-4 max-w-xl leading-relaxed text-[#4A0D24]/75">
                Descubre una selección de productos que conectan sabores,
                recuerdos y culturas en un solo lugar.
              </p>

              <Link
                to="/productos"
                className="mt-6 inline-flex rounded-full bg-[#4A0D24] px-7 py-3 font-semibold !text-white transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                Explorar productos
              </Link>
            </div>

            {/* Elemento visual */}
            <div className="relative hidden min-h-[260px] select-none antialiased md:block">
              <div className="absolute right-0 top-0 h-36 w-36 rounded-full bg-gradient-to-tr from-[#F1A27A] to-[#F7C6A3] opacity-80 blur-[1px] animate-pulse [animation-duration:10s]" />

              <div className="absolute bottom-2 left-6 h-28 w-28 rounded-full bg-gradient-to-br from-[#E27670] to-[#C9534D] opacity-60 blur-[2px]" />

              <div className="group absolute right-10 top-1/2 z-10 flex h-[220px] w-[300px] -translate-y-1/2 cursor-pointer items-center justify-center overflow-hidden rounded-[40px] border border-white/60 bg-white p-8 shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-all duration-500 ease-out hover:-translate-y-[53%] hover:scale-[1.02] hover:shadow-[0_24px_60px_rgba(210,130,100,0.15)]">
                <div className="pointer-events-none absolute inset-0 rounded-[40px] border border-transparent transition-colors duration-500 group-hover:border-orange-200/50" />

                <img
                  src="/images/brand/germen.png"
                  alt="Germen Latin Market"
                  className="w-full max-w-[210px] object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Información principal */}
        <div className="-mt-4 grid gap-10 pb-10 md:grid-cols-4">
          {/* Marca */}
          <div>
            <Link
              to="/"
              className="text-2xl font-bold !text-white"
            >
              Germen Latin Market
            </Link>

            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-white/75">
              Una tienda creada para acercar productos y sabores
              latinoamericanos y africanos a quienes quieren sentirse un poco
              más cerca de casa.
            </p>

            <p className="mt-5 text-sm font-semibold text-[#F4D21F]">
              El sabor de casa, más cerca de ti.
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[#F4D21F]">
              Navegación
            </h3>

            <nav className="mt-5 flex flex-col gap-3">
              <Link
                to="/"
                className="w-fit text-[15px] text-white/75 transition hover:text-white"
              >
                Inicio
              </Link>

              <Link
                to="/productos"
                className="w-fit text-[15px] text-white/75 transition hover:text-white"
              >
                Productos
              </Link>

              <Link
                to="/login"
                className="w-fit text-[15px] text-white/75 transition hover:text-white"
              >
                Administración
              </Link>
            </nav>
          </div>

          {/* Categorías */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[#F4D21F]">
              Categorías
            </h3>

            <div className="mt-5 flex flex-col gap-3 text-[15px] text-white/75">
              <p>Despensa</p>
              <p>Dulces y snacks</p>
              <p>Salsas y condimentos</p>
              <p>Carnes y embutidos</p>
            </div>
          </div>

          {/* Información */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-[#F4D21F]">
              Información
            </h3>

            <div className="mt-5 space-y-3 text-[15px] text-white/75">
              <p>Envíos a Turquía y Europa</p>

              <a
                href="mailto:germenlatinmarket@codevaml.com"
                className="block break-all transition hover:text-[#F4D21F] focus:outline-none"
              >
                germenlatinmarket@codevaml.com
              </a>

              <button
                type="button"
                onClick={() =>
                  window.dispatchEvent(new Event('open-fonso'))
                }
                className="block text-left font-semibold text-white transition hover:text-[#F4D21F] focus:outline-none"
              >
                Atención online
              </button>
            </div>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col gap-3 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © 2026 Germen Latin Market. Todos los derechos reservados.
            </p>

            <p>
              Diseñado y desarrollado por{' '}
              <a
                href="https://www.codevaml.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#F4D21F] transition hover:underline"
              >
                www.codevaml.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer