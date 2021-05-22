import React from 'react';
import './Header.css';
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';

function Header(props) {

  const auth = useSelector(state => state.auth)
  return (
    <div className="header">
      <div className="header__wrapper">
        <div className="header__logo">REACT MESSENGER</div>

        {
          (!auth.authenticated) ? (
            <div className="header__nav">
              <NavLink to={'/login'} >Login</NavLink>
              <NavLink to={'/register'} >Sign up</NavLink>
            </div>
          ) : null
        }

      </div>
      <div>{`${auth.firstName} ${auth.lastName}`}</div>
      <div className="header__logout">
        {auth.authenticated ? (
          <Link to={'#'} onClick={props.logout}>Logout</Link>
        ) : null
        }

      </div>

    </div>

  )
}

export default Header
