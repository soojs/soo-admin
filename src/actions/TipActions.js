var tipCst = require('constants/TipConst');

module.exports.hideTip = function () {
    return {
        type: tipCst.HIDE_TIP
    }
};

module.exports.showTip = function (tipType, msg) {
    return {
        type: tipCst.SHOW_TIP,
        tipType: tipType,
        msg: msg
    }
};

