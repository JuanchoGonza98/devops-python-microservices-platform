import { useEffect, useMemo, useState } from 'react'
import {
  getProducts,
  getUsers,
  getOrders,
  getPayments,
  createOrder,
  createPayment
} from './services/api'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [users, setUsers] = useState([])
  const [orders, setOrders] = useState([])
  const [payments, setPayments] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [submittingOrder, setSubmittingOrder] = useState(false)
  const [submittingPayment, setSubmittingPayment] = useState(false)

  const [orderForm, setOrderForm] = useState({
    userId: '',
    productIds: []
  })

  const [paymentForm, setPaymentForm] = useState({
    orderId: '',
    amount: '',
    currency: 'USD',
    method: 'credit_card'
  })

  const loadData = async () => {
    try {
      setLoading(true)
      setError('')

      const [productsData, usersData, ordersData, paymentsData] = await Promise.all([
        getProducts(),
        getUsers(),
        getOrders(),
        getPayments()
      ])

      setProducts(productsData)
      setUsers(usersData)
      setOrders(ordersData)
      setPayments(paymentsData)
    } catch (err) {
      console.error('Error loading data:', err)
      setError('No se pudieron cargar los datos desde el gateway.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const selectedProducts = useMemo(() => {
    return products.filter((product) => orderForm.productIds.includes(product.id))
  }, [products, orderForm.productIds])

  const selectedOrderTotal = useMemo(() => {
    return selectedProducts.reduce((acc, product) => acc + Number(product.price || 0), 0)
  }, [selectedProducts])

  const selectedOrderForPayment = useMemo(() => {
    return orders.find((order) => String(order.id) === String(paymentForm.orderId))
  }, [orders, paymentForm.orderId])

  const handleOrderUserChange = (event) => {
    setOrderForm((prev) => ({
      ...prev,
      userId: event.target.value
    }))
  }

  const handleProductToggle = (productId) => {
    setOrderForm((prev) => {
      const exists = prev.productIds.includes(productId)

      return {
        ...prev,
        productIds: exists
          ? prev.productIds.filter((id) => id !== productId)
          : [...prev.productIds, productId]
      }
    })
  }

  const handlePaymentChange = (event) => {
    const { name, value } = event.target

    setPaymentForm((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePaymentOrderChange = (event) => {
    const orderId = event.target.value
    const selectedOrder = orders.find((order) => String(order.id) === String(orderId))

    setPaymentForm((prev) => ({
      ...prev,
      orderId,
      amount: selectedOrder ? String(selectedOrder.total_amount ?? '') : prev.amount
    }))
  }

  const handleCreateOrder = async (event) => {
    event.preventDefault()
    setError('')
    setSuccessMessage('')

    if (!orderForm.userId) {
      setError('Debes seleccionar un usuario para crear la orden.')
      return
    }

    if (orderForm.productIds.length === 0) {
      setError('Debes seleccionar al menos un producto.')
      return
    }

    const payload = {
      user_id: Number(orderForm.userId),
      product_ids: orderForm.productIds,
      total_amount: Number(selectedOrderTotal.toFixed(2)),
      currency: 'USD',
      status: 'created'
    }

    try {
      setSubmittingOrder(true)
      const createdOrder = await createOrder(payload)

      await loadData()

      setOrderForm({
        userId: '',
        productIds: []
      })

      setSuccessMessage('Orden creada correctamente.')

      if (createdOrder && createdOrder.id) {
        setPaymentForm((prev) => ({
          ...prev,
          orderId: String(createdOrder.id),
          amount: String(createdOrder.total_amount ?? payload.total_amount),
          currency: createdOrder.currency ?? 'USD'
        }))
      }
    } catch (err) {
      console.error('Error creating order:', err)
      setError('No se pudo crear la orden. Revisa el contrato del servicio de órdenes.')
    } finally {
      setSubmittingOrder(false)
    }
  }

  const handleCreatePayment = async (event) => {
    event.preventDefault()
    setError('')
    setSuccessMessage('')

    if (!paymentForm.orderId) {
      setError('Debes seleccionar una orden para registrar el pago.')
      return
    }

    if (!paymentForm.amount) {
      setError('Debes indicar el monto del pago.')
      return
    }

    const payload = {
      order_id: Number(paymentForm.orderId),
      amount: Number(paymentForm.amount),
      currency: paymentForm.currency,
      method: paymentForm.method,
      status: 'approved'
    }

    try {
      setSubmittingPayment(true)
      await createPayment(payload)
      await loadData()

      setPaymentForm({
        orderId: '',
        amount: '',
        currency: 'USD',
        method: 'credit_card'
      })

      setSuccessMessage('Pago registrado correctamente.')
    } catch (err) {
      console.error('Error creating payment:', err)
      setError('No se pudo registrar el pago. Revisa el contrato del servicio de pagos.')
    } finally {
      setSubmittingPayment(false)
    }
  }

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand-block">
          <div className="brand-mark">DP</div>
          <div>
            <p className="brand-kicker">Microservices Demo</p>
            <h1 className="brand-title">DevOps Python Microservices Platform</h1>
          </div>
        </div>

        <nav className="topnav">
          <a href="#dashboard">Dashboard</a>
          <a href="#catalog">Catalog</a>
          <a href="#operations">Operations</a>
        </nav>
      </header>

      <main className="dashboard" id="dashboard">
        <section className="hero-card">
          <div>
            <p className="eyebrow">Frontend Application</p>
            <h2>Unified dashboard through the gateway</h2>
            <p className="hero-text">
              Esta interfaz consume el gateway Nginx y centraliza operaciones sobre
              products, users, orders y payments.
            </p>
          </div>

          <div className="stats-grid">
            <article className="stat-card">
              <span className="stat-label">Products</span>
              <strong className="stat-value">{products.length}</strong>
            </article>

            <article className="stat-card">
              <span className="stat-label">Users</span>
              <strong className="stat-value">{users.length}</strong>
            </article>

            <article className="stat-card">
              <span className="stat-label">Orders</span>
              <strong className="stat-value">{orders.length}</strong>
            </article>

            <article className="stat-card">
              <span className="stat-label">Payments</span>
              <strong className="stat-value">{payments.length}</strong>
            </article>
          </div>
        </section>

        {loading && <p className="info-message">Cargando datos...</p>}
        {error && <p className="error-banner">{error}</p>}
        {successMessage && <p className="success-banner">{successMessage}</p>}

        {!loading && !error && (
          <>
            <section className="content-grid" id="catalog">
              <section className="panel">
                <div className="panel-header">
                  <h3>Products</h3>
                  <span className="badge">{products.length}</span>
                </div>

                {products.length === 0 ? (
                  <p className="empty">No hay productos.</p>
                ) : (
                  <ul className="resource-list">
                    {products.map((product) => (
                      <li key={product.id} className="resource-item">
                        <div className="resource-topline">
                          <strong>{product.name}</strong>
                          <span className="price-pill">
                            {product.price} {product.currency}
                          </span>
                        </div>
                        <div className="meta-row">Product ID: {product.id}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              <section className="panel">
                <div className="panel-header">
                  <h3>Users</h3>
                  <span className="badge">{users.length}</span>
                </div>

                {users.length === 0 ? (
                  <p className="empty">No hay usuarios.</p>
                ) : (
                  <ul className="resource-list">
                    {users.map((user) => (
                      <li key={user.id} className="resource-item">
                        <div className="resource-topline">
                          <strong>{user.name}</strong>
                        </div>
                        <div className="meta-row">User ID: {user.id}</div>
                        <div className="meta-row">{user.email}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </section>

            <section className="content-grid" id="operations">
              <section className="panel">
                <div className="panel-header">
                  <h3>Create Order</h3>
                </div>

                <form className="form-stack" onSubmit={handleCreateOrder}>
                  <div className="form-group">
                    <label htmlFor="userId">User</label>
                    <select
                      id="userId"
                      value={orderForm.userId}
                      onChange={handleOrderUserChange}
                    >
                      <option value="">Selecciona un usuario</option>
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name} ({user.email})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Products</label>
                    <div className="checkbox-grid">
                      {products.map((product) => (
                        <label key={product.id} className="checkbox-card">
                          <input
                            type="checkbox"
                            checked={orderForm.productIds.includes(product.id)}
                            onChange={() => handleProductToggle(product.id)}
                          />
                          <div>
                            <strong>{product.name}</strong>
                            <div className="meta-row">
                              {product.price} {product.currency}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="summary-box">
                    <div className="summary-line">
                      <span>Selected products</span>
                      <strong>{orderForm.productIds.length}</strong>
                    </div>
                    <div className="summary-line">
                      <span>Estimated total</span>
                      <strong>{selectedOrderTotal.toFixed(2)} USD</strong>
                    </div>
                  </div>

                  <button type="submit" className="primary-btn" disabled={submittingOrder}>
                    {submittingOrder ? 'Creating order...' : 'Create order'}
                  </button>
                </form>
              </section>

              <section className="panel">
                <div className="panel-header">
                  <h3>Create Payment</h3>
                </div>

                <form className="form-stack" onSubmit={handleCreatePayment}>
                  <div className="form-group">
                    <label htmlFor="orderId">Order</label>
                    <select
                      id="orderId"
                      name="orderId"
                      value={paymentForm.orderId}
                      onChange={handlePaymentOrderChange}
                    >
                      <option value="">Selecciona una orden</option>
                      {orders.map((order) => (
                        <option key={order.id} value={order.id}>
                          Order #{order.id} - {order.total_amount} {order.currency}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input
                      id="amount"
                      name="amount"
                      type="number"
                      step="0.01"
                      min="0"
                      value={paymentForm.amount}
                      onChange={handlePaymentChange}
                      placeholder="Ej.: 120.00"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="currency">Currency</label>
                      <input
                        id="currency"
                        name="currency"
                        type="text"
                        value={paymentForm.currency}
                        onChange={handlePaymentChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="method">Method</label>
                      <select
                        id="method"
                        name="method"
                        value={paymentForm.method}
                        onChange={handlePaymentChange}
                      >
                        <option value="credit_card">credit_card</option>
                        <option value="debit_card">debit_card</option>
                        <option value="bank_transfer">bank_transfer</option>
                        <option value="cash">cash</option>
                      </select>
                    </div>
                  </div>

                  <div className="summary-box">
                    <div className="summary-line">
                      <span>Selected order</span>
                      <strong>{selectedOrderForPayment ? `#${selectedOrderForPayment.id}` : '-'}</strong>
                    </div>
                    <div className="summary-line">
                      <span>Order status</span>
                      <strong>{selectedOrderForPayment?.status ?? '-'}</strong>
                    </div>
                  </div>

                  <button type="submit" className="primary-btn" disabled={submittingPayment}>
                    {submittingPayment ? 'Registering payment...' : 'Register payment'}
                  </button>
                </form>
              </section>
            </section>

            <section className="content-grid">
              <section className="panel">
                <div className="panel-header">
                  <h3>Orders</h3>
                  <span className="badge">{orders.length}</span>
                </div>

                {orders.length === 0 ? (
                  <p className="empty">No hay órdenes.</p>
                ) : (
                  <ul className="resource-list">
                    {orders.map((order) => (
                      <li key={order.id} className="resource-item">
                        <div className="resource-topline">
                          <strong>Order #{order.id}</strong>
                          <span className="status-pill">{order.status}</span>
                        </div>
                        <div className="meta-row">
                          Total: {order.total_amount} {order.currency}
                        </div>
                        <div className="meta-row">User ID: {order.user_id}</div>
                        <div className="meta-row">
                          Product IDs:{' '}
                          {Array.isArray(order.product_ids)
                            ? order.product_ids.join(', ')
                            : '-'}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              <section className="panel">
                <div className="panel-header">
                  <h3>Payments</h3>
                  <span className="badge">{payments.length}</span>
                </div>

                {payments.length === 0 ? (
                  <p className="empty">No hay pagos.</p>
                ) : (
                  <ul className="resource-list">
                    {payments.map((payment) => (
                      <li key={payment.id} className="resource-item">
                        <div className="resource-topline">
                          <strong>Payment #{payment.id}</strong>
                          <span className="status-pill">{payment.status}</span>
                        </div>
                        <div className="meta-row">
                          Amount: {payment.amount} {payment.currency}
                        </div>
                        <div className="meta-row">Method: {payment.method}</div>
                        <div className="meta-row">Order ID: {payment.order_id}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </section>
          </>
        )}
      </main>
    </div>
  )
}

export default App