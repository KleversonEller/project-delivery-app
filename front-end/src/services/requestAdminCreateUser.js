const requestAdminCreateUser = async ({ name, email, password }, role, token) => {
  try {
    const response = await fetch('http://localhost:3001/user/admin', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ name, email, password, role }),
    });

    const result = await response.json();

    return result;
  } catch (err) {
    return false;
  }
};

export default requestAdminCreateUser;
