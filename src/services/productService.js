const API_URL = import.meta.env.VITE_API_URL

function getAuthToken() {
  return localStorage.getItem('germenToken')
}

export async function getProducts() {
  const response = await fetch(`${API_URL}/api/products`)

  if (!response.ok) {
    throw new Error('No se pudieron obtener los productos')
  }

  const data = await response.json()

  return data.products
}

export async function getProductById(productId) {
  const response = await fetch(
    `${API_URL}/api/products/${productId}`
  )

  if (!response.ok) {
    throw new Error('No se pudo obtener el producto')
  }

  const data = await response.json()

  return data.product
}

export async function createProduct(productData) {
  const token = getAuthToken()

  const response = await fetch(`${API_URL}/api/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message || 'No se pudo crear el producto'
    )
  }

  return data
}

export async function updateProduct(productId, productData) {
  const token = getAuthToken()

  const response = await fetch(
    `${API_URL}/api/products/${productId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message || 'No se pudo actualizar el producto'
    )
  }

  return data
}

export async function deleteProduct(productId) {
  const token = getAuthToken()

  const response = await fetch(
    `${API_URL}/api/products/${productId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message || 'No se pudo eliminar el producto'
    )
  }

  return data
}