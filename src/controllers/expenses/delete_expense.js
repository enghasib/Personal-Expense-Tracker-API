const { deleteExpenseService } = require("../../services/expenses/index");
const { badRequest } = require("../../utils/error");

const deleteExpenseController = async (req, res, next) => {
  try {
    const expenseId = req.params.id;
    await deleteExpenseService(expenseId, req.user);

    res.status(204).json({
      message: "expense deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  deleteExpenseController,
};
