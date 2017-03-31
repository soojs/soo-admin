
var ReactRedux = require('react-redux'),
    tipActions = require('actions/TipActions'),
    TIP_CONST = require('constants/TipConst'),
    base = require('common/base'),
    Button = require('common/components/button/Button'),
    Dialog = require('common/components/dialog/Dialog'),
    loginActions = require('actions/LoginActions'),
    loginService = require('services/LoginService'),
    Login;

require('./login.less');

Login = React.createClass({
    login: function () {
        var username = this.refs.username.value.trim(),
            password = this.refs.password.value,
            uLength = username.length,
            pLength = password.length,
            dispatch = this.props.dispatch,
            that = this;

        if (uLength < 5 || uLength > 50) {
            return dispatch(tipActions.showTip(TIP_CONST.TIP_TYPE.ERROR, '用户名长度为5到50'));
        }

        if (pLength < 5 || pLength > 50) {
            return dispatch(tipActions.showTip(TIP_CONST.TIP_TYPE.ERROR, '密码长度为5到50'));
        }

        loginService.login({
            username: username,
            password:password
        }).then(function () {
            that.closeLoginDialog();
            dispatch(tipActions.showTip(TIP_CONST.TIP_TYPE.SUCCESS, '登录成功!'));
        });
    },
    
    closeLoginDialog: function () {
        this.props.dispatch(loginActions.hideLoginDialog());
    },
    
    render: function() {
        return (
            <Dialog data={this.props.login} close={this.closeLoginDialog}>
                <div className="c-login">
                    <form>
                        <div className="row">
                            <label><span className="label">用户名：</span><input type="text" ref="username"/></label>
                        </div>
                        <div className="row">
                            <label><span className="label">密 码：</span><input type="password" ref="password"/></label>
                        </div>
                    </form>
                    <div className="row buttons">
                        <Button text="确定" doClick={this.login}></Button>
                        <Button text="取消" doClick={this.closeLoginDialog}></Button>
                    </div>
                </div>
            </Dialog>
        )
    }
});


function mapStateToProps(state) {
    return {
        login: state.Login
    };
}

module.exports = ReactRedux.connect(mapStateToProps)(Login);