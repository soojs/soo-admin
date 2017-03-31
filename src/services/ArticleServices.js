var BaseService = require('./BaseService');

var ArticleService = function () {
};

ArticleService.prototype = new BaseService();

ArticleService.prototype.constructor = ArticleService;

ArticleService.prototype.getArticleList = function () {
    return this.get({
        url: '/article/0/20'
    });
};

ArticleService.prototype.addArticle = function (article) {
    return this.put({
        url: '/article',
        data: article
    });
};

ArticleService.prototype.deleteArticle = function (articleId) {
    return this.delete({
        url: '/article/' + articleId
    });
};

ArticleService.prototype.updateArticle = function (articleId, newArticle) {
    return this.patch({
        url: '/article/' + articleId,
        data: newArticle
    });
};


module.exports = new ArticleService();