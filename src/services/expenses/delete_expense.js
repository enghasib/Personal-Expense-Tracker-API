const Expense = require("../../models/expense");
const { authorizationError, badRequest } = require("../../utils/error");

const deleteExpenseService = async (id, user) => {
  try {
    const expense = await Expense.GetSingleExpenseById(id);
    if (expense === null) {
      throw badRequest("invalid params");
    }
    if (user.id !== expense.user_id) {
      throw authorizationError();
    }

    return await Expense.DeleteExpenseById(id);
  } catch (error) {
    console.log("error log:", error.message);
    throw error;
  }
};

module.exports = {
  deleteExpenseService,
};
