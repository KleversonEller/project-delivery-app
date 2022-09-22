const md5 = require('md5');

const encryptPassword = (password) => {
  const passwordHash = md5(password);
  return passwordHash;
};

module.exports = {
 encryptPassword,
};