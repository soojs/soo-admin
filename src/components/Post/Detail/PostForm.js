import React, { Component } from 'react';
import { Form, Input } from 'antd';

const FormItem = Form.Item;

class PostForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 22 },
      }
    }
    return (
      <div className="post-detail">
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;题">
            {getFieldDecorator('title', {
              rules: [{
                required: true, message: '请输入标题',
              }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="摘&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;要">
            {getFieldDecorator('title', {
              rules: [{
                required: true, message: '请输入摘要',
              }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;签">
            <Input />
          </FormItem>
          <FormItem {...formItemLayout} label="永久链接">
            <Input addonBefore="https://{bee-host}/" />
          </FormItem>
          <FormItem {...formItemLayout} label="文章正文">
            <Input.TextArea rows={10} />
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default PostForm;
