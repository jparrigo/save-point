import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router"
import Login from './app/public/Login'
import Register from './app/public/Register'
import Home from './app/private/home'
import ForgotPsw from './app/public/ForgotPsw'
import ForgotPsw2 from './app/public/ForgotPsw2'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/forgotpsw",
    element: <ForgotPsw />
  },
  {
    path: "/forgotpsw2",
    element: <ForgotPsw2 />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
