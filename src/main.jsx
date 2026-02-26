import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AllProducts from './pages/AllProducts.jsx'
import ProductPage from './pages/ProductPage.jsx'
import CategoryPage from './pages/CategoryPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/products',
    element: <AllProducts />,
  },
  {
    path: '/products/:id',
    element: <ProductPage />,
  },
  {
    path: '/category/:section',
    element: <CategoryPage />,
  },
  {
    path: '*',
    element: <div>404 - Page Not Found</div>,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
) 