function checkIfFieldsWereSent(body, fields, res) {
  for (let field of fields) {
    if (!body[field]) {
      return res.status(400).json({
        mensagem: "Todos os campos obrigatórios devem ser informados.",
      })
    }
  }
  return false
}

module.exports = {
  checkIfFieldsWereSent,
}
