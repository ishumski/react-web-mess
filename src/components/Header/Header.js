import React from 'react';
import './Header.css';
import { Link, NavLink } from 'react-router-dom'

function Header(props) {
  return (
    <div className="header">
      <div className="header__wrapper">
        <div className="header__logo">REACT MESSENGER</div>
        <div className="header__nav">
          <NavLink to={'/login'} >Login</NavLink>
          <NavLink to={'/register'} >Sign up</NavLink>
        </div>
      </div>
      <div>Mr. white</div>
      <div className="header__logout">
        <Link to={'#'} onClick={props.logout}>Logout</Link>
      </div>

    </div>

  )
}

export default Header
