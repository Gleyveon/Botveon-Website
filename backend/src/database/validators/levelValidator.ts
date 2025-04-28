import Joi from 'joi';

const discordIdPattern = /^[0-9]{17,20}$/;

export const levelSettingsSchema = Joi.object({
  levelUpMessages: Joi.boolean()
    .messages({
      'boolean.base': 'LevelUpMessages must be a boolean.',
    }),

  levelUpChannel: Joi.string()
    .regex(discordIdPattern)
    .messages({
      'string.pattern.base': 'LevelUpChannel must be a numeric string between 17 and 20 characters.',
    }),

  levelUpRoles: Joi.array()
    .items(
      Joi.object({
        roleID: Joi.string()
          .regex(discordIdPattern)
          .required()
          .messages({
            'string.pattern.base': 'Role ID must be a numeric string between 17 and 20 characters.',
            'any.required': 'Role ID is required.',
          }),
        level: Joi.number()
          .integer()
          .min(1)
          .required()
          .messages({
            'number.base': 'Level must be a number.',
            'number.min': 'Level must be at least 1.',
            'number.integer': 'Level must be an integer.',
            'any.required': 'Level is required.',
          }),
      })
    )
    .messages({
      'array.base': 'LevelUpRoles must be an array of objects.',
    }),

  boostRoles: Joi.array()
    .items(
      Joi.object({
        roleID: Joi.string()
          .regex(discordIdPattern)
          .required()
          .messages({
            'string.pattern.base': 'Role ID must be a numeric string between 17 and 20 characters.',
            'any.required': 'Role ID is required.',
          }),
        boost: Joi.number()
          .min(0)
          .max(9999)
          .required()
          .messages({
            'number.base': 'Boost must be a number.',
            'number.min': 'Boost must be at least 0.',
            'number.max': 'Boost must be under 9999.',
            'any.required': 'Boost is required.',
          }),
        stackable: Joi.boolean()
          .messages({
            'boolean.base': 'Stackable must be a boolean.',
          }),
        equation: Joi.string()
          .valid('add', 'multiply')
          .messages({
            'any.only': 'Equation must be one of: add, multiply.',
            'any.required': 'Equation is required.',
          }),
      })
    )
    .messages({
      'array.base': 'BoostRoles must be an array of objects.',
    }),
});