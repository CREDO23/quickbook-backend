import * as joi from "joi";

export const registerValidation = joi.object({
  username: joi.string().required(),
  email: joi.string().required().email(),
  password: joi.string().required(),
  proffession: joi.string(),
  phoneNumber: joi.string().required(),
  firstname: joi.string(),
  lastname: joi.string(),
  description: joi.string(),
  gender: joi.string(),
  avatar: joi.string(),
  isOnline: joi.boolean().default(false),
});

export const loginValidation = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});

export const userUpdateValidation = joi.object({
  email: joi.string().email(),
  password: joi.string(),
  proffession: joi.string(),
  phoneNumber: joi.string(),
  firstname: joi.string(),
  lastname: joi.string(),
  description: joi.string(),
  gender: joi.string(),
  avatar: joi.string(),
  isOnline: joi.boolean(),
});
