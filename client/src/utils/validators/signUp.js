import * as yup from "yup"

export const signUpSchema = yup.object().shape({
  nome: yup.string().required("O nome é obrigatório"),
  email: yup
    .string()
    .email("E-mail inválido")
    .required("O e-mail é obrigatório"),
  senha: yup.string().required("A senha é obrigatória"),
  confimacaoSenha: yup
    .string()
    .oneOf([yup.ref("senha"), null], "As senhas devem ser iguais")
    .required("A confirmação da senha é obrigatória"),
})

export function handleSignUpError(error, resetField) {
  if (error.confimacaoSenha?.type === "oneOf") {
    resetField("confimacaoSenha", {
      keepError: true,
    })
  }
  if (error.email?.type === "email") {
    resetField("email", {
      keepError: true,
    })
  }
}
