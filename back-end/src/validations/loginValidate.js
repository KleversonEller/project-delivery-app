const Joi = require('joi');
const { StatusCodes } = require('http-status-codes');
const throwMyError = require('../utils/throwMyError');

class LoginValidate {
  static validateCredentials(user) {
      const userSchema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const { error } = userSchema.validate(user);

    if (error) throwMyError(StatusCodes.BAD_REQUEST, 'Dados inválidos');
  }
}

module.exports = LoginValidate;
