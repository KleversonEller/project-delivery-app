import React from 'react';
import PropTypes from 'prop-types';

function Notification(props) {
  const { message, dataTestId } = props;

  return (
    <div>
      <p data-testid={ dataTestId }>
        {message}
      </p>
    </div>
  );
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
};

export default Notification;
