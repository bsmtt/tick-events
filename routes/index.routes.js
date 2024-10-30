var express = require("express");
var router = express.Router();
const i18n = require("../config/i18n");

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log(req);
  req.setLocale("ar");
  const message = i18n.__("welcome");
  res.status(200).json({
    message: message,
  });
});

router.post("/lang", function (req, res, next) {
  try {
    console.log(req.getLocale());
    req.setLocale("en");
    const message = i18n.__("welcome");
    console.log(req.getLocale());
    res.status(200).json({
      message: "message",
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
      data: error.errors,
    });
  }
});

module.exports = router;
