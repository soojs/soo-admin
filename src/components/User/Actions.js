import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'

class UserActions extends Component {
  handleBatchDelete = (e) => {
    console.log(e)
  }
  render () {
    const { selectedRowKeys, isBatchLoading } = this.props.pagination
    const hasSelected = selectedRowKeys && selectedRowKeys.length > 0
    return (
      <div className='post-list-actions' style={{marginBottom: 10}}>
        <Button type='primary'
          onClick={this.handleCreate}>新建</Button>
        <Button type='primary'
          style={{marginLeft: 8}}
          onClick={this.handleBatchDelete}
          disabled={!hasSelected}
          loading={isBatchLoading}>删除</Button>
      </div>
    )
  }
}

UserActions.propTypes = {
  pagination: PropTypes.object.isRequired
}

export default UserActions
