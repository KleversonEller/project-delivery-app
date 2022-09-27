import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MyContext from '../contexts/MyContext';
import ProductCheckoutTableRow from '../components/ProductCheckoutTableRow';
import calculatesTotalPrice from '../helpers/calculatesTotalPrice';
import Header from '../components/Header';
import requestGetByIdSale from '../services/requestGetByIdSale';
import getFromLocalStorage from '../helpers/getFromLocalStorage';
import requestUpdateSaleStatus from '../services/requestUpdateSaleStatus';

function CustomerOrders() {
  const { sellers } = useContext(MyContext);
  const [shoppingCart, setShoppingCart] = useState([]);
  const [dates, setDates] = useState('');
  const [salesById, setSalesById] = useState({});
  const { id } = useParams();
  const { token } = getFromLocalStorage('user');
  const ten = 10;

  useEffect(() => {
    const handle = async () => {
      setShoppingCart(JSON.parse(localStorage.getItem('carrinho')) || []);
      const saleById = await requestGetByIdSale(token, id);
      const date = saleById.saleDate.slice(0, ten).split('-').reverse().join('/');
      console.log(date);
      setDates(date);
      setSalesById(saleById);
    };
    handle();
  }, [token, id]);

  const updateStatus = async (status) => {
    const request = await requestUpdateSaleStatus(token, id, status);
    if (request.message) return console.log(request.message);

    const requestNewSale = await requestGetByIdSale(token, id);

    setSalesById(requestNewSale);
  };

  const dataIdName = 'customer_order_details__element-order-details-label-seller-name';
  const dataIdDate = 'customer_order_details__element-order-details-label-order-date';
  const idStatus = 'customer_order_details__element-order-details-label-delivery-status';
  return (
    <div>
      <Header />
      <h1>Detalhe do Pedido</h1>
      <div>
        <h2
          data-testid="customer_order_details__element-order-details-label-order-id"
        >
          {salesById?.id }
        </h2>
        {sellers?.map((ele, i) => (
          <div key={ i }>
            <h2
              data-testid={ dataIdName }
            >
              {ele.name}
            </h2>
          </div>
        ))}
        <h2 data-testid={ dataIdDate }>
          {dates || ''}
        </h2>
        <h2 data-testid={ idStatus }>{salesById?.status}</h2>
        <button
          type="button"
          data-testid="customer_order_details__button-delivery-check"
          onClick={ () => updateStatus('Entregue') }
          disabled={ salesById.status !== 'Em Trânsito' }
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
        data-testid="customer_order_details__element-order-total-price"
      >
        {(calculatesTotalPrice(shoppingCart).toFixed(2)).replace('.', ',')}

      </p>
    </div>
  );
}

export default CustomerOrders;
