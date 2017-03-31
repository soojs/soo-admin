var BaseService = require('./BaseService');

var FileService = function () {
};

FileService.prototype = new BaseService();

FileService.prototype.constructor = FileService;

FileService.prototype.uploadImgWithBase64 = function (data) {
    return this.post({
        url: '/upload/base64',
        data: data
    });
};



module.exports = new FileService();