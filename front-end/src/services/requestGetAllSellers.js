const URL = 'http://localhost:3001/user/seller';

const requestGetAllSellers = async () => {
  try {
    const response = await fetch(URL);
    const result = await response.json();

    return result;
  } catch (err) {
    return { message: err.message };
  }
};

export default requestGetAllSellers;
