const Expense = require("../../models/expense");

const expenseListService = async ({ user, params }) => {
  const expense = await Expense.Select({
    user_id: user.id,
    params,
  });
  return expense;
};

module.exports = {
  expenseListService,
};
