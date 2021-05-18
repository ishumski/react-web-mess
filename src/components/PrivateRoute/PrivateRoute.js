import React from 'react';
import { Route } from 'react-router';


function PrivateRoute({ path, component, exact }) {
  return (

    <Route path={path} exact={exact} component={component} />

  )
}

export default PrivateRoute
