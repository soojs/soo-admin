var ReactRedux = require('react-redux'),
    Button = require('common/components/button/Button'),
    tipActions = require('actions/TipActions'),
    tagActions = require('actions/TagActions'),
    TIP_CONST = require('constants/TipConst'),
    base = require('common/base'),
    tagService = require('services/TagServices'),
    Tag;

require('./tag/tag.less');

Tag = React.createClass({
    componentDidMount: function() {
        var that = this;

        tagService.getTagList().then(function (result) {
            that.props.dispatch(tagActions.updateTags(result.list));
        })
    },

    addTag: function () {
        var tag = this.refs.tagInput.value.trim(),
            that = this,
            dispatch = this.props.dispatch;

        if (tag.length < 2 || tag.length > 10) {
            dispatch(tipActions.showTip(TIP_CONST.TIP_TYPE.ERROR, '标签长度为2到10个字符'));
            return;
        }
        
        tagService.addTag({
            name: tag
        }).then(function (result) {
            var oriList = that.props.Tag.list,
                newList = [result.tag];

            that.refs.tagInput.value = '';
            dispatch(tipActions.showTip(TIP_CONST.TIP_TYPE.SUCCESS, '增加标签成功'));
            dispatch(tagActions.updateTags(newList.concat(oriList)));
        });
    },

    deleteTag: function (tagId) {
        var that = this,
            dispatch = this.props.dispatch;

        tagService.deleteTag(tagId).then(function () {
            dispatch(tipActions.showTip(TIP_CONST.TIP_TYPE.SUCCESS, '删除标签成功'));
            dispatch(tagActions.updateTags(that.props.Tag.list.filter(function (tag) {
                return tag.id !== tagId;
            })));
        });    
    },
    
    render: function() {
        var that = this;

        return (
            <div className="m m-tag">
                <div className="hd">
                    <h3>增加标签</h3>
                    <div className="add-tag">
                        <input type="text" ref="tagInput"/>
                        <Button text="确定" doClick={this.addTag}></Button>
                    </div>
                </div>

                <div className="hd">
                    <h3>标签列表</h3>
                    <ul className="tag-list">
                        {
                            this.props.Tag.list.map(function (tag, index) {
                                return (
                                    <li className="tag-item" key={index}>
                                        {tag.name}
                                        <span className="delete" title="删除" onClick={that.deleteTag.bind(null, tag.id)}>&times;</span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
});


function mapStateToProps(state) {
    return {
        Tag: state.Tag
    };
}

module.exports = ReactRedux.connect(mapStateToProps)(Tag);