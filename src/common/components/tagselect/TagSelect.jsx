require('./TagSelect.less');

var TagSelect = React.createClass({
    render: function() {
        var that = this;

        return (
            <div className="c-tag-select">
                <div className="title">选择标签</div>
                <ul className="tag-list">
                    {
                        this.props.tags.map(function (tag, index) {
                            return (
                                <li className="tag-item" key={index}>
                                    <input type="checkbox" onChange={that.props.change.bind(null, tag)} defaultChecked={tag.selected}/>
                                    {tag.name}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
});

module.exports = TagSelect;