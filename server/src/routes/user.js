const express = require("express")
const router = express.Router()
const {
  checkIfSignUpBodyIsRight,
  checkIfEmailAlredyExists,
  checkLoginBodyIsRight,
  checkPassword
} = require("../middlewares/user")
const {
  signUserUp,
  logUserIn
} = require("../controllers/user")

router
  .post(
    "/usuario",
    checkIfSignUpBodyIsRight,
    checkIfEmailAlredyExists,
    signUserUp
  )
  .post(
    "/login",
    checkLoginBodyIsRight,
    checkIfEmailAlredyExists,
    checkPassword,
    logUserIn
  )


module.exports = router