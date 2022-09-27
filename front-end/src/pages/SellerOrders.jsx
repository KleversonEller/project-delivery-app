import React, { useEffect, useState } from 'react';
import CardOrder from '../components/CardOrder';
import Header from '../components/Header';
import getFromLocalStorage from '../helpers/getFromLocalStorage';
import requestGetAllSellerSales from '../services/requestGetAllSellerSales';

function SellerOrders() {
  const [sales, setSales] = useState([]);
  const [messageError, setMessageError] = useState('');

  useEffect(() => {
    const { token } = getFromLocalStorage('user');

    const salesRequest = async () => {
      const getSales = await requestGetAllSellerSales(token);

      if (getSales.message) return setMessageError(getSales.message);

      setSales(getSales);
    };

    salesRequest();
  }, []);

  console.log(sales);
  console.log(messageError);

  return (
    <div>
      <Header />
      <CardOrder sales={ sales } page="seller" />
    </div>
  );
}

export default SellerOrders;
