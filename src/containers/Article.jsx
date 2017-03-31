var ReactRedux = require('react-redux');
var Loading = require('common/components/loading/Loading');
var ArticleList = require('./article/ArticleList');
var Article;
var articleAction = require('actions/ArticleActions'),
    tipCst = require('constants/TipConst'),
    tipAction = require('actions/TipActions'),
    articleSvc = require('services/ArticleServices'),
    Dialog = require('common/components/dialog/Dialog'),

    publishActions = require('actions/PublishActions'),
    publishCst = require('constants/PublishConst'),
    
    deletingArticle = {};

require('./article/article.less');

Article = React.createClass({
    componentDidMount: function() {
        var that = this;

        articleSvc.getArticleList().then(function (data) {
            that.props.dispatch(articleAction.updateArticleList(data.list));
        })
    },

    deleteArticle: function (article) {
        deletingArticle = article;
        this.props.dispatch(articleAction.showDeleteArticleDialog());
    },

    modifyArticle: function (article) {
        var dispatch = this.props.dispatch,
            type = ~~article.type,
            modifyRoutePath = '/publish/' + (type === 100 ? 'normal' : type === 200 ? 'richtext' : 'markdown'),
            title = article.title,
            contents,
            tags = article.tags.map(function (tag) {
                return tag.id;
            });

        // 准备数据 -> id
        dispatch(publishActions.setEditArticleId(type, article.id));


        if (type === 100) {
            contents = JSON.parse(article.content);

            // 准备数据 -> 标签
            dispatch(publishActions.normalTagsChange(tags));

            // 准备数据 -> 标题
            dispatch(publishActions.titleChange(title));

            // 准备数据 -> 内容
            contents.forEach(function (p) {
                dispatch(publishActions.addParagraph(p.type, p.value));
            });
        } else if (type === 300) {
            dispatch(publishActions.markdownTagsChange(tags));

            dispatch(publishActions.markdownContentChange({
                title: article.title,
                brief: article.brief,
                markdown: article.content
            }));
        }

        // js跳转路由
        this.context.router.push(modifyRoutePath);
    },

    closeDeleteDialog: function () {
        this.props.dispatch(articleAction.hideDeleteArticleDialog());
    },

    doDeleteArticle: function () {
        var dispatch = this.props.dispatch,
            that = this;

        articleSvc.deleteArticle(deletingArticle.id).then(function () {
            dispatch(articleAction.hideDeleteArticleDialog());
            dispatch(tipAction.showTip(tipCst.TIP_TYPE.SUCCESS, '删除文章成功'));
            dispatch(articleAction.updateArticleList(that.props.list.filter(function (item) {
                return item.id !== deletingArticle.id;
            })));
        });
    },
    
    render: function() {
        var content;

        content = this.props.isFetching ?
            <Loading /> :
            <ArticleList list={this.props.list}
                modifyArticle={this.modifyArticle}
                deleteArticle={this.deleteArticle}
            />;

        return (
            <div className="m m-article">
                <div className="hd">
                    <h3>文章管理</h3>
                </div>
                <div className="bd">
                    {content}
                </div>

                <Dialog data={this.props.deleteArticleDialog} close={this.closeDeleteDialog}>
                    <p>确定删除文章：</p>
                    <p>{deletingArticle.title}</p>
                    <button onClick={this.doDeleteArticle}>确定</button>
                </Dialog>
            </div>
        );
    }
});

Article.contextTypes = {
    router: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return state.Article;
}

module.exports = ReactRedux.connect(mapStateToProps)(Article);