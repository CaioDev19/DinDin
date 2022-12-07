const { checkIfFieldsWereSent } = require("../utils/body")
const { isInTheDataBase } = require("../utils/db")

module.exports = {
  checkRegisterBody(req, res, next) {
    const jsonResponse = checkIfFieldsWereSent(
      req.body,
      ["descricao", "valor", "data", "categoria_id", "tipo"],
      res
    )

    if (jsonResponse) {
      return jsonResponse
    }

    next()
  },
  async checkIfCategorieExists(req, res, next) {
    const { categoria_id } = req.body

    const { response, data } = await isInTheDataBase(
      { id: categoria_id },
      "categorias"
    )

    if (!response) {
      return res.status(404).json({ mensagem: "Categoria inválida" })
    }

    req.category_name = data.descricao
    next()
  },
  checkTypeOfRegister(req, res, next) {
    const { tipo } = req.body

    if (tipo !== "entrada" && tipo !== "saida") {
      return res.status(400).json({ mensagem: "Tipo de registro inválido." })
    }

    next()
  },
  async checkIfTransactionExists(req, res, next) {
    const { id } = req.params

    const { response } = await isInTheDataBase({ id: Number(id) }, "transacoes")

    if (!response) {
      return res.status(404).json({ mensagem: "Transação não encontrada." })
    }

    next()
  },
  async checkIfTransactioBelongsToUser(req, res, next) {
    const { id } = req.params

    const { data } = await isInTheDataBase({ id: Number(id) }, "transacoes")

    if (data.usuario_id !== req.loggedUser.id) {
      return res
        .status(403)
        .json({ mensagem: "Transação não pertence ao usuário logado." })
    }

    next()
  },
}
