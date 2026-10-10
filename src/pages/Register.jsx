import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '@/services/authService'

function Register() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      setIsSubmitting(true)
      setError('')

      await registerUser(formData)

      navigate('/login')
    } catch (error) {
      setError(
        error.message || 'No se pudo crear la cuenta.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="min-h-screen bg-[#FFF8F2] px-6 py-16">
      <div className="mx-auto max-w-md">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C98245]">
            Germen Latin Market
          </p>

          <h1 className="mt-3 text-4xl font-bold text-[#4A0D24]">
            Crear cuenta
          </h1>

          <p className="mt-3 text-gray-600">
            Regístrate para disfrutar de una experiencia más personalizada.
          </p>

          {error && (
            <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </p>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-[#4A0D24]"
              >
                Nombre
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#4A0D24]"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-[#4A0D24]"
              >
                Correo electrónico
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#4A0D24]"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-[#4A0D24]"
              >
                Contraseña
              </label>

              <input
                id="password"
                name="password"
                type="password"
                minLength="6"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#4A0D24]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-[#F4D21F] px-5 py-4 font-bold text-[#4A0D24] transition hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? 'Creando cuenta...'
                : 'Crear cuenta'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <Link
              to="/login"
              className="font-semibold text-[#4A0D24]"
            >
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Register