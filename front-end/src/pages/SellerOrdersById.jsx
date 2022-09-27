import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import TabelaDespesas from '../components/TabelaDespesas';
import convertDate from '../helpers/convertDate';
import getFromLocalStorage from '../helpers/getFromLocalStorage';
import requestGetByIdSale from '../services/requestGetByIdSale';

function SellerOrdersById() {
  const [sale, setSale] = useState(null);
  const { id: saleId } = useParams();
  const statusThatDisablesPreparingButton = ['Preparando', 'Trânsito', 'Entregue'];
  const statusThatDisablesDispatchButton = ['Pendente', 'Trânsito', 'Entregue'];

  useEffect(() => {
    const { token } = getFromLocalStorage('user');

    const getSale = async () => {
      const request = await requestGetByIdSale(token, saleId);

      setSale(request);
    };

    getSale();
  }, [saleId]);

  console.log(sale);
  const dataTestSaleId = 'seller_order_details__element-order-details-label-order-id';
  const dataTestSaleDate = 'seller_order_details__element-order-details-label-order-date';
  const dataTestSaleStatus = 'seller_order_details__'
    + 'element-order-details-label-delivery-status';
  const dataTestPreparingButton = 'seller_order_details__button-preparing-check';
  const dataTestDispatchButton = 'seller_order_details__button-dispatch-check';

  return (
    <>
      <Header />
      {(sale) && (
        <section>
          <h3>Detalhe do Pedido</h3>
          <div>
            <span data-testid={ dataTestSaleId }>
              {`Pedido ${sale.id}` }
            </span>
            <span data-testid={ dataTestSaleDate }>
              {convertDate(sale.saleDate)}
            </span>
            <span data-testid={ dataTestSaleStatus }>
              {sale.status}
            </span>
            <button
              data-testid={ dataTestPreparingButton }
              type="button"
              disabled={ statusThatDisablesPreparingButton.includes(sale.status) }
            >
              PREPARAR PEDIDO
            </button>
            <button
              data-testid={ dataTestDispatchButton }
              type="button"
              disabled={ statusThatDisablesDispatchButton.includes(sale.status) }
            >
              SAIU PARA ENTREGA
            </button>
          </div>
          <TabelaDespesas products={ sale.products } />
        </section>
      )}
    </>
  );
}

export default SellerOrdersById;
