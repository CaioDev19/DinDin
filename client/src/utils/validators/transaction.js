import * as yup from "yup"

export const transactionSchema = yup.object().shape({
  valor: yup
    .number()
    .transform((_value, originalValue) => Number(originalValue.replace(/,/, '.')))
    .typeError("O valor deve ser um número")
    .min(0)
    .required("O valor é obrigatório"),
  categoria: yup
    .string()
    .required("A categoria é obrigatório"),
  data: yup
    .string()
    .required("A data é obrigatória"),
  descricao: yup
    .string()
    .required("A descrição é obrigatória")
})