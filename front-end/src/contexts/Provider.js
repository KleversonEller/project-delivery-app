import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

export default function Provider({ children }) {
  const [user, setUser] = useState({});

  const value = useMemo(() => ({
    user,
    setUser,
  }), [user]);

  return (
    <MyContext.Provider value={ value }>
      {children}
    </MyContext.Provider>

  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
