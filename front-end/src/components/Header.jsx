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
    <header className="header">
      <Link to="/customer/products">
        <h2 data-testid="customer_products__element-navbar-link-products">
          PRODUTOS
        </h2>
      </Link>
      <Link to="/customer/orders">
        <button
          data-testid="customer_products__element-navbar-link-orders"
          type="button"
        >
          MEUS PEDIDOS
        </button>
      </Link>
      <h2 data-testid="customer_products__element-navbar-user-full-name">
        {header.name}
      </h2>
      <Link to="/">
        <button
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
