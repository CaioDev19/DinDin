import * as Sc from "./style"
import arrowUp from "../../../assets/images/arrowKeyUp.svg"
import { motion } from "framer-motion"
import { useIsAsc } from "../../../hooks/useIsAsc"
import { useQueryClient } from "react-query"
import { useAuth } from "../../../hooks/useAuth"

export function HeaderTable({ queryParams }) {
  const [isAsc, setIsAsc] = useIsAsc()
  const queryClient = useQueryClient()
  const [auth] = useAuth()

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
            data: ascendingTransactions,
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
          data: descendingTransactions,
        }
      }
    )
    setIsAsc(false)
  }
  return (
    <Sc.HeaderTable>
      <tr>
        <Sc.DateItem
          size="small"
          weight="bold"
          as="th"
          position="left"
          onClick={handleSort}
        >
          Data
          <Sc.Arrow
            as={motion.img}
            src={arrowUp}
            alt="Arrow up"
            animate={{ rotate: isAsc ? 180 : 0 }}
          />
        </Sc.DateItem>
        <Sc.TableItemHeader size="small" weight="bold" as="th">
          Dia da semana
        </Sc.TableItemHeader>
        <Sc.TableItemHeader size="small" weight="bold" as="th">
          Descrição
        </Sc.TableItemHeader>
        <Sc.TableItemHeader size="small" weight="bold" as="th">
          Categoria
        </Sc.TableItemHeader>
        <Sc.TableItemHeader size="small" weight="bold" as="th">
          Valor
        </Sc.TableItemHeader>
        <Sc.TableItemHeader size="small" weight="bold" as="th">
          &nbsp;
        </Sc.TableItemHeader>
      </tr>
    </Sc.HeaderTable>
  )
}
