const express = require("express")
const router = express.Router()
const {
  checkIfSignUpBodyIsRight,
  checkIfEmailAlredyExists,
} = require("../middlewares/user")
const {
  signUserUp,
  detailUser
} = require("../controllers/user")
const { checkToken } = require("../middlewares/authorization")

router.route("/")
  .post(
    checkIfSignUpBodyIsRight,
    checkIfEmailAlredyExists,
    signUserUp
  )
  .get(
    checkToken,
    detailUser
  )

module.exports = router