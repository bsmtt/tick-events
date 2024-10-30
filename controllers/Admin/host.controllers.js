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

  store = async (req, res) => {
    try {
      const data = await getHostSchema(req).validateAsync(req.body);
      const host = await new Host(data);
      await host.save();

      res.status(200).json({
        status: true,
        message: i18n.__("host_created"),
        data: host,
      });
    } catch (err) {
      let message =
        err instanceof Joi.ValidationError
          ? err.details[0].message
          : err.message;
      res.status(422).json({
        status: false,
        data: message,
        message: err.details,
      });
    }
  };

  update = async (req, res) => {
    try {
      let id = req.params.id;
      const data = await getHostSchema(req).validateAsync(req.body);
      const host = await Host.updateOne({ _id: id }, data);

      res.status(200).json({
        status: true,
        message: i18n.__("host_updated"),
        data: host,
      });
    } catch (err) {
      let message =
        err instanceof Joi.ValidationError
          ? err.details[0].message
          : err.message;
      res.status(422).json({
        status: false,
        data: message,
        message: message,
      });
    }
  };

  delete = async (req, res) => {
    try {
      let id = req.params.id;
      const host = await Host.findOneAndDelete(id);
      res.status(200).json({
        status: true,
        message: i18n.__("host_deleted"),
        data: host,
      });
    } catch (err) {
      let message = err.message;
      res.status(422).json({
        status: false,
        message: message,
        data: err,
      });
    }
  };
}

module.exports = new HostController();
