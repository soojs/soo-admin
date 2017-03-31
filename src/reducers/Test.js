const initState = {
    msg: 'hello!'
};

module.exports = function testReducers (state, action) {
    state = state || initState;

    switch (action.type) {
        case 'TEST':
            return Object.assign({}, state, {
                msg: action.msg
            });
        default:
            return state
    }
};
