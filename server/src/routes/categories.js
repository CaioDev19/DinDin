const express = require("express")
const { listAllCategories } = require("../controllers/categories")
const router = express.Router()

router.get("/", listAllCategories)

module.exports = router
