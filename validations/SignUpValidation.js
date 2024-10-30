const Joi = require('@hapi/joi');
const User = require('../models/user.model');
const i18n = require('../config/i18n');

function getSignUpSchema(headers) {
    const lang = headers['accept-language']
    const SignUpSchema = Joi.object({
        password: Joi.string().min(6).required().messages({
                'string.empty': i18n.__('password_is_required', lang),
                'any.required': 'password is required'
            }),
        username: Joi.string().min(2).required().external(async(value) => {
                result = await User.findOne({username: value})
                console.log(result);
                if (result) throw new Joi.ValidationError(
                                        'Username already exists', 
                                        [
                                            {
                                                message: i18n.__('username_already_exists')
                                            }
                                        ]
                                    );
            }).options({ abortEarly: false }).messages({
                'string.empty': 'Name is required',
                'any.required': 'Name is required',
            }),
    })
    return SignUpSchema

}
module.exports = {
    getSignUpSchema
}