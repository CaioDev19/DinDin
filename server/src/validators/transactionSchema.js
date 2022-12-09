const yup = require("yup")

const transactionSchema = yup.object({
  body: yup.object({
    descricao: yup.string().required("A descrição é obrigatória."),
    valor: yup
      .number()
      .integer("O valor deve ser inteiro")
      .positive("O valor deve ser maior que zero.")
      .min(1, "O valor deve ser maior que zero.")
      .required("O valor é obrigatório."),
    data: yup
      .string()
      .matches(
        /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
        "Insira uma data válida."
      )
      .required("A data é obrigatória."),
    categoria_id: yup
      .number()
      .integer("Insira um id válido.")
      .positive("Insira um id válido.")
      .min(1, "Insira um id válido.")
      .required("O id da categoria é obrigatório."),
    tipo: yup.string().required("O tipo é obrigatório."),
  }),
})

module.exports = { transactionSchema }
