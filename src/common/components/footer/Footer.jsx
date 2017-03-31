require('./footer.less');

var footer = {
    copyright: 'fxblog.com',
    year: new Date().getFullYear()
};

var Footer = React.createClass({
    render: function() {
        return (
            <div className="c-footer">
                <div>&copy;{footer.year} - {footer.copyright}</div>
            </div>
        );
    }
});

module.exports = Footer;