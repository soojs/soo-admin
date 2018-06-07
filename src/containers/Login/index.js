import React, { Component } from 'react'
import { Form } from 'antd'
import LoginForm from '../../components/LoginForm'
import './index.css'

const WrappedLoginForm = Form.create()(LoginForm)

class Login extends Component {
  handleSubmit = (values) => {
    console.log('Received values of form: ', values)
  }
  render () {
    return (
      <div className='login-form-wrapper'>
        <WrappedLoginForm onSubmit={this.handleSubmit} />
      </div>
    )
  }
}

export default Login
