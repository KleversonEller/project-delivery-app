import React, { useEffect, useState } from 'react';
import ProductCheckoutTableRow from './ProductCheckoutTableRow';
import calculatesTotalPrice from '../helpers/calculatesTotalPrice';

export default function TabelaDespesas() {
  const [shoppingCart, setShoppingCart] = useState([]);

  useEffect(() => {
    setShoppingCart(JSON.parse(localStorage.getItem('carrinho')) || []);
  }, []);

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
            <th>Remover Item</th>
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
