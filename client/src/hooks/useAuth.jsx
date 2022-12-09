import { useContext } from "react"
import { Auth } from "../context/Auth"

export function useAuth() {
  return useContext(Auth)
}
