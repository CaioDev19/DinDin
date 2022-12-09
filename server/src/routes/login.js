const express = require("express")
const { logUserIn } = require("../controllers/user")
const { checkIfEmailExists, checkPassword } = require("../middlewares/user")
const { validade } = require("../middlewares/validate")
const { loginShema } = require("../validators/loginSchema")
const router = express.Router()

router.post(
  "/",
  validade(loginShema),
  checkIfEmailExists,
  checkPassword,
  logUserIn
)

module.exports = router
