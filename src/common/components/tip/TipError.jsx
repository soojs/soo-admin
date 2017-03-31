var TipError = React.createClass({
    render: function () {
        return (
            <div className='tip-error'>
                <span className="material-icons">error</span>
                <span className="tip-suc-msg">{this.props.msg}</span>
            </div>
        )
    }
});

module.exports = TipError;