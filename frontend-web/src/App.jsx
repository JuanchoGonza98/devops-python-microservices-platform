import { useEffect, useState } from 'react'
import { getProducts, getUsers, getOrders, getPayments } from './services/api'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  const [users, setUsers] = useState([])
  const [orders, setOrders] = useState([])
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
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

    loadData()
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <h1>DevOps Python Microservices Platform</h1>
        <p>Frontend web consumiendo el gateway del sistema</p>
      </header>

      {loading && <p>Cargando datos...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <main className="grid">
          <section className="card">
            <h2>Products</h2>
            <ul>
              {products.map((item, index) => (
                <li key={item.id ?? index}>{JSON.stringify(item)}</li>
              ))}
            </ul>
          </section>

          <section className="card">
            <h2>Users</h2>
            <ul>
              {users.map((item, index) => (
                <li key={item.id ?? index}>{JSON.stringify(item)}</li>
              ))}
            </ul>
          </section>

          <section className="card">
            <h2>Orders</h2>
            <ul>
              {orders.map((item, index) => (
                <li key={item.id ?? index}>{JSON.stringify(item)}</li>
              ))}
            </ul>
          </section>

          <section className="card">
            <h2>Payments</h2>
            <ul>
              {payments.map((item, index) => (
                <li key={item.id ?? index}>{JSON.stringify(item)}</li>
              ))}
            </ul>
          </section>
        </main>
      )}
    </div>
  )
}

export default App