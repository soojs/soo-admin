import React, { Component } from 'react';
import { Route, Redirect, Link, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import { Layout, Menu, Icon } from 'antd';
import './index.css';

const { Header, Footer, Sider, Content } = Layout;

const Loading = () => <div>loading</div>;

const PostComponent = Loadable({
  loader: () => import('../../components/Post'),
  loading: Loading,
});
const UserComponent = Loadable({
  loader: () => import('../../components/User'),
  loading: Loading,
});
const TagComponent = Loadable({
  loader: () => import('../../components/Tag'),
  loading: Loading,
});
const CategoryComponent = Loadable({
  loader: () => import('../../components/Category'),
  loading: Loading,
});

class Home extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    console.log(this.props.match.url);
    // const match = this.props.match;
    return (
      <Layout className="bee-blog-main">
        <Sider breakpoint="lg" trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="home" />
              <span>博客管理</span>
              <Link to="/" />
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="user" />
              <span>用户管理</span>
              <Link to="/user" />
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="tags-o" />
              <span>标签管理</span>
              <Link to="/tag" />
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="flag" />
              <span>分类管理</span>
              <Link to="/cate" />
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            <Switch>
              <Route exact path="/" component={PostComponent} />
              <Route exact path="/user" component={UserComponent} />
              <Route path="/tag" component={TagComponent} />
              <Route paht="/category" component={CategoryComponent} />
              <Redirect to="/" />
            </Switch>
          </Content>
          <Footer>
            Blog Console For Bee @2018
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default Home;
