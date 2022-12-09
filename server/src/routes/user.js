const express = require("express")
const router = express.Router()
const { checkIfEmailExists } = require("../middlewares/user")
const { signUserUp, detailUser, updateUser } = require("../controllers/user")
const { checkToken } = require("../middlewares/authorization")
const { validade } = require("../middlewares/validate")
const { userSchema } = require("../validators/userSchema")

router.post("/", validade(userSchema), checkIfEmailExists, signUserUp)

router.use(checkToken)

router
  .route("/")
  .get(detailUser)
  .put(validade(userSchema), checkIfEmailExists, updateUser)

module.exports = router
