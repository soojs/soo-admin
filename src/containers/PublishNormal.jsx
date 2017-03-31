require('./publishnormal/PublishNormal.less');

var ReactRedux = require('react-redux'),
    articleServices = require('services/ArticleServices'),
    fileServices = require('services/FileServices'),
    tagServices = require('services/TagServices'),
    tipActions = require('actions/TipActions'),
    publishActions = require('actions/PublishActions'),
    TIP_CONST = require('constants/TipConst'),
    base = require('common/base'),
    Paragraph = require('./publishnormal/Paragraph'),
    TagSelect = require('common/components/tagselect/TagSelect'),
    paragraphLen = 0,
    Button = require('common/components/button/Button'),
    renderTags = false;

var PublishNormal = React.createClass({
    getInitialState: function() {
        return {
            tags: []
        };
    },
    getDefaultProps : function () {
        return {
            codeTypes: [
                {
                    type: 'normal',
                    text: '段落'
                },
                {
                    type: 'image',
                    text: '图片'
                },
                {
                    type: 'javascript',
                    text: 'JS'
                },
                {
                    type: 'html',
                    text: 'Html'
                },
                {
                    type: 'css',
                    text: 'Css'
                },
                {
                    type: 'shell',
                    text: 'Shell',
                    mime: 'x-sh'
                }
            ]
        };
    },

    componentDidMount: function() {
        var that = this;

        paragraphLen = this.props.publish.post.contents.length;

        tagServices.getTagList().then(function (result) {
            var tags = result.list || [];

            tags = tags.map(function (tag) {
                return {
                    name: tag.name,
                    id: tag.id,
                    selected: that.props.publish.post.tags.indexOf(tag.id) > -1
                }
            });

            that.setState({
                tags: tags
            });
        });
    },

    doDraft: function () {
        // TODO
        console.debug('doDraft');
    },

    doPublish: function () {
        var ps = this.props,
            post = ps.publish.post,
            title = post.title,
            contents = post.contents,
            dispatch = ps.dispatch,
            content,
            that = this;

        if (! base.checkArticleTitle(title)) {
            dispatch(tipActions.showTip(TIP_CONST.TIP_TYPE.ERROR, '文章标题字数在5-50之间'));
            return;
        }

        content = JSON.stringify(contents);

        if (! base.checkArticleTContent(content)) {
            dispatch(tipActions.showTip(TIP_CONST.TIP_TYPE.ERROR, '文章内容字数在5-10000之间'));
            return;
        }

        var params = {
            title: title,
            content: content,
            brief: base.getArticleBrief(contents[0].value),
            type: '100',
            tags: JSON.stringify(post.tags)
        };

        if (post.id) {
            articleServices.updateArticle(post.id, params).then(function () {
                dispatch(tipActions.showTip(TIP_CONST.TIP_TYPE.SUCCESS, '文章修改成功'));
            });
        } else {
            params.read_num = 0;
            articleServices.addArticle(params).then(function () {
                dispatch(tipActions.showTip(TIP_CONST.TIP_TYPE.SUCCESS, '发布文章成功'));
            });
        }
    },
    
    addNewParagraph: function (codeType) {
        var 
            dispatch = this.props.dispatch;

        dispatch(publishActions.addParagraph(codeType));
    },

    deleteParagraph:function (item) {
        var
            index = item.index,
            dispatch = this.props.dispatch;

        dispatch(publishActions.deleteParagraph(index));
    },

    titleChange: function () {
        var
            title = this.refs.title.value.trim(),
            dispatch = this.props.dispatch;

        dispatch(publishActions.titleChange(title));
    },

    contentValueChange: function (item, value) {
        var
            index = item.index,
            dispatch = this.props.dispatch;

        dispatch(publishActions.contentChange(index, value));
    },

    fileUpload: function (item, img) {
        var that = this,
            dispatch = this.props.dispatch;

        fileServices.uploadImgWithBase64(img).then(function (data) {
            dispatch(tipActions.showTip(TIP_CONST.TIP_TYPE.SUCCESS, '图片上传成功'));

            that.contentValueChange(item, JSON.stringify({
                url: data.url,
                w: data.w,
                h: data.h
            }));
        });
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        return window.rerenderPublish || !renderTags;
    },

    tagsChange: function (tag, evt) {
        var
            tags = this.props.publish.post.tags,
            dispatch = this.props.dispatch;

        if (evt.target.checked) {
            tags.push(tag.id);
        } else {
            tags = tags.filter(function (tagId) {
                return tagId !== tag.id;
            });
        }

        dispatch(publishActions.normalTagsChange(tags));
    },

    render: function() {
        var that = this;

        if (this.state.tags.length) {
            renderTags = true;
        }

        return (
            <div className="m m-publish m-publish-normal">
                <div className="hd">
                    <h3>{this.props.publish.post.id ? '修改' : '发布'}文章 - 普通</h3>
                </div>
                <div className="bd">
                    <div className="form">
                        <div className="f-row">
                            <div className="f-row-label"><label htmlFor="title">标题</label></div>
                            <input type="text" ref="title" defaultValue={this.props.publish.post.title} onChange={that.titleChange} />
                        </div>

                        <div className="f-row">
                            <div className="f-row-label"><label htmlFor="content">正文</label></div>
                            {
                                that.props.publish.post.contents.map(function (item) {
                                    var key = Date.now() + item.index;

                                    if (item.type === 'image') {
                                        return (
                                            <Paragraph key={key}
                                                       ref={'p' + key}
                                                       type={item.type}
                                                       value={item.value}
                                                       valueChange={that.contentValueChange.bind(null, item)}
                                                       fileUpload={that.fileUpload.bind(null, item)}
                                                       deleteParagraph={that.deleteParagraph.bind(null, item)} >
                                            </Paragraph>
                                        )
                                    }

                                    return (
                                        <Paragraph key={key}
                                                   ref={'p' + key}
                                                   type={item.type}
                                                   value={item.value}
                                                   valueChange={that.contentValueChange.bind(null, item)}
                                                   deleteParagraph={that.deleteParagraph.bind(null, item)} >
                                        </Paragraph>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="operation clearfix">
                    {
                        this.props.codeTypes.map(function (item, index) {
                            return (
                                <span key={index} onClick={that.addNewParagraph.bind(null, item.mime || item.type)}>插入{item.text}</span>
                            )
                        })
                    }
                </div>
                <TagSelect tags={that.state.tags} change={that.tagsChange}></TagSelect>
                <div className="ft">
                    <Button text="存为草稿" doClick={this.doDraft}></Button>
                    <Button text="发布" doClick={this.doPublish}></Button>
                </div>
            </div>
        );
    }
});


function mapStateToProps(state) {
    return {
        publish: state.Publish
    };
}

module.exports = ReactRedux.connect(mapStateToProps)(PublishNormal);