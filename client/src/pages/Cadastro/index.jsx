import * as Sc from "./style"
import { yupResolver } from "@hookform/resolvers/yup"

import { toast } from "react-toastify"
import { useNavigate, Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { motion } from "framer-motion"

import { StyledCard } from "../../global/styles/Card"
import { Form } from "../../components/Form"
import { Button } from "../../global/styles/Button"
import * as api from "../../services/api"
import { Loading } from "../../components/Loading"
import { signUpSchema } from "../../utils/validators/signUp"
import { useMutation } from "react-query"
import { handleSignUpError } from "../../utils/validators/signUp"

export function Cadastro() {
  const { isLoading, mutate } = useMutation(api.signUp, {
    onSuccess: () => {
      toast.success("Cadastro realizado com sucesso!")
      navigate("/login")
    },
    onError: (error) => {
      toast.error(error.response.data.mensagem)
    },
  })
  const navigate = useNavigate()

  const {
    handleSubmit,
    control,
    formState: { errors },
    resetField,
  } = useForm({
    resolver: yupResolver(signUpSchema),
  })

  function handleData(data) {
    mutate({
      nome: data.nome,
      email: data.email,
      senha: data.senha,
    })
  }

  function handleError(error) {
    handleSignUpError(error, resetField)
  }

  return (
    <Sc.Wrapper
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0 }}
    >
      <StyledCard>
        <Sc.SubTittle size="medium" color="purple">
          Cadastre-se
        </Sc.SubTittle>
        <Form onSubmit={handleSubmit(handleData, handleError)}>
          <Sc.Input
            type="text"
            label="Nome"
            name="nome"
            control={control}
            placeholder={errors.nome && errors.nome.message}
          />
          <Sc.Input
            type="text"
            label="E-mail"
            name="email"
            control={control}
            placeholder={errors.email && errors.email.message}
          />
          <Sc.Input
            type="password"
            label="Senha"
            name="senha"
            control={control}
            placeholder={errors.senha && errors.senha.message}
          />
          <Sc.Input
            type="password"
            label="Confirmação de senha"
            name="confimacaoSenha"
            control={control}
            placeholder={
              errors.confimacaoSenha && errors.confimacaoSenha.message
            }
          />
          {isLoading ? (
            <Loading type="spin" color="#fff" size="6.5%" />
          ) : (
            <Button type="submit" size="small">
              Cadastrar
            </Button>
          )}
        </Form>
        <Sc.Span as="span" size="small" color="purple" weight="700">
          Já tem cadastro?
          <Sc.Link as={Link} to="/login" size="small" color="purple">
            Clique aqui
          </Sc.Link>
        </Sc.Span>
      </StyledCard>
    </Sc.Wrapper>
  )
}
