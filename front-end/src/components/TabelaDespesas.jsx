import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ProductCheckoutTableRow from './ProductCheckoutTableRow';
import calculatesTotalPrice from '../helpers/calculatesTotalPrice';
import convertToBrazilianCurrency from '../helpers/convertToBrazilianCurrency';

export default function TabelaDespesas(props) {
  const { products } = props;
  const { location: { pathname } } = useHistory();
  const [shoppingCart, setShoppingCart] = useState([]);

  const pageUser = (pathname.includes('customer') ? 'customer' : 'seller');
  const pageType = (pathname.includes('checkout') ? 'checkout' : 'order_details');

  useEffect(() => {
    if (products) {
      setShoppingCart(products);
    } else {
      setShoppingCart(JSON.parse(localStorage.getItem('carrinho')) || []);
    }
  }, [products]);

  return (
    <div>
      <table className="border-separate border-spacing-2 border shadow">
        <thead>
          <tr>
            <th className="border shadow px-2 rounded">Item</th>
            <th className="border shadow px-2 rounded">Descrição</th>
            <th className="border shadow px-2 rounded">Quabtidade</th>
            <th className="border shadow px-2 rounded">Valor Unitário</th>
            <th className="border shadow px-2 rounded">Sub-total</th>
            {(pageUser === 'customer')
            && (
              <th
                className="border shadow px-2 rounded"
              >
                Remover Item
              </th>)}
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
        className="text-end mt-5 text-2xl px-10"
        data-testid={ `${pageUser}_${pageType}__element-order-total-price` }
      >
        {convertToBrazilianCurrency(calculatesTotalPrice(shoppingCart))}
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
