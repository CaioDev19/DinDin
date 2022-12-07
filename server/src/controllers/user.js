const { knex } = require("../config/dataBase")
const bycript = require("bcrypt")
const { signJwt } = require("../utils/jwt")

module.exports = {
  async signUserUp(req, res) {
    const { nome, email, senha } = req.body

    try {
      const hashedPassword = await bycript.hash(senha, 10)

      const newUser = await knex("usuarios")
        .insert({
          nome,
          email,
          senha: hashedPassword,
        })
        .returning("*")

      if (!newUser) {
        return res.status(500).json({ mensagem: "Erro interno do servidor!" })
      }

      const { senha: _, ...newUserData } = newUser[0]

      return res.status(201).json(newUserData)
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro interno do servidor" })
    }
  },
  async logUserIn(req, res) {
    const { senha: _, ...userData } = req.user

    try {
      const token = await signJwt(
        { id: req.user.id },
        process.env.JWTSECRETKEY,
        { expiresIn: "8h" }
      )

      return res.status(200).json({
        usuario: userData,
        token,
      })
    } catch {
      return res.status(500).json({ mensagem: "Erro interno do servidor" })
    }
  },
  detailUser(req, res) {
    const userData = req.loggedUser
    res.status(200).json(userData)
  },
  async updateUser(req, res) {
    const { nome, email, senha } = req.body

    try {
      const hashedPassword = await bycript.hash(senha, 10)

      const response = await knex("usuarios")
        .update({
          nome,
          email,
          senha: hashedPassword,
        })
        .where({ id: req.loggedUser.id })

      if (!response) {
        return res.status(500).json({ mensagem: "Erro interno do servidor!" })
      }

      return res.status(204).send()
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro interno do servidor" })
    }
  },
}
