const Joi = require('joi');
const { users } = require('../database/models/index');
const { StatusCodes } = require('http-status-codes');

const passwordService = require('../services/password.service');
const throwMyError = require('../utils/throwMyError');

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

  if (error) throwMyError(StatusCodes.NOT_FOUND, 'Dados inválidos');

  return value;
};

const validateCredentials = async ({ email, password }) => {
    const user = await users.findOne({ where: { email } });
    passwordService.checkPassword(password, user.password);
    const { id } = user;

    return true;
};


  module.exports = {
    validateCredentials,
    validateBody,
  };