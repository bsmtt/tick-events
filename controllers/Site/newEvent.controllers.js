const NewEvent = require("../../models/newEvent.model");

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
}

module.exports = new NewEventController();
