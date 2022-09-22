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
    e.preventDefault();
    const user = await requestCreateUser(name, email, password);
    console.log(user);
    if (!user.message) return history.push(userRoutes[user.role]);
    setErrorMessage(user.message);
  };

  return (
    <>
      <form onSubmit={ handleSubmit }>
        <Input
          type="text"
          data-testid="common_register__input-name"
          id="name"
          placeholder="Name"
          value={ name }
          onChange={ ({ target }) => setName(target.value) }
        />
        <Input
          type="text"
          data-testid="common_register__input-email"
          id="email"
          placeholder="Email"
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
        />
        <Input
          type="password"
          data-testid="common_register__input-password"
          id="password"
          placeholder="Password"
          value={ password }
          onChange={ ({ target }) => setPassword(target.value) }
        />
        <Button
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
          dataTestId="common_login__element-invalid-email"
        />
      )}
    </>
  );
}

export default Register;
