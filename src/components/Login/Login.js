import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import './Login.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => {
    console.log(email, password);
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
          <Button onClick={handleClick} >Sign In</Button>
        </form>
      </div>
    </div>
  )
}

export default Login
