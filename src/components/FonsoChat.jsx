import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProducts } from '@/services/productService'


function FonsoChat() {
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [products, setProducts] = useState([])

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'fonso',
      text: '¡Hola! Soy Fonso 👋 ¿En qué puedo ayudarte hoy?',
    },
  ])

  // Carga los productos reales de la tienda.
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts()
        setProducts(data)
      } catch {
        setProducts([])
      }
    }

    loadProducts()
  }, [])
  
useEffect(() => {
  const openFonso = () => {
    setIsOpen(true)
  }

  window.addEventListener('open-fonso', openFonso)

  return () => {
    window.removeEventListener('open-fonso', openFonso)
  }
}, [])
  const findProduct = (message) => {
    const normalizedMessage = message.toLowerCase()

    return products.find((product) => {
      const productName = product.name.toLowerCase()

      const words = productName
        .split(' ')
        .filter((word) => word.length > 3)

      return words.some((word) =>
        normalizedMessage.includes(word)
      )
    })
  }

  const getResponse = (message) => {
    const normalizedMessage = message.toLowerCase()

    // Busca primero coincidencias con productos reales.
    const foundProduct = findProduct(message)

    if (foundProduct) {
      return `Encontré ${foundProduct.name} por ${Number(
        foundProduct.price
      ).toFixed(2)} €. Puedes verlo en nuestro catálogo.`
    }

    if (
      normalizedMessage.includes('producto') ||
      normalizedMessage.includes('comprar') ||
      normalizedMessage.includes('buscar') ||
      normalizedMessage.includes('necesito')
    ) {
      return 'Puedo ayudarte a encontrar un producto. Puedes revisar nuestro catálogo desde la sección Productos.'
    }

    if (
      normalizedMessage.includes('envío') ||
      normalizedMessage.includes('envio') ||
      normalizedMessage.includes('enviar')
    ) {
      return 'Los productos de Germen Latin Market se envían desde España.'
    }

    if (
      normalizedMessage.includes('categoría') ||
      normalizedMessage.includes('categoria')
    ) {
      return 'Tenemos Despensa, Dulces y snacks, Salsas y condimentos, y Carnes y embutidos.'
    }

    if (
      normalizedMessage.includes('carrito') ||
      normalizedMessage.includes('pedido')
    ) {
      return 'Puedes añadir productos al carrito, modificar las cantidades y revisar tu compra antes de continuar al checkout.'
    }

    if (
      normalizedMessage.includes('precio') ||
      normalizedMessage.includes('cuesta')
    ) {
      return 'Dime el nombre del producto y trataré de encontrar su precio.'
    }

    if (
      normalizedMessage.includes('hola') ||
      normalizedMessage.includes('buenas')
    ) {
      return '¡Hola! 😊 Estoy aquí para ayudarte a encontrar productos, consultar categorías, envíos o tu carrito.'
    }

    if (
      normalizedMessage.includes('gracias')
    ) {
      return '¡Con gusto! 😊 Si necesitas algo más, aquí estoy.'
    }

    return 'No he encontrado exactamente lo que buscas. Puedo ayudarte con productos, categorías, precios, envíos y carrito.'
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const trimmedInput = input.trim()

    if (!trimmedInput) {
      return
    }

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: trimmedInput,
    }

    const fonsoMessage = {
      id: Date.now() + 1,
      sender: 'fonso',
      text: getResponse(trimmedInput),
    }

    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
      fonsoMessage,
    ])

    setInput('')
  }

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[470px] w-[350px] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
          {/* Cabecera */}
          <div className="flex items-center justify-between bg-[#4A0D24] px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <img
                src="/images/brand/fonso.png"
                alt="Fonso"
                className="h-12 w-12 rounded-full bg-white object-contain p-1"
              />

              <div>
                <p className="font-bold">
                  Fonso
                </p>

                <p className="text-xs text-white/70">
                  Asistente virtual
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-xl"
              aria-label="Cerrar chat"
            >
              ×
            </button>
          </div>

          {/* Mensajes */}
          <div className="flex-1 space-y-3 overflow-y-auto bg-[#FFF8F2] p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user'
                    ? 'justify-end'
                    : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                    message.sender === 'user'
                      ? 'bg-[#4A0D24] text-white'
                      : 'bg-white text-[#2B1B16] shadow-sm'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Acciones rápidas */}
          <div className="flex gap-2 overflow-x-auto border-t border-gray-100 bg-white px-4 py-3">
            <button
              type="button"
              onClick={() => navigate('/productos')}
              className="whitespace-nowrap rounded-full bg-[#FFF8F2] px-3 py-2 text-xs font-semibold text-[#4A0D24] transition hover:bg-[#4A0D24] hover:text-white"
            >
              Ver productos
            </button>

            <button
              type="button"
              onClick={() => navigate('/carrito')}
              className="whitespace-nowrap rounded-full bg-[#FFF8F2] px-3 py-2 text-xs font-semibold text-[#4A0D24] transition hover:bg-[#4A0D24] hover:text-white"
            >
              Ir al carrito
            </button>
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex gap-2 border-t border-gray-100 bg-white p-4"
          >
            <input
              type="text"
              value={input}
              onChange={(event) =>
                setInput(event.target.value)
              }
              placeholder="Escribe tu pregunta..."
              className="min-w-0 flex-1 rounded-xl border border-[#4A0D24]/30 px-4 py-3 text-sm outline-none transition focus:border-[#4A0D24]"
            />

            <button
              type="submit"
              className="rounded-xl bg-[#F4D21F] px-4 font-bold text-[#4A0D24] transition hover:brightness-95"
            >
              Enviar
            </button>
          </form>
        </div>
      )}

      {/* Botón flotante */}
      <button
        type="button"
        onClick={() =>
          setIsOpen((currentState) => !currentState)
        }
        className="fixed bottom-6 right-6 z-50 h-16 w-16 overflow-hidden rounded-full border-4 border-white bg-[#4A0D24] shadow-xl transition hover:scale-105"
        aria-label="Abrir chatbot Fonso"
      >
        <img
          src="/images/brand/fonso.png"
          alt="Chatbot Fonso"
          className="h-full w-full object-contain p-1"
        />
      </button>
    </>
  )
}

export default FonsoChat