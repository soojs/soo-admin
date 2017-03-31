var ReactRedux = require('react-redux');
var Index = React.createClass({
    componentDidMount: function() {
        this.props.dispatch({
            type: 'Test'
        });
    },
    render: function() {
        return (
            <div>
                Hello fxblog !!!
            </div>
        );
    }
});


function mapStateToProps(state) {
    var msg = state.Test.msg;

    return {
        msg: msg
    };
}

module.exports = ReactRedux.connect(mapStateToProps)(Index);