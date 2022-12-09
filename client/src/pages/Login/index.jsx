import * as Sc from "./style"
import * as Typography from "../../global/styles/Typography"

import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { Navigate, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { motion } from "framer-motion"

import { StyledCard } from "../../global/styles/Card"
import { Form } from "../../components/Form"
import * as api from "../../services/api"
import { Loading } from "../../components/Loading"
import { useAuth } from "../../hooks/useAuth"
import { loginSchema } from "../../utils/validators/login"
import { useMutation } from "react-query"

export function Login() {
  const [user, setUser] = useAuth()
  const navigate = useNavigate()
  const { isLoading, mutate } = useMutation(api.logIn, {
    onSuccess: (response) => {
      setUser(response.data)
      navigate("/main")
    },
    onError: (error) => {
      toast.error(error.response.data.mensagem)
    },
  })

  const {
    handleSubmit,
    control,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  })

  function handleData(data) {
    mutate(data)
  }

  function handleError(error) {
    if (error.email?.type === "email") {
      resetField("email", {
        keepError: true,
      })
    }
  }

  if (user?.token) {
    return <Navigate to="/main" />
  }

  return (
    <Sc.Wrapper
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0 }}
    >
      <Sc.LeftContent>
        <Typography.Tittle size="large">
          Controle suas{" "}
          <Sc.PurpleTittle as="span" size="large">
            finanças
          </Sc.PurpleTittle>
          , sem planilha chata.
        </Typography.Tittle>
        <Sc.Text>
          Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você tem
          tudo num único lugar e em um clique de distância.
        </Sc.Text>
        <Sc.Button size="small" onClick={() => navigate("/cadastro")}>
          Cadastre-se
        </Sc.Button>
      </Sc.LeftContent>
      <Sc.RightContent>
        <StyledCard>
          <Sc.SubTittle size="medium" color="purple">
            Login
          </Sc.SubTittle>
          <Form onSubmit={handleSubmit(handleData, handleError)}>
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
            {isLoading ? (
              <Loading type="spin" color="#fff" size="6.5%" spacer="large" />
            ) : (
              <Sc.Button type="submit" size="small">
                Entrar
              </Sc.Button>
            )}
          </Form>
        </StyledCard>
      </Sc.RightContent>
    </Sc.Wrapper>
  )
}
