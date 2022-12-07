const { isInTheDataBase } = require("../utils/db")
const { checkIfFieldsWereSent } = require("../utils/body")
const bycript = require("bcrypt")

module.exports = {
  checkIfSignUpBodyIsRight(req, res, next) {
    const jsonResponse = checkIfFieldsWereSent(
      req.body,
      ["nome", "email", "senha"],
      res
    )

    if (jsonResponse) {
      return jsonResponse
    }

    next()
  },
  checkLoginBodyIsRight(req, res, next) {
    const jsonResponse = checkIfFieldsWereSent(
      req.body,
      ["email", "senha"],
      res
    )

    if (jsonResponse) {
      return jsonResponse
    }

    next()
  },
  async checkIfEmailExists(req, res, next) {
    const { nome, email } = req.body

    const { response, data } = await isInTheDataBase({ email }, "usuarios")

    if (nome && !req.loggedUser) {
      if (response) {
        return res.status(403).json({
          mensagem:
            "O e-mail informado já está sendo utilizado por outro usuário.",
        })
      }
    } else if (nome && req.loggedUser) {
      if (response && email !== req.loggedUser.email) {
        return res.status(403).json({
          mensagem:
            "O e-mail informado já está sendo utilizado por outro usuário.",
        })
      }
    } else {
      if (!response) {
        return res.status(401).json({ mensagem: "Email ou senha inválidos" })
      }
      req.user = data
    }

    next()
  },
  async checkPassword(req, res, next) {
    const { senha } = req.body
    try {
      const passwordCheck = await bycript.compare(senha, req.user.senha)

      if (!passwordCheck) {
        return res.status(401).json({ mensagem: "Email ou senha inválidos" })
      }

      next()
    } catch {
      return res.status(500).json({ mensagem: "Erro interno do servidor" })
    }
  },
}
