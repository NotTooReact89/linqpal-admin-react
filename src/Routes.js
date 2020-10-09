import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { useSelector } from 'react-redux';
import Login from './Screens/Login';
import Dashboard from './Screens/Dashboard';
import { MenuBar } from './Components';
import './App.scss';

const routes = (
  <div>
    <Switch>
      <LoginRoute exact path={['/']} component={Login} />
      <PrivateRoute exact path={['/dashboard']} component={Dashboard} />
    </Switch>
  </div>
);

function PrivateRoute({ component: Component, ...rest }) {
  const loginState = useSelector((state: any) => state.login);

  return (
    <Route
      {...rest}
      render={(props) =>
        loginState.access.accessToken ? (
          <>
            <MenuBar isLogin={false} />
            <Component {...props} />
          </>
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

function LoginRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          <MenuBar isLogin />
          <Component {...props} />
        </>
      )}
    />
  );
}
export default routes;
