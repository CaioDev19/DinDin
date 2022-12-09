import * as Sc from "./style"
import { HeaderTable } from "./HeaderTable"
import { TableRow } from "./TableRow"
import { useAuth } from "../../hooks/useAuth"
import * as api from "../../services/api"
import { AnimatePresence } from "framer-motion"
import { useQuery } from "react-query"
import { transformQueryParams } from "../../utils/transformQueryParams"
import { IsAscProvider } from "../../context/IsAsc"

export function Table({ handleSignOut, filters }) {
  const [auth] = useAuth()
  const queryParams = transformQueryParams(filters)

  const {
    data: response,
    isSuccess,
    isError,
  } = useQuery(
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

  return (
    <IsAscProvider>
      <Sc.Table>
        <HeaderTable queryParams={queryParams} />
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
                    dayOfWeek={new Date(transaction.data).toLocaleDateString(
                      "pt-Br",
                      { weekday: "long" }
                    )}
                    description={transaction.descricao}
                    category={transaction.categoria_nome}
                    value={transaction.valor}
                  />
                )
              })}
          </AnimatePresence>
        </tbody>
      </Sc.Table>
    </IsAscProvider>
  )
}
