const URL = 'http://localhost:3001/sales/';

const requestGetByIdSale = async (token, id) => {
  try {
    const response = await fetch(`${URL}${id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    });
    const result = response.json();

    return result;
  } catch (err) {
    return { message: err };
  }
};

export default requestGetByIdSale;
