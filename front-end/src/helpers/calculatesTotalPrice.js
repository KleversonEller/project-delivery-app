const calculatesTotalPrice = (shoppingCart) => (
  shoppingCart.reduce((acc, product) => {
    acc += product.price * product.quantity;
    return acc;
  }, 0)
);

export default calculatesTotalPrice;
