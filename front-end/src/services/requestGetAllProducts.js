const URL = 'http://localhost:3001/products';

const requestGetAllProducts = async () => {
  try {
    const response = await fetch(URL);
    const result = response.json();

    return result;
  } catch (err) {
    return { message: err };
  }
};

export default requestGetAllProducts;
