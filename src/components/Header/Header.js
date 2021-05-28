import React from 'react';
import './Header.css';
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/auth/action';

function Header(props) {

  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  console.log(props)

  return (
    <div className="header">
      <div className="header__wrapper">
        <div className="header__logo">REACT MESSENGER</div>

        {
          (!auth.authenticated) ? (
            <div className="header__nav">
              <NavLink to={'/login'} onClick={() => props.handleOpen}>Login</NavLink>
              <NavLink to={'/register'} >Sign up</NavLink>
            </div>
          ) : null
        }

      </div>
      <div>{`${auth.firstName} ${auth.lastName}`}</div>
      <div className="header__logout">
        {auth.authenticated ? (
          <Link to={'#'} onClick={() => {
            dispatch(logout(auth.uid))
          }}
          >
            Logout
          </Link>
        ) : null
        }

      </div>

    </div>

  )
}

export default Header
