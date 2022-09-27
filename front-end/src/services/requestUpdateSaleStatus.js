const URL = 'http://localhost:3001/sales/';

const requestUpdateSaleStatus = async (token, saleId, status) => {
  try {
    const request = await fetch(`${URL}${saleId}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ status }),
    });

    const result = await request.json();

    return result;
  } catch (err) {
    return { message: err.message };
  }
};

export default requestUpdateSaleStatus;
