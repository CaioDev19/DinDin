function validade(schema) {
  return async function (req, res, next) {
    if (req.body.email) {
      req.body.email.trim()
    }
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      })
      return next()
    } catch (error) {
      if (error.errors) {
        return res.status(400).json({ mensagem: error.message })
      }
      return res.status(500).json({ mensagem: "Erro interno do servidor." })
    }
  }
}

module.exports = { validade }
