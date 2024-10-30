const Speaker = require("../../models/speaker.model");

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

}

module.exports = new speakerController();
