import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';

import { Button, Input } from '@material-ui/core';

import './Login.css';

import { signIn } from '../../store/auth/action';

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const userLogin = (event) => {
    event.preventDefault();

    if (email === "") {
      alert("Email is required");
      return;
    }

    if (password === "") {
      alert("Password is required");
      return;
    }

    dispatch(signIn({ email, password }))
  }

  if (auth.authenticated) {
    return <Redirect to={'/'} />
  }

  return (
    <div className="login">
      <div className='login__form'>
        <form>
          <Input
            type="text"
            placeholder="Enter email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Input
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
