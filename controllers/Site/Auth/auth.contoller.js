const { getSignUpSchema } = require("../../../validations/SignUpValidation");
const Joi = require("@hapi/joi");
const User = require("../../../models/user.model");

class AuthController {
  signUp = async (req, res) => {
    try {
      const { username, password } = await getSignUpSchema(
        req.headers
      ).validateAsync(req.body);
      const user = new User({ username, password });
      await user.save();

      res.status(200).json({
        error: false,
        message: "sign up",
        data: user,
      });
    } catch (err) {
      const message =
        err instanceof Joi.ValidationError
          ? err.details[0].message
          : err.message;
      res.status(500).json({
        error: true,
        message: message,
        data: err.details,
      });
    }
  };
}

module.exports = new AuthController();
