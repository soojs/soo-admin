import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { message, Form } from 'antd'

import './index.css'
import LoginForm from '../../components/LoginForm'
import { login } from '../../store/actions'

const WrappedLoginForm = Form.create()(LoginForm)

class Login extends Component {
  handleSubmit = (values) => {
    console.log('Received values of form: ', values)
    // 因为`message`的UI是全局的，不能放在该组件的`render`函数里
    // 所以将他作为普通的ajax回调进行处理
    this.props
      .login(values)
      .then(resp => {
        // 100404 - 用户未注册
        // 100401 - 用户名密码错误
        if (resp && (resp.code === 100404 || resp.code === 100401)) {
          message.error('用户名密码错误')
        }
      })
  }
  render () {
    const loginUser = this.props.loginUser
    return (
      <div className='login-form-wrapper'>
        <WrappedLoginForm loginUser={loginUser} onSubmit={this.handleSubmit} />
      </div>
    )
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  loginUser: PropTypes.object
}

const mapStateToProps = (state) => ({
  loginUser: state.loginUser
})

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     login: args => {
//       // 因为`message`的UI是全局的，不能放在该组件的`render`函数里
//       // 所以将他作为普通的ajax回调进行处理
//       dispatch(login2(args))
//         .then(resp => {
//           // 100404 - 用户未注册
//           // 100401 - 用户名密码错误
//           if (resp && (resp.code === 100404 || resp.code === 100401)) {
//             message.error('用户名密码错误')
//           }
//         })
//     }
//   }
// }

export default withRouter(connect(mapStateToProps, {
  login
})(Login))
