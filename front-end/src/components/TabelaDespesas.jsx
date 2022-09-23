import React, { useEffect, useState } from 'react';
import ProductCheckoutTableRow from './ProductCheckoutTableRow';

export default function TabelaDespesas() {
  const [shoppingCart, setShoppingCart] = useState([]);
  useEffect(() => {
    setShoppingCart(JSON.parse(localStorage.getItem('carrinho')) || []);
  }, []);

  return (
    <div>
      <table>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quabtidade</th>
          <th>Valor Unitário</th>
          <th>Sub-total</th>
          <th>Remover Item</th>
        </tr>

        {shoppingCart?.map((element, i) => (
          <ProductCheckoutTableRow
            key={ i }
            element={ element }
            shoppingCart={ shoppingCart }
            setShoppingCart={ setShoppingCart }
          />
        ))}

      </table>
    </div>
  );
}
