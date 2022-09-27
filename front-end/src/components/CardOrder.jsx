import React from 'react';
import PropTypes from 'prop-types';

export default function CardOrder(props) {
  const { sales } = props;
  console.log(sales);

  const formatDate = (date) => {
    const newDate = new Date(date);
    const format = `
    ${newDate.getDate()}/${(newDate.getMonth() + 1)
  .toString().padStart(2, '0')}/${newDate.getFullYear()}`;
    console.log(format);
    return format;
  };

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
            {formatDate(element.saleDate)}
          </p>
          <p data-testid={ `customer_orders__element-card-price-${element.id}` }>
            {element.totalPrice.toString().replace('.', ',')}
          </p>
        </div>
      ))}

    </div>
  );
}

CardOrder.propTypes = {
  sales: PropTypes.array,
}.isRequired;
