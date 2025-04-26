import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router"
import Login from './app/public/Login'
import Register from './app/public/Register'
import Home from './app/private/Home'
import ForgotPsw from './app/public/ForgotPsw'
import ForgotPsw2 from './app/public/ForgotPsw2'
import LandingPage from './app/public/LandingPage'
import Library from './app/private/Library'
import Game from './app/private/Game'


const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/forgotpsw",
    element: <ForgotPsw />
  },
  {
    path: "/forgotpsw2",
    element: <ForgotPsw2 />
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/library",
    element: <Library />
  },
  {
    path: "/Game",
    element: <Game />
  }
  
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
