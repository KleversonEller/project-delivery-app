import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Input from '../components/Input';
import * as registerFormValidate from '../validations/registerFormValidate';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formFieldsAreValid, setFormFieldsAreValid] = useState(false);

  useEffect(() => {
    const registerFormFields = [
      registerFormValidate.validateName(name),
      registerFormValidate.validateEmail(email),
      registerFormValidate.validatePassword(password),
    ];
    console.log(registerFormFields);
    setFormFieldsAreValid(registerFormFields.every((field) => field));
  }, [name, email, password]);

  return (
    <form>
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
  );
}

export default Register;
