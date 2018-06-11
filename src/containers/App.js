import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect, withRouter } from 'react-router-dom'

import Home from './Home'
import Login from './Login'

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
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
)

PrivateRoute.propTypes = {
  location: PropTypes.string,
  component: PropTypes.func.isRequired
}

class App extends Component {
  render () {
    const { loginUser } = this.props
    const isAuth = loginUser.uid > 0 && !!loginUser.username
    return (
      <Fragment>
        <Route path='/login'
          render={props =>
            !isAuth ? (
              <Login />
            ) : (
              <Redirect
                exact
                to={{
                  pathname: '/',
                  state: { from: props.location }
                }}
              />
            )
          }
        />
        <PrivateRoute isAuth={isAuth} path='/' component={Home} exact />
        <PrivateRoute isAuth={isAuth} path='/post' component={Home} />
        <PrivateRoute isAuth={isAuth} path='/user' component={Home} />
        <PrivateRoute isAuth={isAuth} path='/tag' component={Home} />
        <PrivateRoute isAuth={isAuth} path='/cate' component={Home} />
        {/* <PrivateRoute isAuth={isAuth} path='/:module(user|tag|cate)' component={Home} /> */}
      </Fragment>
    )
  }
}

App.propTypes = {
  loginUser: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  loginUser: state.loginUser
})

export default withRouter(connect(mapStateToProps)(App))
