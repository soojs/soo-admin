/**
 * 段落组件
 */

var CodeMirror = require('codemirror/lib/codemirror.js'),
    Button = require('common/components/button/Button');

require('codemirror/mode/javascript/javascript.js');
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/css/css.js');
require('codemirror/mode/shell/shell.js');
require('./Paragraph.less');

var Paragraph = React.createClass({
    componentDidMount: function() {
        var editor,
            that = this;

        if (! /normal|image/.test(this.props.type)) {
            editor = CodeMirror.fromTextArea(this.refs.code, {
                mode: 'text/' + this.props.type,
                lineNumbers: true,
                theme: 'material'
            });

            editor.on('change', function (ext, changes) {
                that.props.valueChange(ext.getValue());
            });
        }
        
    },
    
    valueChange: function () {
        var image,
            that = this;

        if (this.props.type === 'normal') {
            this.props.valueChange(this.refs.code.value.trim());
        }  
        
        if (this.props.type === 'image') {
            image = this.refs.file.files[0];

            this.refs.img.src = (window.URL || window.webkitURL).createObjectURL(image);

            // 获取图片的base64编码，用于上传
            var reader = new FileReader();

            reader.onload = function() {
                that.dataURL = reader.result;
            };

            reader.readAsDataURL(image);
        }
    },

    imgLoad: function (handler) {
        this.imgNaturalWidth = handler.target.naturalWidth;
        this.imgNaturalHeight = handler.target.naturalHeight;
    },

    fileUpload: function () {
        this.props.fileUpload({
            width: this.imgNaturalWidth,
            height: this.imgNaturalHeight,
            base64: this.dataURL
        });
    },

    render: function() {
        var type = this.props.type,
            paragraph;

        if (type === 'normal') {
            paragraph = (
                <div className="nc-cp-normal">
                    <textarea ref="code" defaultValue={this.props.value} onChange={this.valueChange}></textarea>
                </div>
            );
        } else if(type === 'image') {
            if (this.props.value) {
                paragraph = (
                    <div className="ns-cp-image">
                        <img src={'/' + JSON.parse(this.props.value).url} />
                    </div>
                );
            } else {
                paragraph = (
                    <div className="ns-cp-image">
                        <span className="file-wrap">
                            <span>选择图片</span>
                            <input type="file" onChange={this.valueChange} ref="file"/>
                        </span>
                        <span className="file-wrap" onClick={this.fileUpload}>确定并上传</span>
                        <img src={this.props.value} ref="img" onLoad={this.imgLoad}/>
                    </div>
                );
            }
        } else {
            paragraph = (
                <div className="ns-cp-code">
                    <div className="p">
                        <textarea ref="code" defaultValue={this.props.value}></textarea>
                    </div>
                </div>
            );
        }

        return (
            <div className="ns-c-p">
                <div className="c-p">
                    {paragraph}
                    <div className="btn-delete" title="删除" onClick={this.props.deleteParagraph}>
                        <i className="material-icons">delete_forever</i>
                    </div>
                </div>
            </div>
        )
    }
});

module.exports = Paragraph;