require('dotenv').config();
const fs = require('fs');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const throwMyError = require('./throwMyError');

const senha = fs.readFileSync('jwt.evaluation.key');

const createToken = ({ email, role }) => {
  const token = jwt.sign({ data: { email, role } }, senha, {
    expiresIn: '30d',
      algorithm: 'HS256',
  });
  return token;
};

const checkToken = (token) => {
  try {
    const { data } = jwt.verify(token, senha);
    return data;
  } catch (_err) {
    throwMyError(StatusCodes.UNAUTHORIZED, 'Token expirado ou inválido');
  }
};

module.exports = {
  createToken,
  checkToken,
};