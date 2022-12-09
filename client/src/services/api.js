import axios from "axios"

export const api = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
})

export function logIn(body) {
  return api.post("/login", body)
}

export function signUp(body) {
  return api.post("/usuario", body)
}

export function extract(token) {
  return api.get("/transacao/extrato", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export function categories(token) {
  return api.get("/categoria", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export function transactions(token, filters) {
  return api.get(`/transacao?${filters}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export function addTransaction(config) {
  return api.post("/transacao", config.body, {
    headers: {
      Authorization: `Bearer ${config.token}`,
    },
  })
}

export function deleteTransaction(config) {
  return api.delete(`/transacao/${config.id}`, {
    headers: {
      Authorization: `Bearer ${config.token}`,
    },
  })
}

export function updateTransaction(config) {
  return api.put(`/transacao/${config.id}`, config.body, {
    headers: {
      Authorization: `Bearer ${config.token}`,
    },
  })
}

export function updateUser(config) {
  return api.put("/usuario", config.body, {
    headers: {
      Authorization: `Bearer ${config.token}`,
    },
  })
}
