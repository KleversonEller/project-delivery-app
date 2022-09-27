const getFromLocalStorage = (key) => (
  JSON.parse(localStorage.getItem(key))
);

export default getFromLocalStorage;
