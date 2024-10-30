const Joi = require("@hapi/joi");
const Booking = require("../../models/booking.model");
const i18n = require("../../config/i18n");

class BookController {
  store = async (req, res) => {
    try {
      const event_id = req.params.id;
      const data = { event_id: event_id, user_id: req.admin._id };
      console.log(data);
      const booking = await new Booking(data);
      await booking.save();

      res.status(200).json({
        status: true,
        message: i18n.__("Booked"),
        data: booking,
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

  index = async (req, res) => {
    try {
      const data = { user_id: req.admin._id };
      const bookings = await Booking.find(data).populate("event_id");

      res.status(200).json({
        status: true,
        message: i18n.__("bookings"),
        data: bookings,
      });
    } catch (err) {
      let message = err.message;
      res.status(422).json({
        status: false,
        data: message,
        message: err,
      });
    }
  };
}

module.exports = new BookController();
