const { verifyTokenJwt } = require("../utils/jwt")
const { isInTheDataBase } = require("../utils/db")

module.exports = {
  async checkToken(req, res, next) {
    const headerAuth = req.headers.authorization

    if (!headerAuth)
      return res.status(401).json({ mensagem: "O token é obrigatório" })

    const token = headerAuth.split(" ")[1]

    try {
      const payLoad = await verifyTokenJwt(token, process.env.JWTSECRETKEY)

      if (!payLoad) {
        return res.status(500).json({ mensagem: "Erro interno do servidor" })
      }

      const { data, response } = await isInTheDataBase(
        { id: payLoad.id },
        "usuarios"
      )

      if (!response) {
        return res.status(401).json({
          mensagem:
            "Para acessar este recurso um token de autenticação válido deve ser enviado.",
        })
      }

      const { senha: _, ...userData } = data

      req.loggedUser = userData

      next()
    } catch {
      return res.status(401).json({
        mensagem:
          "Para acessar este recurso um token de autenticação válido deve ser enviado.",
      })
    }
  },
}
