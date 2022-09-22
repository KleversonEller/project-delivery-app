import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Customer from './pages/Customer';
import Register from './pages/Register';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/login" component={ Login } />
      <Route exact path="/customer/products" component={ Customer } />
      <Route exact path="/register" component={ Register } />
    </Switch>
  );
}

export default App;
