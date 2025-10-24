const { userProfileService } = require("../../services/user/index");

const userProfileController = async (req, res, next) => {
  try {
    const user = await userProfileService(req.user);
    res.status(200).json({
      profile: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userProfileController,
};
