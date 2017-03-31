var BaseService = require('./BaseService');

var LoginService = function () {
};

LoginService.prototype = new BaseService();

LoginService.prototype.constructor = LoginService;

LoginService.prototype.login = function (data) {
    return this.post({
        url: '/login',
        data: data
    });
};

module.exports = new LoginService();