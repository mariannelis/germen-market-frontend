import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import { getProducts } from '@/services/productService'
import { getOrders } from '@/services/orderService'

function Dashboard() {
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setIsLoading(true)
        setError('')

        const [productsData, ordersData] = await Promise.all([
          getProducts(),
          getOrders(),
        ])

        setProducts(productsData)
        setOrders(ordersData)
      } catch (error) {
        setError(
          error.message ||
          'No se pudieron cargar los datos del panel.'
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboardData()
  }, [])

  const stats = useMemo(() => {
    const lowStockProducts = products.filter(
      (product) => Number(product.stock) <= 5
    )

    const pendingOrders = orders.filter(
      (order) => order.status === 'pending'
    )

    const completedOrders = orders.filter(
      (order) => order.status === 'completed'
    )

    return [
      {
        id: 'products',
        title: 'Productos',
        value: products.length,
        description: 'Productos registrados',
      },
      {
        id: 'orders',
        title: 'Pedidos',
        value: orders.length,
        description: 'Pedidos registrados',
      },
      {
        id: 'pending-orders',
        title: 'Pendientes',
        value: pendingOrders.length,
        description: 'Pedidos por gestionar',
      },
      {
        id: 'completed-orders',
        title: 'Completados',
        value: completedOrders.length,
        description: 'Pedidos finalizados',
      },
      {
        id: 'low-stock',
        title: 'Stock bajo',
        value: lowStockProducts.length,
        description: 'Productos con 5 unidades o menos',
      },
    ]
  }, [products, orders])

  if (isLoading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Cargando panel...
      </div>
    )
  }

  return (
    <>
      {/* Encabezado */}
      <section className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C98245]">
            Bienvenido
          </p>

          <h1 className="mt-2 text-4xl font-bold text-[#4A0D24]">
            Panel de administración
          </h1>

          <p className="mt-3 max-w-2xl text-gray-600">
            Gestiona productos y pedidos de Germen Latin Market.
          </p>
        </div>

        <Link
          to="/admin/productos/nuevo"
          className="inline-flex items-center justify-center rounded-2xl bg-[#F4D21F] px-6 py-3 font-semibold text-[#4A0D24] transition hover:-translate-y-0.5 hover:shadow-lg"
        >
          + Nuevo producto
        </Link>
      </section>

      {error && (
        <div className="mb-6 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      {/* Resumen */}
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((stat) => (
          <article
            key={stat.id}
            className="rounded-3xl bg-white p-6 shadow-sm"
          >
            <p className="text-sm font-semibold text-[#C98245]">
              {stat.title}
            </p>

            <p className="mt-3 text-4xl font-bold text-[#4A0D24]">
              {stat.value}
            </p>

            <p className="mt-2 text-sm text-gray-500">
              {stat.description}
            </p>
          </article>
        ))}
      </section>

      {/* Acciones rápidas */}
      <section className="mt-10 rounded-3xl bg-[#E889A8]/20 p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C98245]">
          Gestión rápida
        </p>

        <h2 className="mt-2 text-3xl font-bold text-[#4A0D24]">
          Administración de la tienda
        </h2>

        <p className="mt-3 max-w-2xl text-gray-600">
          Gestiona productos y revisa los pedidos realizados por
          los clientes.
        </p>

        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            to="/admin/productos"
            className="rounded-xl bg-[#4A0D24] px-5 py-3 font-semibold !text-white transition duration-300 hover:bg-[#F4D21F] hover:!text-[#4A0D24] hover:shadow-md"
          >
            Gestionar productos
          </Link>

          <Link
            to="/admin/pedidos"
            className="rounded-xl border border-[#4A0D24] bg-white px-5 py-3 font-semibold !text-[#4A0D24] transition duration-300 hover:bg-[#F4D21F] hover:!text-[#4A0D24] hover:shadow-md"
          >
            Crear prodducto
          </Link>
          <Link
            to="/admin/pedidos"
            className="rounded-xl border border-[#4A0D24] bg-white px-5 py-3 font-semibold !text-[#4A0D24] transition duration-300 hover:bg-[#F4D21F] hover:!text-[#4A0D24] hover:shadow-md"
          >
            Ver pedidos
          </Link>
        </div>
      </section>
    </>
  )
}

export default Dashboard