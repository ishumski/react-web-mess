import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import "../Login/Login.css";
import { signUp } from '../../store/auth/action';

function Register() {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const dispatch = useDispatch();

  // const handleClick = () => {
  //   console.log(email, password, firstName, lastName)
  // }

  const registerUser = (event) => {
    event.preventDefault();
    const user = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName
    }

    dispatch(signUp(user));

    //после отработки ф-ции очищаем поля
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  }


  return (
    <div className="register">
      Registration
      <div className="register__form">
        <form >
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
          <Button type="submit" onClick={registerUser} >Sign Up</Button>
        </form>
      </div>
    </div>
  )
}

export default Register
