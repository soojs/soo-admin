var initState = {
    list: [],
    isFetching: true,
    deleteArticleDialog: { // 删除文章Dialg
        show: false
    },
    modifyArticleDialog: { // 修改文章Dialog
        
    }
};

var articleCst = require('constants/ArticleConst');

module.exports = function articleReducers (state, action) {
    state = state || initState;

    switch (action.type) {
        case articleCst.RECEIVE_ARTICLE_LIST:
            return Object.assign({}, state, {
                list: action.list,
                isFetching: false
            });

        case articleCst.SHOW_DELETE_ARTICLE_DIALOG:
            return Object.assign({}, state, {
                deleteArticleDialog: {
                    show: true,
                    title: '删除确认'
                }
            });

        case articleCst.HIDE_DELETE_ARTICLE_DIALOG:
            return Object.assign({}, state, {
                deleteArticleDialog: {
                    show: false
                }
            });

        default:
            return state;
    }
};
