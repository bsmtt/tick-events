const Joi = require("@hapi/joi");
const i18n = require("../config/i18n");

function SpeakerValidation(req) {
  const SpeakerSchema = Joi.object({
    name: Joi.string()
      .min(2)
      .required()
      .messages({
        "string.empty": i18n.__("name_is_required"),
        "any.required": i18n.__("name_is_required"),
      }),
    description: Joi.string()
      .required()
      .messages({
        "string.empty": i18n.__("description_is_required"),
        "any.required": "description is required",
      }),
  });
  return SpeakerSchema;
}
module.exports = {
  SpeakerValidation,
};
