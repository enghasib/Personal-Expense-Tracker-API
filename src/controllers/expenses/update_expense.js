const { updateExpenseService } = require("../../services/expenses/index");

const updateExpenseController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const reqBody = req.body;

    const updatedExpense = await updateExpenseService(id, req.user, reqBody);

    res.status(200).json({
      message: "Expense updated successfully",
      updated_expense: updatedExpense,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateExpenseController,
};
