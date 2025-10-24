const { regUserService } = require("../../services/auth/index");
const validateUserInput = require("../../utils/validator");
const { badRequest } = require("../../utils/error");

const regUserController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const { isValid, errors } = validateUserInput(req.body);

    if (!isValid) {
      res.status(400).json(errors);
      return badRequest();
    }

    const user = await regUserService({ username, email, password });

    res.status(201).json({
      message: "User created successfully",
      link: {
        user: `/${user.id}`,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  regUserController,
};
