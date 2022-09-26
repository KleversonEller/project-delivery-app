import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ProductCheckoutTableRow from '../components/ProductCheckoutTableRow';
import Header from '../components/Header';
import MyContext from '../contexts/MyContext';

function CustomerOrders() {
  const { sellers } = useContext(MyContext);
  const [salesById, setSalesById] = useState({});

  const handle = async () => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const saleById = await requestGetByIdSales(token);
    setSalesById(saleById);
    console.log(() => useHistory);
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
        <ProductCheckoutTableRow />
      </div>
    </div>
  );
}

export default CustomerOrders;
