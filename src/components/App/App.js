import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import './App.css';

import Home from '../Home/Home'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Layout from '../Layout/Layout';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

import { isLoggedInUser } from '../../store/auth/action';

function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if (!auth.authenticated) {
      dispatch(isLoggedInUser())
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Layout />
        <Switch>
          <PrivateRoute path='/' exact component={Home} />

          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />

        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;
