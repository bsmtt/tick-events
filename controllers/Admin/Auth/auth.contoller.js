const { getAdminSchema } = require("../../../validations/AdminValidation");
const Joi = require("@hapi/joi");
const Admin = require("../../../models/admin.model");

class AuthController {
  signUp = async (req, res, next) => {
    try {
      console.log(req.body);
      console.log(req.headers["content-type"]);
      const { name, mobile, password } = await getAdminSchema(
        req.headers
      ).validateAsync(req.body);
      const admin = new Admin({ name, mobile, password });
      await admin.save();

      res.status(200).json({
        error: false,
        message: "sign up",
        data: admin,
      });
    } catch (err) {
      let message =
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

  signIn = async (req, res) => {
    try {
      const admin = await Admin.logIn(req.body.mobile, req.body.password);
      const token = await admin.generateAuthToken();
      res.status(200).json({
        status: true,
        data: { admin, token },
        message: "logged in",
      });
    } catch (err) {
      let message =
        err instanceof Joi.ValidationError
          ? err.details[0].message
          : err.message;
      res.status(500).json({
        status: false,
        data: message,
        message: "error in log in",
      });
    }
  };
}

module.exports = new AuthController();
