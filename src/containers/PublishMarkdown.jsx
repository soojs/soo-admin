var ReactRedux = require('react-redux'),
    CodeMirror = require('codemirror/lib/codemirror.js'),
    base = require('common/base'),
    Button = require('common/components/button/Button'),
    articleServices = require('services/ArticleServices'),
    fileServices = require('services/FileServices'),
    tagServices = require('services/TagServices'),
    tipActions = require('actions/TipActions'),
    publishActions = require('actions/PublishActions'),
    TIP_CONST = require('constants/TipConst'),
    TagSelect = require('common/components/tagselect/TagSelect'),
    Dialog = require('common/components/dialog/Dialog'),
    marked = require('marked');


marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
});

// require('codemirror/mode/markdown/markdown.js');
require('codemirror/mode/gfm/gfm.js');
require('./publishmarkdown/publishmarkdown.less');
require('github-markdown-css');

var PublishMarkdown = React.createClass({
    getInitialState: function() {
        return {
            markdown: '',
            tags: [],
            previewUrl: '',
            uploadImgs: [],
            upload: {
                title: '图片管理',
                show: false
            }
        };
    },
    componentDidMount: function() {
        var editor,
            that = this,
            markdown = this.props.markdown,
            initConf = {
                mode: 'gfm',
                //mode: 'text/x-markdown',
                lineNumbers: true,
                //theme: 'material'
                theme: 'default',
            };

        editor = CodeMirror.fromTextArea(this.refs.mk, initConf);

        editor.on('change', function (ext, changes) {
            var markdownContent = ext.getValue(),
                htmls = marked(markdownContent);

            that.props.dispatch(publishActions.markdownContentChange({
                title: base.getTitleFromMarkdown(markdownContent),
                brief: base.getArticleBrief(base.getHtmlsInnerTexts(htmls)),
                markdown: markdownContent
            }));
            
            // 预览
            that.setState({
                markdown: htmls
            });
        });

        if (markdown.id) {
            editor.setValue(markdown.content);
        }

        tagServices.getTagList().then(function (result) {
            var tags = result.list || [];

            tags = tags.map(function (tag) {
                return {
                    name: tag.name,
                    id: tag.id,
                    selected: that.props.markdown.tags.indexOf(tag.id) > -1
                }
            });

            that.setState({
                tags: tags
            });
        });
    },

    getMarkup: function () {
        return {
            __html: this.state.markdown
        }
    },

    doDraft: function () {

    },

    doPublish: function () {
        var mk = this.props.markdown,
            dispatch = this.props.dispatch;


        var params = {
            title: mk.title,
            content: mk.content,
            brief: mk.brief,
            type: '300',
            tags: JSON.stringify(mk.tags)
        };

        if (mk.id) {
            articleServices.updateArticle(mk.id, params).then(function () {
                dispatch(tipActions.showTip(TIP_CONST.TIP_TYPE.SUCCESS, '文章修改成功'));
            });
        } else {
            params.read_num = 0;
            articleServices.addArticle(params).then(function () {
                dispatch(tipActions.showTip(TIP_CONST.TIP_TYPE.SUCCESS, '发布文章成功'));
            });
        }
    },

    tagsChange: function (tag, evt) {
        var
            tags = this.props.markdown.tags,
            dispatch = this.props.dispatch;

        if (evt.target.checked) {
            tags.push(tag.id);
        } else {
            tags = tags.filter(function (id) {
                return id !== tag.id;
            });
        }

        dispatch(publishActions.markdownTagsChange(tags));
    },

    showUploadDialog: function () {
        this.setState({
            upload: {
                show:true,
                title: this.state.upload.title
            }
        });
    },

    closeUploadDialog: function () {
        this.setState({
            upload: {
                show:false,
                title: this.state.upload.title
            }
        });
    },


    fileChange: function () {
        var image =this.refs.file.files[0],
            that = this;

        this.setState({
            previewUrl: (window.URL || window.webkitURL).createObjectURL(image)
        });

        // 获取图片的base64编码，用于上传
        var reader = new FileReader();

        reader.onload = function() {
            that.dataURL = reader.result;
        };

        reader.readAsDataURL(image);
    },

    imgLoad: function (handler) {
        this.imgNaturalWidth = handler.target.naturalWidth;
        this.imgNaturalHeight = handler.target.naturalHeight;
    },

    fileUpload: function (item, img) {
        var that = this,
            dispatch = this.props.dispatch;

        fileServices.uploadImgWithBase64({
            width: this.imgNaturalWidth,
            height: this.imgNaturalHeight,
            base64: this.dataURL
        }).then(function (data) {
            dispatch(tipActions.showTip(TIP_CONST.TIP_TYPE.SUCCESS, '图片上传成功'));

            that.setState({
                uploadImgs: that.state.uploadImgs.concat(/^\//.test(data.url) ? data.url : ('/' + data.url))
            });
        });
    },

    copyImgLink: function (index) {
        var target = this.refs['copySrc' + index];
        var range = document.createRange(),
            that = this;

        window.getSelection().removeAllRanges();

        range.selectNode(target);
        window.getSelection().addRange(range);

        try {
            document.execCommand('copy');
            //var successful = document.execCommand('copy');
            // var msg = successful ? 'successful' : 'unsuccessful';
            window.getSelection().removeAllRanges();
            that.props.dispatch(tipActions.showTip(TIP_CONST.TIP_TYPE.SUCCESS, '复制链接成功'));

        } catch(err) {
        }
    },

    render: function() {
        var that = this;

        return (
            <div className="m-mk">
                <div className="m m-publish m-md">
                    <div className="hd">
                        <h3>{this.props.markdown.id ? '修改' : '发布'}文章 - Markdown</h3>
                    </div>
                    <div className="bd">
                        <div className="mk-editor">
                            <textarea ref="mk"></textarea>
                        </div>
                        <div className="mk-preview markdown-body">
                            <div dangerouslySetInnerHTML={this.getMarkup()}></div>
                        </div>
                    </div>
                    <div className="ft">
                        <TagSelect tags={this.state.tags} change={this.tagsChange}></TagSelect>
                        <Button text="上传图片" doClick={this.showUploadDialog}></Button>
                        <Button text="存为草稿" doClick={this.doDraft}></Button>
                        <Button text="发布" doClick={this.doPublish}></Button>
                    </div>
                </div>

                <Dialog data={this.state.upload} close={this.closeUploadDialog}>
                    <div className="m-mk-upload">
                        <div className="cur-img">
                            <h4>最近图片：{this.state.uploadImgs.length}张</h4>
                            <ul className="g-clearfix">
                                {
                                    this.state.uploadImgs.map(function (src, index) {
                                        return (
                                            <li key={'up-img-' + index} className="img-item">
                                                <img src={src}/>
                                                <span className="copy">
                                                    <span className="copy-src" ref={'copySrc' + index}>{src}</span>
                                                    <span className="copy-btn" onClick={that.copyImgLink.bind(null, index)}>复制图片链接</span>
                                                </span>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className="upload clearfix">
                            <div className="preview">
                                <img src={this.state.previewUrl} onLoad={this.imgLoad}/>
                            </div>
                            <h4>上传图片：</h4>
                            <div className="image">
                                <span className="file-wrap">
                                    <span>选择图片</span>
                                    <input type="file" onChange={this.fileChange} ref="file"/>
                                </span>
                                <span className="file-wrap" onClick={this.fileUpload}>确定并上传</span>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </div>
        );
    }
});


function mapStateToProps(state) {
    return {
        markdown: state.Publish.markdown
    };
}

module.exports = ReactRedux.connect(mapStateToProps)(PublishMarkdown);