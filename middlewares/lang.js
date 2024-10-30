const i18n = require('../config/i18n');

lang = (req, res, next) => {
    const lang = req.headers["accept-language"] ?? 'en';
    i18n.setLocale(lang)
    console.log(req.getLocale());
    next(); 
}

module.exports = [
    lang
]