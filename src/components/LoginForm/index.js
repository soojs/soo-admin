import React from 'react'
import PropTypes from 'prop-types'
import { Form, Icon, Input, Button } from 'antd'

const FormItem = Form.Item

class LoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const { form } = this.props
    form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values)
      }
    })
  }
  // componentDidUpdate () {
  //   const loginUser = this.props.loginUser || {}
  //   if (loginUser.isLogining === false && loginUser.loginCode > 0) {
  //     message.error('用户名密码错误')
  //   }
  // }
  render () {
    const { getFieldDecorator } = this.props.form
    const loginUser = this.props.loginUser || {}
    return (
      <Form onSubmit={this.handleSubmit} className='login-form'>
        <FormItem>
          {getFieldDecorator('username', {
            initialValue: loginUser.username,
            rules: [{ required: true, message: 'Please input your Username!' }]
          })(
            <Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Username' />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            initialValue: loginUser.password,
            rules: [{ required: true, message: 'Please input your Password!' }]
          })(
            <Input prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />} type='password' placeholder='Password' />
          )}
        </FormItem>
        <FormItem>
          <Button type='primary' htmlType='submit' className='login-form-button'
            loading={loginUser.isLogining}>Log in</Button>
        </FormItem>
      </Form>
    )
  }
}

LoginForm.propTypes = {
  form: PropTypes.object,
  onSubmit: PropTypes.func,
  loginUser: PropTypes.object
}

export default LoginForm
