const { getNewEventSchema } = require("../../validations/NewEventValidation");
const Joi = require("@hapi/joi");
const NewEvent = require("../../models/newEvent.model");
const i18n = require("../../config/i18n");

class NewEventController {
  index = async (req, res) => {
    try {
      const newEvents = await NewEvent.find();
      res.status(200).json({
        status: true,
        message: null,
        data: newEvents,
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
      const newEvent = await NewEvent.findById(id);
      res.status(200).json({
        status: true,
        message: null,
        data: newEvent,
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
      console.log(req.body);
      const data = await getNewEventSchema(req.headers).validateAsync(req.body);
      const newEvent = await new NewEvent(data);
      await newEvent.save();
      res.status(200).json({
        status: true,
        message: i18n.__("event_created"),
        data: newEvent,
      });
    } catch (err) {
      let message =
        err instanceof Joi.ValidationError
          ? err.details[0].message
          : err.message;
      res.status(422).json({
        status: false,
        data: message,
        message: "error in creating",
      });
    }
  };

  update = async (req, res) => {
    try {
      let id = req.params.id;
      const data = await getHostSchema(req).validateAsync(req.body);
      const newEvent = await NewEvent.updateOne({ _id: id }, data);

      res.status(200).json({
        status: true,
        message: i18n.__("event_updated"),
        data: newEvent,
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
}

module.exports = new NewEventController();
