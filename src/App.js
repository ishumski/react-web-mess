import React from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Home from './components/Home/Home.js'
import Login from './components/Login/Login.js'
import Register from './components/Register/Register.js'
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';


function App() {
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
