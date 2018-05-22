import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Icon, Dropdown, Menu, Button } from 'antd';

class UserList extends Component {
  constructor(props) {
    super(props);
    // Action menus
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="edit">编辑</Menu.Item>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="disable">拉黑</Menu.Item>
      </Menu>
    );
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
            <Icon type="bars" /> <Icon type="down" />
          </Button>
        </Dropdown>
      ),
    }];
    this.rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(selectedRowKeys, selectedRows);
      },
      getCheckboxProps: record => ({
        disabled: record.name === 'disabled user',
        name: record.name
      }),
    }
  }
  state = {
    data: [],
    pagination: {},
    loading: false,
    hasSelected: false,
    batchDeleteLoading: false,
  }
  /**
   * 从远程加载数据
   */
  fetch = (params = {}) => {
    // this.setState({
    //   loading: true,
    // });
  }
  handleMenuClick = (e) => {
    if (e.key === 'edit') {
      this.handleItemEdit();
    } else if (e.key === 'remove') {
      this.handleItemRemove();
    } else if (e.key === 'disable') {
      this.handleItemDisable();
    }
  }
  handleItemEdit = (key) => {
    console.log('handleItemEdit', key);
  }
  handleItemRemove = (key) => {
    console.log('handleItemRemove', key);
  }
  handleItemDisable = (key) => {
    console.log('handleItemDisable', key);
  }
  /**
   * 表格条件变化处理
   */
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager
    });
  }
  componentDidMount() {
    this.fetch();
    // test
    const data = this.state.data;
    data.push({
      id: 10000,
      username: '13968149610',
      nickname: '王大岛',
      lastLoginIp: '127.0.0.1',
      lastLoginTime: 1526890590506,
      status: 0,
      createBy: 'jerrydot0',
      createAt: Date.now(),
      updateBy: 'jerrydot0',
      updateAt: Date.now()
    });
    this.setState({
      data: data
    });
  }
  render() {
    const columns = this.columns;
    const rowSelection = {
      selectedRowKeys: [],
      onChange: this.onSelectChange,
    }
    const hasSelected = false;
    return (
      <div className="post-list">
        <div className="post-list-actions">
          <Button type="primary"
            onClick={this.handleBatchDelete}
            disabled={!hasSelected}
            loading={this.batchDeleteLoading}
          />
        </div>
        <Table rowKey="id" 
          rowSelection={rowSelection}
          columns={columns}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default UserList;
