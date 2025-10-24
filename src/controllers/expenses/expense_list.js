const { expenseListService } = require("../../services/expenses/index");
const pagination = require("../../utils/pagination");

const expenseListController = async (req, res, next) => {
  try {
    const { page, limit, type, category } = req.query;

    let expense_list = await expenseListService({
      user: req.user,
      params: {
        page,
        limit,
        type,
        category,
      },
    });

    res.status(200).json({
      message: "list of account",
      list_of_expenses: expense_list,
      pagination: pagination(page, limit, expense_list.length),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  expenseListController,
};
