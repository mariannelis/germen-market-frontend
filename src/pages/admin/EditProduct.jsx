import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ProductForm from '@/components/ProductForm'
import {
  getProductById,
  updateProduct,
} from '@/services/productService'

function EditProduct() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true)
        setError('')

        const data = await getProductById(id)
        setProduct(data)
      } catch {
        setError('No se pudo cargar el producto.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleEditProduct = async (productData) => {
    try {
      setIsSubmitting(true)
      setError('')

      await updateProduct(id, productData)

      navigate('/admin/productos')
    } catch {
      setError('No se pudieron guardar los cambios.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <p className="rounded-2xl bg-white p-6 font-semibold text-[#4A0D24] shadow-sm">
        Cargando producto...
      </p>
    )
  }

  if (!product) {
    return (
      <p className="rounded-2xl bg-red-50 p-6 font-semibold text-red-700">
        {error || 'Producto no encontrado.'}
      </p>
    )
  }

  return (
    <>
      <section className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C98245]">
          Catálogo
        </p>

        <h1 className="mt-2 text-4xl font-bold text-[#4A0D24]">
          Editar producto
        </h1>

        <p className="mt-3 text-gray-600">
          Modifica la información del producto seleccionado.
        </p>
      </section>

      {error && (
        <p className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </p>
      )}

      <ProductForm
        initialValues={product}
        onSubmit={handleEditProduct}
        submitText={
          isSubmitting ? 'Guardando...' : 'Guardar cambios'
        }
        disabled={isSubmitting}
      />
    </>
  )
}

export default EditProduct