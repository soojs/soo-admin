require('./tip.less');

var tipCst = require('constants/TipConst'),
    ReactRedux = require('react-redux'),
    TipSuc = require('./TipSuc.jsx'),
    CONF = require('constants/conf'),
    tipActions = require('actions/TipActions'),
    TipError = require('./TipError.jsx');

var Tip = React.createClass({
    render: function() {
        var tip,
            that = this,
            className = this.props.show ? 'c-tip show': 'c-tip ' + CONF.className.hide;

        if (this.props.show) {
            setTimeout(function () {
                that.props.dispatch(tipActions.hideTip());
            }, 1000);
        }
        
        switch (this.props.tipType) {
            case tipCst.TIP_TYPE.SUCCESS:
                tip = <TipSuc msg={this.props.msg} />;
                break;
            case tipCst.TIP_TYPE.ERROR:
                tip = <TipError msg={this.props.msg} />;
                break;
        } 

        return (
            <div className={className}>
                {tip}
            </div>
        )
    }
});

function mapStateToProps(state) {
    return state.Tip;
}

module.exports = ReactRedux.connect(mapStateToProps)(Tip);