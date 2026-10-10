import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductForm from '@/components/ProductForm'
import { createProduct } from '@/services/productService'

function CreateProduct() {
  const navigate = useNavigate()

  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCreateProduct = async (productData) => {
    try {
      setIsSubmitting(true)
      setError('')

      await createProduct(productData)

      navigate('/admin/productos')
    } catch {
      setError('No se pudo crear el producto.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <section className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C98245]">
          Catálogo
        </p>

        <h1 className="mt-2 text-4xl font-bold text-[#4A0D24]">
          Crear producto
        </h1>

        <p className="mt-3 text-gray-600">
          Añade un nuevo producto al catálogo de Germen Latin Market.
        </p>
      </section>

      {error && (
        <p className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </p>
      )}

      <ProductForm
        onSubmit={handleCreateProduct}
        submitText={isSubmitting ? 'Creando...' : 'Crear producto'}
        disabled={isSubmitting}
      />
    </>
  )
}

export default CreateProduct