const validator = require("validator");
const error = require("../../utils/error");
const { generateJwtToken } = require("../../utils/token");
const { loginUserService } = require("../../services/auth/index");

const loginUserController = async (req, res, next) => {
  try {
    // extract data from body
    let { email, password } = req.body;
    if (!email) {
      return error.badRequest("Email must not be empty!");
    }

    const user = await loginUserService({ email, password });
    // create jwt credentials
    const jwtPayload = {
      sub: user.id,
      username: user.username,
      email: user.email,
    };
    const token = generateJwtToken(jwtPayload);

    res.status(200).json({
      message: "login successful!",
      access_token: token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginUserController,
};
