const Expense = require("../../models/expense");
const { internalServerError } = require("../../utils/error");

const expenseSummaryService = async (user) => {
  try {
    const accountSummary = await Expense.AccountSummary(user.id);
    if (!accountSummary) {
      throw internalServerError();
    }

    const balanceStatus = accountSummary.balance < 0 ? "Negative" : "Positive";

    return {
      ...accountSummary,
      balanceStatus,
    };
  } catch (error) {
    console.log("error log:", error.message);
    return error;
  }
};

module.exports = {
  expenseSummaryService,
};
