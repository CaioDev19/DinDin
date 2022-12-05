const dataBase = require("../config/dataBase")
const bycript = require("bcrypt")
const { signJwt } = require("../utils/jwt")

module.exports = {
  async signUserUp(req, res) {
    const {
      nome,
      email,
      senha
    } = req.body

    try {
      const hashedPassword = await bycript.hash(senha, 10)

      const { rows, rowCount } = await dataBase.query(`
        INSERT INTO usuarios (nome, email, senha)
        VALUES ($1, $2, $3)
        RETURNING *;
      `, [nome, email, hashedPassword])

      if (!rowCount) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor!' });
      }

      const { senha: _, ...newUserData } = rows[0]

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

      delete req.user
      res.status(200).json({
        usuario: userData,
        token
      })
    } catch {
      delete req.user
      res.status(500).json({ mensagem: "Erro interno do servidor" })
    }
  },
  detailUser(req, res) {
    const userData = req.loggedUser
    delete req.loggedUser
    res.status(200).json(userData)
  },
  async updateUser(req, res) {
    const {
      nome,
      email,
      senha
    } = req.body

    try {
      const hashedPassword = await bycript.hash(senha, 10)

      const { rowCount } = await dataBase.query(`
        UPDATE usuarios 
        SET nome = $1, email = $2, senha = $3
        WHERE id = $4
      `, [nome, email, hashedPassword, req.loggedUser.id])

      if (!rowCount) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor!' });
      }

      delete req.user
      delete req.loggedUser
      return res.status(204).send()
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro interno do servidor" })
    }
  }
}