import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import convertToBrazilianCurrency from '../helpers/convertToBrazilianCurrency';

function ProductCheckoutTableRow(props) {
  const { location: { pathname } } = useHistory();
  const { element, setShoppingCart, i } = props;
  const { id, name, price, quantity } = element;
  const carrinho = 'carrinho';
  const pageUser = (pathname.includes('customer') ? 'customer' : 'seller');
  const pageType = (pathname.includes('checkout') ? 'checkout' : 'order_details');

  const removeProduct = () => {
    const localStorageProducts = JSON.parse(localStorage.getItem(carrinho));
    const filterProducts = localStorageProducts.filter((product) => product.id !== id);

    localStorage.setItem(carrinho, JSON.stringify(filterProducts));
    setShoppingCart(JSON.parse(localStorage.getItem(carrinho)));
  };

  return (
    <tr key={ i }>
      <td
        data-testid={ `${pageUser}_${pageType}__element-order-table-item-number-${i}` }
      >
        {i + 1}
      </td>
      <td
        data-testid={ `${pageUser}_${pageType}__element-order-table-name-${i}` }
      >
        {name}
      </td>
      <td
        data-testid={ `${pageUser}_${pageType}__element-order-table-quantity-${i}` }
      >
        {quantity}
      </td>
      <td
        data-testid={ `${pageUser}_${pageType}__element-order-table-unit-price-${i}` }
      >
        {price.replace('.', ',')}
      </td>
      <td
        data-testid={ `${pageUser}_${pageType}__element-order-table-sub-total-${i}` }
      >
        {convertToBrazilianCurrency(quantity * price)}
      </td>
      {(pathname === '/customer/checkout') && (
        <td>
          <button
            className="bg-red-400 rounded p-1 w-auto text-center hover:bg-red-500"
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
