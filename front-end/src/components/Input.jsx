import React from 'react';
import PropTypes from 'prop-types';

function Input(props) {
  const { id } = props;

  return (
    <label htmlFor={ id }>
      <input { ...props } />
    </label>
  );
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Input;
