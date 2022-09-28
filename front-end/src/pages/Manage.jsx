import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import Input from '../components/Input';
import getFromLocalStorage from '../helpers/getFromLocalStorage';
import Notification from '../components/Notification';
import * as registerFormValidate from '../validations/registerFormValidate';
// import userRoutes from '../helpers/userRoutes';
import requestAdminCreateUser from '../services/requestAdminCreateUser';
import Header from '../components/Header';

function Manage() {
  // const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [formFieldsAreValid, setFormFieldsAreValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const registerFormFields = [
      registerFormValidate.validateName(name),
      registerFormValidate.validateEmail(email),
      registerFormValidate.validatePassword(password),
    ];
    console.log(registerFormFields);
    setFormFieldsAreValid(registerFormFields.every((field) => field));
  }, [name, email, password]);

  const { token } = getFromLocalStorage('user');

  const handleSubmit = async (e) => {
    console.log(e);
    e.preventDefault();
    if (name && email && password) {
      const userInfo = { name, email, password };
      console.log(userInfo, role, token);
      const user = await requestAdminCreateUser(userInfo, role, token);
      // if (!user.message) {
      //   localStorage.setItem('user', JSON.stringify(user));
      //   // history.push(userRoutes[user.role]);
      // }
      setErrorMessage(user.message);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center">
      <Header />
      <form
        className={ `bg-zinc-300 flex flex-col h-3/4
        w-2/5 rounded items-center py-20 justify-between mt-10` }
        onSubmit={ handleSubmit }
      >
        <Input
          className="bg-zinc-400 rounded h-8 placeholder:text-zinc-600 p-3"
          type="text"
          data-testid="admin_manage__input-name"
          id="name"
          placeholder="Name"
          value={ name }
          onChange={ ({ target }) => setName(target.value) }
        />
        <Input
          className="bg-zinc-400 rounded h-8 placeholder:text-zinc-600 p-3"
          type="text"
          data-testid="admin_manage__input-email"
          id="email"
          placeholder="Email"
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
        />
        <Input
          className="bg-zinc-400 rounded h-8 placeholder:text-zinc-600 p-3"
          type="password"
          data-testid="admin_manage__input-password"
          id="password"
          placeholder="Password"
          value={ password }
          onChange={ ({ target }) => setPassword(target.value) }
        />
        <select
          className="bg-zinc-400 rounded h-8 px-3 w-1/2"
          data-testid="admin_manage__select-role"
          id="role"
          type="role"
          onChange={ ({ target }) => setRole(target.value) }
        >
          <option value="customer">Cliente</option>
          <option value="seller">Vendedor</option>
          <option value="administrator">Administrador</option>
        </select>
        <Button
          className={ `bg-green-500 rounded h-12 w-36
          hover:bg-green-400 disabled:bg-zinc-600` }
          type="submit"
          data-testid="admin_manage__button-register"
          disabled={ !formFieldsAreValid }
        >
          Cadastrar
        </Button>
      </form>
      {(errorMessage) && (
        <Notification
          message={ errorMessage }
          dataTestId="admin_manage__element-invalid-register"
        />
      )}
    </div>
  );
}

export default Manage;
