const number6 = 6;
const number12 = 12;

export const validateName = (name) => name.length >= number12;

export const validateEmail = (email) => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

export const validatePassword = (password) => password.length >= number6;
