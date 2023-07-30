import Joi from "joi";

export const postTrackSchema = Joi.object({
  frames: Joi.array().items({
    id: Joi.string().required(),
    imgData: Joi.string().base64().allow("").required(),
    duration: Joi.number().required(),
  }),
});

export const putTrackSchema = Joi.object({
  id: Joi.number(),
  frames: Joi.array().items({
    id: Joi.string().required(),
    imgData: Joi.string().base64().required(),
    duration: Joi.number().required(),
  }),
});
