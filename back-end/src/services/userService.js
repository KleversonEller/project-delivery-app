const Joi = require('joi');
const { StatusCodes } = require('http-status-codes');
const { users } = require('../database/models/index');
const { encryptPassword } = require('../utils/md5');
const { createToken } = require('../utils/jwt');
const throwMyError = require('../utils/throwMyError');

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const createUser = async (user) => {
  const { error } = userSchema.validate(user);

  if (error) throwMyError(StatusCodes.BAD_REQUEST, 'Dados inválidos');

  const { password } = user;
  const passwordHash = encryptPassword(password);

  if (await users.findOne({ where: { email: user.email } })) {
    throwMyError(StatusCodes.CONFLICT, 'O usuário já possui cadastro');
  }
  const newUser = await users.create({ ...user, password: passwordHash, role: 'customer' });
  const token = createToken({ email: user.email, role: 'customer' });
  return {
    token,
    ...newUser.dataValues,
  };
};

const getAll = async (role) => {
  const result = await users.findAll({
    where: { role },
  });
  return result;
};

module.exports = { 
  createUser,
  getAll,
};