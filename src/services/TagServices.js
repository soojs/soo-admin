var BaseService = require('./BaseService');

var TagService = function () {
};

TagService.prototype = new BaseService();

TagService.prototype.constructor = TagService;

TagService.prototype.getTagList = function () {
    return this.get({
        url: '/tag'
    });
};

TagService.prototype.addTag = function (tag) {
    return this.put({
        url: '/tag',
        data: tag
    });
};

TagService.prototype.deleteTag = function (tagId) {
    return this.delete({
        url: '/tag/' + tagId
    });
};


module.exports = new TagService();