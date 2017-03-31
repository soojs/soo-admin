require('./header.less');

var header = {
    title: 'FXBlog-管理平台!'
};

var ReactRedux = require('react-redux'),
    loginActions = require('actions/LoginActions');

var Header = React.createClass({
    showLoginDialog: function () {
        this.props.dispatch(loginActions.showLoginDialog());
    },

    render: function() {
        return (
            <div className="c-header">
                <div className="banner">
                    {header.title}
                </div>
                <div className="login-trigger" onClick={this.showLoginDialog}>登录</div>
            </div>
        );
    }
});


module.exports = ReactRedux.connect()(Header);