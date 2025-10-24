const uuid = require("uuid");
const db = require("../config/db");

class User {
  static async create({ username, email, password }) {
    const result = await db.query(
      "INSERT INTO users (id, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [uuid.v4(), username, email, password]
    );
    if (result.rowCount === 0) return null;
    return result.rows[0];
  }

  static async findUserByEmail(email) {
    const query =
      "SELECT (id, username, email, password) FROM users WHERE email = $1";
    const result = await db.query(query, [email]);

    if (result.rowCount === 0) return null;

    let userObj = parseRowToObject(result.rows[0].row);
    return userObj;
  }
}

function parseRowToObject(rowString) {
  const cleaned = rowString.replace(/[()]/g, "").trim();
  const parts = cleaned.split(",");

  const obj = {
    id: parts[0],
    username: parts[1],
    email: parts[2],
    password: parts.slice(3).join(","), // handle potential commas in password hash
  };

  return obj;
}

module.exports = User;
