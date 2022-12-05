const express = require("express")
const { logUserIn } = require("../controllers/user")
const { checkLoginBodyIsRight, checkIfEmailExists, checkPassword } = require("../middlewares/user")
const router = express.Router()

router.post(
  "/",
  checkLoginBodyIsRight,
  checkIfEmailExists,
  checkPassword,
  logUserIn
)

module.exports = router