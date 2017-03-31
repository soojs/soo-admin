var initState = {
    show: false, // 是否显示
    title: '登录' 
};

var cst = require('constants/LoginConst');

module.exports = function (state, action) {
    state = state || initState;

    switch (action.type) {
        case cst.SHOW_LOGIN:
            return Object.assign({}, state, {
                show: true
            });
        case cst.HIDE_LOGIN:
            return Object.assign({}, state, {
                show: false
            });
        default:
            return state;
    }
};