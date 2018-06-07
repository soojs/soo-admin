import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Table, Icon, Divider } from 'antd'
import map from 'lodash/map'

class PostList extends Component {
  constructor (props) {
    super(props)
    this.columns = [{
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Link to={`/post/${record.id}`}>{text}</Link>
      )
    }, {
      title: '作者',
      dataIndex: 'createBy',
      key: 'createBy',
      render: (text, record) => (
        <Link to={`/user/${record.createBy}`}>{text}</Link>
      )
    }, {
      title: '标签',
      dataIndex: 'tags',
      key: 'tags'
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <span>{ record.status === 1 ? '已发布' : '草稿'}</span>
      )
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={this.handleEdit}><Icon type='edit' /> 编辑</a>
          <Divider type='vertical' />
          <a onClick={this.handleDelete}><Icon type='delete' /> 删除</a>
          <Divider type='vertical' />
          <a onClick={this.handlePublish}><Icon type='cloud-upload-o' /> 发布</a>
        </span>
      )
    }]
    this.rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(selectedRowKeys, selectedRows)
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'disabled user',
        name: record.name
      })
    }
  }
  /**
   * 表格条件变化处理
   */
  handleTableChange (pagination, filters, sorter) {
    const pager = { ...this.state.pagination }
    pager.current = pagination.current
    this.setState({
      pagination: pager
    })
  }
  handleEdit (e) {
    e.preventDefault()
    console.log('handle edit')
  }
  handlePublish (e) {
    e.preventDefault()
    console.log('handle publish')
  }
  handleDelete (e) {
    e.preventDefault()
    console.log('handle delete')
  }
  render () {
    const columns = this.columns
    const rowSelection = this.rowSelection
    const { ids, isFetching, index, total } = this.props.pagination
    const dataSource = map(ids, (id) => {
      return this.props.entities[id]
    })
    return (
      <Table rowKey='id'
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        pagination={{ current: index, pageSize: 10, total }}
        loading={isFetching}
        onChange={this.handleTableChange}
      />
    )
  }
}

PostList.propTypes = {
  pagination: PropTypes.object.isRequired,
  entities: PropTypes.object.isRequired
}

export default PostList
