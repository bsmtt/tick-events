const { getNewEventSchema } = require("../../validations/NewEventValidation");
const Joi = require("@hapi/joi");
const NewEvent = require("../../models/newEvent.model");
const i18n = require("../../config/i18n");

class NewEventController {
  store = async (req, res) => {
    try {
      console.log(req.body);
      const data = await getNewEventSchema(req.headers).validateAsync(req.body);
      const newEvent = await new NewEvent(data);
      await newEvent.save()
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
        message: "error in log in",
      });
    }
  };
}

module.exports = new NewEventController();
