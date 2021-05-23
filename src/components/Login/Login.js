import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { signIn } from '../../store/auth/action';
import './Login.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  /* useSelector это аналог mapStateToProps. 
  Хук принимает на вход селектор - метод, 
  который принимает redux state
  и возвращает из него необходимые данные.*/
  const auth = useSelector(state => state.auth);
  console.log(auth.authenticated);

  const userLogin = (event) => {
    event.preventDefault();

    if (email === "") {
      alert("Email is required");
      return
    }

    if (password === "") {
      alert("Password is required");
      return
    }
    dispatch(signIn({ email, password }))

    console.log(email, password);
  }

  if (auth.authenticated) {
    return <Redirect to={'/'} />
  }

  return (
    <div className="login">
      Login
      <div className="login__form">
        <form>
          <input
            type="text"
            placeholder="Enter email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button type="submit" onClick={userLogin} >Sign In</Button>
        </form>
      </div>
    </div>
  )
}

export default Login;
