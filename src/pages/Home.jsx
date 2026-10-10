import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CategoryCard from '@/components/CategoryCard'
import ProductCard from '@/components/ProductCard'
import RevealSection from '@/components/RevealSection'
import { CATEGORIES } from '@/data/categories'
import { getProducts } from '@/services/productService'

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([])

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const products = await getProducts()

        const featured = products
          .filter((product) => product.featured)
          .slice(0, 4)

        setFeaturedProducts(featured)
      } catch (error) {
        console.error('Error fetching featured products:', error)
      }
    }

    fetchFeaturedProducts()
  }, [])

  return (
    <>
      {/* Sección visual de categorías */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-[#4A0D24] md:text-4xl">
              Bienvenido a Germen
            </h1>

            <h2 className="mt-3 text-3xl font-bold text-[#4A0D24] md:text-4xl">
              Un pedacito de Latinoamérica cerca de ti
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-gray-600">
              Productos y sabores que conectan con casa.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-4 md:grid-rows-2">
            {/* Imagen principal */}
            <div className="group relative overflow-hidden rounded-3xl md:col-span-2 md:row-span-2">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="h-full min-h-[420px] w-full object-cover"
              >
                <source
                  src="/videos/germen-market.mp4"
                  type="video/mp4"
                />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <div className="absolute bottom-0 p-7 text-white">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#F4D21F]">
                  Germen Latin Market
                </p>

                <h3 className="mt-2 text-3xl font-bold">
                  Sabores que te llevan a casa
                </h3>
              </div>
            </div>

            {/* Despensa */}
            <Link
              to="/productos"
              className="group relative overflow-hidden rounded-3xl"
            >
              <img
                src="/images/categories/despensa.webp"
                alt="Despensa"
                className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/25" />

              <p className="absolute bottom-4 left-4 text-xl font-bold text-white">
                Despensa
              </p>
            </Link>

            {/* Dulces */}
            <Link
              to="/productos"
              className="group relative overflow-hidden rounded-3xl"
            >
              <img
                src="/images/categories/dulces.webp"
                alt="Dulces y snacks"
                className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/25" />

              <p className="absolute bottom-4 left-4 text-xl font-bold text-white">
                Dulces y snacks
              </p>
            </Link>

            {/* Salsas */}
            <Link
              to="/productos"
              className="group relative overflow-hidden rounded-3xl"
            >
              <img
                src="/images/categories/salsas.webp"
                alt="Salsas y condimentos"
                className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/25" />

              <p className="absolute bottom-4 left-4 text-xl font-bold text-white">
                Salsas y condimentos
              </p>
            </Link>

            {/* Carnes */}
            <Link
              to="/productos"
              className="group relative overflow-hidden rounded-3xl"
            >
              <img
                src="/images/categories/cerdo.webp"
                alt="Carnes y embutidos"
                className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/25" />

              <p className="absolute bottom-4 left-4 text-xl font-bold text-white">
                Carnes y embutidos
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Hero principal */}
      <section className="overflow-hidden bg-[#4A0D24] text-white">
        <div className="mx-auto grid min-h-[650px] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2">
          <div className="hero-content">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#F4D21F]">
              Productos latinos · Envíos desde España.
            </p>

            <h1 className="text-5xl font-bold leading-tight md:text-6xl lg:text-7xl">
              Sabores que
              <span className="block text-[#F4D21F]">
                te llevan a casa.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#FFF8F2]">
              Descubre productos latinoamericanos seleccionados para sentir
              un pedacito de casa estés donde estés.
            </p>

            <Link
              to="/productos"
              className="mt-8 inline-block rounded-full bg-[#F4D21F] px-8 py-4 font-semibold !text-[#4A0D24] transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              Explorar productos
            </Link>
          </div>

          <div className="hero-image-wrapper relative">
            <div className="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-[#E889A8]" />

            <div className="absolute -bottom-10 right-0 h-48 w-48 rounded-full bg-[#F4D21F]" />

            <img
              src="/images/brand/hero-latin.webp"
              alt="Selección de productos latinoamericanos"
              className="hero-image relative z-10 w-full rounded-[40px] object-cover shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Marquee animado */}
      <section className="overflow-hidden bg-[#F4D21F] py-5">
        <div className="marquee-track">
          <div className="flex gap-12 whitespace-nowrap pr-12 text-lg font-bold uppercase tracking-[0.15em] text-[#4A0D24]">
            <span>Sabores de Latinoamérica</span>
            <span>Sabores de África</span>
            <span>Despensa</span>
            <span>Dulces y snacks</span>
            <span>Salsas y condimentos</span>
            <span>Carnes y embutidos</span>

            <span>Sabores de Latinoamérica</span>
            <span>Sabores de África</span>
            <span>Despensa</span>
            <span>Dulces y snacks</span>
            <span>Salsas y condimentos</span>
            <span>Carnes y embutidos</span>
          </div>
        </div>
      </section>

      {/* Productos destacados */}
      <section className="bg-white px-6 py-20">
        <RevealSection>
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C98245]">
                  Favoritos
                </p>

                <h2 className="mt-2 text-4xl font-bold text-[#4A0D24]">
                  Productos destacados
                </h2>
              </div>

              <Link
                to="/productos"
                className="font-semibold text-[#4A0D24] transition hover:text-[#C98245]"
              >
                Ver todos
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={{
                    ...product,
                    id: product._id,
                  }}
                />
              ))}
            </div>
          </div>
        </RevealSection>
      </section>

      {/* Categorías */}
      <section className="bg-[#FFF8F2] px-6 py-20">
        <RevealSection>
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C98245]">
                Descubre
              </p>

              <h2 className="mt-2 text-4xl font-bold text-[#4A0D24]">
                Nuestras categorías
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                Encuentra tus productos favoritos organizados por categoría.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {CATEGORIES.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                />
              ))}
            </div>
          </div>
        </RevealSection>
      </section>
    </>
  )
}

export default Home