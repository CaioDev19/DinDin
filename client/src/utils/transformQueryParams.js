export function transformQueryParams(params) {
  return params
    .map((filter) => {
      return `filtro[]=${filter}`
    })
    .join("&")
}
