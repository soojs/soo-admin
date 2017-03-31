require('./index.less');
require('ueditor');

var base = require('common/base'),
    Ueditor;

Ueditor = React.createClass({

    componentDidMount: function () {
        var editorId = 'ueditor-' + Date.now();
        var ue, that = this;
        var size = base.getElementSize(this.refs.editor.parentNode.parentNode);

        this.refs.editor.setAttribute('id', editorId);

        ue = UE.getEditor(editorId, {
            initialFrameWidth: size.width - 30,
            initialFrameHeight: size.height - 170,
            enableAutoSave:  false,
            wordCount: true
        });

        ue.addListener( 'ready', function( editor ) {
            // ue.execCommand('inserthtml', html);

            ue.on('showmessage', function(type, m){
                if (m['content'] === '本地保存成功') {
                    return true;
                }
            });
        });

        ue.addListener('pastefilter', function (evtName, content, root) {
            // 在这里可以对粘贴的内容作各种处理
            filterRet = richPostFilter(content);

            if(filterRet.illegal) {
                ue.trigger('showmessage',{
                    content : '已过滤掉非法内容',
                    timeout : 2500
                });
            }

            return filterRet.content;

            function richPostFilter(content) {
                var illegal = false;

                content =  content
                // 去掉script
                    .replace(/(?:&lt;|<)\s*script.*?(?:&gt;|>)[\s\S]*?(?:&lt;|<)\/script(?:&gt;|>)/gm, function(match) {
                        illegal = true;
                        return '';
                    })
                    // a标签是去掉还是不去掉呢？问下产品 TODO
                    .replace(/(\<a.*?>)(.*)?(\<\/a\>)/gm, function(s, g1, g2, g3) {
                        return g2;
                    })
                    // 去掉iframe
                    .replace(/(?:&lt;|<)\s*iframe.*?(?:&gt;|>)[\s\S]*?(?:&lt;|<)\/iframe(?:&gt;|>)/, function() {
                        illegal = true;
                        return '';
                    });

                return {
                    illegal: illegal,
                    content: content
                }
            };
        });

        // ue.addListener( 'keyup', this.props.contentChange);
        ue.addListener( 'contentChange', function (eventName) {
            var richText = this.getContent(),
                text = this.getContentTxtIm();
            
            that.props.contentChange(richText, text);

        });
    },

    onClick: function (e) {
        e.stopPropagation();
        e.preventDefault();
    },

    render: function() {
        return (
            <div className="c-ueditor" onClick={this.onClick}>
                <div ref="editor"></div>
            </div>
        );
    }
});

module.exports = Ueditor;