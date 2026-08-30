import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { useAuthStore } from './store/useAuthStore'
import { useCartStore } from './store/useCartStore'
import './index.css'
import App from './App.jsx'

function Root() {
  const initializeAuth = useAuthStore(state => state.initialize)
  const fetchCart = useCartStore(state => state.fetchCart)
  const user = useAuthStore(state => state.user)

  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  useEffect(() => {
    fetchCart()
  }, [fetchCart, user]) // Refetch cart when user state changes

  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
