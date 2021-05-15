import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import "../Login/Login.css";




function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleClick = () => {
    console.log(email, password, firstName, lastName)
  }

  return (
    <div className="register">
      Registration
      <div className="register__form">
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
          <input
            type="text"
            placeholder="Enter name"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
          <input
            type="text"
            placeholder="Enter second name"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
          <Button onClick={handleClick} >Sign Up</Button>
        </form>
      </div>
    </div>
  )
}

export default Register
