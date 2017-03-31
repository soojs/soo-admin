var TipSuc = React.createClass({
    render:function() {
        return (
            <div className="tip-suc">
                <span className="material-icons">done</span>
                <span className="tip-suc-msg">{this.props.msg}</span>
            </div>
        )
    }
});

module.exports = TipSuc;