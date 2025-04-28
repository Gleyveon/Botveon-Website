import Joi from 'joi';

const discordIdPattern = /^[0-9]{17,20}$/;

export const economySettingsSchema = Joi.object({
  currency: Joi.object({
    icon: Joi.string()
      .max(64)
      .message('Currency icon must not exceed 64 characters.'),
    nameSingular: Joi.string()
      .max(32)
      .message('Currency singular name must not exceed 32 characters.'),
    namePlural: Joi.string()
      .max(32)
      .message('Currency plural name must not exceed 32 characters.'),
  }),
  shopItems: Joi.array().items(
    Joi.object({
      itemID: Joi.string()
        .regex(discordIdPattern)
        .required()
        .messages({
          'string.pattern.base': 'Item ID must be a numeric string between 17 and 20 characters.',
          'any.required': 'Item ID is required.',
        }),
      name: Joi.string()
        .max(64)
        .allow(null) // Allow null values
        .optional()
        .messages({
          'string.max': 'Item name must not exceed 64 characters.',
        }),
      description: Joi.string()
        .max(256)
        .allow(null) // Allow null values
        .optional()
        .messages({
          'string.max': 'Item description must not exceed 256 characters.',
        }),
      category: Joi.string()
        .valid('role', 'channel', 'emoji', 'custom')
        .required()
        .messages({
          'any.only': 'Category must be one of: role, channel, emoji, custom.',
          'any.required': 'Category is required.',
        }),
      price: Joi.number()
        .min(0)
        .required()
        .messages({
          'number.min': 'Price must be a non-negative number.',
          'any.required': 'Price is required.',
        }),
    })
  )
    .messages({
      'array.base': 'Shop items must be an array of objects.',
    }),
});