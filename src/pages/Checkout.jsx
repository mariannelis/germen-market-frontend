import { useState } from 'react'
import { Link } from 'react-router-dom'

import useCart from '@/hooks/useCart'
import { createOrder } from '@/services/orderService'

const SHIPPING_COST = 4.9

function Checkout() {
    const {
        cartItems,
        subtotal,
        clearCart,
    } = useCart()

    const [orderConfirmed, setOrderConfirmed] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')

    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        city: '',
        postalCode: '',
        country: 'España',
        phone: '',
        email: '',
    })

    const shipping =
        cartItems.length > 0 ? SHIPPING_COST : 0

    const total = subtotal + shipping

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormData((currentFormData) => ({
            ...currentFormData,
            [name]: value,
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            setIsSubmitting(true)
            setError('')

            const orderItems = cartItems.map((item) => ({
                productId: item._id || item.id,
                productName: item.name,
                quantity: item.quantity,
                price: Number(item.price),
            }))

            const orderData = {
                customerName: formData.fullName,
                customerEmail: formData.email,
                phone: formData.phone,
                address: formData.address,
                city: formData.city,
                country: formData.country,
                postalCode: formData.postalCode,
                items: orderItems,
                subtotal: Number(subtotal.toFixed(2)),
                shipping: Number(shipping.toFixed(2)),
                total: Number(total.toFixed(2)),
            }

            const data = await createOrder(orderData)

            const productsText = cartItems
                .map(
                    (item) =>
                        `• ${item.name} x${item.quantity} - ${(
                            Number(item.price) * item.quantity
                        ).toFixed(2)} €`
                )
                .join('\n')

            const message = `
Hola, quiero realizar este pedido en Germen Latin Market.

N.º DE PEDIDO
${data.order._id}

DATOS DEL CLIENTE
Nombre: ${formData.fullName}
Teléfono: ${formData.phone}
Email: ${formData.email}

DIRECCIÓN DE ENTREGA
${formData.address}
${formData.postalCode} ${formData.city}
${formData.country}

PRODUCTOS
${productsText}

Subtotal: ${subtotal.toFixed(2)} €
Envío: ${shipping.toFixed(2)} €
TOTAL: ${total.toFixed(2)} €

Gracias.
      `.trim()

            const whatsappNumber = '+905011891722' // Número de WhatsApp del negocio


            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                message
            )}`

            window.open(whatsappUrl, '_blank')

            setOrderConfirmed(true)
            clearCart()
        } catch (error) {
            setError(
                error.message ||
                'No se pudo confirmar el pedido. Inténtalo nuevamente.'
            )
        } finally {
            setIsSubmitting(false)
        }
    }

    // Pedido finalizado
    if (orderConfirmed) {
        return (
            <section className="min-h-screen bg-[#FFF8F2] px-6 py-20">
                <div className="mx-auto max-w-xl rounded-3xl bg-white p-10 text-center shadow-sm">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl font-bold text-green-700">
                        ✓
                    </div>

                    <h1 className="mt-6 text-3xl font-bold text-[#4A0D24]">
                        ¡Pedido confirmado!
                    </h1>

                    <p className="mt-4 text-gray-600">
                        Gracias por comprar en Germen Latin Market.
                        Hemos recibido tu pedido correctamente.
                    </p>

                    <p className="mt-2 text-sm text-gray-500">
                        Tus productos serán preparados para el envío desde España.
                    </p>

                    <Link
                        to="/productos"
                        className="mt-8 inline-flex rounded-xl bg-[#F4D21F] px-6 py-3 font-bold text-[#4A0D24] transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                        Seguir comprando
                    </Link>
                </div>
            </section>
        )
    }

    // Carrito vacío
    if (cartItems.length === 0) {
        return (
            <section className="min-h-screen bg-[#FFF8F2] px-6 py-20">
                <div className="mx-auto max-w-xl rounded-3xl bg-white p-10 text-center shadow-sm">
                    <h1 className="text-3xl font-bold text-[#4A0D24]">
                        Tu carrito está vacío
                    </h1>

                    <p className="mt-4 text-gray-500">
                        Añade productos antes de continuar con la compra.
                    </p>

                    <Link
                        to="/productos"
                        className="mt-6 inline-flex rounded-xl bg-[#F4D21F] px-7 py-3 font-semibold text-[#4A0D24] transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                        Explorar productos
                    </Link>
                </div>
            </section>
        )
    }

    return (
        <section className="min-h-screen bg-[#FFF8F2] px-6 py-12">
            <div className="mx-auto max-w-7xl">

                {/* Cabecera */}
                <div className="mb-10">
                    <Link
                        to="/carrito"
                        className="text-sm font-semibold text-[#4A0D24] transition hover:text-[#C98245]"
                    >
                        ← Volver al carrito
                    </Link>

                    <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-[#C98245]">
                        Germen Latin Market
                    </p>

                    <h1 className="mt-2 text-4xl font-bold text-[#4A0D24] md:text-5xl">
                        Finalizar compra
                    </h1>

                    <p className="mt-3 max-w-2xl text-gray-600">
                        Completa tus datos de entrega y revisa la información de tu pedido.
                    </p>
                </div>

                <div className="grid items-start gap-8 lg:grid-cols-[1fr_380px]">

                    {/* Formulario */}
                    <form
                        id="checkout-form"
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        {/* Entrega */}
                        <section className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
                            <h2 className="mt-2 text-2xl font-bold text-[#4A0D24]">
                                Entrega
                            </h2>

                            <p className="mt-2 text-gray-600">
                                Indica dónde quieres recibir tu pedido.
                            </p>

                            <div className="mt-6 grid gap-5 md:grid-cols-2">

                                <div className="md:col-span-2">
                                    <label
                                        htmlFor="fullName"
                                        className="mb-2 block text-sm font-semibold text-[#4A0D24]"
                                    >
                                        Nombre completo
                                    </label>

                                    <input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#4A0D24]"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label
                                        htmlFor="address"
                                        className="mb-2 block text-sm font-semibold text-[#4A0D24]"
                                    >
                                        Dirección
                                    </label>

                                    <input
                                        id="address"
                                        name="address"
                                        type="text"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                        placeholder="Calle y número"
                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#4A0D24]"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="city"
                                        className="mb-2 block text-sm font-semibold text-[#4A0D24]"
                                    >
                                        Ciudad
                                    </label>

                                    <input
                                        id="city"
                                        name="city"
                                        type="text"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#4A0D24]"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="postalCode"
                                        className="mb-2 block text-sm font-semibold text-[#4A0D24]"
                                    >
                                        Código postal
                                    </label>

                                    <input
                                        id="postalCode"
                                        name="postalCode"
                                        type="text"
                                        value={formData.postalCode}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#4A0D24]"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label
                                        htmlFor="country"
                                        className="mb-2 block text-sm font-semibold text-[#4A0D24]"
                                    >
                                        País
                                    </label>

                                    <select
                                        id="country"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#4A0D24]"
                                    >
                                        <option value="España">España</option>
                                        <option value="Francia">Francia</option>
                                        <option value="Portugal">Portugal</option>
                                        <option value="Italia">Italia</option>
                                        <option value="Alemania">Alemania</option>
                                        <option value="Reino Unido">Reino Unido</option>
                                        <option value="Turkiye">Turkiye</option>
                                    </select>
                                </div>
                            </div>
                        </section>

                        {/* Contacto */}
                        <section className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
                            <h2 className="mt-2 text-2xl font-bold text-[#4A0D24]">
                                Contacto
                            </h2>

                            <div className="mt-6 grid gap-5 md:grid-cols-2">

                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="mb-2 block text-sm font-semibold text-[#4A0D24]"
                                    >
                                        Teléfono
                                    </label>

                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        minLength={9}
                                        maxLength={15}
                                        pattern="[0-9+ ]{9,15}"
                                        placeholder="+0000 000 000"
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
                                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#4A0D24]"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Método de envío */}
                        <section className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
                            <h2 className="mt-2 text-2xl font-bold text-[#4A0D24]">
                                Método de envío
                            </h2>

                            <div className="mt-6 rounded-2xl border-2 border-[#F4D21F] bg-[#FFF8F2] p-5">
                                <div className="flex items-center justify-between gap-6">

                                    <div>
                                        <p className="font-bold text-[#4A0D24]">
                                            Envío estándar
                                        </p>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Pedido preparado y enviado desde España.
                                        </p>
                                    </div>

                                    <p className="font-bold text-[#4A0D24]">
                                        {shipping.toFixed(2)} €
                                    </p>
                                </div>
                            </div>
                        </section>
                    </form>

                    {/* Resumen */}
                    <aside className="lg:sticky lg:top-24">
                        <section className="rounded-3xl bg-white p-6 shadow-sm">

                            <h2 className="mt-2 text-2xl font-bold text-[#4A0D24]">
                                Resumen
                            </h2>

                            <div className="mt-6 space-y-4">
                                {cartItems.map((item) => (
                                    <div
                                        key={item.id || item._id}
                                        className="flex items-center gap-4"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="h-16 w-16 rounded-xl bg-[#FFF8F2] object-contain p-2"
                                        />

                                        <div className="flex-1">
                                            <p className="font-semibold text-[#4A0D24]">
                                                {item.name}
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                Cantidad: {item.quantity}
                                            </p>
                                        </div>

                                        <p className="font-semibold text-[#4A0D24]">
                                            {(
                                                Number(item.price) * item.quantity
                                            ).toFixed(2)} €
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="my-6 border-t border-gray-100" />

                            <div className="space-y-4 text-sm">

                                <div className="flex justify-between">
                                    <span className="text-gray-600">
                                        Productos
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
                                        {shipping.toFixed(2)} €
                                    </span>
                                </div>
                            </div>

                            <div className="my-6 border-t border-gray-100" />

                            <div className="flex items-end justify-between">
                                <p className="font-bold text-[#4A0D24]">
                                    Total
                                </p>

                                <p className="text-3xl font-bold text-[#4A0D24]">
                                    {total.toFixed(2)} €
                                </p>
                            </div>

                            {error && (
                                <div className="mt-5 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-700">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                form="checkout-form"
                                disabled={isSubmitting}
                                className="mt-6 w-full rounded-2xl bg-[#F4D21F] px-6 py-4 font-bold text-[#4A0D24] transition duration-300 hover:-translate-y-1 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isSubmitting
                                    ? 'Registrando pedido...'
                                    : 'Confirmar pedido'}
                            </button>

                            <p className="mt-4 text-center text-xs leading-relaxed text-gray-400">
                                Al confirmar el pedido aceptas las condiciones de compra de
                                Germen Latin Market.
                            </p>
                        </section>
                    </aside>
                </div>
            </div>
        </section>
    )
}

export default Checkout