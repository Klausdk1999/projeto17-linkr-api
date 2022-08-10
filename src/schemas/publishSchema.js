import joi from 'joi';

const urlExpression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

const publishSchema = joi.object({
    url: joi.string().pattern(new RegExp(urlExpression)).required(),
    description: joi.string().required()
});

export default publishSchema;