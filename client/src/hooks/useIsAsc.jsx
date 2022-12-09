import { useContext } from "react"
import { IsAsc } from "../context/IsAsc"

export function useIsAsc() {
  return useContext(IsAsc)
}
