var tagCst = require('constants/TagConst');

module.exports.updateTags = function (list) {
    return {
        type: tagCst.UPDATE_TAG_LIST,
        list: list
    }
};