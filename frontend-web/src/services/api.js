const API_BASE_URL = ''

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    ...options
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} - ${response.statusText}`)
  }

  const data = await response.json()

  if (Array.isArray(data)) {
    return data
  }

  if (data && Array.isArray(data.items)) {
    return data.items
  }

  return []
}

export async function getProducts() {
  return request('/products')
}

export async function getUsers() {
  return request('/users')
}

export async function getOrders() {
  return request('/orders')
}

export async function getPayments() {
  return request('/payments')
}