import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Form, Input, Button } from 'antd'

const FormItem = Form.Item

class PostForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.props.entity) {
          values.id = this.props.entity.id
        }
        this.props.onSubmit(values)
      }
    })
  }
  handlePublish = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.props.entity) {
          values.id = this.props.entity.id
        }
        this.props.onPublish(values)
      }
    })
  }
  render () {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 22 }
      }
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 22, offset: 2 }
      }
    }
    const { entity = {} } = this.props
    return (
      <div className='post-detail'>
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label='标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;题'>
            {getFieldDecorator('title', {
              initialValue: entity.title,
              rules: [{
                required: true, message: '请输入标题'
              }]
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label='摘&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;要'>
            {getFieldDecorator('summary', {
              initialValue: entity.summary
            })(<Input.TextArea rows={2} />)}
          </FormItem>
          <FormItem {...formItemLayout} label='标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;签'>
            {getFieldDecorator('tags', {
              initialValue: entity.tags
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label='永久链接'>
            {getFieldDecorator('permalink', {
              initialValue: entity.permalink
            })(<Input addonBefore='https://{soo-host}/' />)}
          </FormItem>
          <FormItem {...formItemLayout} label='文章正文'>
            {getFieldDecorator('content', {
              initialValue: entity.content
            })(<Input.TextArea rows={10} />)}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type='primary' htmlType='submit'
              loading={entity.isSaveing} disabled={entity.isUpdateing}>保存</Button>
            <Button style={{ marginLeft: 8 }}
              loading={entity.isUpdateing} disabled={entity.isSaveing}
              onClick={this.handlePublish}>发布</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

PostForm.propTypes = {
  form: PropTypes.object.isRequired,
  entity: PropTypes.object,
  onSubmit: PropTypes.func,
  onPublish: PropTypes.func
}

export default PostForm
