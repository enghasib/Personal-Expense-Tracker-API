const User = require("../../models/user");

const userProfileService = async (usr) => {
  const user = await User.findUserByEmail(usr.email);
  return {
    id: user.id,
    username: user.username,
    email: user.email,
  };
};

module.exports = {
  userProfileService,
};
