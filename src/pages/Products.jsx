import {
  useEffect,
  useMemo,
  useState,
} from 'react'

import { useSearchParams } from 'react-router-dom'

import ProductCard from '@/components/ProductCard'
import { getProducts } from '@/services/productService'

const CATEGORIES = [
  'Todos',
  'Despensa',
  'Dulces y snacks',
  'Salsas y condimentos',
  'Carnes y embutidos',
]

function Products() {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const [searchParams, setSearchParams] =
    useSearchParams()

  const categoryFromUrl =
    searchParams.get('categoria') || 'Todos'

  const selectedCategory = CATEGORIES.includes(
    categoryFromUrl
  )
    ? categoryFromUrl
    : 'Todos'

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true)
        setError('')

        const data = await getProducts()

        setProducts(data)
      } catch (error) {
        setError(
          error.message ||
            'No se pudieron cargar los productos.'
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadProducts()
  }, [])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'Todos' ||
        product.category === selectedCategory

      const matchesSearch = product.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())

      return matchesCategory && matchesSearch
    })
  }, [
    products,
    selectedCategory,
    searchTerm,
  ])

  const handleCategoryChange = (category) => {
    if (category === 'Todos') {
      setSearchParams({})
    } else {
      setSearchParams({
        categoria: category,
      })
    }
  }

  const resetFilters = () => {
    setSearchTerm('')
    setSearchParams({})
  }

  if (isLoading) {
    return (
      <section className="min-h-screen bg-[#FFF8F2] px-6 py-20">
        <p className="text-center font-semibold text-[#4A0D24]">
          Cargando productos...
        </p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="min-h-screen bg-[#FFF8F2] px-6 py-20">
        <p className="text-center font-semibold text-red-600">
          {error}
        </p>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-[#FFF8F2] px-6 py-14">
      <div className="mx-auto max-w-7xl">

        {/* Cabecera */}
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#C98245]">
            Nuestro catálogo
          </p>

          <h1 className="mt-2 text-4xl font-bold text-[#4A0D24] md:text-5xl">
            Productos
          </h1>

          <p className="mt-3 max-w-2xl text-gray-600">
            Descubre nuestra selección de productos
            latinoamericanos y africanos enviados desde España.
          </p>
        </div>

        {/* Buscador */}
        <div className="mb-6">
          <div className="relative max-w-3xl">
            <input
              type="search"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder="¿Qué producto estás buscando?"
              className="w-full rounded-2xl border border-[#4A0D24]/10 bg-white px-5 py-4 pr-14 text-[#2B1B16] shadow-sm outline-none transition focus:border-[#4A0D24] focus:ring-2 focus:ring-[#4A0D24]/10"
            />

            <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-xl">
              🔎
            </span>
          </div>
        </div>

                {/* Información del filtro */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500">
              {filteredProducts.length}{' '}
              {filteredProducts.length === 1
                ? 'producto'
                : 'productos'}
            </p>

            {selectedCategory !== 'Todos' && (
              <p className="mt-1 text-sm font-semibold text-[#4A0D24]">
                Categoría: {selectedCategory}
              </p>
            )}
          </div>

          {(selectedCategory !== 'Todos' ||
            searchTerm) && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-sm font-semibold text-[#C98245] transition hover:text-[#4A0D24]"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        {/* Productos */}
        {filteredProducts.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={{
                  ...product,
                  id: product._id,
                }}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-white px-6 py-16 text-center shadow-sm">
            <div className="text-4xl">
              🔎
            </div>

            <h2 className="mt-4 text-xl font-bold text-[#4A0D24]">
              No encontramos productos
            </h2>

            <p className="mt-2 text-gray-500">
              Prueba con otra búsqueda o categoría.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 rounded-xl bg-[#F4D21F] px-6 py-3 font-bold text-[#4A0D24] transition hover:-translate-y-0.5 hover:shadow-md"
            >
              Mostrar todos
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Products