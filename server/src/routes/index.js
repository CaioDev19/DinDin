const express = require("express")
const router = express.Router()
const userRouter = require("./user")

router.use("/usuario", userRouter)

module.exports = router