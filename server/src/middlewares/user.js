const { isInTheUserDataBase } = require("../utils/user")

module.exports = {
  checkIfFieldsWereSent(req, res, next) {
    const {
      nome,
      email,
      senha
    } = req.body

    if (!nome) {
      return res.status(400).json({ mensagem: "O nome é obrigatório" })
    }
    if (!email) {
      return res.status(400).json({ mensagem: "O email é obrigatório" })
    }
    if (!senha) {
      return res.status(400).json({ mensagem: "A senha é obrigatório" })
    }

    next()
  },
  async checkIfEmailAlredyExists(req, res, next) {
    const {
      email
    } = req.body

    const { isInTheDataBase } = await isInTheUserDataBase("email", email, "usuarios")

    if (isInTheDataBase) {
      return res.status(403).json({ mensagem: "Email inválido" })
    }

    next()
  }
}