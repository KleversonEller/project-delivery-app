require('dotenv').config();
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const throwMyError = require('./throwMyError');

const createToken = ({ email, role }) => {
  const token = jwt.sign({ data: { email, role } }, process.env.JWT_SECRET || 'secret_key', {
    expiresIn: '30d',
      algorithm: 'HS256',
  });
  return token;
};

const checkToken = (token) => {
  try {
    const { data } = jwt.verify(token, process.env.JWT_SECRE || 'secret_key');
    return data;
  } catch (_err) {
    throwMyError(StatusCodes.UNAUTHORIZED, 'Token expirado ou inválido');
  }
};

module.exports = {
  createToken,
  checkToken,
};