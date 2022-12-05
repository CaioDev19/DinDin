const express = require("express")
const { listAllCategories } = require("../middlewares/categories")
const router = express.Router()

router.get("/", listAllCategories)

module.exports = router 