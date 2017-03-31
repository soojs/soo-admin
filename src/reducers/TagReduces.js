var initState = {
    list: [] // tag列表
};

var cst = require('constants/TagConst');

module.exports = function articleReducers (state, action) {
    state = state || initState;

    switch (action.type) {
        case cst.UPDATE_TAG_LIST:
            return Object.assign({}, state, {
                list: action.list
            });
        
        default:
            return state;
    }
};