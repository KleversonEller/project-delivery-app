const Joi = require('joi');
const { User } = require('../database/models/index');

const passwordService = require('../services/password.service');
const jwtService = require('./jwtService');

const validateBody = (data) => {
    const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }).messages({
    'any.required': 'Some required fields are missing',
    'string.empty': 'Some required fields are missing',
});
  const { email, password } = data;
  const { error, value } = schema.validate({ email, password });
  if (error) {
    const customError = { name: 'NOT_FOUND', message: error.details[0].message };
    throw customError;
  } 
  return value;
};

const validateCredentials = async ({ email, password }) => {
    const user = await User.findOne({ where: { email } });
    const check = passwordService.checkPassword(password, user.password);
    if (!check) {
      const e = new Error('Invalid fields');
      e.name = 'NOT_FOUND';
      throw e;
    }
    const { id } = user;
    const token = jwtService.createToken({ data: email, id });

    return { token };
};


  module.exports = {
    validateCredentials,
    validateBody,
  };