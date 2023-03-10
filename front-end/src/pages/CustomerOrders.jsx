import React, { useState, useEffect } from 'react';
import CardOrder from '../components/CardOrder';
import Header from '../components/Header';
import requestGetAllSales from '../services/requestGetAllSales';

function CustomerOrders() {
  const [sales, setSales] = useState([]);

  const handle = async () => {
    if (JSON.parse(localStorage.getItem('user'))) {
      const { token } = JSON.parse(localStorage.getItem('user'));
      const arraySales = await requestGetAllSales(token);
      setSales(arraySales);
    }
  };

  useEffect(() => {
    handle();
  }, []);

  return (
    <div>
      <Header />
      <CardOrder sales={ sales } page="customer" />
    </div>
  );
}

export default CustomerOrders;
