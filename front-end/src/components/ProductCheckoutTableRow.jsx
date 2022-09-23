import React, { useEffect, useHistory } from 'react';
import PropTypes from 'prop-types';
import convertToBrazilianCurrency from '../helpers/convertToBrazilianCurrency';

function ProductCheckoutTableRow(props) {
  const { history: { location: { pathname } } } = useHistory();
  const { element, setShoppingCart } = props;
  const { id, name, price, quantity } = element;

  useEffect(() => (
    setShoppingCart(JSON.parse(localStorage.getItem(carrinho)))
  ), [setShoppingCart]);

  const removeProduct = () => {
    const carrinho = 'carrinho';
    const localStorageProducts = JSON.parse(localStorage.getItem(carrinho));
    const filterProducts = localStorageProducts.filter((product) => product.id !== id);

    localStorage.setItem(carrinho, JSON.stringify(filterProducts));
  };

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{quantity}</td>
      <td>{price}</td>
      <td>{convertToBrazilianCurrency(quantity * price)}</td>
      {(pathname.includes('/customer/checkout')) && (
        <td>
          <button type="button" onClick={ removeProduct }>Remover</button>
        </td>
      )}
    </tr>
  );
}

ProductCheckoutTableRow.propTypes = {
  element: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  setShoppingCart: PropTypes.func.isRequired,
};

export default ProductCheckoutTableRow;
