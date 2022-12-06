const { verifyTokenJwt } = require("../utils/jwt")
const { isInTheUserDataBase } = require("../utils/user")

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

      const { user } = await isInTheUserDataBase("id", payLoad.id, "usuarios")

      if (!user) {
        return res
          .status(401)
          .json({
            mensagem:
              "Para acessar este recurso um token de autenticação válido deve ser enviado.",
          })
      }

      const { senha: _, ...userData } = user

      req.loggedUser = userData

      next()
    } catch {
      return res
        .status(401)
        .json({
          mensagem:
            "Para acessar este recurso um token de autenticação válido deve ser enviado.",
        })
    }
  },
}
