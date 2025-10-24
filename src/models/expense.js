const uuid = require("uuid");
const db = require("../config/db");

class Expense {
  static async create({
    user_id,
    title,
    amount,
    category,
    type,
    note,
    is_large,
  }) {
    const result = await db.query(
      ` INSERT INTO expenses (
        id,
        user_id,
        title,
        amount,
        category,
        type,
        note,
        is_large
     ) 
     VALUES ($1, $2, $3, $4, $5,$6, $7, $8) RETURNING *`,
      [
        uuid.v4(),
        user_id,
        title,
        amount,
        category,
        type,
        note || null,
        is_large,
      ]
    );

    return result.rows[0];
  }

  static async Select({
    user_id,
    params: { page = 1, limit = 10, type, category },
  }) {
    let offset = (page - 1) * limit;

    let query = "SELECT * FROM expenses WHERE user_id = $1";
    const params = [user_id];

    if (type) {
      params.push(type);
      query += ` AND type = $${params.length}`;
    }
    if (category) {
      params.push(category);
      query += ` AND category = $${params.length}`;
    }

    query += " ORDER BY created_at DESC";

    if (limit) {
      params.push(limit);
      query += ` LIMIT $${params.length}`;
    }
    if (page) {
      params.push(offset);
      query += ` OFFSET $${params.length}`;
    }

    const result = await db.query(query, params);

    return result.rows;
  }

  static async GetSingleExpenseById(expenseId) {
    // get current data
    const result = await db.query("SELECT * FROM expenses WHERE id = $1", [
      expenseId,
    ]);
    if (result.rowCount === 0) {
      return null;
    }
    return result.rows[0];
  }

  static async GetExpenseByIdAndUpdate(id, updatedData) {
    const savedExpense = await this.GetSingleExpenseById(id);
    if (!savedExpense) {
      return null;
    }

    const updated = {
      title: updatedData?.title ?? savedExpense.title,
      amount: updatedData?.amount ?? savedExpense.amount,
      category: updatedData?.category ?? savedExpense.category,
      type: updatedData?.type ?? savedExpense.type,
      note: updatedData?.note ?? savedExpense.note,
    };
    const is_large =
      updated.type.toUpperCase() === "EXPENSE" &&
      parseFloat(updated.amount) > 5000;
    const result = await db.query(
      `UPDATE expenses
       SET title = $1, amount = $2, category = $3, type = $4, note = $5, is_large = $6
       WHERE id = $7 RETURNING *`,
      [
        updated.title,
        updated.amount,
        updated.category,
        updated.type.toUpperCase(),
        updated.note,
        is_large,
        id,
      ]
    );
    if (result.rowCount === 0) {
      return null;
    }
    return result.rows[0];
  }

  static async DeleteExpenseById(id) {
    const result = await db.query(
      "DELETE FROM expenses WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0) return false;
    return true;
  }

  static async AccountSummary(user_id) {
    const incomeRes = await db.query(
      "SELECT COALESCE(SUM(amount), 0) AS total_income FROM expenses WHERE user_id = $1 AND type = 'INCOME'",
      [user_id]
    );
    const expenseRes = await db.query(
      "SELECT COALESCE(SUM(amount), 0) AS total_expense FROM expenses WHERE user_id = $1 AND type = 'EXPENSE'",
      [user_id]
    );

    const totalIncome = parseFloat(incomeRes.rows[0].total_income);
    const totalExpense = parseFloat(expenseRes.rows[0].total_expense);
    const currentBalance = totalIncome - totalExpense;

    return {
      totalIncome: totalIncome,
      totalExpenses: totalExpense,
      balance: currentBalance,
    };
  }
}

module.exports = Expense;
