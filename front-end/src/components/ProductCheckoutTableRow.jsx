import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import convertToBrazilianCurrency from '../helpers/convertToBrazilianCurrency';

function ProductCheckoutTableRow(props) {
  const { location: { pathname } } = useHistory();
  const { element, setShoppingCart, i } = props;
  const { id, name, price, quantity } = element;
  const carrinho = 'carrinho';

  const removeProduct = () => {
    const localStorageProducts = JSON.parse(localStorage.getItem(carrinho));
    const filterProducts = localStorageProducts.filter((product) => product.id !== id);

    localStorage.setItem(carrinho, JSON.stringify(filterProducts));
    setShoppingCart(JSON.parse(localStorage.getItem(carrinho)));
  };

  return (
    <tr>
      <td
        data-testid={ `customer_checkout__element-order-table-item-number-${i}` }
      >
        {i + 1}
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-name-${i}` }
      >
        {name}
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-quantity-${i}` }
      >
        {quantity}
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-unit-price-${i}` }
      >
        {price}
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-sub-total-${i}` }
      >
        {convertToBrazilianCurrency(quantity * price)}
      </td>
      {(pathname === '/customer/checkout') && (
        <td>
          <button
            type="button"
            onClick={ removeProduct }
            data-testid={ `customer_checkout__element-order-table-remove-${i}` }
          >
            Remover
          </button>
        </td>
      )}
    </tr>
  );
}

ProductCheckoutTableRow.propTypes = {
  element: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  setShoppingCart: PropTypes.func.isRequired,
  i: PropTypes.number.isRequired,
};

export default ProductCheckoutTableRow;
