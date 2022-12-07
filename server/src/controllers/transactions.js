const { knex } = require("../config/dataBase")

module.exports = {
  async listAllTransactions(req, res) {
    try {
      const transactions = await knex("transacoes")
        .join("categorias", "transacoes.categoria_id", "categorias.id")
        .select("transacoes.*", "categorias.descricao  as categoria_nome")
        .where("transacoes.usuario_id", req.loggedUser.id)
        .orderBy("transacoes.data", "asc")

      return res.status(200).json(transactions)
    } catch {
      return res.status(500).json({ mensagem: "Erro interno do servidor" })
    }
  },
  async listSpecificTransaction(req, res) {
    const { id } = req.params

    try {
      const transaction = await knex("transacoes")
        .join("categorias", "transacoes.categoria_id", "categorias.id")
        .select("transacoes.*", "categorias.descricao  as categoria_nome")
        .where("transacoes.id", Number(id))

      return res.status(200).json(transaction[0])
    } catch {
      return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }
  },
  async registerTransaction(req, res) {
    const { descricao, valor, data, categoria_id, tipo } = req.body

    try {
      const newUser = await knex("transacoes")
        .insert({
          valor,
          descricao,
          data,
          categoria_id,
          tipo,
          usuario_id: req.loggedUser.id,
        })
        .returning("*")

      if (newUser.length === 0) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
      }

      newUser[0].categoria_nome = req.category_name
      return res.status(201).json(newUser[0])
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }
  },
  async updateTransaction(req, res) {
    const { descricao, valor, data, categoria_id, tipo } = req.body
    const { id } = req.params

    try {
      const response = await knex("transacoes")
        .update({
          valor,
          descricao,
          data,
          categoria_id,
          tipo,
          usuario_id: req.loggedUser.id,
        })
        .where({ id: Number(id) })

      if (!response) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
      }
      return res.status(204).send()
    } catch {
      return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }
  },
  async deleteTransaction(req, res) {
    const { id } = req.params

    try {
      const response = await knex("transacoes")
        .del()
        .where({ id: Number(id) })

      if (!response) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
      }

      return res.status(204).send()
    } catch {
      return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }
  },
}
