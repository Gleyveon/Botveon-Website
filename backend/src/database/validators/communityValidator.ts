import Joi from 'joi';

const discordIdPattern = /^[0-9]{17,20}$/;

export const communitySettingsSchema = Joi.object({
  threadChannels: Joi.array()
    .items(Joi.string().regex(discordIdPattern).message('Thread channel IDs must be strings with 17 to 20 numeric characters.'))
    .required()
    .messages({
      'array.base': 'Thread channels must be an array of strings.',
      'array.empty': 'Thread channels cannot be empty.',
    }),
  upvoteChannels: Joi.array()
    .items(Joi.string().regex(discordIdPattern).message('Upvote channel IDs must be strings with 17 to 20 numeric characters.'))
    .required()
    .messages({
      'array.base': 'Upvote channels must be an array of strings.',
      'array.empty': 'Upvote channels cannot be empty.',
    }),
  bumpChannel: Joi.string()
    .regex(discordIdPattern)
    .message('Bump channel ID must be a string with 17 to 20 numeric characters.')
});