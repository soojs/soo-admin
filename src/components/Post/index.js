import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Icon, Divider } from 'antd';

class Post extends Component {
  constructor(props) {
    super(props);
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
      key: 'status'
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a onClick={this.handleEdit}><Icon type="edit"/> 编辑</a>
          <Divider type="vertical" />
          <a onClick={this.handleDelete}><Icon type="delete"/> 删除</a>
          <Divider type="vertical" />
          <a onClick={this.handlePublish}><Icon type="cloud-upload-o"/> 发布</a>
        </span>
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
  }
  /**
   * 从远程加载数据
   */
  fetch = (params = {}) => {
    // this.setState({
    //   loading: true,
    // });
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
  handleEdit = (e) => {
    e.preventDefault();
    console.log('handle edit');
  }
  handlePublish = (e) => {
    e.preventDefault();
    console.log('handle publish');
  }
  handleDelete = (e) => {
    e.preventDefault();
    console.log('handle delete');
  }
  componentDidMount() {
    this.fetch();
    // test
    const data = this.state.data;
    data.push({
      id: 1492696102,
      tags: '关于',
      desc: '关于幸福六局',
      title: '呵呵呵呵呵呵呵',
      summary: '呵呵呵呵呵呵呵',
      permalink: '/about',
      status: 0,
      publisAt: Date.now(),
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
    const rowSelection = this.rowSelection;
    return (
      <div>
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

export default Post;
