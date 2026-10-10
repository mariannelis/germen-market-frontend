import { Link } from 'react-router-dom'
import useCart from '@/hooks/useCart'

function ProductCard({ product }) {
  const { addToCart } = useCart()

  const productId = product.id || product._id

  const handleAddToCart = () => {
    addToCart({
      ...product,
      id: productId,
    })
  }

  return (
    <article className="flex h-full flex-col rounded-3xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      
      {/* Imagen */}
      <Link
        to={`/productos/${productId}`}
        className="flex h-56 items-center justify-center rounded-2xl bg-[#FFF8F2] p-4"
      >
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain"
        />
      </Link>

      {/* Texto */}
      <div className="mt-5 flex flex-1 flex-col">
        <p className="text-sm text-gray-500">
          {product.category}
        </p>

        <Link
          to={`/productos/${productId}`}
          className="mt-2"
        >
          <h3 className="min-h-[64px] text-2xl font-bold leading-tight text-[#4A0D24] transition hover:text-[#C98245]">
            {product.name}
          </h3>
        </Link>

        <p className="mt-3 text-3xl font-bold text-[#C98245]">
          {Number(product.price).toFixed(2)} €
        </p>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={Number(product.stock) <= 0}
          className={`mt-auto rounded-2xl px-5 py-3 font-semibold transition ${
            Number(product.stock) > 0
              ? 'bg-[#5B0626] !text-white hover:bg-[#4A0D24]'
              : 'cursor-not-allowed bg-gray-200 text-gray-400'
          }`}
        >
          {Number(product.stock) > 0
            ? 'Añadir al carrito'
            : 'Sin stock'}
        </button>
      </div>
    </article>
  )
}

export default ProductCard