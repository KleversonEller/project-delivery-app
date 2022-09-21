import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import requestLogin from '../services/requestLogin';
import Notification from '../components/Notification';
import userRoutes from '../helpers/userRoutes';

export default function Login() {
  const history = useHistory();
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cantSubmit, setCantSubmit] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (history.location.pathname === '/') {
      history.push('/login');
    }
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const testuserEmail = regex.test(userEmail);
    const min = 5;
    if (testuserEmail && password.length > min) setCantSubmit(false);
    else setCantSubmit(true);
  }, [userEmail, password, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = { email: userEmail };
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify(obj));
    const user = await requestLogin(userEmail, password);
    console.log(user);
    if (!user.message) return history.push(userRoutes[user.role]);
    setErrorMessage(user.message);
  };

  return (
    <>
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
              data-testid="common_login__input-email"
              placeholder="Type your email"
              type="email"
              id="userEmail"
              value={ userEmail }
              onChange={ ({ target: { value } }) => setUserEmail(value) }
            />
          </label>
          <label htmlFor="pass">
            <input
              data-testid="common_login__input-password"
              placeholder="Type your password"
              type="password"
              id="pass"
              value={ password }
              onChange={ ({ target: { value } }) => setPassword(value) }
            />
          </label>
        </section>
        <Button
          data-testid="common_login__button-login"
          className="login_btn"
          type="submit"
          disabled={ cantSubmit }
        >
          LOGIN
        </Button>
        <Button
          data-testid="common_login__button-register"
          className="login_btn"
          type="button"
          onClick={ () => { history.push('/register'); } }
          disabled={ cantSubmit }
        >
          Ainda não tenho conta
        </Button>
      </form>
      <Notification
        message={ errorMessage }
        dataTestId="common_login__element-invalid-email"
      />
    </>
  );
}
