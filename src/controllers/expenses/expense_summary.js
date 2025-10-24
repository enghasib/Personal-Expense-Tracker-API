const { expenseSummaryService } = require("../../services/expenses/index");

const expenseSummaryController = async (req, res, next) => {
  try {
    const expenseSummary = await expenseSummaryService(req.user);

    res.status(200).json({
      ...expenseSummary,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  expenseSummaryController,
};
