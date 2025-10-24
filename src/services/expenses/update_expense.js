const Expense = require("../../models/expense");
const { authorizationError, badRequest } = require("../../utils/error");

const updateExpenseService = async (id, user, updatedData) => {
  const expense = await Expense.GetSingleExpenseById(id);

  if (expense.user_id !== user.id) {
    throw authorizationError("Permission denied!");
  }

  const updatedExpense = await Expense.GetExpenseByIdAndUpdate(id, updatedData);

  if (updatedExpense === null) {
    console.log("err log: can't update expense!");
    throw badRequest("invalid user input!");
  }
};

module.exports = {
  updateExpenseService,
};
