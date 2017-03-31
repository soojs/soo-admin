var initState = {
    msg: '', // 提示消息
    show: false, // 是否显示提示
    tipType: null // 提示类型
};

var cst = require('constants/TipConst');

module.exports = function articleReducers (state, action) {
    state = state || initState;

    switch (action.type) {
        case cst.SHOW_TIP:
            return Object.assign({}, state, {
                msg: action.msg,
                show: true,
                tipType: action.tipType
            });
        case cst.HIDE_TIP:
            return initState;
        default:
            return state;
    }
};
