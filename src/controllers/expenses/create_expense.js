const { createExpenseService } = require("../../services/expenses/index");

const createExpenseController = async (req, res, next) => {
  try {
    const { title, amount, category, type, note } = req.body;

    if (!title || !amount || !category || !type) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const expense = await createExpenseService(
      {
        title,
        amount,
        category,
        type,
        note,
      },
      req.user
    );

    res.status(201).json({
      message: "Expense created",
      expense,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createExpenseController,
};
