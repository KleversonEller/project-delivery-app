const URL = 'http://localhost:3001/user';

const requestCreateUser = async (name, email, password) => {
  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const result = await response.json();

    return result;
  } catch (err) {
    return false;
  }
};

module.exports = requestCreateUser;
