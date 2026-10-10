import { useEffect, useState } from 'react'

import {
  getOrders,
  updateOrderStatus,
} from '@/services/orderService'

function OrdersAdmin() {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [updatingId, setUpdatingId] = useState(null)

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    try {
      setIsLoading(true)
      setError('')

      const data = await getOrders()
      setOrders(data)
    } catch (error) {
      setError(
        error.message ||
          'No se pudieron cargar los pedidos.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusChange = async (
    order,
    newStatus
  ) => {
    try {
      setUpdatingId(order._id)

      const updatedOrder =
        await updateOrderStatus(
          order._id,
          newStatus,
          order.isPaid
        )

      setOrders((currentOrders) =>
        currentOrders.map((currentOrder) =>
          currentOrder._id === updatedOrder._id
            ? updatedOrder
            : currentOrder
        )
      )
    } catch (error) {
      setError(
        error.message ||
          'No se pudo actualizar el pedido.'
      )
    } finally {
      setUpdatingId(null)
    }
  }

  const handlePaidChange = async (
    order,
    isPaid
  ) => {
    try {
      setUpdatingId(order._id)

      const updatedOrder =
        await updateOrderStatus(
          order._id,
          order.status,
          isPaid
        )

      setOrders((currentOrders) =>
        currentOrders.map((currentOrder) =>
          currentOrder._id === updatedOrder._id
            ? updatedOrder
            : currentOrder
        )
      )
    } catch (error) {
      setError(
        error.message ||
          'No se pudo actualizar el pago.'
      )
    } finally {
      setUpdatingId(null)
    }
  }

  const formatDate = (date) => {
    if (!date) return 'Sin fecha'

    return new Intl.DateTimeFormat('es-ES', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(date))
  }

  if (isLoading) {
    return (
      <div className="p-8 text-center text-gray-500">
        Cargando pedidos...
      </div>
    )
  }

  return (
    <section>
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C98245]">
          Administración
        </p>

        <h1 className="mt-2 text-4xl font-bold text-[#4A0D24]">
          Pedidos
        </h1>

        <p className="mt-3 text-gray-600">
          Consulta y gestiona los pedidos realizados
          por los clientes.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      {orders.length === 0 ? (
        <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
          <h2 className="text-xl font-bold text-[#4A0D24]">
            No hay pedidos todavía
          </h2>

          <p className="mt-2 text-gray-500">
            Los nuevos pedidos aparecerán aquí.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <article
              key={order._id}
              className="rounded-3xl bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C98245]">
                    Pedido
                  </p>

                  <h2 className="mt-1 break-all text-lg font-bold text-[#4A0D24]">
                    #{order._id}
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    {formatDate(order.createdAt)}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">

                  <select
                    value={order.status}
                    disabled={updatingId === order._id}
                    onChange={(event) =>
                      handleStatusChange(
                        order,
                        event.target.value
                      )
                    }
                    className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-[#4A0D24] outline-none"
                  >
                    <option value="pending">
                      Pendiente
                    </option>

                    <option value="processing">
                      En preparación
                    </option>

                    <option value="completed">
                      Completado
                    </option>

                    <option value="cancelled">
                      Cancelado
                    </option>
                  </select>

                  <label className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-[#4A0D24]">
                    <input
                      type="checkbox"
                      checked={order.isPaid}
                      disabled={updatingId === order._id}
                      onChange={(event) =>
                        handlePaidChange(
                          order,
                          event.target.checked
                        )
                      }
                    />

                    Pagado
                  </label>
                </div>
              </div>

              <div className="my-6 border-t border-gray-100" />

              <div className="grid gap-6 md:grid-cols-2">

                <div>
                  <h3 className="font-bold text-[#4A0D24]">
                    Cliente
                  </h3>

                  <div className="mt-3 space-y-1 text-sm text-gray-600">
                    <p>{order.customerName}</p>
                    <p>{order.customerEmail}</p>
                    <p>{order.phone}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-[#4A0D24]">
                    Dirección
                  </h3>

                  <div className="mt-3 space-y-1 text-sm text-gray-600">
                    <p>{order.address}</p>

                    <p>
                      {order.postalCode} {order.city}
                    </p>

                    <p>{order.country}</p>
                  </div>
                </div>
              </div>

              <div className="my-6 border-t border-gray-100" />

              <div>
                <h3 className="font-bold text-[#4A0D24]">
                  Productos
                </h3>

                <div className="mt-4 space-y-3">
                  {order.items?.map((item, index) => (
                    <div
                      key={`${order._id}-${index}`}
                      className="flex items-center justify-between gap-4 rounded-xl bg-[#FFF8F2] px-4 py-3"
                    >
                      <div>
                        <p className="font-semibold text-[#4A0D24]">
                          {item.productName}
                        </p>

                        <p className="text-sm text-gray-500">
                          Cantidad: {item.quantity}
                        </p>
                      </div>

                      <p className="font-bold text-[#4A0D24]">
                        {(
                          Number(item.price) *
                          item.quantity
                        ).toFixed(2)}{' '}
                        €
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="my-6 border-t border-gray-100" />

              <div className="ml-auto max-w-sm space-y-2 text-sm">

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Subtotal
                  </span>

                  <span className="font-semibold text-[#4A0D24]">
                    {Number(order.subtotal).toFixed(2)} €
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Envío
                  </span>

                  <span className="font-semibold text-[#4A0D24]">
                    {Number(order.shipping).toFixed(2)} €
                  </span>
                </div>

                <div className="flex justify-between pt-2 text-lg">
                  <span className="font-bold text-[#4A0D24]">
                    Total
                  </span>

                  <span className="font-bold text-[#4A0D24]">
                    {Number(order.total).toFixed(2)} €
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default OrdersAdmin