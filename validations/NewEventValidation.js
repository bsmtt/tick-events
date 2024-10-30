const Joi = require('@hapi/joi');
const Room = require('../models/room.model');
const Host = require('../models/host.model');
const Speaker = require('../models/speaker.model');
const i18n = require('../config/i18n');

function getNewEventSchema(headers) {
    const lang = headers['accept-language']

    const newEventSchema = Joi.object({
        name: Joi.string().min(2).required().messages({
            'string.empty': i18n.__('name_is_required', lang),
            'any.required': i18n.__('name_is_required', lang)
        }),
        start_date: Joi.date().min('1-1-2004').iso().required().messages({
            'string.empty': i18n.__('start_date_is_required', lang),
            'any.required': i18n.__('start_date_is_required', lang)
        }),
        capacity: Joi.number().min(2).required().messages({
            'number.empty': i18n.__('capacity_is_required', lang),
            'any.required': i18n.__('capacity_is_required', lang),
            'number.base': i18n.__('capacity_should_be_number')
        }),
        price: Joi.number().min(2).required().messages({
            'string.empty': i18n.__('price_is_required', lang),
            'any.required': i18n.__('price_is_required', lang)
        }),
        description: Joi.string().min(1).required().messages({
            'string.empty': i18n.__('description_is_required', lang),
            'any.required': i18n.__('description_is_required', lang)
        }),
        start_date: Joi.date().min(1).required().messages({
            'string.empty': i18n.__('start_date_is_required', lang),
            'any.required': i18n.__('start_date_is_required', lang)
        }),
        end_date: Joi.string().min(1).required().messages({
            'string.empty': i18n.__('end_date_is_required', lang),
            'any.required': i18n.__('end_date_is_required', lang)
        }),
        room_id: Joi.string().min(1).required().external(async(value) => {
                result = await Room.findOne({_id: value})
                if (!result) throw new Joi.ValidationError(
                                        'room does not exist', 
                                        [
                                            {
                                                message: i18n.__('room_does_not_exist')
                                            }
                                        ]
                                    );
            }).options({ abortEarly: false }).messages({
                'string.empty': i18n.__('room_id_is_required', lang),
                'any.required': i18n.__('room_id_is_required'),
            }),
        host_id: Joi.string().min(1).required().external(async(value) => {
                result = await Host.findOne({_id: value})
                if (!result) throw new Joi.ValidationError(
                                        'host does not exist', 
                                        [
                                            {
                                                message: i18n.__('host_does_not_exist')
                                            }
                                        ]
                                    );
            }).options({ abortEarly: false }).messages({
                'string.empty': i18n.__('host_id_is_required', lang),
                'any.required': i18n.__('host_id_is_required'),
            }),
        speaker_id: Joi.string().min(1).required().external(async(value) => {
                result = await Speaker.findOne({_id: value})
                if (!result) throw new Joi.ValidationError(
                                        'speaker does not exist', 
                                        [
                                            {
                                                message: i18n.__('speaker_does_not_exist')
                                            }
                                        ]
                                    );
            }).options({ abortEarly: false }).messages({
                'string.empty': i18n.__('speaker_id_is_required', lang),
                'any.required': i18n.__('speakert_id_is_required'),
            }),
    })
    return newEventSchema

}
module.exports = {
    getNewEventSchema
}