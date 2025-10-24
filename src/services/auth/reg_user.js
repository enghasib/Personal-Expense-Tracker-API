const { hash } = require("../../utils/pass_hash");
const { badRequest, conflictError } = require("../../utils/error");
const User = require("../../models/user");

const regUserService = async ({ username, email, password }) => {
  try {
    password = await hash(password);
    const user = await User.create({ username, email, password });
    if (user === null) {
      throw badRequest();
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      created_at: user.created_at,
    };
  } catch (error) {
    if (error.code === "23505") {
      console.log("error log:", error.detail);
      throw conflictError();
    } else {
      throw badRequest();
    }
  }
};

module.exports = {
  regUserService,
};
