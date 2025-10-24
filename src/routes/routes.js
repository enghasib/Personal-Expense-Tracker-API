const routers = require("express").Router();

const auth = require("../middlewares/auth");

// auth controllers
const {
  regUserController,
  loginUserController,
} = require("../controllers/auth/index");

// expense controllers
const {
  createExpenseController,
  expenseListController,
  updateExpenseController,
  deleteExpenseController,
  expenseSummaryController,
} = require("../controllers/expenses/index");

// user controllers
const { userProfileController } = require("../controllers/user/index");

// auth routes
routers.route("/auth/reg").post(regUserController);
routers.route("/auth/login").post(loginUserController);

// expense routes
routers.route("/expenses").post(auth, createExpenseController);
routers.route("/expenses").get(auth, expenseListController);
routers.route("/expenses/:id").patch(auth, updateExpenseController);
routers.route("/expenses/:id").delete(auth, deleteExpenseController);
routers.route("/expenses/summary").get(auth, expenseSummaryController);

// user routes
routers.route("/profile").get(auth, userProfileController);

module.exports = routers;
