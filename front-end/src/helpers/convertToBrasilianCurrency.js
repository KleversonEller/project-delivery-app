const convertToBrasilianCurrency = (value) => (
  Number(value).toLocaleString('pt-br', { minimumFractionDigits: 2 })
);

export default convertToBrasilianCurrency;
