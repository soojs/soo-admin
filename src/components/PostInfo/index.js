import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Form } from 'antd'
import PostForm from './PostForm'

const WrappedPostForm = Form.create()(PostForm)

class PostInfo extends Component {
  render () {
    return (
      <div className='post-form-wrapper'>
        <WrappedPostForm entity={this.props.entity}
          onSubmit={this.props.onSubmit}
          onPublish={this.props.onPublish} />
      </div>
    )
  }
}

PostInfo.propTypes = {
  entity: PropTypes.object,
  onSubmit: PropTypes.func,
  onPublish: PropTypes.func
}

export default PostInfo
