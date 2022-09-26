import React, { useEffect, useState } from 'react';
import TabelaDespesas from '../components/TabelaDespesas';
import Header from '../components/Header';
import ProductCheckoutTableaddressDetails
  from '../components/ProductCheckoutTableaddressDetails';
import requestGetAllSellers from '../services/requestGetAllSellers';

function Checkout() {
  const [sellers, setSellers] = useState([]);
  const [requestError, setRequestError] = useState('');

  console.log(requestError);
  console.log(sellers);

  useEffect(() => {
    const getSellers = async () => {
      const sellerList = await requestGetAllSellers();

      if (sellerList.message) return setRequestError(sellerList.message);
      setSellers(sellerList);
    };
    getSellers();
  }, []);

  return (
    <div>
      <Header title="Produtos" />
      <h1>Finalizar Pedido</h1>
      <TabelaDespesas />
      <h1>Detalhes e Endereço para Entrega</h1>
      <ProductCheckoutTableaddressDetails
        sellers={ sellers }
      />
    </div>
  );
}

export default Checkout;
