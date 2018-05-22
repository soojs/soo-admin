import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Table, Icon, Divider } from 'antd'

import { PostService } from '../../apis'

class PostList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      pagination: {},
      loading: false
    }
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
   * 从远程加载数据
   */
  fetch (params = {}) {
    this.setState({ loading: true })
    PostService
      .page()
      .then((res) => {
        const { count, rows } = res.data
        const pagination = this.state.pagination
        pagination.total = count
        this.setState({
          data: rows,
          pagination
        })
      })
      .finally(() => {
        this.setState({ loading: false })
      })
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
  componentDidMount () {
    this.fetch()
  }
  render () {
    const columns = this.columns
    const rowSelection = this.rowSelection
    return (
      <div className='post-list'>
        <Table rowKey='id'
          rowSelection={rowSelection}
          columns={columns}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange}
        />
      </div>
    )
  }
}

export default PostList
