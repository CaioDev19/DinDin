const express = require("express")
const {
  listAllTransactions,
  listSpecificTransaction,
  registerTransaction,
} = require("../controllers/transactions")
const {
  checkRegisterBody,
  checkIfCategorieExists,
  checkTypeOfRegister,
} = require("../middlewares/transactions")
const router = express.Router()

router.get("/", listAllTransactions)
router.get("/:id", listSpecificTransaction)
router.post(
  "/",
  checkRegisterBody,
  checkIfCategorieExists,
  checkTypeOfRegister,
  registerTransaction
)

module.exports = router
