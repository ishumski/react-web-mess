import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Home from './components/Home/Home.js'
import Login from './components/Login/Login.js'
import Register from './components/Register/Register.js'
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { isLoggedInUser } from './store/auth/action';


function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

 /*useEffect представляет собой совокупность методов 
  componentDidMount, componentDidUpdate, и componentWillUnmount
  жизненный цикл React*/
  useEffect(() => {
    if (!auth.authenticated) {
      dispatch(isLoggedInUser())
    }
  }, [])

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
