const express = require("express")
const router = express.Router()
const {
  checkIfFieldsWereSent,
  checkIfEmailAlredyExists
} = require("../middlewares/user")
const { signUserUp } = require("../controllers/user")

router.post(
  "/",
  checkIfFieldsWereSent,
  checkIfEmailAlredyExists,
  signUserUp
)

module.exports = router