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
      delete req.loggedUser
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
      delete req.loggedUser
      return res.status(404).json({ mensagem: "Categoria inválida" })
    }

    next()
  },
  checkTypeOfRegister(req, res, next) {
    const { tipo } = req.body

    if (tipo !== "entrada" && tipo !== "saida") {
      delete req.loggedUser
      return res.status(400).json({ mensagem: "Tipo de registro inválido." })
    }

    next()
  },
}
