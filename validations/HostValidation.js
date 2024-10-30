const Joi = require('@hapi/joi');
const Host = require('../models/host.model');
const i18n = require('../config/i18n');

function getHostSchema(req) {
    const lang = req.headers['accept-language']
    const put = req.method == 'PUT'
    const id = req.params.id

    const HostSchema = Joi.object({
        name: Joi.string().min(2).required().messages({
            'string.empty': i18n.__('name_is_required'),
            'any.required': i18n.__('name_is_required')
        }),
        description: Joi.string().min(2).required().messages({
            'string.empty': i18n.__('description_is_required'),
            'any.required': 'description is required'
        }),
        email: Joi.string().min(6).required().external(async(value) => {
            result =  put ? await Host.findOne({email: value, _id: { $ne: id }})  : await  Host.findOne({email: value})
            message = i18n.__('mobile_already_exists')
            console.log(result);
            if (result) throw new Joi.ValidationError('email already exists', [{message}]);
        }).messages({
            'string.empty': i18n.__('email_is_required'),
            'any.required': 'email is required'
        }),
        mobile: Joi.string().min(11).max(11).required().external(async(value) => {
                result = put ?  await Host.findOne({mobile: value, _id: { $ne: id }}) : await Host.findOne({mobile: value})
                message = i18n.__('mobile_already_exists')
                if (result) throw new Joi.ValidationError('mobile already exists', [{message}]);
            }).options({ abortEarly: false }).messages({
                'string.empty': 'mobile is required',
                'any.required': 'mobile is required',
            }),
    })
    return HostSchema

}
module.exports = {
    getHostSchema
}