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

const styles = {
  page: {
    minHeight: '100vh',
    background:
      'linear-gradient(180deg, #f8fafc 0%, #eef2ff 35%, #f8fafc 100%)',
    color: '#0f172a',
    padding: '32px 20px 48px'
  },
  container: {
    maxWidth: '1400px',
    margin: '0 auto'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap',
    marginBottom: '24px'
  },
  brandWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  brandMark: {
    width: '56px',
    height: '56px',
    borderRadius: '18px',
    display: 'grid',
    placeItems: 'center',
    fontWeight: 800,
    fontSize: '1rem',
    color: '#ffffff',
    background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
    boxShadow: '0 12px 30px rgba(37, 99, 235, 0.28)'
  },
  brandKicker: {
    margin: 0,
    fontSize: '0.82rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#64748b',
    fontWeight: 700
  },
  brandTitle: {
    margin: '4px 0 0',
    fontSize: '1.9rem',
    lineHeight: 1.15
  },
  nav: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap'
  },
  navLink: {
    textDecoration: 'none',
    color: '#0f172a',
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    padding: '10px 14px',
    borderRadius: '999px',
    fontWeight: 600,
    boxShadow: '0 4px 14px rgba(15, 23, 42, 0.04)'
  },
  hero: {
    display: 'grid',
    gridTemplateColumns: '1.4fr 1fr',
    gap: '20px',
    marginBottom: '24px'
  },
  heroCard: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '24px',
    padding: '28px',
    boxShadow: '0 16px 40px rgba(15, 23, 42, 0.07)'
  },
  eyebrow: {
    margin: 0,
    fontSize: '0.78rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#6366f1',
    fontWeight: 800
  },
  heroTitle: {
    margin: '10px 0 12px',
    fontSize: '2rem',
    lineHeight: 1.15
  },
  heroText: {
    margin: 0,
    color: '#475569',
    fontSize: '1rem',
    lineHeight: 1.7
  },
  helperRow: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    marginTop: '18px'
  },
  helperBadge: {
    background: '#eff6ff',
    color: '#1d4ed8',
    border: '1px solid #bfdbfe',
    borderRadius: '999px',
    padding: '8px 12px',
    fontSize: '0.88rem',
    fontWeight: 700
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '14px'
  },
  statCard: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '20px',
    padding: '20px',
    boxShadow: '0 12px 30px rgba(15, 23, 42, 0.06)'
  },
  statLabel: {
    display: 'block',
    fontSize: '0.85rem',
    color: '#64748b',
    marginBottom: '8px',
    fontWeight: 700
  },
  statValue: {
    display: 'block',
    fontSize: '2rem',
    fontWeight: 800
  },
  alert: {
    marginBottom: '18px',
    borderRadius: '16px',
    padding: '14px 16px',
    fontWeight: 600
  },
  info: {
    background: '#eff6ff',
    color: '#1d4ed8',
    border: '1px solid #bfdbfe'
  },
  error: {
    background: '#fef2f2',
    color: '#b91c1c',
    border: '1px solid #fecaca'
  },
  success: {
    background: '#ecfdf5',
    color: '#047857',
    border: '1px solid #a7f3d0'
  },
  section: {
    marginBottom: '28px'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '14px',
    flexWrap: 'wrap'
  },
  sectionTitle: {
    margin: 0,
    fontSize: '1.35rem'
  },
  sectionSubtitle: {
    margin: '6px 0 0',
    color: '#64748b'
  },
  badge: {
    background: '#eef2ff',
    color: '#4338ca',
    borderRadius: '999px',
    padding: '8px 12px',
    fontSize: '0.85rem',
    fontWeight: 800
  },
  grid2: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '20px'
  },
  gridCards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '16px'
  },
  panel: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '24px',
    padding: '22px',
    boxShadow: '0 14px 34px rgba(15, 23, 42, 0.06)'
  },
  panelTitleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '18px'
  },
  panelTitle: {
    margin: 0,
    fontSize: '1.1rem'
  },
  panelCount: {
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    color: '#334155',
    borderRadius: '999px',
    padding: '6px 10px',
    fontSize: '0.82rem',
    fontWeight: 800
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '14px'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '0.92rem',
    fontWeight: 700,
    color: '#334155'
  },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '12px 14px',
    borderRadius: '14px',
    border: '1px solid #cbd5e1',
    background: '#ffffff',
    fontSize: '0.95rem',
    outline: 'none'
  },
  select: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '12px 14px',
    borderRadius: '14px',
    border: '1px solid #cbd5e1',
    background: '#ffffff',
    fontSize: '0.95rem',
    outline: 'none'
  },
  checkboxGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '12px'
  },
  checkboxCard: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '14px',
    borderRadius: '16px',
    border: '1px solid #e2e8f0',
    background: '#f8fafc'
  },
  summary: {
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '18px',
    padding: '16px',
    display: 'grid',
    gap: '10px'
  },
  summaryLine: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '12px',
    alignItems: 'center'
  },
  primaryBtn: {
    border: 0,
    borderRadius: '14px',
    padding: '13px 16px',
    fontSize: '0.95rem',
    fontWeight: 800,
    color: '#ffffff',
    cursor: 'pointer',
    background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
    boxShadow: '0 12px 28px rgba(59, 130, 246, 0.28)'
  },
  list: {
    display: 'grid',
    gap: '14px',
    padding: 0,
    margin: 0,
    listStyle: 'none'
  },
  item: {
    border: '1px solid #e2e8f0',
    borderRadius: '18px',
    padding: '16px',
    background: '#ffffff'
  },
  itemTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '12px',
    flexWrap: 'wrap',
    marginBottom: '10px'
  },
  itemTitle: {
    fontWeight: 800,
    fontSize: '1rem'
  },
  itemMeta: {
    color: '#475569',
    fontSize: '0.92rem',
    lineHeight: 1.6
  },
  pricePill: {
    background: '#ecfeff',
    color: '#0f766e',
    border: '1px solid #99f6e4',
    borderRadius: '999px',
    padding: '6px 10px',
    fontWeight: 800,
    fontSize: '0.82rem'
  },
  statusPill: {
    background: '#eef2ff',
    color: '#4338ca',
    border: '1px solid #c7d2fe',
    borderRadius: '999px',
    padding: '6px 10px',
    fontWeight: 800,
    fontSize: '0.82rem'
  },
  empty: {
    margin: 0,
    color: '#64748b'
  }
}

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
      setError('Could not load data from the gateway.')
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

  const selectedUser = useMemo(() => {
    return users.find((user) => String(user.id) === String(orderForm.userId))
  }, [users, orderForm.userId])

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
      setError('You must select a user before creating an order.')
      return
    }

    if (orderForm.productIds.length === 0) {
      setError('You must select at least one product.')
      return
    }

    try {
      setSubmittingOrder(true)

      await createOrder({
        user_id: Number(orderForm.userId),
        product_ids: orderForm.productIds
      })

      setSuccessMessage('Order created successfully.')
      setOrderForm({
        userId: '',
        productIds: []
      })

      await loadData()
    } catch (err) {
      console.error('Error creating order:', err)
      setError('Could not create the order. Check the orders service contract.')
    } finally {
      setSubmittingOrder(false)
    }
  }

  const handleCreatePayment = async (event) => {
    event.preventDefault()
    setError('')
    setSuccessMessage('')

    if (!paymentForm.orderId) {
      setError('You must select an order before registering a payment.')
      return
    }

    if (!paymentForm.amount || Number(paymentForm.amount) <= 0) {
      setError('The payment amount must be greater than zero.')
      return
    }

    try {
      setSubmittingPayment(true)

      await createPayment({
        order_id: Number(paymentForm.orderId),
        amount: Number(paymentForm.amount),
        currency: paymentForm.currency,
        method: paymentForm.method
      })

      setSuccessMessage('Payment registered successfully.')
      setPaymentForm({
        orderId: '',
        amount: '',
        currency: 'USD',
        method: 'credit_card'
      })

      await loadData()
    } catch (err) {
      console.error('Error creating payment:', err)
      setError('Could not register the payment. Check the payments service contract.')
    } finally {
      setSubmittingPayment(false)
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.brandWrap}>
            <div style={styles.brandMark}>DP</div>
            <div>
              <p style={styles.brandKicker}>End-to-End DevOps Demo</p>
              <h1 style={styles.brandTitle}>DevOps Python Microservices Platform</h1>
            </div>
          </div>

          <nav style={styles.nav}>
            <a href="#overview" style={styles.navLink}>Overview</a>
            <a href="#catalog" style={styles.navLink}>Catalog</a>
            <a href="#operations" style={styles.navLink}>Operations</a>
            <a href="#activity" style={styles.navLink}>Activity</a>
          </nav>
        </header>

        <section id="overview" style={styles.hero}>
          <div style={styles.heroCard}>
            <p style={styles.eyebrow}>Frontend Application</p>
            <h2 style={styles.heroTitle}>Friendly dashboard powered by the Nginx gateway</h2>
            <p style={styles.heroText}>
              This interface centralizes the consumption of products, users, orders and payments
              through a single gateway entry point. It is designed to be clearer, more breathable
              and easier to demo during your DevOps portfolio presentation.
            </p>

            <div style={styles.helperRow}>
              <span style={styles.helperBadge}>React + Vite</span>
              <span style={styles.helperBadge}>Nginx Gateway</span>
              <span style={styles.helperBadge}>FastAPI Microservices</span>
            </div>
          </div>

          <div style={styles.statsGrid}>
            <article style={styles.statCard}>
              <span style={styles.statLabel}>Products</span>
              <strong style={styles.statValue}>{products.length}</strong>
            </article>

            <article style={styles.statCard}>
              <span style={styles.statLabel}>Users</span>
              <strong style={styles.statValue}>{users.length}</strong>
            </article>

            <article style={styles.statCard}>
              <span style={styles.statLabel}>Orders</span>
              <strong style={styles.statValue}>{orders.length}</strong>
            </article>

            <article style={styles.statCard}>
              <span style={styles.statLabel}>Payments</span>
              <strong style={styles.statValue}>{payments.length}</strong>
            </article>
          </div>
        </section>

        {loading && (
          <div style={{ ...styles.alert, ...styles.info }}>
            Loading platform data...
          </div>
        )}

        {error && (
          <div style={{ ...styles.alert, ...styles.error }}>
            {error}
          </div>
        )}

        {successMessage && (
          <div style={{ ...styles.alert, ...styles.success }}>
            {successMessage}
          </div>
        )}

        {!loading && (
          <>
            <section id="catalog" style={styles.section}>
              <div style={styles.sectionHeader}>
                <div>
                  <h2 style={styles.sectionTitle}>Catalog</h2>
                  <p style={styles.sectionSubtitle}>
                    Browse available products and registered users.
                  </p>
                </div>
                <span style={styles.badge}>Read operations</span>
              </div>

              <div style={styles.grid2}>
                <section style={styles.panel}>
                  <div style={styles.panelTitleRow}>
                    <h3 style={styles.panelTitle}>Products</h3>
                    <span style={styles.panelCount}>{products.length}</span>
                  </div>

                  {products.length === 0 ? (
                    <p style={styles.empty}>No products available.</p>
                  ) : (
                    <ul style={styles.list}>
                      {products.map((product) => (
                        <li key={product.id} style={styles.item}>
                          <div style={styles.itemTop}>
                            <div style={styles.itemTitle}>{product.name}</div>
                            <span style={styles.pricePill}>
                              {product.price} {product.currency}
                            </span>
                          </div>
                          <div style={styles.itemMeta}>Product ID: {product.id}</div>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>

                <section style={styles.panel}>
                  <div style={styles.panelTitleRow}>
                    <h3 style={styles.panelTitle}>Users</h3>
                    <span style={styles.panelCount}>{users.length}</span>
                  </div>

                  {users.length === 0 ? (
                    <p style={styles.empty}>No users available.</p>
                  ) : (
                    <ul style={styles.list}>
                      {users.map((user) => (
                        <li key={user.id} style={styles.item}>
                          <div style={styles.itemTop}>
                            <div style={styles.itemTitle}>{user.name}</div>
                          </div>
                          <div style={styles.itemMeta}>User ID: {user.id}</div>
                          <div style={styles.itemMeta}>{user.email}</div>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              </div>
            </section>

            <section id="operations" style={styles.section}>
              <div style={styles.sectionHeader}>
                <div>
                  <h2 style={styles.sectionTitle}>Operations</h2>
                  <p style={styles.sectionSubtitle}>
                    Create orders and register payments from the same dashboard.
                  </p>
                </div>
                <span style={styles.badge}>Write operations</span>
              </div>

              <div style={styles.grid2}>
                <section style={styles.panel}>
                  <div style={styles.panelTitleRow}>
                    <h3 style={styles.panelTitle}>Create Order</h3>
                  </div>

                  <form style={styles.form} onSubmit={handleCreateOrder}>
                    <div>
                      <label htmlFor="userId" style={styles.label}>User</label>
                      <select
                        id="userId"
                        value={orderForm.userId}
                        onChange={handleOrderUserChange}
                        style={styles.select}
                      >
                        <option value="">Select a user</option>
                        {users.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.name} ({user.email})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={styles.label}>Products</label>
                      <div style={styles.checkboxGrid}>
                        {products.map((product) => (
                          <label key={product.id} style={styles.checkboxCard}>
                            <input
                              type="checkbox"
                              checked={orderForm.productIds.includes(product.id)}
                              onChange={() => handleProductToggle(product.id)}
                            />
                            <div>
                              <strong>{product.name}</strong>
                              <div style={styles.itemMeta}>
                                {product.price} {product.currency}
                              </div>
                              <div style={styles.itemMeta}>ID: {product.id}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div style={styles.summary}>
                      <div style={styles.summaryLine}>
                        <span>Selected user</span>
                        <strong>{selectedUser ? selectedUser.name : '-'}</strong>
                      </div>
                      <div style={styles.summaryLine}>
                        <span>Selected products</span>
                        <strong>{selectedProducts.length}</strong>
                      </div>
                      <div style={styles.summaryLine}>
                        <span>Estimated total</span>
                        <strong>{selectedOrderTotal.toFixed(2)} USD</strong>
                      </div>
                    </div>

                    <button
                      type="submit"
                      style={{
                        ...styles.primaryBtn,
                        opacity: submittingOrder ? 0.7 : 1
                      }}
                      disabled={submittingOrder}
                    >
                      {submittingOrder ? 'Creating order...' : 'Create order'}
                    </button>
                  </form>
                </section>

                <section style={styles.panel}>
                  <div style={styles.panelTitleRow}>
                    <h3 style={styles.panelTitle}>Create Payment</h3>
                  </div>

                  <form style={styles.form} onSubmit={handleCreatePayment}>
                    <div>
                      <label htmlFor="orderId" style={styles.label}>Order</label>
                      <select
                        id="orderId"
                        name="orderId"
                        value={paymentForm.orderId}
                        onChange={handlePaymentOrderChange}
                        style={styles.select}
                      >
                        <option value="">Select an order</option>
                        {orders.map((order) => (
                          <option key={order.id} value={order.id}>
                            Order #{order.id} - {order.total_amount} {order.currency}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="amount" style={styles.label}>Amount</label>
                      <input
                        id="amount"
                        name="amount"
                        type="number"
                        step="0.01"
                        min="0"
                        value={paymentForm.amount}
                        onChange={handlePaymentChange}
                        placeholder="Ex.: 120.00"
                        style={styles.input}
                      />
                    </div>

                    <div style={styles.formRow}>
                      <div>
                        <label htmlFor="currency" style={styles.label}>Currency</label>
                        <input
                          id="currency"
                          name="currency"
                          type="text"
                          value={paymentForm.currency}
                          onChange={handlePaymentChange}
                          style={styles.input}
                        />
                      </div>

                      <div>
                        <label htmlFor="method" style={styles.label}>Method</label>
                        <select
                          id="method"
                          name="method"
                          value={paymentForm.method}
                          onChange={handlePaymentChange}
                          style={styles.select}
                        >
                          <option value="credit_card">credit_card</option>
                          <option value="debit_card">debit_card</option>
                          <option value="bank_transfer">bank_transfer</option>
                          <option value="cash">cash</option>
                        </select>
                      </div>
                    </div>

                    <div style={styles.summary}>
                      <div style={styles.summaryLine}>
                        <span>Selected order</span>
                        <strong>
                          {selectedOrderForPayment ? `#${selectedOrderForPayment.id}` : '-'}
                        </strong>
                      </div>
                      <div style={styles.summaryLine}>
                        <span>Order status</span>
                        <strong>{selectedOrderForPayment?.status ?? '-'}</strong>
                      </div>
                      <div style={styles.summaryLine}>
                        <span>Order total</span>
                        <strong>
                          {selectedOrderForPayment
                            ? `${selectedOrderForPayment.total_amount} ${selectedOrderForPayment.currency}`
                            : '-'}
                        </strong>
                      </div>
                    </div>

                    <button
                      type="submit"
                      style={{
                        ...styles.primaryBtn,
                        opacity: submittingPayment ? 0.7 : 1
                      }}
                      disabled={submittingPayment}
                    >
                      {submittingPayment ? 'Registering payment...' : 'Register payment'}
                    </button>
                  </form>
                </section>
              </div>
            </section>

            <section id="activity" style={styles.section}>
              <div style={styles.sectionHeader}>
                <div>
                  <h2 style={styles.sectionTitle}>Activity</h2>
                  <p style={styles.sectionSubtitle}>
                    Recent orders and payments generated by the platform.
                  </p>
                </div>
                <span style={styles.badge}>Live data</span>
              </div>

              <div style={styles.grid2}>
                <section style={styles.panel}>
                  <div style={styles.panelTitleRow}>
                    <h3 style={styles.panelTitle}>Orders</h3>
                    <span style={styles.panelCount}>{orders.length}</span>
                  </div>

                  {orders.length === 0 ? (
                    <p style={styles.empty}>No orders yet.</p>
                  ) : (
                    <ul style={styles.list}>
                      {orders.map((order) => (
                        <li key={order.id} style={styles.item}>
                          <div style={styles.itemTop}>
                            <div style={styles.itemTitle}>Order #{order.id}</div>
                            <span style={styles.statusPill}>{order.status}</span>
                          </div>
                          <div style={styles.itemMeta}>
                            Total: {order.total_amount} {order.currency}
                          </div>
                          <div style={styles.itemMeta}>User ID: {order.user_id}</div>
                          <div style={styles.itemMeta}>
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

                <section style={styles.panel}>
                  <div style={styles.panelTitleRow}>
                    <h3 style={styles.panelTitle}>Payments</h3>
                    <span style={styles.panelCount}>{payments.length}</span>
                  </div>

                  {payments.length === 0 ? (
                    <p style={styles.empty}>No payments yet.</p>
                  ) : (
                    <ul style={styles.list}>
                      {payments.map((payment) => (
                        <li key={payment.id} style={styles.item}>
                          <div style={styles.itemTop}>
                            <div style={styles.itemTitle}>Payment #{payment.id}</div>
                            <span style={styles.statusPill}>{payment.status}</span>
                          </div>
                          <div style={styles.itemMeta}>
                            Amount: {payment.amount} {payment.currency}
                          </div>
                          <div style={styles.itemMeta}>Method: {payment.method}</div>
                          <div style={styles.itemMeta}>Order ID: {payment.order_id}</div>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  )
}

export default App