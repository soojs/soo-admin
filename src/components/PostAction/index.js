import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'

class PostAction extends Component {
  handleCreate = (e) => {
    console.log(e)
  }
  handleBatchPublish = (e) => {
    console.log(e)
  }
  handleBatchOffline = (e) => {
    console.log(e)
  }
  render () {
    const { selectedRowKeys, isBatchPublish, isBatchOffline } = this.props.pagination
    const hasSelected = selectedRowKeys && selectedRowKeys.length > 0
    return (
      <div className='post-list-actions' style={{marginBottom: 10}}>
        <Button type='primary'
          onClick={this.handleCreate}>新建</Button>
        <Button type='primary'
          style={{marginLeft: 8}}
          onClick={this.handleBatchPublish}
          disabled={!hasSelected}
          loading={isBatchPublish}>发布</Button>
        <Button type='primary'
          style={{marginLeft: 8}}
          onClick={this.handleBatchOffline}
          disabled={!hasSelected}
          loading={isBatchOffline}>下线</Button>
      </div>
    )
  }
}

PostAction.propTypes = {
  pagination: PropTypes.object.isRequired
}

export default PostAction
