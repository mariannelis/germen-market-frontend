const API_URL = import.meta.env.VITE_API_URL

function getAuthToken() {
  return localStorage.getItem('germenToken')
}

function getHeaders() {
  const token = getAuthToken()

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
}

export async function createOrder(orderData) {
  const response = await fetch(`${API_URL}/api/orders`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(orderData),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message || 'No se pudo registrar el pedido.'
    )
  }

  return data
}

export async function getOrders() {
  const response = await fetch(`${API_URL}/api/orders`, {
    headers: getHeaders(),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message || 'No se pudieron obtener los pedidos.'
    )
  }

  return data.orders
}

export async function updateOrderStatus(
  orderId,
  status,
  isPaid
) {
  const response = await fetch(
    `${API_URL}/api/orders/${orderId}/status`,
    {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({
        status,
        isPaid,
      }),
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message || 'No se pudo actualizar el pedido.'
    )
  }

  return data.order
}