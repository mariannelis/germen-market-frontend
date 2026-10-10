import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  deleteProduct,
  getProducts,
} from '@/services/productService'

const CATEGORY_OPTIONS = [
  'Todas',
  'Despensa',
  'Dulces y snacks',
  'Salsas y condimentos',
  'Carnes y embutidos',
]

function ProductsAdmin() {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)

  // Carga los productos reales desde la API.
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        setError('')

        const data = await getProducts()
        setProducts(data)
      } catch {
        setError('No se pudieron cargar los productos.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Filtra por nombre y categoría.
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())

      const matchesCategory =
        selectedCategory === 'Todas' ||
        product.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [products, searchTerm, selectedCategory])

  // Elimina el producto en MongoDB y actualiza la interfaz.
  const handleDelete = async (productId) => {
    const confirmed = window.confirm(
      '¿Seguro que deseas eliminar este producto?'
    )

    if (!confirmed) {
      return
    }

    try {
      setDeletingId(productId)
      setMessage('')
      setError('')

      await deleteProduct(productId)

      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) => product._id !== productId
        )
      )

      setMessage('Producto eliminado correctamente.')
    } catch {
      setError('No se pudo eliminar el producto.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <>
      {/* Encabezado */}
      <section className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C98245]">
            Catálogo
          </p>

          <h1 className="mt-2 text-4xl font-bold text-[#4A0D24]">
            Gestión de productos
          </h1>

          <p className="mt-3 text-gray-600">
            Consulta y administra los productos disponibles en la tienda.
          </p>
        </div>

        <Link
          to="/admin/productos/nuevo"
          className="inline-flex items-center justify-center rounded-2xl bg-[#F4D21F] px-6 py-3 font-semibold text-[#4A0D24] transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          + Nuevo producto
        </Link>
      </section>

      {/* Buscador y filtros */}
      <section className="mt-8 rounded-3xl bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-[1fr_240px]">
          <div>
            <label
              htmlFor="search"
              className="mb-2 block text-sm font-semibold text-[#4A0D24]"
            >
              Buscar producto
            </label>

            <input
              id="search"
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Ej. Harina PAN"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#4A0D24]"
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-semibold text-[#4A0D24]"
            >
              Categoría
            </label>

            <select
              id="category"
              value={selectedCategory}
              onChange={(event) =>
                setSelectedCategory(event.target.value)
              }
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#4A0D24]"
            >
              {CATEGORY_OPTIONS.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Mensajes */}
      {message && (
        <p className="mt-5 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          {message}
        </p>
      )}

      {error && (
        <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </p>
      )}

      {/* Carga */}
      {isLoading ? (
        <section className="mt-8 rounded-3xl bg-white p-10 text-center shadow-sm">
          <p className="font-semibold text-[#4A0D24]">
            Cargando productos...
          </p>
        </section>
      ) : (
        <section className="mt-8 overflow-hidden rounded-3xl bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-5">
            <p className="font-semibold text-[#4A0D24]">
              {filteredProducts.length} productos encontrados
            </p>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <article
                  key={product._id}
                  className="grid gap-5 p-6 transition hover:bg-[#FFF8F2] md:grid-cols-[90px_1fr_140px_120px_220px] md:items-center"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-20 w-20 rounded-2xl bg-[#FFF8F2] object-contain p-2"
                  />

                  <div>
                    <h2 className="font-bold text-[#4A0D24]">
                      {product.name}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      {product.category}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-400">
                      Precio
                    </p>

                    <p className="mt-1 font-semibold text-[#4A0D24]">
                      {Number(product.price).toFixed(2)} €
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-400">
                      Stock
                    </p>

                    <p
                      className={`mt-1 font-semibold ${product.stock <= 10
                        ? 'text-orange-600'
                        : 'text-green-700'
                        }`}
                    >
                      {product.stock}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Link
                      to={`/admin/productos/${product._id}/editar`}
                      className="rounded-xl border border-[#4A0D24] px-4 py-2 text-sm font-semibold text-[#4A0D24] transition hover:bg-[#4A0D24] hover:text-white"
                    >
                      Editar
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDelete(product._id)}
                      disabled={deletingId === product._id}
                      className="rounded-xl bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {deletingId === product._id
                        ? 'Eliminando...'
                        : 'Eliminar'}
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <div className="p-10 text-center">
                <p className="font-semibold text-[#4A0D24]">
                  No se encontraron productos.
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  Prueba con otro nombre o categoría.
                </p>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  )
}

export default ProductsAdmin