require('./nav.less');

var Link = require('react-router').Link;

var nav = {
    currentIndex: 0,
    list: [
        {
            path: '/index',
            title: '首页',
            icon: 'home'
        },
        {
            path: '/article',
            title: '文章管理',
            icon: 'book'
        },
        {
            path: '/publish',
            title: '发布文章',
            icon: 'web'
        },
        {
            path: '/tag',
            title: '标签管理',
            icon: 'dns'
        }
    ]
};

var Nav = React.createClass({
    render: function() {
        return (
            <div className="c-nav">
                <ul>
                    {nav.list.map(function (item, index) {
                        return (<li key={index}>
                            <Link activeClassName="selected" to={item.path} title={item.title}>
                                <span className="material-icons md-24">{item.icon}</span><span>{item.title}</span>
                            </Link>
                        </li>);
                    })}
                </ul>
            </div>
        );
    }
});

module.exports = Nav;