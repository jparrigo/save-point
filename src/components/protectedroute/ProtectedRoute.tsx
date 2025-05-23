import { ReactNode } from "react";
import { Navigate } from "react-router";

interface ProtectedRouteProps {
  children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = !!localStorage.getItem("@savepoint/login")

  if (!isAuthenticated) {
    return <Navigate to="/login" replace/>
  }

  return <>{children}</>
}