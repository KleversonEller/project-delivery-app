const newProductList = (
  localStorageProducts,
  findProductIndex,
  product,
  quantity,
) => {
  const productList = localStorageProducts;
  if (Number(quantity) > 0) {
    productList[findProductIndex].quantity = quantity;
  } else {
    productList.splice(findProductIndex, 1);
  }
  return productList;
};

const saveProductAtShoppingCart = (product, quantity) => {
  const carrinho = 'carrinho';
  const newQuantity = Number(quantity);

  let localStorageProducts = JSON.parse(localStorage.getItem(carrinho));

  if (!localStorageProducts) localStorageProducts = [];

  const findProductIndex = localStorageProducts
    .findIndex((prod) => prod.id === product.id);

  if (findProductIndex >= 0) {
    localStorageProducts = newProductList(
      localStorageProducts,
      findProductIndex,
      product,
      quantity,
    );
  } else if (quantity > 0) {
    localStorageProducts.push({ ...product, quantity: newQuantity });
  }

  localStorage.setItem(carrinho, JSON.stringify(localStorageProducts));
};

export default saveProductAtShoppingCart;
