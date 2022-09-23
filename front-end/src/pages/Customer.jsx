import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import MyContext from '../contexts/MyContext';
import Footer from '../components/Footer';
import CardProduct from '../components/CardProduct';

import requestGetAllProducts from '../services/requestGetAllProducts';

function Customer() {
  const { setIsFetching } = useContext(MyContext);
  const [products, setProducts] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);

  useEffect(() => {
    setShoppingCart(JSON.parse(localStorage.getItem('carrinho')) || []);
    const getAllProducts = async () => {
      setIsFetching(true);
      const result = await requestGetAllProducts();
      setProducts(result);
      setIsFetching(false);
    };
    getAllProducts();
  }, [setIsFetching]);

  return (
    <div>
      <Header title="Produtos" />
      <div>
        {
          products?.map((element, i) => (
            (
              <CardProduct
                element={ element }
                i={ i }
                key={ element.name }
                shoppingCart={ shoppingCart }
                setShoppingCart={ setShoppingCart }
              />
            )
          ))
        }
      </div>
      <Footer
        existeFooter="true"
        shoppingCart={ shoppingCart }
      />
    </div>
  );
}

export default Customer;
