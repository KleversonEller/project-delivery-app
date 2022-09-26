require('dotenv').config();
const fs = require('fs');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const throwMyError = require('./throwMyError');

const senha = fs.readFileSync('jwt.evaluation.key');

const createToken = ({ id, name, email, role }) => {
  const data = { id, name, email, role };

  const jwtOptions = {
    expiresIn: '30d',
      algorithm: 'HS256',
  };

  const token = jwt.sign({ data }, senha, jwtOptions);
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