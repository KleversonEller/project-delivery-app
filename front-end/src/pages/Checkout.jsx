import React, { useEffect, useState, useContext } from 'react';
import TabelaDespesas from '../components/TabelaDespesas';
import Header from '../components/Header';
import MyContext from '../contexts/MyContext';
import ProductCheckoutTableaddressDetails
  from '../components/ProductCheckoutTableaddressDetails';
import requestGetAllSellers from '../services/requestGetAllSellers';

function Checkout() {
  const { setSellers } = useContext(MyContext);
  const [requestError, setRequestError] = useState('');

  console.log(requestError);

  useEffect(() => {
    const getSellers = async () => {
      const sellerList = await requestGetAllSellers();

      if (sellerList.message) return setRequestError(sellerList.message);
      setSellers(sellerList);
    };
    getSellers();
  }, [setSellers]);

  return (
    <div>
      <Header title="Produtos" />
      <h1>Finalizar Pedido</h1>
      <TabelaDespesas />
      <h1>Detalhes e Endereço para Entrega</h1>
      <ProductCheckoutTableaddressDetails />
    </div>
  );
}

export default Checkout;
