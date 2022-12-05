const dataBase = require("../config/dataBase")

module.exports = {
  async listAllCategories(req, res) {
    try {
      const { rows } = await dataBase.query(`
        SELECT *
        FROM categorias;
      `)

      return res.status(200).json(rows)
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro interno do servido" })
    }
  }
}