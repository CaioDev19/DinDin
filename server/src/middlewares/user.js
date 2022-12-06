const { isInTheUserDataBase } = require("../utils/user")
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

    const { isInTheDataBase, user } = await isInTheUserDataBase(
      { email },
      "usuarios"
    )

    if (nome && !req.loggedUser) {
      if (isInTheDataBase) {
        return res.status(403).json({
          mensagem:
            "O e-mail informado já está sendo utilizado por outro usuário.",
        })
      }
    } else if (nome && req.loggedUser) {
      if (isInTheDataBase && email !== req.loggedUser.email) {
        return res.status(403).json({
          mensagem:
            "O e-mail informado já está sendo utilizado por outro usuário.",
        })
      }
    } else {
      if (!isInTheDataBase) {
        return res.status(401).json({ mensagem: "Email ou senha inválidos" })
      }
      req.user = user
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
