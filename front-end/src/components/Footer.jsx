import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import calculatesTotalPrice from '../helpers/calculatesTotalPrice';
import convertToBrazilianCurrency from '../helpers/convertToBrazilianCurrency';

export default function Footer(props) {
  const history = useHistory();
  const { shoppingCart, existeFooter } = props;

  const totalPrice = calculatesTotalPrice(shoppingCart);
  console.log(totalPrice <= 0);

  return (
    <div>
      { existeFooter && (
        <footer
          className="footer"
          data-testid="footer"
        >
          <button
            className={ `footer_btn bg-green-400 rounded h-14 w-60
            hover:bg-green-500 disabled:bg-zinc-600 mb-12` }
            data-testid="customer_products__button-cart"
            type="button"
            onClick={ () => history.push('/customer/checkout') }
            disabled={ totalPrice <= 0 }
          >
            Ver Carrinho:
            {' R$'}
            <span data-testid="customer_products__checkout-bottom-value">
              { convertToBrazilianCurrency(totalPrice) }
            </span>
          </button>
        </footer>
      )}
    </div>
  );
}

Footer.propTypes = {
  existeFooter: PropTypes.bool,
}.isRequired;
