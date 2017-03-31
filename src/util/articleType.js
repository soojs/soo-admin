module.exports = function (type) {
    var types = {
        100: '普通',
        200: '富文本',
        300: 'Markdown'
    };

    return types[type];
};