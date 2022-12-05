const express = require("express")
const { logUserIn } = require("../controllers/user")
const { checkLoginBodyIsRight, checkIfEmailAlredyExists, checkPassword } = require("../middlewares/user")
const router = express.Router()

router.post(
  "/",
  checkLoginBodyIsRight,
  checkIfEmailAlredyExists,
  checkPassword,
  logUserIn
)

module.exports = router