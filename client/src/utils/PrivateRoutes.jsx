import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export function PrivateRoutes() {
  const [isAuth,] = useAuth()

  return isAuth ? <Outlet /> : <Navigate to="/login" />
}