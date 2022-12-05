const express = require("express")
const router = express.Router()
const userRouter = require("./user")
const loginRouter = require("./login")
const categoriesRouter = require("./categories")
const { checkToken } = require("../middlewares/authorization")

router
  .use("/usuario", userRouter)
  .use("/login", loginRouter)
  .use(checkToken)
  .use("/categoria", categoriesRouter)

module.exports = router