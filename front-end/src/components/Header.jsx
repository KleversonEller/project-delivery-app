import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Header() {
  const [header, setHeader] = useState({});
  useEffect(() => {
    const value = JSON.parse(localStorage.getItem('user'));
    setHeader(value);
  }, []);

  return (
    <header
      className={ `header bg-zinc-300 flex justify-around w-full
    h-20 items-center font-bold` }
    >
      <Link to="/customer/products">
        <h2
          className="shadow-xl rounded"
          data-testid="customer_products__element-navbar-link-products"
        >
          PRODUTOS
        </h2>
      </Link>
      <Link to="/customer/orders">
        <button
          className="shadow-xl rounded"
          data-testid="customer_products__element-navbar-link-orders"
          type="button"
        >
          MEUS PEDIDOS
        </button>
      </Link>
      <h2
        className="shadow-xl rounded"
        data-testid="customer_products__element-navbar-user-full-name"
      >
        {header.name}
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
