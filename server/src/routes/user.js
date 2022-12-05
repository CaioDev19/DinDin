const express = require("express")
const router = express.Router()
const {
  checkIfSignUpBodyIsRight,
  checkIfEmailExists,
} = require("../middlewares/user")
const {
  signUserUp,
  detailUser,
  updateUser
} = require("../controllers/user")
const { checkToken } = require("../middlewares/authorization")

router.post(
  "/",
  checkIfSignUpBodyIsRight,
  checkIfEmailExists,
  signUserUp
)

router.use(checkToken)

router.route("/")
  .get(
    detailUser
  )
  .put(
    checkIfSignUpBodyIsRight,
    checkIfEmailExists,
    updateUser
  )

module.exports = router