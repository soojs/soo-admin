require('./dialog.less');

var Dialog = React.createClass({
    render: function() {
        var data = this.props.data,
            flagClass = 'c-dialog ' + (data.show ? 'show' : 'g-ui-hide');
        
        return (
            <div className={flagClass}>
                <div className="dialog" >
                    <div className="hd">{data.title}</div>
                    <div className="bd">
                        {this.props.children}
                    </div>
                    <div className="d-close" onClick={this.props.close}>&times;</div>
                </div>
                <div className="d-mask"></div>
            </div>
        );
    }
});

module.exports = Dialog;