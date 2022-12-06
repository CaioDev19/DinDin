const { knex } = require("../config/dataBase")

module.exports = {
  async listAllCategories(_, res) {
    try {
      const categories = await knex("categorias")
      return res.status(200).json(categories)
    } catch {
      return res.status(500).json({ mensagem: "Erro interno do servido" })
    }
  },
}
