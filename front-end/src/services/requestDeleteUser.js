const URL = 'http://localhost:3001/user/delete';

const requestDeleteUser = async (email, token) => {
  try {
    const response = await fetch(URL, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ email }),
    });

    const result = await response.json();

    return result;
  } catch (err) {
    return false;
  }
};

export default requestDeleteUser;
