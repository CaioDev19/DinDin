const { knex } = require("../config/dataBase")

module.exports = {
  async listAllTransactions(req, res) {
    try {
      const transactions = await knex("transacoes")
        .join("categorias", "transacoes.categoria_id", "categorias.id")
        .select("transacoes.*", "categorias.descricao  as categoria_nome")
        .where("transacoes.usuario_id", req.loggedUser.id)
        .orderBy("transacoes.data", "asc")

      delete req.loggedUser
      res.status(200).json(transactions)
    } catch {
      delete req.loggedUser
      res.status(500).json({ mensagem: "Erro interno do servidor" })
    }
  },
  async listSpecificTransaction(req, res) {
    const { id } = req.params

    try {
      const transaction = await knex("transacoes")
        .join("categorias", "transacoes.categoria_id", "categorias.id")
        .select("transacoes.*", "categorias.descricao  as categoria_nome")
        .where("transacoes.id", Number(id))

      if (transaction.length === 0) {
        return res.status(404).json({ mensagem: "Transação não encontrada." })
      }

      if (transaction[0].usuario_id !== req.loggedUser.id) {
        return res
          .status(403)
          .json({ mensagem: "Transação não pertence ao usuário logado." })
      }

      delete req.loggedUser
      res.status(200).json(transaction)
    } catch {
      delete req.loggedUser
      res.status(500).json({ mensagem: "Erro interno do servidor." })
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
        delete req.loggedUser
        return res.status(500).json({ mensagem: "Erro interno do servidor." })
      }

      res.status(201).json(newUser[0])
    } catch {
      delete req.loggedUser
      res.status(500).json({ mensagem: "Erro interno do servidor." })
    }
  },
}
