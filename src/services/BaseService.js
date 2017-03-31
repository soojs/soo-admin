/**
 * @file BaseService
 *
 */

var conf = require('constants/conf');

var prehandler = function (response) {
    return response.json().then(function (data) {
        return new Promise(function (rs, rj) {
            if (data.retcode === conf.cgi.CGI_RETCODE_UNLOGIN) {
                return $$dispatch({
                    retcode: conf.cgi.CGI_RETCODE_UNLOGIN
                });
            }

            if (data.retcode !== conf.cgi.CGI_RETCODE_SUC) {
                return $$dispatch({
                    retcode: data.retcode,
                    msg: data.msg
                });
            }

            rs(data.result);
        });
    });
};

var objectToParam = function (data) {
    var param = [];

    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            // 传到后面的参数一定要编码，一定要编码，一定要编码
            param.push([encodeURIComponent(key), '=', encodeURIComponent(data[key])].join(''));
        }
    }

    return param.join('&');
};


var BaseService = function () {
    if(this instanceof BaseService) {
        this.contentType = 'application/x-www-form-urlencoded';
        this.credentials = 'same-origin';
        this.prefix = '/cgi';
    } else {
        return new BaseService;
    }
};

BaseService.prototype = {
    constructor: BaseService,

    _fetchUrlInterceptor: function (url) {
        return this.prefix + url;
    },

    post: function (config) {
        return fetch(this._fetchUrlInterceptor(config.url), {
            method: "POST",
            credentials: this.credentials,
            headers: {
                "Content-Type": this.contentType
            },
            body: objectToParam(config.data)
        }).then(function(response) {
            return prehandler(response);
        });
    },

    put: function (config) {
        return fetch(this._fetchUrlInterceptor(config.url), {
            method: "PUT",
            credentials: this.credentials,
            headers: {
                "Content-Type": this.contentType
            },
            body: objectToParam(config.data)
        }).then(function(response) {
            return prehandler(response);
        });
    },

    delete: function (config) {
        return fetch(this._fetchUrlInterceptor(config.url), {
            method: "DELETE",
            credentials: this.credentials,
            headers: {
                "Content-Type": this.contentType
            },
            body: objectToParam(config.data)
        }).then(function(response) {
            return prehandler(response);
        });
    },

    patch: function (config) {
        return fetch(this._fetchUrlInterceptor(config.url), {
            method: "PATCH",
            credentials: this.credentials,
            headers: {
                "Content-Type": this.contentType
            },
            body: objectToParam(config.data)
        }).then(function(response) {
            return prehandler(response);
        });
    },

    get: function (config) {
        var url  = this._fetchUrlInterceptor(config.url);
        var param = objectToParam(config.data);

        url = param ? url + '?'+param : url;

        return fetch(url, {
            credentials: this.credentials
        }).then(function(response) {
            return prehandler(response);
        });
    }
};

module.exports = BaseService;