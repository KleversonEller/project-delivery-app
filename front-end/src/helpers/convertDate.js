const number10 = 10;

const convertDate = (saleDate) => (
  saleDate.slice(0, number10).split('-').reverse().join('/')
);

export default convertDate;
