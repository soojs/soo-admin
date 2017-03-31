var ReactRedux = require('react-redux');
var Link = require('react-router').Link;
var PublishActions = require('actions/PublishActions');

require('./publish/publish.less');

var Publish = React.createClass({
    goPublishByType: function (publishType) {
        this.props.dispatch(PublishActions.selectPublishType(publishType));
    },
    
    render: function() {
        var that = this;

        return (
            <div className="m m-publish">
                <div className="hd">
                    <h3>发布文章</h3>
                    <p>选择要发的文章类型</p>
                    <ul className="article-type">
                        {
                            this.props.layout.publishTypes.map(function (item) {
                                return (
                                    <li className="type-item" key={item.type}>
                                        <Link to={item.path} title={item.title} onClick={that.goPublishByType.bind(that, item.type)}>
                                            <span className={'icon ' + item.className}></span>
                                            <span className="text">{item.text}</span>
                                        </Link>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>

                <div className="bd">

                </div>
            </div>
        );
    }
});


function mapStateToProps(state) {
    return state.Publish;
}

module.exports = ReactRedux.connect(mapStateToProps)(Publish);