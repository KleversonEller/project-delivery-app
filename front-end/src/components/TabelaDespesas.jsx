import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ProductCheckoutTableRow from './ProductCheckoutTableRow';
import calculatesTotalPrice from '../helpers/calculatesTotalPrice';

export default function TabelaDespesas(props) {
  const { products } = props;
  const { location: { pathname } } = useHistory();
  const [shoppingCart, setShoppingCart] = useState([]);

  useEffect(() => {
    if (products) {
      setShoppingCart(products);
    } else {
      setShoppingCart(JSON.parse(localStorage.getItem('carrinho')) || []);
    }
  }, [products]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quabtidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            {(pathname === '/customer/checkout') && <th>Remover Item</th>}
          </tr>
        </thead>

        <tbody>
          {shoppingCart?.map((element, i) => (
            <ProductCheckoutTableRow
              key={ i }
              element={ element }
              shoppingCart={ shoppingCart }
              setShoppingCart={ setShoppingCart }
              calculatesTotalPrice={ calculatesTotalPrice }
              i={ i }
            />
          ))}
        </tbody>

      </table>
      <p
        data-testid="customer_checkout__element-order-total-price"
      >
        {(calculatesTotalPrice(shoppingCart).toFixed(2)).replace('.', ',')}

      </p>
    </div>
  );
}

TabelaDespesas.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  })),
};

TabelaDespesas.defaultProps = {
  products: undefined,
};
