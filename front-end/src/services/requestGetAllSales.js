const URL = 'http://localhost:3001/sales';

const requestGetAllSales = async (token) => {
  try {
    const response = await fetch(URL, {
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

export default requestGetAllSales;
