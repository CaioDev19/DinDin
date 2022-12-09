const { isInTheDataBase } = require("../utils/db")
const bycript = require("bcrypt")

module.exports = {
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
