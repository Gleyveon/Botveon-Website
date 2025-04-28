import Joi from 'joi';

const discordIdPattern = /^[0-9]{17,20}$/;

export const joinSettingsSchema = Joi.object({
  joinRoles: Joi.array()
    .items(Joi.string().regex(discordIdPattern).message('Join role IDs must be strings with 17 to 20 numeric characters.'))
    .required()
    .messages({
      'array.base': 'Join roles must be an array of strings.',
      'array.empty': 'Join roles cannot be empty.',
    }),
  stickyRoles: Joi.array()
    .items(Joi.string().regex(discordIdPattern).message('Sticky role IDs must be strings with 17 to 20 numeric characters.'))
    .required()
    .messages({
      'array.base': 'Sticky roles must be an array of strings.',
      'array.empty': 'Sticky roles cannot be empty.',
    }),
  registration: Joi.object({
    channelID: Joi.string()
      .regex(discordIdPattern)
      .message('Channel ID must be a string with 17 to 20 numeric characters.'),
    messageID: Joi.string()
      .regex(discordIdPattern)
      .message('Message ID must be a string with 17 to 20 numeric characters.'),
    roleID: Joi.string()
      .regex(discordIdPattern)
      .message('Role ID must be a string with 17 to 20 numeric characters.'),
    message: Joi.string()
      .max(2000)
      .message('Message must not exceed 2000 characters.'),
    embed: Joi.object({
      title: Joi.string()
        .max(256)
        .message('Embed title must not exceed 256 characters.'),
      description: Joi.string()
        .max(4096)
        .message('Embed description must not exceed 4096 characters.'),
      url: Joi.string()
        .regex(/^(https?:\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}(\/\S*)?$/)
        .message('Embed URL must be a valid URL.'),
      color: Joi.number()
        .min(0)
        .max(16777215)
        .message('Embed color must be a number between 0 and 16777215.'),
      footer: Joi.object({
        text: Joi.string()
          .max(2048)
          .message('Footer text must not exceed 2048 characters.'),
        icon_url: Joi.string()
          .regex(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp|svg))$/)
          .message('Footer icon URL must be a valid image URL.'),
      }),
    }),
  }),
  welcomeChannel: Joi.object({
    channelID: Joi.string()
      .regex(discordIdPattern)
      .message('Channel ID must be a string with 17 to 20 numeric characters.'),
    message: Joi.string()
      .max(2000)
      .message('Message must not exceed 2000 characters.'),
    embed: Joi.object({
      title: Joi.string()
        .max(256)
        .message('Embed title must not exceed 256 characters.'),
      description: Joi.string()
        .max(4096)
        .message('Embed description must not exceed 4096 characters.'),
      url: Joi.string()
        .regex(/^(https?:\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}(\/\S*)?$/)
        .message('Embed URL must be a valid URL.'),
      color: Joi.number()
        .min(0)
        .max(16777215)
        .message('Embed color must be a number between 0 and 16777215.'),
      footer: Joi.object({
        text: Joi.string()
          .max(2048)
          .message('Footer text must not exceed 2048 characters.'),
        icon_url: Joi.string()
          .regex(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp|svg))$/)
          .message('Footer icon URL must be a valid image URL.'),
      }),
    }),
    includeUserAvatar: Joi.boolean()
      .messages({
        'boolean.base': 'Include user avatar must be a boolean.',
      }),
    sendImmediate: Joi.boolean()
      .messages({
        'boolean.base': 'Send immediate must be a boolean.',
      }),
  }),
  goodbyeChannel: Joi.object({
    channelID: Joi.string()
      .regex(discordIdPattern)
      .message('Channel ID must be a string with 17 to 20 numeric characters.'),
    message: Joi.string()
      .max(2000)
      .message('Message must not exceed 2000 characters.'),
    embed: Joi.object({
      title: Joi.string()
        .max(256)
        .message('Embed title must not exceed 256 characters.'),
      description: Joi.string()
        .max(4096)
        .message('Embed description must not exceed 4096 characters.'),
      url: Joi.string()
        .regex(/^(https?:\/\/)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}(\/\S*)?$/)
        .message('Embed URL must be a valid URL.'),
      color: Joi.number()
        .min(0)
        .max(16777215)
        .message('Embed color must be a number between 0 and 16777215.'),
      footer: Joi.object({
        text: Joi.string()
          .max(2048)
          .message('Footer text must not exceed 2048 characters.'),
        icon_url: Joi.string()
          .regex(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp|svg))$/)
          .message('Footer icon URL must be a valid image URL.'),
      }),
    }),
    includeUserAvatar: Joi.boolean()
      .messages({
        'boolean.base': 'Include user avatar must be a boolean.',
      }),
    sendImmediate: Joi.boolean()
      .messages({
        'boolean.base': 'Send immediate must be a boolean.',
      }),
  }),
  persistentRoles: Joi.boolean()
  .messages({
    'boolean.base': 'Persistent roles must be a boolean.',
  }),
});