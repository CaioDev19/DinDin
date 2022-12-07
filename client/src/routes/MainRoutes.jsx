import { Routes, Route, Outlet, Navigate } from "react-router-dom"
import { Cadastro } from "../pages/Cadastro"
import { Login } from "../pages/Login"
import { Main } from "../pages/Main"
import { UnprotectedRoutesContainer } from "../global/styles/containers/UnprotectedRoutesContainer"
import { Logo } from "../components/Logo"
import { PrivateRoutes } from "../utils/PrivateRoutes"
import { AnimatePresence } from "framer-motion"

export function MainRoutes() {
  return (
    <AnimatePresence>
      <Routes>
        <Route
          element={
            <>
              <Logo />
              <Outlet />
            </>
          }
        >
          <Route
            element={
              <UnprotectedRoutesContainer>
                <Outlet />
              </UnprotectedRoutesContainer>
            }
          >
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
          </Route>

          <Route element={<PrivateRoutes />}>
            <Route path="/main" element={<Main />} />
          </Route>
          <Route path="/" element={<Navigate to="login" />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
} 