import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      setIsSubmitting(true)
      setError('')

      const data = await login({
        email,
        password,
      })

      if (data.user.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/productos')
      }
    } catch (error) {
      setError(
        error.message || 'No se pudo iniciar sesión.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="min-h-screen bg-[#FFF8F2]">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Panel visual */}
        <div className="relative hidden overflow-hidden bg-[#4A0D24] p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#F4D21F]">
              Germen Latin Market
            </p>

            <h1 className="mt-6 max-w-lg text-5xl font-bold leading-tight">
              Sabores que
              <span className="block text-[#F4D21F]">
                te llevan a casa.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-lg leading-relaxed text-[#FFF8F2]/80">
              Inicia sesión para descubrir nuestros productos,
              gestionar tu carrito y disfrutar de una experiencia
              personalizada.
            </p>
          </div>

          <div className="relative mt-12">
            <div className="absolute -left-12 -top-10 h-40 w-40 rounded-full bg-[#E889A8]" />

            <div className="absolute -bottom-8 right-6 h-36 w-36 rounded-full bg-[#F4D21F]" />

            <img
              src="/images/brand/hero-latin.webp"
              alt="Selección de productos latinoamericanos"
              className="relative z-10 w-full rounded-[36px] object-cover shadow-2xl"
            />
          </div>
        </div>

        {/* Formulario */}
        <div className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <div className="mb-10">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C98245]">
                Bienvenido
              </p>

              <h2 className="mt-3 text-4xl font-bold text-[#4A0D24]">
                Iniciar sesión
              </h2>

              <p className="mt-3 text-gray-600">
                Inicia sesión para acceder a Germen Latin Market.
              </p>
            </div>

            {error && (
              <p className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-[#2B1B16]"
                >
                  Correo electrónico
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  required
                  disabled={isSubmitting}
                  placeholder="correo@ejemplo.com"
                  className="w-full rounded-2xl border border-[#4A0D24]/20 bg-white px-5 py-4 text-[#2B1B16] outline-none transition focus:border-[#4A0D24] focus:ring-2 focus:ring-[#4A0D24]/10 disabled:cursor-not-allowed disabled:bg-gray-100"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-[#2B1B16]"
                >
                  Contraseña
                </label>

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  required
                  disabled={isSubmitting}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-[#4A0D24]/20 bg-white px-5 py-4 text-[#2B1B16] outline-none transition focus:border-[#4A0D24] focus:ring-2 focus:ring-[#4A0D24]/10 disabled:cursor-not-allowed disabled:bg-gray-100"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-2xl bg-[#4A0D24] px-5 py-4 font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#651331] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Entrando...' : 'Entrar'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              ¿No tienes cuenta?{' '}
              <Link
                to="/register"
                className="font-semibold text-[#4A0D24] transition hover:text-[#C98245]"
              >
                Crear cuenta
              </Link>
            </p>

            <div className="mt-8 text-center">
              <Link
                to="/"
                className="text-sm font-semibold text-[#4A0D24] transition hover:text-[#C98245]"
              >
                Volver a la tienda
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login