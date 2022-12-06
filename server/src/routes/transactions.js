const express = require("express")
const {
  listAllTransactions,
  listSpecificTransaction,
} = require("../controllers/transactions")
const router = express.Router()

router.get("/", listAllTransactions)
router.get("/:id", listSpecificTransaction)

module.exports = router
