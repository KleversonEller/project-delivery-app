import React from 'react';
import TabelaDespesas from '../components/TabelaDespesas';
import Header from '../components/Header';
import ProductCheckoutTableaddressDetails from './ProductCheckoutTableaddressDetails';

function Checkout() {
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
