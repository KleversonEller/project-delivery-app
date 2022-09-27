import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import requestLogin from '../services/requestLogin';
import Notification from '../components/Notification';
import userRoutes from '../helpers/userRoutes';
import logo from '../images/images.jpeg';

export default function Login() {
  const history = useHistory();
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cantSubmit, setCantSubmit] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (history.location.pathname === '/') history.push('/login');
    setErrorMessage('');
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const testuserEmail = regex.test(userEmail);
    const min = 5;
    if (testuserEmail && password.length > min) setCantSubmit(false);
    else setCantSubmit(true);
  }, [userEmail, password, history]);

  useEffect(() => {
    if (history.location.pathname === '/login'
    && JSON.parse(localStorage.getItem('user'))) {
      history.push('/login');
      history.push('/customer/products');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = await requestLogin(userEmail, password);

    if (!user.message) {
      localStorage.setItem('user', JSON.stringify(user));
      return history.push(userRoutes[user.role]);
    }

    setErrorMessage(user.message);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form
        className="flex flex-col items-center p-6 bg-zinc-300 rounded gap-2 w-2/5"
        onSubmit={ handleSubmit }
      >
        <section>
          <img src={ logo } alt="" className="rounded" />
          <h1 className="text-center text-4xl mt-2 font-extrabold">Delivery App</h1>
        </section>
        <section className="flex flex-col gap-6">
          <label htmlFor="userEmail" className="flex flex-col gap-1">
            Login
            <input
              className="bg-zinc-400 rounded h-8 placeholder:text-zinc-600 p-3"
              data-testid="common_login__input-email"
              placeholder="Type your email"
              type="email"
              id="userEmail"
              value={ userEmail }
              onChange={ ({ target: { value } }) => setUserEmail(value) }
            />
          </label>
          <label htmlFor="pass" className="flex flex-col gap-1">
            Password
            <input
              className="bg-zinc-400 rounded h-8 placeholder:text-zinc-600 p-3"
              data-testid="common_login__input-password"
              placeholder="Type your password"
              type="password"
              id="pass"
              value={ password }
              onChange={ ({ target: { value } }) => setPassword(value) }
            />
          </label>
        </section>
        <div className="flex flex-col gap-1 mt-4">
          <Button
            data-testid="common_login__button-login"
            className={ `login_btn bg-green-500 rounded h-8
             hover:bg-green-400 disabled:bg-zinc-600` }
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
          >
            Ainda não tenho conta
          </Button>
        </div>
      </form>
      {(errorMessage) && (
        <Notification
          message={ errorMessage }
          dataTestId="common_login__element-invalid-email"
        />
      )}
    </div>
  );
}
