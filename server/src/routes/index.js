const express = require("express")
const router = express.Router()
const userRouter = require("./user")
const loginRouter = require("./login")

router
  .use("/usuario", userRouter)
  .use("/login", loginRouter)

module.exports = router