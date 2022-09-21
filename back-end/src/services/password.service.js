const md5 = require('md5');

const checkPassword = (password, passwordDb) => {
    const isMatch = md5(password) === passwordDb;
    if (!isMatch) {
      const e = new Error('Invalid fields');
      e.name = 'NOT_FOUND';
      throw e;
    }
    return isMatch;
}


module.exports = {
    checkPassword
};