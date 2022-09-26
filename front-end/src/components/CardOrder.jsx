import React from 'react';
import PropTypes from 'prop-types';

export default function CardOrder(props) {
  const { sales } = props;
  console.log(sales);

  return (
    <div>
      {sales?.map((element, i) => (
        <div key={ i }>
          <p data-testid={ `customer_orders__element-order-id-${element.id}` }>
            {element.id}
          </p>
          <p data-testid={ `customer_orders__element-delivery-status-${element.id}` }>
            {element.status}
          </p>
          <p data-testid={ `customer_orders__element-order-date-${element.id}` }>
            {element.saleDate}
          </p>
          <p data-testid={ `customer_orders__element-card-price-${element.id}` }>
            {element.totalPrice}
          </p>
        </div>
      ))}

    </div>
  );
}

CardOrder.propTypes = {
  sales: PropTypes.array,
}.isRequired;
