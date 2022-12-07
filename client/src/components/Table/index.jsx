import * as Sc from "./style"
import { HeaderTable } from "./HeaderTable"
import { TableRow } from "./TableRow"
import { useAuth } from "../../hooks/useAuth"
import * as api from "../../services/api"
import { AnimatePresence } from "framer-motion"
import { useQuery, useQueryClient } from "react-query"
import { transformQueryParams } from "../../utils/transformQueryParams"
import { useState } from "react"

export function Table({
  handleSignOut,
  filters
}) {
  const queryClient = useQueryClient()
  const [auth,] = useAuth()
  const [isAsc, setIsAsc] = useState(true)
  const queryParams = transformQueryParams(filters)

  const { data: response, isSuccess, isError } = useQuery(
    ["transactions", auth.token, queryParams],
    () => {
      return api.transactions(auth.token, queryParams)
    },
    {
      enabled: Boolean(auth.token),
      refetchOnWindowFocus: false,
    }
  )

  if (isError) {
    handleSignOut()
  }

  function handleSort() {
    if (!isAsc) {
      queryClient.setQueryData(
        ["transactions", auth.token, queryParams],
        (oldValue) => {
          const ascendingTransactions = oldValue.data.sort((a, b) => {
            return new Date(a.data) - new Date(b.data)
          })

          return {
            ...oldValue,
            data: ascendingTransactions
          }
        }
      )
      setIsAsc(true)
      return
    }
    queryClient.setQueryData(
      ["transactions", auth.token, queryParams],
      (oldValue) => {
        const descendingTransactions = oldValue.data.sort((a, b) => {
          return new Date(b.data) - new Date(a.data)
        })
        return {
          ...oldValue,
          data: descendingTransactions
        }
      }
    )
    setIsAsc(false)
  }

  return (
    <Sc.Table>
      <HeaderTable handleSort={handleSort} isAsc={isAsc} />
      <tbody>
        <AnimatePresence mode="sync">
          {isSuccess &&
            response.data.map((transaction) => {
              return (
                <TableRow
                  key={transaction.id}
                  id={transaction.id}
                  date={transaction.data}
                  type={transaction.tipo}
                  dayOfWeek={
                    new Date(transaction.data)
                      .toLocaleDateString(
                        "pt-Br",
                        { weekday: "long" }
                      )
                  }
                  description={transaction.descricao}
                  category={transaction.categoria_nome}
                  value={transaction.valor}
                />
              )
            })}
        </AnimatePresence>
      </tbody>
    </Sc.Table>
  )
}