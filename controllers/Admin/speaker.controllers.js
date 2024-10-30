const Joi = require("@hapi/joi");
const Speaker = require("../../models/speaker.model");
const i18n = require("../../config/i18n");
const { SpeakerValidation } = require("../../validations/SpeakerValidation");

class speakerController {
  index = async (req, res) => {
    try {
      const speakers = await Speaker.find();
      res.status(200).json({
        status: true,
        message: null,
        data: speakers,
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

  store = async (req, res) => {
    try {
      const data = await SpeakerValidation(req.headers).validateAsync(req.body);
      const speaker = await new Speaker(data);
      await speaker.save();

      res.status(200).json({
        status: true,
        message: i18n.__("speaker_created"),
        data: speaker,
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
}

module.exports = new speakerController();
