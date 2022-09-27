import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import getFromLocalStorage from '../helpers/getFromLocalStorage';

export default function Header() {
  const { role, name } = getFromLocalStorage('user') || {};

  return (
    <header
      className={ `header bg-zinc-300 flex justify-around w-full
    h-20 items-center font-bold` }
    >
      {(role === 'customer') && (
        <Link to="/customer/products">
          <h2
            className="shadow-xl rounded"
            data-testid="customer_products__element-navbar-link-products"
          >
            PRODUTOS
          </h2>
        </Link>)}
      <Link to={ `/${role}/orders` }>
        <button
          className="shadow-xl rounded"
          data-testid="customer_products__element-navbar-link-orders"
          type="button"
        >
          {(role === 'customer') ? 'MEUS PEDIDOS' : 'PEDIDOS'}
        </button>
      </Link>
      <h2
        className="shadow-xl rounded"
        data-testid="customer_products__element-navbar-user-full-name"
      >
        {name}
      </h2>
      <Link to="/">
        <button
          className="shadow-xl rounded"
          data-testid="customer_products__element-navbar-link-logout"
          type="button"
          onClick={ () => localStorage.clear('user') }
        >
          Sair
        </button>
      </Link>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;
