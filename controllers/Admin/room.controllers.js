const { RoomValidation } = require("../../validations/RoomValidation");
const Joi = require("@hapi/joi");
const Room = require("../../models/room.model");
const i18n = require("../../config/i18n");

class RoomController {
  index = async (req, res) => {
    try {
      const rooms = await Room.find();
      res.status(200).json({
        status: true,
        message: null,
        data: rooms,
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
      const data = await RoomValidation(req.headers).validateAsync(req.body);
      const room = await new Room(data);
      await room.save();

      res.status(200).json({
        status: true,
        message: i18n.__("room_created"),
        data: room,
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

module.exports = new RoomController();
