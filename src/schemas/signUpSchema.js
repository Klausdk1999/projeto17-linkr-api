import joi from 'joi';

export const signUpSchema = joi.object({
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(5).max(20).required(),
    pictureUrl: joi.string().uri().required()
});