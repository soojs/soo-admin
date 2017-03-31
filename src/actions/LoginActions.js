var loginCst = require('constants/LoginConst');

module.exports.showLoginDialog = function () {
    return {
        type: loginCst.SHOW_LOGIN
    }
};

module.exports.hideLoginDialog = function () {
    return {
        type: loginCst.HIDE_LOGIN
    }
};

