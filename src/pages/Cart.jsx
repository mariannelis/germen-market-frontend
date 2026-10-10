import { Link } from 'react-router-dom'
import useCart from '@/hooks/useCart'

const SHIPPING_COST = 4.9

function Cart() {
  const {
    cartItems,
    subtotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart()

  const total =
    subtotal + (cartItems.length > 0 ? SHIPPING_COST : 0)

  return (
    <section className="min-h-screen bg-white pb-16">
      {/* Barra informativa */}
      <div className="border-b border-gray-100 bg-[#FFF8F2]">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="rounded-xl bg-white px-4 py-3 text-sm font-medium text-[#4A0D24] shadow-sm">
            📦 Envíos preparados desde España
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Encabezado */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C98245]">
              Tu selección
            </p>

            <h1 className="mt-2 text-4xl font-bold text-[#4A0D24]">
              Tu carrito
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              {cartItems.length === 0
                ? 'No tienes productos añadidos.'
                : `${cartItems.length} ${
                    cartItems.length === 1
                      ? 'producto'
                      : 'productos'
                  } en tu carrito.`}
            </p>
          </div>

          {cartItems.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="w-fit text-sm font-semibold text-red-600 transition hover:text-red-800"
            >
              Vaciar carrito
            </button>
          )}
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[1fr_340px]">
          {/* Productos */}
          <div>
            {cartItems.length > 0 ? (
              <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
                {cartItems.map((item) => (
                  <article
                    key={item.id}
                    className="grid gap-5 border-b border-gray-100 p-5 last:border-b-0 sm:grid-cols-[100px_1fr] lg:grid-cols-[100px_1fr_auto] lg:items-center"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-24 w-24 rounded-xl bg-[#FFF8F2] object-contain p-2"
                    />

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[#C98245]">
                        {item.category}
                      </p>

                      <h2 className="mt-1 text-lg font-bold text-[#4A0D24]">
                        {item.name}
                      </h2>

                      <p className="mt-2 font-semibold text-[#4A0D24]">
                        {Number(item.price).toFixed(2)} €
                      </p>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="mt-3 text-sm font-medium text-red-600 hover:text-red-800"
                      >
                        Eliminar
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-5 lg:flex-col lg:items-end">
                      <div className="flex items-center overflow-hidden rounded-lg border border-gray-200">
                        <button
                          type="button"
                          onClick={() =>
                            decreaseQuantity(item.id)
                          }
                          className="px-3 py-2 font-bold text-[#4A0D24] hover:bg-[#FFF8F2]"
                        >
                          −
                        </button>

                        <span className="min-w-9 text-center text-sm font-semibold text-[#4A0D24]">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            increaseQuantity(item.id)
                          }
                          className="px-3 py-2 font-bold text-[#4A0D24] hover:bg-[#FFF8F2]"
                        >
                          +
                        </button>
                      </div>

                      <p className="text-lg font-bold text-[#4A0D24]">
                        {(
                          Number(item.price) *
                          item.quantity
                        ).toFixed(2)}{' '}
                        €
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-gray-100 bg-white px-6 py-14 text-center shadow-sm">
                <p className="text-xl font-bold text-[#4A0D24]">
                  Tu carrito está vacío
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  Descubre nuestros productos y añade tus favoritos.
                </p>

                <Link
                  to="/productos"
                  className="mt-6 inline-flex rounded-xl bg-[#F4D21F] px-6 py-3 font-semibold text-[#4A0D24] transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  Explorar productos
                </Link>
              </div>
            )}
          </div>

          {/* Resumen */}
          <aside className="lg:sticky lg:top-24">
            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C98245]">
                Resumen
              </p>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Subtotal
                  </span>

                  <span className="font-semibold text-[#4A0D24]">
                    {subtotal.toFixed(2)} €
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Envío
                  </span>

                  <span className="font-semibold text-[#4A0D24]">
                    {cartItems.length > 0
                      ? `${SHIPPING_COST.toFixed(2)} €`
                      : '0.00 €'}
                  </span>
                </div>
              </div>

              <div className="my-6 border-t border-gray-100" />

              <div className="flex items-end justify-between">
                <span className="font-bold text-[#4A0D24]">
                  Total
                </span>

                <span className="text-3xl font-bold text-[#4A0D24]">
                  {total.toFixed(2)} €
                </span>
              </div>

              {cartItems.length > 0 && (
                <Link
                  to="/checkout"
                  className="mt-6 flex w-full justify-center rounded-xl bg-[#F4D21F] px-6 py-4 font-bold text-[#4A0D24] transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  Continuar compra
                </Link>
              )}

              <p className="mt-4 text-center text-xs leading-relaxed text-gray-400">
                Productos preparados y enviados desde España.
              </p>
            </section>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default Cart