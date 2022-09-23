const saveProductAtShoppingCart = (product, quantity) => {
  const carrinho = 'carrinho';
  const newQuantity = Number(quantity);

  let localStorageProducts = JSON.parse(localStorage.getItem(carrinho));

  if (!localStorageProducts) localStorageProducts = [];

  const findProductIndex = localStorageProducts
    .findIndex((prod) => prod.id === product.id);

  if (findProductIndex >= 0) {
    localStorageProducts[findProductIndex].quantity = newQuantity;
  } else {
    localStorageProducts.push({ ...product, quantity: newQuantity });
  }

  localStorage.setItem(carrinho, JSON.stringify(localStorageProducts));
};

export default saveProductAtShoppingCart;
