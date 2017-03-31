var articleCst = require('constants/ArticleConst');

// 获取文章列表
module.exports.getArticleList = function (list) {
    return {
        type: articleCst.GET_ARTICLE_LIST,
        list: list
    }
};

// 更新文件List
module.exports.updateArticleList = function (list) {
    return {
        type: articleCst.RECEIVE_ARTICLE_LIST,
        list: list
    }
};


module.exports.showDeleteArticleDialog = function () {
    return {
        type: articleCst.SHOW_DELETE_ARTICLE_DIALOG
    }
};

// 隐藏删除文章Dialog
module.exports.hideDeleteArticleDialog = function () {
    return {
        type: articleCst.HIDE_DELETE_ARTICLE_DIALOG
    }
};

// 显示修改文章Dialog
module.exports.showModifyArticleDialog = function () {

};

// 隐藏修改文章Dialog
module.exports.hideModifyArticleDialog = function () {

};