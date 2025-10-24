const User = require("../../models/user");
const { badRequest } = require("../../utils/error");
const { compareHash } = require("../../utils/pass_hash");

const loginUserService = async ({ email, password }) => {
  //find user from db
  const user = await User.findUserByEmail(email);
  if (!user) {
    console.log("err log: Wrong login credentials!");
    throw badRequest();
  }

  // compare password
  passwordIsValid = await compareHash(password, user.password);
  if (!passwordIsValid) {
    console.log("err log: login credentials not match!");
    throw badRequest();
  }

  return {
    id: user.id,
    username: user.username,
    email: user.email,
  };
};

module.exports = {
  loginUserService,
};
