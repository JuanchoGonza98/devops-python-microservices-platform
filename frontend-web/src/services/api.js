const API_BASE_URL = ''

async function request(path, options = {}) {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
    ...options
  }

  const response = await fetch(`${API_BASE_URL}${path}`, config)

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} - ${response.statusText}`)
  }

  if (response.status === 204) {
    return null
  }

  const text = await response.text()
  return text ? JSON.parse(text) : null
}

async function getList(path) {
  const data = await request(path)

  if (Array.isArray(data)) {
    return data
  }

  if (data && Array.isArray(data.items)) {
    return data.items
  }

  return []
}

export async function getProducts() {
  return getList('/products')
}

export async function getUsers() {
  return getList('/users')
}

export async function getOrders() {
  return getList('/orders')
}

export async function getPayments() {
  return getList('/payments')
}

export async function createOrder(payload) {
  return request('/orders', {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}

export async function createPayment(payload) {
  return request('/payments', {
    method: 'POST',
    body: JSON.stringify(payload)
  })
}