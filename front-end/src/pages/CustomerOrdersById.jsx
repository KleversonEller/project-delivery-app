import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import ProductCheckoutTableRow from '../components/ProductCheckoutTableRow';
import calculatesTotalPrice from '../helpers/calculatesTotalPrice';
import Header from '../components/Header';

function CustomerOrders() {
  const { sellers } = useContext(MyContext);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [salesById, setSalesById] = useState({});
  const id = useParams();

  const handle = async () => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    setShoppingCart(JSON.parse(localStorage.getItem('carrinho')) || []);
    const saleById = await requestGetByIdSales(token, id);
    setSalesById(saleById);
  };
  useEffect(() => {
    handle();
  }, []);

  return (
    <div>
      <Header />
      <h1>Detalhe do Pedido</h1>
      <div>
        {sellers?.map((ele, i) => (
          <div key={ i }>
            <h2>{ele.id}</h2>
            <h2>{ele.name}</h2>
          </div>
        ))}
        <h2>{salesById?.saleDate}</h2>
        <h2>{salesById?.status}</h2>
        <button
          type="button"
        >
          MARCAR COMO ENTREGUE

        </button>
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
      </div>
      <p
        data-testid="customer_checkout__element-order-total-price"
      >
        {(calculatesTotalPrice(shoppingCart).toFixed(2)).replace('.', ',')}

      </p>
    </div>
  );
}

export default CustomerOrders;
