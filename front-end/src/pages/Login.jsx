import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default function Login() {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cantSubmit, setCantSubmit] = useState(true);

  useEffect(() => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const testuserEmail = regex.test(userEmail);
    const min = 5;
    if (testuserEmail && password.length > min) setCantSubmit(false);
    else setCantSubmit(true);
  }, [userEmail, password]);

  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    const obj = { email: userEmail };
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify(obj));
    history.push('/register');
    return true;
  };

  return (
    <form
      onSubmit={ handleSubmit }
    >
      <section>
        <h1>Delivery App</h1>
        <h3>Login</h3>
      </section>
      <section>
        <label htmlFor="userEmail">
          <input
            data-testids="common_login__input-email"
            placeholder="Type your email"
            type="email"
            id="userEmail"
            value={ userEmail }
            onChange={ ({ target: { value } }) => setUserEmail(value) }
          />
        </label>
        <label htmlFor="pass">
          <input
            data-testids="common_login__input-password"
            placeholder="Type your password"
            type="password"
            id="pass"
            value={ password }
            onChange={ ({ target: { value } }) => setPassword(value) }
          />
        </label>
      </section>
      <Button
        data-testids="common_login__button-login"
        className="login_btn"
        type="submit"
        data-testid="login-submit-btn"
        disabled={ cantSubmit }
      >
        LOGIN
      </Button>
      <Button
        data-testids="common_login__button-register"
        className="login_btn"
        type="submit"
        data-testid="login-submit-btn"
        disabled={ cantSubmit }
      >
        Ainda não tenho conta
      </Button>

    </form>
  );
}
