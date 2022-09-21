const md5 = require('md5');
const { StatusCodes } = require('http-status-codes');
const throwMyError = require('../utils/throwMyError');

const checkPassword = (password, passwordDb) => {
    const isMatch = md5(password) === passwordDb;
  
    if (!isMatch) throwMyError(StatusCodes.NOT_FOUND, 'Invalid fields');

    return isMatch;
}


module.exports = {
    checkPassword
};