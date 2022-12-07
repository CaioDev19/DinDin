import {
  createContext,
  useMemo
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const Auth = createContext(null)


export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage("user", null)

  const valueProvider = useMemo(() => {
    return [user, setUser]
  }, [user, setUser])

  return (
    <Auth.Provider value={valueProvider}>
      {children}
    </Auth.Provider>
  )
}
