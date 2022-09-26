const { checkToken } = require('../utils/jwt');

const authenticationMiddleware = (req, _res, next) => {
  const { authorization: token } = req.headers;

  const decode = checkToken(token);

  req.user = decode;

  next();
};

module.exports = authenticationMiddleware;
