const Room = require("../../models/room.model");

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
}

module.exports = new RoomController();