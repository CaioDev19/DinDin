const express = require("express")
const {
  listAllTransactions,
  listSpecificTransaction,
  registerTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../controllers/transactions")
const {
  checkRegisterBody,
  checkIfCategorieExists,
  checkTypeOfRegister,
  checkIfTransactionExists,
  checkIfTransactioBelongsToUser,
} = require("../middlewares/transactions")
const router = express.Router()

router
  .route("/")
  .get(listAllTransactions)
  .post(
    checkRegisterBody,
    checkIfCategorieExists,
    checkTypeOfRegister,
    registerTransaction
  )

router
  .route("/:id")
  .get(
    checkIfTransactionExists,
    checkIfTransactioBelongsToUser,
    listSpecificTransaction
  )
  .put(
    checkIfTransactionExists,
    checkRegisterBody,
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
