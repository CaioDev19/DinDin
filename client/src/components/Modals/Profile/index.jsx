import * as Sc from "../style"
import { yupResolver } from "@hookform/resolvers/yup"

import { useForm } from "react-hook-form"
import { createPortal } from "react-dom"
import { motion } from "framer-motion"
import { toast } from "react-toastify"

import closeBtn from "../../../assets/images/closeBtn.svg"
import { Input } from "../../Form/Input"
import { Button } from "../../../global/styles/Button"
import { useAuth } from "../../../hooks/useAuth"
import * as api from "../../../services/api"
import { Loading } from "../../Loading"
import { handleSignUpError, signUpSchema } from "../../../utils/validators/signUp"
import { useMutation } from "react-query"

export function ProfileModal({ closeModal }) {
  const [auth, setAuht] = useAuth()
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    resetField
  } = useForm({
    defaultValues: {
      nome: auth.usuario.nome,
      email: auth.usuario.email,
      senha: "",
      confirmacaoSenha: ""
    },
    resolver: yupResolver(signUpSchema)
  })

  const { isLoading, mutate } = useMutation(
    api.updateUser,
    {
      onSuccess: (_, variables) => {
        toast.success("Atualização realizada com sucesso!")

        setAuht({
          token: auth.token,
          usuario: {
            id: auth.usuario.id,
            nome: variables.body.nome,
            email: variables.body.email
          }
        })
        reset()
        closeModal()
      },
      onError: (error) => {
        toast.error(error.response.data.mensagem)
      }
    }
  )

  function handleData(data) {
    mutate({
      body: {
        nome: data.nome,
        email: data.email,
        senha: data.senha
      },
      token: auth.token
    })
  }

  function handleError(error) {
    if (error.email?.type === "email") {
      resetField("email", {
        keepError: true,
        defaultValue: ""
      })
    }
    handleSignUpError(error, resetField)
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
          src={closeBtn}
          alt="Botão de fechar"
          onClick={closeModal}
        />
        <Sc.Wrapper>
          <Sc.SubTittle
            size="medium"
            color="black"
            position="left"
          >
            Editar Perfil
          </Sc.SubTittle>
          <Sc.StyledForm
            onSubmit={handleSubmit(handleData, handleError)}
          >
            <Input
              type="text"
              label="Nome"
              labelColor="gray_500"
              labelSize="intermediateLarger"
              labelWeight="700"
              name="nome"
              control={control}
              placeholder={errors.nome && errors.nome.message}
            />
            <Input
              type="text"
              label="E-mail"
              labelColor="gray_500"
              labelSize="intermediateLarger"
              labelWeight="700"
              name="email"
              control={control}
              placeholder={errors.email && errors.email.message}
            />
            <Input
              type="password"
              label="Senha"
              labelColor="gray_500"
              labelSize="intermediateLarger"
              labelWeight="700"
              name="senha"
              control={control}
              placeholder={errors.senha && errors.senha.message}
            />
            <Sc.StyledInput
              type="password"
              label="Confirmação de senha"
              labelColor="gray_500"
              labelSize="intermediateLarger"
              labelWeight="700"
              name="confimacaoSenha"
              control={control}
              placeholder={errors.confimacaoSenha && errors.confimacaoSenha.message}
            />
            {isLoading
              ? (
                <Loading
                  type="spin"
                  color="#fff"
                  size="6.5%"
                  width="50%"
                />
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
              )
            }
          </ Sc.StyledForm>
        </Sc.Wrapper>
      </Sc.Modal>
    </>
    , document.getElementById("modal-root"))
}