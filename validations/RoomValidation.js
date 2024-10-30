const Joi = require("@hapi/joi");
const Room = require("../models/room.model");
const i18n = require("../config/i18n");

function RoomValidation(req) {
  const RoomSchema = Joi.object({
    name: Joi.string()
      .min(2)
      .required()
      .messages({
        "string.empty": i18n.__("name_is_required"),
        "any.required": i18n.__("name_is_required"),
      }),
    description: Joi.string().allow('').optional(),
    capacity: Joi.number()
      .min(2)
      .required()
      .messages({
        "number.empty": i18n.__("capacityn_is_required"),
        "any.required": "capacity is required",
      }),
  });
  return RoomSchema;
}
module.exports = {
  RoomValidation,
};
