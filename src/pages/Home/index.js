import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Loadable from 'react-loadable';
import { Layout, Menu, Icon } from 'antd';
import './index.css';

const { Header, Footer, Sider, Content } = Layout;

const Loading = () => <div>loading</div>;

const PostListComponent = Loadable({
  loader: () => import('../../components/Post'),
  loading: Loading,
});
const PostDetailComponent = Loadable({
  loader: () => import('../../components/Post/Detail'),
  loading: Loading,
});
const UserListComponent = Loadable({
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
    const menus = [
      { path: '/', name: 'Dashboard', icon: 'home' },
      { path: '/post', name: '文章管理', icon: 'bars' },
      { path: '/user', name: '用户管理', icon: 'user' },
      { path: '/tag', name: '标签管理', icon: 'tags-o' },
      { path: '/cate', name: '分类管理', icon: 'flag' },
    ];
    const selectedKeys = [];
    menus.map((menu) => {
      if (menu.path === this.props.match.path) {
        selectedKeys.push(menu.path);
      }
      return null;
    });
    return (
      <Layout className="bee-blog-main">
        <Sider breakpoint="lg" trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo">幸福六局</div>
          <Menu theme="light" mode="inline" defaultSelectedKeys={selectedKeys}>
          {
            menus.map((menu) => (
              <Menu.Item key={menu.path}>
                <Icon type={menu.icon} />
                <span>{menu.name}</span>
                <Link to={menu.path} />
              </Menu.Item>
            ))
          }
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
            <Route exact path="/" component={PostListComponent} />
            <Route exact path="/post" component={PostListComponent} />
            <Route path="/post/:id" component={PostDetailComponent} />
            <Route path="/user" component={UserListComponent} />
            <Route path="/tag" component={TagComponent} />
            <Route path="/cate" component={CategoryComponent} />
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
