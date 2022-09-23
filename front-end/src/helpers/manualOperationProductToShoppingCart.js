const manualOperationProduct = (quantity) => {
  const regex = /^[0-9]{1,}$/;

  if (regex.test(quantity)) {
    return quantity;
  }

  if (!quantity.trim()) {
    return 0;
  }

  return null;
};

export default manualOperationProduct;
