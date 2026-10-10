import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useCart from '@/hooks/useCart'
import { getProducts } from '@/services/productService'

function ProductDetail() {
  const { id } = useParams()
  const { addToCart } = useCart()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [added, setAdded] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError('')

        const products = await getProducts()

        const foundProduct = products.find(
          (item) => item._id === id
        )

        if (!foundProduct) {
          setError('Producto no encontrado.')
          return
        }

        setProduct(foundProduct)
      } catch {
        setError(
          'No se pudo cargar la información del producto.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    if (!product || product.stock <= 0) return

    addToCart({
      ...product,
      id: product._id,
    })

    setAdded(true)

    setTimeout(() => {
      setAdded(false)
    }, 2000)
  }

  if (loading) {
    return (
      <section className="min-h-[60vh] bg-[#FFF8F2] px-6 py-20">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-lg font-semibold text-[#4A0D24]">
            Cargando producto...
          </p>
        </div>
      </section>
    )
  }

  if (error || !product) {
    return (
      <section className="min-h-[60vh] bg-[#FFF8F2] px-6 py-20">
        <div className="mx-auto max-w-xl rounded-3xl bg-white p-10 text-center shadow-sm">
          <h1 className="text-3xl font-bold text-[#4A0D24]">
            Producto no disponible
          </h1>

          <p className="mt-4 text-gray-600">
            {error || 'No encontramos este producto.'}
          </p>

          <Link
            to="/productos"
            className="mt-7 inline-flex rounded-full bg-[#F4D21F] px-7 py-3 font-semibold !text-[#4A0D24] transition hover:-translate-y-0.5 hover:shadow-md"
          >
            Volver a productos
          </Link>
        </div>
      </section>
    )
  }

  const hasStock = Number(product.stock) > 0

  return (
    <section className="min-h-screen bg-[#FFF8F2] px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/productos"
          className="inline-flex text-sm font-semibold text-[#4A0D24] transition hover:text-[#C98245]"
        >
          Volver a productos
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-start">
          {/* Imagen */}
          <div className="overflow-hidden rounded-[32px] bg-white p-8 shadow-sm">
            <img
              src={product.image}
              alt={product.name}
              className="mx-auto h-[420px] w-full object-contain"
            />
          </div>

          {/* Información */}
          <div className="rounded-[32px] bg-white p-8 shadow-sm md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C98245]">
              {product.category}
            </p>

            <h1 className="mt-3 text-4xl font-bold leading-tight text-[#4A0D24] md:text-5xl">
              {product.name}
            </h1>

            <p className="mt-5 text-3xl font-bold text-[#4A0D24]">
              {Number(product.price).toFixed(2)} €
            </p>

            <div className="mt-6 border-t border-gray-100 pt-6">
              <h2 className="text-lg font-bold text-[#4A0D24]">
                Descripción
              </h2>

              <p className="mt-3 leading-relaxed text-gray-600">
                {product.description ||
                  'Producto seleccionado por Germen Latin Market.'}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  hasStock
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {hasStock
                  ? `En stock: ${product.stock}`
                  : 'Sin stock'}
              </span>

              <span className="rounded-full bg-[#FFF8F2] px-4 py-2 text-sm font-semibold text-[#4A0D24]">
                Envío desde España
              </span>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!hasStock}
              className={`mt-8 w-full rounded-2xl px-6 py-4 text-base font-bold transition ${
                hasStock
                  ? 'bg-[#F4D21F] !text-[#4A0D24] hover:-translate-y-0.5 hover:shadow-lg'
                  : 'cursor-not-allowed bg-gray-200 text-gray-400'
              }`}
            >
              {added
                ? '✓ Añadido al carrito'
                : hasStock
                  ? 'Añadir al carrito'
                  : 'Producto sin stock'}
            </button>

            <Link
              to="/carrito"
              className="mt-3 flex w-full justify-center rounded-2xl border border-[#4A0D24]/15 px-6 py-4 font-semibold !text-[#4A0D24] transition hover:bg-[#FFF8F2]"
            >
              Ver carrito
            </Link>

            <div className="mt-8 rounded-2xl bg-[#FFF8F2] p-5">
              <p className="font-bold text-[#4A0D24]">
                Germen Latin Market
              </p>

              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Productos seleccionados y preparados para envío desde
                España a Turquía y Europa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetail