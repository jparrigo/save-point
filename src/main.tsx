import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router"
import Login from './app/public/Login'
import Register from './app/public/Register'
import ForgotPsw from './app/public/ForgotPsw'
import ForgotPsw2 from './app/public/ForgotPsw2'
import LandingPage from './app/public/LandingPage'
import Home from './app/private/home/Home'
import Library from './app/private/library/Library'
import Game from './app/private/game/Game'
import Account from './app/private/account/account'
import Chat from './app/private/chat/Chat'
import Topic from './app/private/forum/Topic'
import Forum from './app/private/forum/Forum'
import ProtectedRoute from './components/protectedroute/ProtectedRoute'
import { Toaster } from './components/ui/sonner'


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
    element: <ProtectedRoute><Home /></ProtectedRoute> 
  },
  {
    path: "/library",
    element: <ProtectedRoute><Library /></ProtectedRoute>
  },
  {
    path: "/game/:id",
    element: <ProtectedRoute><Game /></ProtectedRoute>
  },
  {
    path: "/account",
    element: <ProtectedRoute><Account /></ProtectedRoute>
  },
  {
    path: "/chat",
    element: <ProtectedRoute><Chat /></ProtectedRoute>
  },
  {
    path: "/topic",
    element: <Topic />
  },
  {
    path: "/forum",
    element: <Forum />
  }
  
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
    <Toaster className='dark'/>
  </StrictMode>,
)
