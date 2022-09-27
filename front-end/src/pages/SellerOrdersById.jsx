import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import TabelaDespesas from '../components/TabelaDespesas';
import convertDate from '../helpers/convertDate';
import getFromLocalStorage from '../helpers/getFromLocalStorage';
import requestGetByIdSale from '../services/requestGetByIdSale';
import requestUpdateSaleStatus from '../services/requestUpdateSaleStatus';

function SellerOrdersById() {
  const [sale, setSale] = useState(null);
  const { id: saleId } = useParams();
  const { token } = getFromLocalStorage('user');
  const pendente = 'Pendente';
  const preparando = 'Preparando';
  const transito = 'Em Trânsito';

  useEffect(() => {
    const getSale = async () => {
      const request = await requestGetByIdSale(token, saleId);

      setSale(request);
    };

    getSale();
  }, [token, saleId]);

  const updateStatus = async (status) => {
    const request = await requestUpdateSaleStatus(token, saleId, status);
    if (request.message) return console.log(request.message);

    const requestNewSale = await requestGetByIdSale(token, saleId);

    setSale(requestNewSale);
  };

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
              onClick={ () => updateStatus(preparando) }
              disabled={ sale.status !== pendente }
            >
              PREPARAR PEDIDO
            </button>
            <button
              data-testid={ dataTestDispatchButton }
              type="button"
              onClick={ () => updateStatus(transito) }
              disabled={ sale.status !== preparando }
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
