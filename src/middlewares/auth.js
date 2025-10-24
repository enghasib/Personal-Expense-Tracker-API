const { decodeToken } = require("../utils/token");
const User = require("./../models/user");

const authentication = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = decodeToken(token);
    const validateUser = await User.findUserByEmail(decoded.email);
    if (!validateUser) {
      return res.status(401).json({ error: "User not valid" });
    }

    req.user = {
      id: validateUser.id,
      username: validateUser.username,
      email: validateUser.email,
    };

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authentication;
