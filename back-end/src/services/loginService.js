const Joi = require('joi');
const { StatusCodes } = require('http-status-codes');
const { users } = require('../database/models/index');
const { createToken } = require('../utils/jwt');

const passwordService = require('./password.service');
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

  if (!user) throwMyError(StatusCodes.NOT_FOUND, 'Usuário não cadastrado');
  
  const valide = passwordService.checkPassword(password, user.password);

  if (!valide) throwMyError(StatusCodes.NOT_FOUND, 'Usuário não encontrado');
  const token = createToken({ user });
    return { ...user.dataValues, token };
};

  module.exports = {
    validateCredentials,
    validateBody,
  };