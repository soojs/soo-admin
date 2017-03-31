var conf = require('constants/conf'),
    tipActions = require('actions/TipActions'),
    loginActions = require('actions/LoginActions'),
    TIP_CONST = require('constants/TipConst');

module.exports = function Interceptors (store) {
    return function (next) {
        return function (action) {
            if (action.retcode === conf.cgi.CGI_RETCODE_UNLOGIN) {
                return store.dispatch(loginActions.showLoginDialog());
            } else if(action.retcode !== undefined && action.retcode !== conf.cgi.CGI_RETCODE_SUC) {
                var errmsg = action.msg;

                return store.dispatch(tipActions.showTip(TIP_CONST.TIP_TYPE.ERROR, errmsg));
            } else {
                return next(action);
            }
        }
    }
};

