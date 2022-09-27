const URL = 'http://localhost:3001/sales/seller';

const requestGetAllSellerSales = async (token) => {
  try {
    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    });
    const result = await response.json();

    return result;
  } catch (err) {
    return { message: err.message };
  }
};

export default requestGetAllSellerSales;
