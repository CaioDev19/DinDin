function checkIfFieldsWereSent(body, fields, res) {
  for (let field of fields) {
    if (field === "senha" && !body[field]) {
      return res.status(400).json({ mensagem: "A senha é obrigatório" })
    }
    if (!body[field]) {
      return res.status(400).json({ mensagem: `O ${field} é obrigatório` })
    }
  }
  return false
}

module.exports = {
  checkIfFieldsWereSent
}