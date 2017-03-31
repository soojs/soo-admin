require('./Button.less');

var Button = React.createClass({
    render: function() {
        return (
            <button className="c-button" onClick={this.props.doClick}>{this.props.text}</button>
        );
    }
});

module.exports = Button;