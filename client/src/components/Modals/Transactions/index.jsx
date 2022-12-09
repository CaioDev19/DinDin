import { createPortal } from "react-dom"
import * as Sc from "../style"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { toast } from "react-toastify"
import { motion } from "framer-motion"

import { Input } from "../../Form/Input"
import { Button } from "../../../global/styles/Button"
import closeBtn from "../../../assets/images/closeBtn.svg"
import * as api from "../../../services/api"
import { useAuth } from "../../../hooks/useAuth"
import { Label } from "../../../global/styles/Label"
import { Select } from "../../Form/Select"
import { Loading } from "../../Loading"
import { transactionSchema } from "../../../utils/validators/transaction"
import { useQueryClient, useMutation } from "react-query"
import { useSearchParams } from "react-router-dom"
import { transformQueryParams } from "../../../utils/transformQueryParams"

export function TransactionsModal({
  id,
  closeModal,
  title,
  typeQuery,
  defaultValues,
}) {
  const [auth] = useAuth()
  const queryClient = useQueryClient()
  const categories = queryClient.getQueryData(["categories", auth.token])
  const [searchParamns] = useSearchParams()
  const filters = searchParamns.getAll("filtro")
  const queryParams = transformQueryParams(filters)

  const [btnChoice, setBtnChoice] = useState({
    entrada: defaultValues?.tipo === "entrada" ? true : false,
    saida: defaultValues
      ? defaultValues.tipo === "saida"
        ? true
        : false
      : true,
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    resetField,
  } = useForm({
    defaultValues: {
      valor: defaultValues?.valor,
      data: defaultValues?.data,
      categoria: defaultValues?.categoria,
      descricao: defaultValues?.descricao,
    },
    resolver: yupResolver(transactionSchema),
  })

  const { isLoading, mutate } = useMutation(api[`${typeQuery}Transaction`], {
    onSuccess: (response, variable) => {
      if (typeQuery !== "update") {
        toast.success("Registrado")
        queryClient.setQueryData(
          ["transactions", auth.token, queryParams],
          (oldValue) => {
            oldValue.data.push(response.data)
            return {
              ...oldValue,
            }
          }
        )
      } else {
        toast.success("Atualizado")

        queryClient.setQueryData(
          ["transactions", auth.token, queryParams],
          (oldValue) => {
            const IndexValuaUpdate = oldValue.data.findIndex((transaction) => {
              return transaction.id === id
            })
            const nameCategory = categories.data.find((category) => {
              return category.id === variable.body.categoria_id
            })

            oldValue.data[IndexValuaUpdate] = {
              id: variable.id,
              categoria_nome: nameCategory.descricao,
              usuario_id: auth.usuario.id,
              ...variable.body,
            }

            return {
              ...oldValue,
            }
          }
        )
      }
      queryClient.invalidateQueries(["extract", auth.token])
      reset()
      closeModal()
    },
    onError: () => {
      if (typeQuery !== "update") {
        toast.error("Falha no cadastro de registro")
        return
      }
      toast.error("Falha na atualização de registro")
    },
    onSettled: () => {
      queryClient.invalidateQueries(["transactions", auth.token, queryParams])
    },
  })

  function handleData(data) {
    const category = categories.data.find((category) => {
      return category.descricao === data.categoria
    })

    const body = {
      tipo: btnChoice.entrada ? "entrada" : "saida",
      descricao: data.descricao,
      valor: data.valor * 100,
      data: new Date(`${data.data}T00:00:00`),
      categoria_id: category.id,
    }

    if (typeQuery === "update") {
      mutate({
        id,
        token: auth.token,
        body,
      })
    } else {
      mutate({ token: auth.token, body })
    }
  }

  function handleError(error) {
    if (error.valor) {
      resetField("valor", {
        keepError: true,
        defaultValue: "",
      })
    }
  }
  function resetModalContent() {
    reset()
    closeModal()
  }

  return createPortal(
    <>
      <Sc.Overlay
        as={motion.div}
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => {
          e.stopPropagation()
          resetModalContent()
        }}
      />
      <Sc.Modal
        as={motion.div}
        key="modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Sc.CloseModal
          onClick={resetModalContent}
          src={closeBtn}
          alt="Botão de fechar"
        />
        <Sc.Wrapper>
          <Sc.SubTittle size="medium" color="black" position="left">
            {title}
          </Sc.SubTittle>
          <Sc.WrapperBtn>
            <Button
              size="small"
              color="white"
              background={btnChoice.entrada ? "blue" : "gray"}
              spacer="none"
              onClick={() =>
                setBtnChoice({
                  entrada: true,
                  saida: false,
                })
              }
            >
              Entrada
            </Button>
            <Button
              size="small"
              color="white"
              background={btnChoice.saida ? "red" : "gray"}
              spacer="none"
              onClick={() =>
                setBtnChoice({
                  entrada: false,
                  saida: true,
                })
              }
            >
              Saída
            </Button>
          </Sc.WrapperBtn>
          <Sc.StyledForm onSubmit={handleSubmit(handleData, handleError)}>
            <Input
              type="number"
              label="Valor"
              labelColor="gray_500"
              labelSize="intermediateLarger"
              labelWeight="700"
              name="valor"
              control={control}
              placeholder={errors.valor && errors.valor.message}
            />
            <Label
              labelColor="gray_500"
              labelSize="intermediateLarger"
              labelWeight="700"
            >
              Categoria
              <Select
                control={control}
                options={categories?.data}
                name="categoria"
              />
            </Label>
            <Input
              type="date"
              label="Data"
              labelColor="gray_500"
              labelSize="intermediateLarger"
              labelWeight="700"
              name="data"
              control={control}
              placeholder={errors.data && errors.data.message}
            />
            <Sc.StyledInput
              type="text"
              label="Descrição"
              labelColor="gray_500"
              labelSize="intermediateLarger"
              labelWeight="700"
              name="descricao"
              control={control}
              placeholder={errors.descricao && errors.descricao.message}
            />
            {isLoading ? (
              <Loading type="spin" color="#fff" size="6.5%" width="50%" />
            ) : (
              <Button
                size="small"
                color="white"
                background="purple"
                spacer="small"
                type="submit"
              >
                Confirmar
              </Button>
            )}
          </Sc.StyledForm>
        </Sc.Wrapper>
      </Sc.Modal>
    </>,
    document.getElementById("modal-root")
  )
}
