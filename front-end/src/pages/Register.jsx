import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import Input from '../components/Input';
import requestCreateUser from '../services/requestCreateUser';
import Notification from '../components/Notification';
import * as registerFormValidate from '../validations/registerFormValidate';
import userRoutes from '../helpers/userRoutes';

function Register() {
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const handleSubmit = async (e) => {
    console.log(e);
    e.preventDefault();
    if (name && email && password) {
      const user = await requestCreateUser(name, email, password);
      if (!user.message) {
        localStorage.setItem('user', JSON.stringify(user));
        history.push(userRoutes[user.role]);
      }
      setErrorMessage(user.message);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form
        className={ `bg-zinc-300 flex flex-col h-3/4
        w-2/5 rounded items-center py-20 justify-between` }
        onSubmit={ handleSubmit }
      >
        <Input
          className="bg-zinc-400 rounded h-8 placeholder:text-zinc-600 p-3"
          type="text"
          data-testid="common_register__input-name"
          id="name"
          placeholder="Name"
          value={ name }
          onChange={ ({ target }) => setName(target.value) }
        />
        <Input
          className="bg-zinc-400 rounded h-8 placeholder:text-zinc-600 p-3"
          type="text"
          data-testid="common_register__input-email"
          id="email"
          placeholder="Email"
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
        />
        <Input
          className="bg-zinc-400 rounded h-8 placeholder:text-zinc-600 p-3"
          type="password"
          data-testid="common_register__input-password"
          id="password"
          placeholder="Password"
          value={ password }
          onChange={ ({ target }) => setPassword(target.value) }
        />
        <Button
          className={ `bg-green-500 rounded h-12 w-36
          hover:bg-green-400 disabled:bg-zinc-600` }
          type="submit"
          data-testid="common_register__button-register"
          disabled={ !formFieldsAreValid }
        >
          Cadastrar
        </Button>
      </form>
      {(errorMessage) && (
        <Notification
          message={ errorMessage }
          dataTestId="common_register__element-invalid_register"
        />
      )}
    </div>
  );
}

export default Register;
