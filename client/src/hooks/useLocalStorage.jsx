import { useState, useEffect } from "react"

function getLocalStorageValue(key, initialValue) {
  const localStorageValue = JSON.parse(localStorage.getItem(key))

  if (localStorageValue) {
    return localStorageValue
  }

  if (typeof initialValue === "function") {
    return initialValue()
  }

  return initialValue
}

export function signOut() {
  localStorage.removeItem("user")
}

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    return getLocalStorageValue(key, initialValue)
  })

  useEffect(() => {
    if (!value) {
      return
    }
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
