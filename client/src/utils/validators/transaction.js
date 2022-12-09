import * as yup from "yup"

export const transactionSchema = yup.object().shape({
  valor: yup
    .number()
    .transform((_value, originalValue) =>
      Number(originalValue.replace(/,/, "."))
    )
    .min(1, "O valor deve ser maior que zero.")
    .required("O valor é obrigatório"),
  categoria: yup.string().required("A categoria é obrigatória."),
  data: yup.string().required("A data é obrigatória."),
  descricao: yup.string().required("A descrição é obrigatória."),
})
