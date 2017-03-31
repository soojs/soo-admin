module.exports = function (type) {
    var types = {
        0: '草稿',
        1: '已发布',
        2: '已删除'
    };

    return types[type];
};