import * as Sc from "./style"
import trashCan from "../../../assets/images/trash.svg"
import pencil from "../../../assets/images/lapis.svg"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import * as Typography from "../../../global/styles/Typography"
import { TransactionsModal } from "../../Modals/Transactions"
import { format } from "date-fns"
import * as api from "../../../services/api"
import { useQueryClient } from "react-query"
import { useMutation } from "react-query"
import { toast } from "react-toastify"
import { useAuth } from "../../../hooks/useAuth"
import { useSearchParams } from "react-router-dom"
import { transformQueryParams } from "../../../utils/transformQueryParams"
import { centsToReais } from "../../../utils/centsToReais"

export function TableRow({
  id,
  date,
  dayOfWeek,
  description,
  category,
  value,
  type,
}) {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const queryClient = useQueryClient()
  const [auth] = useAuth()
  const [searchParamns] = useSearchParams()
  const filters = searchParamns.getAll("filtro")
  const queryParams = transformQueryParams(filters)

  const { mutate } = useMutation(api.deleteTransaction, {
    onMutate: () => {
      const previousTransactions = queryClient.getQueryData([
        "transactions",
        auth.token,
        queryParams,
      ])

      queryClient.setQueryData(
        ["transactions", auth.token, queryParams],
        (oldValue) => {
          const filteredData = oldValue.data.filter((transaction) => {
            return transaction.id !== id
          })
          return {
            ...oldValue,
            data: filteredData,
          }
        }
      )

      return { previousTransactions }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["extract", auth.token])
      setIsPopUpOpen(false)
    },
    onError: (error, data, context) => {
      queryClient.setQueryData(
        ["transactions", auth.token, queryParams],
        context.previousTransactions
      )
      toast.error("falha na exclusão de transação")
    },
    onSettled: () => {
      queryClient.invalidateQueries(["transactions", auth.token, queryParams])
    },
  })

  function handleDelete() {
    setIsPopUpOpen(false)
    mutate({
      id,
      token: auth.token,
    })
  }

  return (
    <>
      <motion.tr
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Sc.TableItem as="td" size="small" weight="bold" position="left">
          {format(new Date(date), "dd/MM/yy")}
        </Sc.TableItem>
        <Sc.TableItem as="td" size="small">
          {dayOfWeek}
        </Sc.TableItem>
        <Sc.TableItem as="td" size="small">
          {description}
        </Sc.TableItem>
        <Sc.TableItem as="td" size="small" position="center">
          {category}
        </Sc.TableItem>
        <Sc.TableItem
          as="td"
          size="small"
          color={type === "entrada" ? "purple" : "orange"}
          weight="bold"
        >
          {centsToReais(value)}
        </Sc.TableItem>
        <Sc.TableItem as="td">
          <Sc.Wrapper>
            <Sc.Icons
              src={pencil}
              alt="lapis"
              onClick={() => setIsModalOpen(true)}
            />
            <Sc.Icons
              src={trashCan}
              alt="lixo"
              onClick={() => setIsPopUpOpen(true)}
            />
            <AnimatePresence>
              {isPopUpOpen && (
                <Sc.PopUp
                  as={motion.div}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Typography.Text as="span" size="small">
                    Apagar item?
                  </Typography.Text>
                  <Sc.WrapperBtn>
                    <Sc.StyledButton
                      size="small"
                      background="blue"
                      onClick={handleDelete}
                    >
                      Sim
                    </Sc.StyledButton>
                    <Sc.StyledButton
                      size="small"
                      background="red"
                      onClick={() => setIsPopUpOpen(false)}
                    >
                      Não
                    </Sc.StyledButton>
                  </Sc.WrapperBtn>
                </Sc.PopUp>
              )}
            </AnimatePresence>
          </Sc.Wrapper>
        </Sc.TableItem>
      </motion.tr>
      <AnimatePresence>
        {isModalOpen && (
          <TransactionsModal
            id={id}
            title="Editar Registro"
            typeQuery="update"
            defaultValues={{
              valor: value / 100,
              data: format(new Date(date), "yyyy-MM-dd"),
              categoria: category,
              descricao: description,
              tipo: type,
            }}
            closeModal={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
