const convertToBrazilianCurrency = (value) => (
  Number(value).toLocaleString('pt-br', { minimumFractionDigits: 2 })
);

export default convertToBrazilianCurrency;
