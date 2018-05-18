import React, { Component, Fragment } from 'react';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      rest.isAuth ? (
        <Component {...props} />
      ) : (
        <Redirect
          exact
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

class App extends Component {
  state = {
    isAuth: true,
  }
  login() {
    this.setState('isAuth', true);
  }
  logout() {
    this.setState('isAuth', false);
  }
  render() {
    const isAuth = this.state.isAuth;
    return (
      <Router>
        <Fragment>
          <Route path="/login" component={Login} />
          <PrivateRoute isAuth={isAuth} path="/" component={Home} exact />
          <PrivateRoute isAuth={isAuth} path="/post" component={Home} />
          <PrivateRoute isAuth={isAuth} path="/user" component={Home} />
          <PrivateRoute isAuth={isAuth} path="/tag" component={Home} />
          <PrivateRoute isAuth={isAuth} path="/cate" component={Home} />
          {/* <PrivateRoute isAuth={isAuth} path="/:module(user|tag|cate)" component={Home} /> */}
        </Fragment>
      </Router>
    );
  }
}

export default App;
