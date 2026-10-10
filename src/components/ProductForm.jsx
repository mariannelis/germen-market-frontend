import { useState } from 'react'

const CATEGORY_OPTIONS = [
  'Despensa',
  'Dulces y snacks',
  'Salsas y condimentos',
  'Carnes y embutidos',
]

function ProductForm({
  initialValues = {},
  onSubmit,
  submitText = 'Guardar producto',
  disabled = false,
}) {
  const [formData, setFormData] = useState({
    name: initialValues.name || '',
    category: initialValues.category || '',
    price: initialValues.price || '',
    stock: initialValues.stock || '',
    image: initialValues.image || '',
    description: initialValues.description || '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    onSubmit({
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl bg-white p-6 shadow-sm md:p-8"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-semibold text-[#4A0D24]"
          >
            Nombre del producto
          </label>

          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={disabled}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#4A0D24] disabled:cursor-not-allowed disabled:bg-gray-100"
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
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            disabled={disabled}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#4A0D24] disabled:cursor-not-allowed disabled:bg-gray-100"
          >
            <option value="">
              Selecciona una categoría
            </option>

            {CATEGORY_OPTIONS.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="price"
            className="mb-2 block text-sm font-semibold text-[#4A0D24]"
          >
            Precio
          </label>

          <input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            required
            disabled={disabled}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#4A0D24] disabled:cursor-not-allowed disabled:bg-gray-100"
          />
        </div>

        <div>
          <label
            htmlFor="stock"
            className="mb-2 block text-sm font-semibold text-[#4A0D24]"
          >
            Stock
          </label>

          <input
            id="stock"
            name="stock"
            type="number"
            min="0"
            value={formData.stock}
            onChange={handleChange}
            required
            disabled={disabled}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#4A0D24] disabled:cursor-not-allowed disabled:bg-gray-100"
          />
        </div>
      </div>

      <div className="mt-6">
        <label
          htmlFor="image"
          className="mb-2 block text-sm font-semibold text-[#4A0D24]"
        >
          Ruta de la imagen
        </label>

        <input
          id="image"
          name="image"
          type="text"
          value={formData.image}
          onChange={handleChange}
          disabled={disabled}
          placeholder="/images/products/producto.webp"
          className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#4A0D24] disabled:cursor-not-allowed disabled:bg-gray-100"
        />
      </div>

      <div className="mt-6">
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-semibold text-[#4A0D24]"
        >
          Descripción
        </label>

        <textarea
          id="description"
          name="description"
          rows="5"
          value={formData.description}
          onChange={handleChange}
          required
          disabled={disabled}
          className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#4A0D24] disabled:cursor-not-allowed disabled:bg-gray-100"
        />
      </div>

      <button
        type="submit"
        disabled={disabled}
        className="mt-8 rounded-2xl bg-[#F4D21F] px-7 py-3 font-semibold text-[#4A0D24] transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitText}
      </button>
    </form>
  )
}

export default ProductForm