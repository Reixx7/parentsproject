import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import GoogleAuth from './pages/GoogleAuth.jsx';
import SelfiePage from './pages/Main.jsx';

import AllProducts from './pages/AllProducts.jsx'
import ProductPage from './pages/ProductPage.jsx'
import CategoryPage from './pages/CategoryPage.jsx'
import CartCheckout from './pages/CartCheckout.jsx';
import OrderConfirmed from './pages/OrderConfirmed.jsx';
import AdminPanel from './pages/AdminPanel.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import SelfieAboutPage from './pages/About.jsx';
import FAQPage from './pages/FAQPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SelfiePage />,
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
  },{
     path: "/google-auth",
    element: <GoogleAuth />,
    
  },{
     path: "/cart",
    element: <CartCheckout />,
    
  },{
     path: "/order-confirmed",
    element: <OrderConfirmed />,
    
  },{
     path: "/about",
    element: <SelfieAboutPage />,
    
  },{
     path: "/faq",
    element: <FAQPage/>,
    
  },{
     path: "/admin/login",
    element: <AdminLogin />,
    
  },{
     path: "/admin",
    element: <AdminPanel />,
    
  },
  {
    path: '*',
    element: <div>404 - Page Not Found</div>,
  },
])


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <SelfiePage />,

//   }, {
//     path: "/google-auth",
//     element: <GoogleAuth />,
    
//   },
// ]);


 
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router} />
  </StrictMode>,
) 