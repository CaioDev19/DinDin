const express = require("express")
const {
  listAllTransactions,
  listSpecificTransaction,
  registerTransaction,
  updateTransaction,
  deleteTransaction,
  showBalance,
} = require("../controllers/transactions")
const {
  checkIfCategorieExists,
  checkTypeOfRegister,
  checkIfTransactionExists,
  checkIfTransactioBelongsToUser,
} = require("../middlewares/transactions")
const { validade } = require("../middlewares/validate")
const { transactionSchema } = require("../validators/transactionSchema")
const router = express.Router()

router
  .route("/")
  .get(listAllTransactions)
  .post(
    validade(transactionSchema),
    checkIfCategorieExists,
    checkTypeOfRegister,
    registerTransaction
  )

router.get("/extrato", showBalance)

router
  .route("/:id")
  .get(
    checkIfTransactionExists,
    checkIfTransactioBelongsToUser,
    listSpecificTransaction
  )
  .put(
    checkIfTransactionExists,
    validade(transactionSchema),
    checkIfTransactioBelongsToUser,
    checkIfCategorieExists,
    checkTypeOfRegister,
    updateTransaction
  )
  .delete(
    checkIfTransactionExists,
    checkIfTransactioBelongsToUser,
    deleteTransaction
  )

module.exports = router
