import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import convertToBrazilianCurrency from '../helpers/convertToBrazilianCurrency';

export default function CardOrder(props) {
  const { sales, page } = props;
  console.log(sales);

  const formatDate = (date) => {
    const newDate = new Date(date);
    const format = `
    ${newDate.getDate()}/${(newDate.getMonth() + 1)
  .toString().padStart(2, '0')}/${newDate.getFullYear()}`;
    console.log(format);
    return format;
  };
  const history = useHistory();

  const redirect = (element) => history.push(`/${page}/orders/${element.id}`);

  return (
    <div>
      {sales?.map((element, i) => (
        <div key={ i }>
          <button
            type="button"
            onClick={ () => redirect(element) }
          >
            <p data-testid={ `${page}_orders__element-order-id-${element.id}` }>
              {element.id}
            </p>
            <p data-testid={ `${page}_orders__element-delivery-status-${element.id}` }>
              {element.status}
            </p>
            <p data-testid={ `${page}_orders__element-order-date-${element.id}` }>
              {formatDate(element.saleDate)}
            </p>
            <p data-testid={ `${page}_orders__element-card-price-${element.id}` }>
              {convertToBrazilianCurrency(element.totalPrice)}
            </p>
            {(page === 'seller') && (
              <p data-testid={ `${page}_orders__element-card-address-${element.id}` }>
                {`${element.deliveryAddress}, ${element.deliveryNumber}`}
              </p>
            )}
          </button>
        </div>
      ))}

    </div>
  );
}

CardOrder.propTypes = {
  sales: PropTypes.array,
  page: PropTypes.string,
}.isRequired;
