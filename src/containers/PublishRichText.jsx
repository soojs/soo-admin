var ReactRedux = require('react-redux'),
    articleServices = require('services/ArticleServices'),
    tipActions = require('actions/TipActions'),
    publishActions = require('actions/PublishActions'),
    TIP_CONST = require('constants/TipConst'),
    base = require('common/base'),
    Button = require('common/components/button/Button'),
    // Base64 = require('js-base64').Base64,
    Base64 = require('./publishrichtext/base64'),
    TagSelect = require('common/components/tagselect/TagSelect'),
    Ueditor = require('common/components/ueditor/ueditor');

require('./publishrichtext/publishrichtext.less');

var PublishRichText = React.createClass({
    getInitialState: function() {
        return {
            title: '',
            richTextHtml: ''
        };
    },
    componentDidMount: function() {
        
    },

    doDraft: function () {
        // TODO
        console.debug('doDraft');
    },

    doPublish: function () {
        var ps = this.props,
            richText = ps.richText,
            title = richText.title,
            content = richText.content,
            dispatch = ps.dispatch,
            that = this;

        if (! base.checkArticleTitle(title)) {
            dispatch(tipActions.showTip(TIP_CONST.TIP_TYPE.ERROR, '文章标题字数在5-50之间'));
            return;
        }

        if (! base.checkArticleTContent(content)) {
            dispatch(tipActions.showTip(TIP_CONST.TIP_TYPE.ERROR, '文章内容字数在5-10000之间'));
            return;
        }

        articleServices.addArticle({
            title: title,
            content: Base64.encode(content),
            brief: base.getArticleBrief(richText.brief),
            read_num: 0,
            type: '200',
            tags: JSON.stringify(richText.tags)
        }).then(function () {
            // todo 发布成功后重置界面
            dispatch(tipActions.showTip(TIP_CONST.TIP_TYPE.SUCCESS, '发布文章成功'));
        });
    },

    titleChange: function () {
        var
            title = this.refs.title.value.trim(),
            dispatch = this.props.dispatch;

        this.setState({
            title: title
        });

        dispatch(publishActions.richTextTitleChange(title));
    },

    contentChange: function (richText, text) {
        this.setState({
            richTextHtml: richText
        });
        
        this.props.dispatch(publishActions.richTextContentChange({
            content: richText,
            brief: text
        }));
    },

    getMarkup: function () {
        return {
            __html: this.state.richTextHtml
        }
    },

    tagsChange: function (tag, evt) {
        var
            tags = this.props.publish.post.tags,
            dispatch = this.props.dispatch;

        if (evt.target.checked) {
            tags.push(tag.id);
        } else {
            tags = tags.filter(function (id) {
                return id !== tag.id;
            });
        }

        dispatch(publishActions.normalTagsChange(tags));
    },
    
    render: function() {
        var tags = [
            {
                name: '1111111',
                id: 1
            },
            {
                name: '222222222',
                id: 2
            }
        ];

        return (
            <div className="m m-publish m-rich-text">
                <div className="hd">
                    <h3>发布文章 - 富文本</h3>
                </div>
                <div className="bd">
                    <div className="editor" ref="editWrap">
                        <div className="form">
                            <div className="f-row">
                                <div className="f-row-label"><label htmlFor="title">标题</label></div>
                                <input type="text" ref="title" defaultValue={this.props.richText.title} onChange={this.titleChange} />
                            </div>
                        </div>
                        <Ueditor contentChange={this.contentChange}></Ueditor>
                    </div>
                    <div className="preview rich-text-preview">
                        <h3>标题：{this.state.title}</h3>
                        <div dangerouslySetInnerHTML={this.getMarkup()}></div>
                    </div>
                </div>
                <TagSelect tags={tags} change={this.tagsChange}></TagSelect>
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
        richText: state.Publish.richText
    };
}

module.exports = ReactRedux.connect(mapStateToProps)(PublishRichText);