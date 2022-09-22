const PersonalError = require('./personal.error');

const throwMyError = (status, message) => {
  throw new PersonalError(status, message);
};

module.exports = throwMyError;
