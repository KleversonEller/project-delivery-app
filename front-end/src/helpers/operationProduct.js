const operationProduct = (quantity, operation) => {
  let newQuantity = Number(quantity);

  if (operation === '+') {
    newQuantity += 1;
  } else {
    newQuantity = (newQuantity > 0) ? newQuantity - 1 : 0;
  }
  return newQuantity;
};

export default operationProduct;
