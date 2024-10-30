const Joi = require('@hapi/joi');
const Admin = require('../models/admin.model');
const i18n = require('../config/i18n');

function getAdminSchema(headers) {
    const lang = headers['accept-language']

    const adminSchema = Joi.object({
        name: Joi.string().min(2).required().messages({
            'string.empty': i18n.__('name_is_required', lang),
            'any.required': 'Name is required'
        }),
        password: Joi.string().min(6).required().messages({
                'string.empty': i18n.__('password_is_required', lang),
                'any.required': 'Name is required'
            }),
        mobile: Joi.string().min(11).required().external(async(value) => {
                result = await Admin.findOne({mobile: value})
                console.log(result);
                if (result) throw new Joi.ValidationError(
                                        'mobile already exists', 
                                        [
                                            {
                                                message: i18n.__('mobile_already_exists')
                                            }
                                        ]
                                    );
            }).options({ abortEarly: false }).messages({
                'string.empty': 'mobile is required',
                'any.required': 'mobile is required',
            }),
    })
    return adminSchema

}
module.exports = {
    getAdminSchema
}