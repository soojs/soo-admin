var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var ReactRedux = require('react-redux');

require('common/style/common.less');

// codeMirror
require('codemirror/lib/codemirror.css');
//require('codemirror/theme/eclipse.css');
require('codemirror/theme/material.css');

var Router = ReactRouter.Router;
var hashHistory = ReactRouter.hashHistory;
var Provider = ReactRedux.Provider;

// 公共组件
var Header = require('common/components/header/Header');
var Nav = require('common/components/nav/Nav');
var Footer = require('common/components/footer/Footer');
var Tip = require('common/components/tip/Tip');
var Login = require('common/components/login/Login');

var publishActions = require('actions/PublishActions');

var App = React.createClass({
    render: function () {
        return (
            <div>
                <Header />
                <Nav />
                <Footer />
                <div className="view">
                    {this.props.children}
                </div>
                <Tip />
                <Login />
            </div>
        );
    }
});

var indexComponent = function(nextState, cb) {
    require.ensure([], function (require) {
        cb(null, require('containers/Index.jsx'));
    });
};

var routes = {
    path: '/',
    component: App,
    indexRoute: {
        paths: '/index',
        getComponent: indexComponent
    },
    childRoutes: [
        {
            path: 'index',
            getComponent: indexComponent
        },
        {
            path: 'article',
            getComponent: function(nextState, cb)  {
                require.ensure([], function (require) {
                    cb(null, require('containers/Article.jsx'));
                });
            }
        },
        // 发布文章首页
        {
            path: 'publish',
            getComponent: function(nextState, cb) {
                require.ensure([], function (require) {
                    cb(null, require('containers/Publish.jsx'));
                });
            }
        },

        // 发布普通文章
        {
            path: 'publish/normal',
            getComponent: function(nextState, cb) {
                require.ensure([], function (require) {
                    cb(null, require('containers/PublishNormal.jsx'));
                });
            },
            onLeave: function (params, replace) {
                store.dispatch(publishActions.resetArticle());
            }
        },

        // 发布富文本
        {
            path: 'publish/richtext',
            getComponent: function(nextState, cb) {
                require.ensure([], function (require) {
                    cb(null, require('containers/PublishRichText.jsx'));
                });
            }
        },

        // 发布markdown
        {
            path: 'publish/markdown',
            getComponent: function(nextState, cb) {
                require.ensure([], function (require) {
                    cb(null, require('containers/PublishMarkdown.jsx'));
                });
            },
            onLeave: function (params, replace) {
                store.dispatch(publishActions.resetArticle());
            }
        },

        {
            path: 'tag',
            getComponent: function(nextState, cb) {
                require.ensure([], function (require) {
                    cb(null, require('containers/Tag.jsx'));
                });
            }
        }
    ]
};

var store = require('store/configureStore');

window.$$dispatch = store.dispatch;
window.$$getState = store.getState;

ReactDOM.render((
    <Provider store={store}>
        <div>
            <Router history={hashHistory} routes={routes} />
        </div>
    </Provider>
), document.getElementById('app'));


