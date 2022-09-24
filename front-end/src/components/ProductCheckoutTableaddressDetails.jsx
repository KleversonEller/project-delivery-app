import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import calculatesTotalPrice from '../helpers/calculatesTotalPrice';
import requestCreateSales from '../services/requestCreateSales';

function ProductCheckoutTableaddressDetails(props) {
  const { sellers } = props;
  const [address, setAdress] = useState('');
  const [addressNumber, setAdressNumber] = useState('');
  const [sallerId, setSellerId] = useState(0);

  console.log(sallerId);

  useEffect(() => {
    if (sellers.length > 0) setSellerId(sellers[0].id);
  }, [sellers]);

  const finishSale = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const products = JSON.parse(localStorage.getItem('carrinho'));
    const sale = {
      userId: user.id,
      sallerId,
      totalPrice: calculatesTotalPrice(products),
      deliveryAddress: address,
      deliveryNumber: addressNumber,
      products: products.map((product) => (
        { productId: product.id, quantity: product.quantity }
      )),
    };
    const req = await requestCreateSales(sale);
    console.log(req);
  };

  return (
    <div>
      <select
        data-testid="customer_checkout__select-seller"
        onChange={ ({ target }) => setSellerId(target.value) }
      >
        {sellers?.map((seller) => (
          <option key={ seller.name } value={ seller.id }>{seller.name}</option>
        ))}
      </select>
      <input
        type="text"
        data-testid="customer_checkout__input-address"
        onChange={ (e) => setAdress(e.target.name) }
      />
      <input
        type="number"
        data-testid="customer_checkout__input-address-number"
        onChange={ (e) => setAdressNumber(e.target.name) }
      />
      <button
        type="button"
        data-testid="customer_checkout__button-submit-order"
        onClick={ finishSale }
      >
        {' '}
        FINALIZAR PEDIDO

      </button>
    </div>
  );
}

ProductCheckoutTableaddressDetails.propTypes = {
  sellers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default ProductCheckoutTableaddressDetails;
