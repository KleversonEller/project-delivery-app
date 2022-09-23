import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import convertToBrasilianCurrency from '../helpers/convertToBrasilianCurrency';
import manualOperationProduct
  from '../helpers/manualOperationProductToShoppingCart';
import operationProduct from '../helpers/operationProduct';
import saveProductAtShoppingCart from '../helpers/saveProductAtShoppingCart';
import styles from './cardProducts.module.css';
// import { Link } from 'react-router-dom';

export default function CardFood(props) {
  const { element } = props;
  const { name, price, urlImage, id } = element;
  const { shoppingCart, setShoppingCart } = props;
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const findProductIndex = shoppingCart
      .findIndex((prod) => prod.id === id);

    if (findProductIndex >= 0) {
      setQuantity(shoppingCart[findProductIndex].quantity);
    }
  }, [shoppingCart, id]);

  useEffect(() => {
    setShoppingCart(JSON.parse(localStorage.getItem('carrinho')) || []);
  }, [quantity, setShoppingCart]);

  const handleClick = (operation) => {
    const newValue = operationProduct(quantity, operation);
    saveProductAtShoppingCart(element, newValue);
    setQuantity(newValue);
  };

  const handleChange = ({ target }) => {
    const { value } = target;
    const newValue = manualOperationProduct(value);

    if (newValue !== null) {
      saveProductAtShoppingCart(element, newValue);
      setQuantity(newValue);
    }
  };

  return (
    // <Link
    //   to={ `/foods/${idMeal}` }
    //   className="card_container"
    //   style={ { textDecoration: 'none' } }
    // >
    <div className={ styles['product-card-container'] }>
      <p data-testid={ `customer_products__element-card-title-${id}` }>
        {name}
      </p>
      <img
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ urlImage }
        alt="search"
        style={ { width: '100px', height: '18rem', objectFit: 'cover' } }
      />
      <p data-testid={ `customer_products__element-card-price-${id}` }>
        R$
        {convertToBrasilianCurrency(price)}
      </p>

      <button
        data-testid={ `customer_products__button-card-rm-item-${id}` }
        type="button"
        onClick={ () => handleClick('-') }
      >
        -
      </button>

      <input
        data-testid={ `customer_products__input-card-quantity-${id}` }
        value={ quantity }
        onChange={ handleChange }
        readOnly
      />

      <button
        data-testid={ `customer_products__button-card-add-item-${id}` }
        type="button"
        onClick={ () => handleClick('+') }
      >
        +
      </button>
    </div>
    // </Link>
  );
}

CardFood.propTypes = {
  strMeal: PropTypes.string,
  strMealThumb: PropTypes.string,
}.isRequired;
