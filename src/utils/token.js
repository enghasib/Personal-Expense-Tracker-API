const jwt = require("jsonwebtoken");
//JWT secret key
const secret = process.env.ACCESS_TOKEN_SECRET;

//create token
const generateJwtToken = (payload) => {
  const token = jwt.sign(payload, secret, {
    expiresIn: "2 days",
    algorithm: "HS256",
  });
  return token;
};

//verify token
const decodeToken = (token) => {
  const decoded = jwt.verify(token, secret, { algorithms: ["HS256"] });
  return decoded;
};

module.exports = {
  generateJwtToken,
  decodeToken,
};
