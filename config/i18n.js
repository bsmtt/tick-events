const i18n = require('i18n');
const path = require('path');

i18n.configure({
    locales: ['en', 'ar'],
    directory: path.join(__dirname, '..', 'locales'),
    defaultLocale: 'en',
    queryParameter : 'accept-language',
    objectNotation: true,
    logWarnFn: function (msg) {
        console.warn(msg);
    },
    logErrorFn: function (msg) {
        console.error(msg);
    },
});

module.exports = i18n;