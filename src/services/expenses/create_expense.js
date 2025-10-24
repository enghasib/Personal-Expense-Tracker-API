const Expense = require("../../models/expense");
const User = require("../../models/user");

const createExpenseService = async (
  { title, amount, category, type, note },
  user
) => {
  type = type.toUpperCase();
  const is_large = type === "EXPENSE" && parseFloat(amount) > 5000;

  // create expense
  const expense = await Expense.create({
    user_id: user.id,
    title,
    amount,
    category,
    type,
    note,
    is_large,
  });

  return expense;
};

module.exports = { createExpenseService };
