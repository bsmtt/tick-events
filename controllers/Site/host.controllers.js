const { getHostSchema } = require("../../validations/HostValidation");
const Host = require("../../models/host.model");
const i18n = require("../../config/i18n");
const Joi = require("@hapi/joi");

class HostController {
  index = async (req, res) => {
    try {
      const hosts = await Host.find();
      res.status(200).json({
        status: true,
        message: null,
        data: hosts,
      });
    } catch (err) {
      let message = err.message;
      res.status(422).json({
        status: false,
        data: message,
        message: message,
      });
    }
  };

  show = async (req, res) => {
    try {
      let id = req.params.id;
      const host = await Host.findById(id);
      res.status(200).json({
        status: true,
        message: null,
        data: host,
      });
    } catch (err) {
      let message = err.message;
      if (err.name == "CastError") message = "Not Found";
      res.status(422).json({
        status: false,
        data: message,
        message: err,
      });
    }
  };
}

module.exports = new HostController();
