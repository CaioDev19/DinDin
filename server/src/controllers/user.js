const dataBase = require("../config/dataBase")
const bycript = require("bcrypt")

module.exports = {
  async signUserUp(req, res) {
    const {
      nome,
      email,
      senha
    } = req.body

    try {
      const hashedPassword = await bycript.hash(senha, 10)

      const { rows } = await dataBase.query(`
        INSERT INTO usuarios (nome, email, senha)
        VALUES ($1, $2, $3)
        RETURNING *;
      `, [nome, email, hashedPassword])

      const { senha: _, ...newUserData } = rows[0]

      return res.status(201).json(newUserData)
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro interno do servidor" })
    }
  }
}