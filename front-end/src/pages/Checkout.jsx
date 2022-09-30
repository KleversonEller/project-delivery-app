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
    <div className="flex flex-col items-center">
      <Header title="Produtos" />
      <div
        className={ `bg-zinc-100 mt-10 text-center
      flex flex-col items-center w-4/5 justify-around rounded mb-10 gap-4` }
      >
        <h1 className="mt-4 font-bold text-3xl">Finalizar Pedido</h1>
        <TabelaDespesas />
        <h1 className="mt-4 font-bold text-3xl">Detalhes e Endereço para Entrega</h1>
        <ProductCheckoutTableaddressDetails />
      </div>
    </div>
  );
}

export default Checkout;
