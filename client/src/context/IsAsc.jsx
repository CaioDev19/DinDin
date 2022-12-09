import { useMemo } from "react"
import { createContext, useState } from "react"

export const IsAsc = createContext(true)

export function IsAscProvider({ children }) {
  const [isAsc, setIsAsc] = useState(true)

  const valueProvider = useMemo(() => {
    return [isAsc, setIsAsc]
  }, [isAsc])

  return <IsAsc.Provider value={valueProvider}>{children}</IsAsc.Provider>
}
