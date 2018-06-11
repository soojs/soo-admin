import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Table, Icon, Dropdown, Menu, Button } from 'antd'
import map from 'lodash/map'

class UserList extends Component {
  constructor (props) {
    super(props)
    // Action menus
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key='edit'>编辑</Menu.Item>
        <Menu.Item key='remove'>删除</Menu.Item>
        <Menu.Item key='disable'>拉黑</Menu.Item>
      </Menu>
    )
    // Table columns config
    this.columns = [{
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      render: (text, record) => (
        <Link to={`/user/${record.id}`}>{text}</Link>
      )
    }, {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
      render: (text, record) => (
        <Link to={`/user/${record.id}`}>{text}</Link>
      )
    }, {
      title: '最近登录IP',
      dataIndex: 'lastLoginIp',
      key: 'lastLoginIp'
    }, {
      title: '最近登录时间',
      dataIndex: 'lastLoginTime',
      key: 'lastLoginTime'
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <span>{ record.status === 1 ? '正常' : '禁闭'}</span>
      )
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Dropdown overlay={menu}>
          <Button>
            <Icon type='bars' /> <Icon type='down' />
          </Button>
        </Dropdown>
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
  handleMenuClick = (e) => {
    if (e.key === 'edit') {
      this.handleItemEdit()
    } else if (e.key === 'remove') {
      this.handleItemRemove()
    } else if (e.key === 'disable') {
      this.handleItemDisable()
    }
  }
  handleItemEdit = (key) => {
    console.log('handleItemEdit', key)
  }
  handleItemRemove = (key) => {
    console.log('handleItemRemove', key)
  }
  handleItemDisable = (key) => {
    console.log('handleItemDisable', key)
  }
  /**
   * 表格条件变化处理
   */
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination }
    pager.current = pagination.current
    this.setState({
      pagination: pager
    })
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

UserList.propTypes = {
  pagination: PropTypes.object.isRequired,
  entities: PropTypes.object.isRequired
}

export default UserList
