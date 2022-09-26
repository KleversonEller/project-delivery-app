import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

export default function Provider({ children }) {
  const [user, setUser] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [sellers, setSellers] = useState([]);

  const value = useMemo(() => ({
    user,
    setUser,
    isFetching,
    setIsFetching,
    sellers,
    setSellers,
  }), [user, isFetching, sellers]);

  return (
    <MyContext.Provider value={ value }>
      {children}
    </MyContext.Provider>

  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
